import { verifyGoogleToken } from "../../../lib/authWithGoogle/authWithGoogle.js";
// import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as authRepo from "../repository/auth.repository.js";
import * as otpRepo from "../repository/otp.repository.js";
import * as error from "../error/error.js";
import { createOtp } from "../../../lib/utils/generateOtp.js";
import {comparePassword,hashPassword} from "../../../pkg/utils/hashPassword.js";
import { time } from "../../../pkg/utils/time.js";
import { generateToken } from "../../../lib/utils/token.js";
import { mailjetProvider } from "../../../lib/email/mailjetInit.js";

export async function register(userData) {
  //Check User Exsist
  const userExsists = await authRepo.checkUserExsistByEmail(userData);
  if (userExsists) throw error.userExsists;
  //Hasing Password
  userData.password = await hashPassword(userData.password, 10);
  //Save User In DB
  const createdUser = await authRepo.saveUserInDB(userData);
  //Create OTP
  const otp = createOtp();
  //Save OTP In DB
  await otpRepo.saveOtpInDb({
    email: userData.email,
    code: otp,
    expiresAt: new Date(Date.now() + time("10m")),
  });

//send OTP in Email Use nodemailer
  // await sendEmail(
  //   userData.email,
  //   "Your verification code",
  //   `<h1>Email verification code ${otp} </h1>
  //   <p>This code is valid for 10 minutes. Please enter it before it expires.</p>
  //    <p>Dont share it with anyone.</p>`,
  // );

//send OTP in Email Use mailget
    await mailjetProvider.sendMail(
    userData.email,
    "Your verification code",
    `<h1>Email verification code ${otp} </h1>
    <p>This code is valid for 10 minutes. Please enter it before it expires.</p>
    <p>Dont share it with anyone. </p>`,
  );
  return createdUser;
}

export async function verifyAccount(email, code) {
  //Check User EXsists
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw error.userNotExsists;
  //Check User Verified
  if (user.isConfirmed === true) throw error.userVeryfied;
  //Check OTO
  const userExsists = await otpRepo.checkOtpByEmail(email);
  if (!userExsists) throw error.expiredOtp;
  if (userExsists.code !== code) throw error.invaledOtp;
  //Updated User
  const updatedUser = await authRepo.updatedUserByEmail(email, {
    isConfirmed: true,
  });
  //Delete Otp After  Verified
  await otpRepo.deleteOtpsByEmail(email);
  return updatedUser;
}

export async function login(email, password) {
  //Check User EXsists
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw error.userNotExsists;
  //Check User Verified
  if (user.isConfirmed == false) throw error.userNotVeryfied;
  //Comber Password
  const match = await comparePassword(password, user.password);
  if (!match) throw error.invaledPassword;
  //Generate Token
  const token = generateToken({
    id: user._id,
    email: user.email,
    name: user.name,
  });  
  return token;
}

export async function resendOtp(email) {
  //Check User Exsists
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw error.userNotExsists;
  //Delete All Old otp
  await otpRepo.deleteOtpsByEmail(email);
  //Generate New OTB
  const otp = createOtp();
  //Save OTP in DB
  await otpRepo.saveOtpInDb({
    email: email,
    code: otp,
    expiresAt: new Date(Date.now() + time("10m")),
  });

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
  //Check User Exsists
  const user = await authRepo.checkUserExsistByEmail({ email });
  if (!user) throw error.userNotExsists;
  //Check OTP
  const otp = await otpRepo.checkOtpByEmail(email);
  if (!otp) throw error.expiredOtp;
  //Check Code
  if (otp.code !== code) throw error.invaledOtp;
  //Hash Password
  newPassword = await hashPassword(newPassword, 10);
  //Update Password
  await authRepo.updatedUserByEmail(email, { password: newPassword });
  //Delete Old OTP
  await otpRepo.deleteOtpsByEmail(email);
}

export async function loginWithGoogle(idToken) {
  // verify Google Token
  const payload = await verifyGoogleToken(idToken);
  // Check User Exsist
  const user = await authRepo.checkUserExsistByEmail({ email: payload.email });
  if (user) {
    return generateToken({
      name: payload.name,
      email: payload.email,
    });
  }
  //Create User
  const createdUser = await authRepo.saveUserInDB({
    name: payload.name,
    email: payload.email,
    email: payload.email,
    picture: payload.picture,
    provider: "google",
    isConfirmed: true,
  });
  //Generate Token
  const token = generateToken({
    id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
  });
  return token;
}
