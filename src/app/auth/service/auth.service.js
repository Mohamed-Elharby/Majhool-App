import { verifyGoogleToken } from "../../../lib/authWithGoogle/authWithGoogle.js";
// import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as authRepo from "../repository/auth.repository.js";
// import * as otpRepo from "../repository/otp.repository.js";
import * as error from "../error/authError.js";
import * as errorUser from "../../user/error/userError.js";
import { createOtp } from "../../../lib/utils/generateOtp.js";
import {comparePassword,hashPassword} from "../../../pkg/utils/hashPassword.js";
import { generateToken } from "../../../lib/utils/token.js";
import { mailjetProvider } from "../../../lib/email/mailjetInit.js";
import { cacheProvider } from "../../../lib/cache/initCache.js";
import { AppEroor } from "../../../pkg/error/customError.js";

export async function register(userData) {
  const userExsists = await authRepo.checkUserExsistByEmail(userData);
  if (userExsists) throw errorUser.userExsists;
  userData.password = await hashPassword(userData.password, 10);
  const createdUser = await authRepo.saveUserInDB(userData);
  const otp = await createOtp(userData.email);
    await mailjetProvider.sendMail(
    userData.email,
    "Your verification code",
    `<h1>Email verification code ${otp} </h1>
    <p>This code is valid for 10 minutes. Please enter it before it expires.</p>
    <p>Dont share it with anyone. </p>`,
  );
  return createdUser;
}

export async function baseFunction(email, code , factory) {
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw errorUser.userNotExsists;
  const otp = await cacheProvider.get(`otp:${email}`)
  if (!otp) throw error.expiredOtp;
  if (otp !== code) throw error.invaledOtp;
  const result = await factory(user)
  await cacheProvider.del(`otp:${email}`)
  return result;
}

export async function verifyAccount(email, code ) {
  await baseFunction(email,code,async (user)=>{
    if (user.isConfirmed === true) throw errorUser.userVeryfied;
    await authRepo.updatedUserByEmail(email, {isConfirmed: true,});
  })
}

export async function enableTowStepVerification(email, code) {
  await baseFunction(email,code,async(user)=>{
    if (user.towStepVerification == true) throw error.towStepVerificationOn
    await authRepo.updatedUserByEmail(email, {
      towStepVerification: true,
    });
  })
}

export async function verifyTowStepVerification(email, code) {
  const token = await baseFunction(email , code ,(user)=>{
    const token = generateToken({
      id:user._id, name:user.name, email:user.email
    })
    return token;
  })
  return token;
}

// Decrease login attempts after a failed login.
async function decreaseLoginTries(email) {
  let cachedTries = await cacheProvider.get(`login-tries:${email}`)
  const cacheTTL = await cacheProvider.ttl(`login-tries:${email}`)  
  cachedTries = cachedTries ?? 5
  const ttl = cacheTTL == -2 ? 300 : cacheTTL
  await cacheProvider.set(`login-tries:${email}`, cachedTries - 1 , ttl)
}

export async function login(email, password) {
  const cachedTries = await cacheProvider.get(`login-tries:${email}`);
  if(cachedTries === "0") throw new  AppEroor("Login tries exceeded. Please try again later.",429)
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user){ 
    await decreaseLoginTries(email)
    throw errorUser.invalidCredentials;
  }
  if (user.isDeleted == true) {
    user.isDeleted = false
    user.deleteAt = null
    await user.save();
  }
  if (user.isConfirmed == false) throw errorUser.userNotVeryfied;
  const match = await comparePassword(password, user.password);
  if (!match) {
    await decreaseLoginTries(email)
    throw errorUser.invalidCredentials;
  }
  await cacheProvider.del(`login-tries:${email}`);
  if (user.towStepVerification == true) {
  const otp = await createOtp(user.email);
    await mailjetProvider.sendMail(
    user.email,
    "2 Step Verification Email Code",
    `<h1>Email verification code ${otp} </h1>
    <p>This code is valid for 10 minutes. Please enter it before it expires.</p>
    <p>Dont share it with anyone. </p>`,
  );
  return;
  }
  const token = generateToken({
    id: user._id,email: user.email,name: user.name,
  });  
  return token;
}

export async function resendOtp(email , req ) {
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw errorUser.userNotExsists;  
//Delete All Old otp
  // await otpRepo.deleteOtpsByEmail(email);
  await cacheProvider.del(`otp:${email}`)
  const otp = await createOtp(email);  
  //Save OTP in DB
  // await otpRepo.saveOtpInDb({
  //   email: email,
  //   code: otp,
  //   expiresAt: new Date(Date.now() + time("10m")),
  // });

// send OTP by Email use nodemailer
  // await sendEmail(
  //   email,
  //   "New OTP",
  //   `<h1>New OTP ${otp}</h1>
  //   <Dont>This code is valid for 10 minutes. Please enter it before it expires.</p>
  //   <p>Dont share it with anyone.</p>`,
  // );

//send OTP by Email use mailjet
  await mailjetProvider.sendMail(
    email,
    "New OTP",
    `<h1>New OTP ${otp}</h1>
    <p>This code is valid for 10 minutes. Please enter it before it expires.</p>
    <p>Dont share it with anyone.</p>`,
  );
}

export async function setNewPassword(email, newPassword, code) {
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw errorUser.userNotExsists;
  const otp = await cacheProvider.get(`otp:${email}`)
  if (!otp) throw error.expiredOtp;
  if (otp !== code) throw error.invaledOtp;
  newPassword = await hashPassword(newPassword, 10);
  await authRepo.updatedUserByEmail(email, { password: newPassword });
  await cacheProvider.del(`otp:${email}`)
}

export async function loginWithGoogle(idToken) {
  const payload = await verifyGoogleToken(idToken);
  const user = await authRepo.checkUserExsistByEmail({ email: payload.email });
  if (user) {
    return generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  }
  const createdUser = await authRepo.saveUserInDB({
    name: payload.name,
    email: payload.email,
    profilePicture: payload.picture,
    provider: "google",
    isConfirmed: true,
  });
  const token = generateToken({
    id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
  });
  return token;
}