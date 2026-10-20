import { AppEroor } from "../../../pkg/error/customError.js";
//User
export const userExsists = new AppEroor("User Already Esists", 403);
// export const userNotExsists = new AppEroor("User Not Exsists", 404);
export const userVeryfied = new AppEroor("User Already veryfied", 409);
export const userNotVeryfied = new AppEroor("User Not Verified", 401);
export const invaledPassword = new AppEroor("Invaled Password", 401);
//OTP
export const expiredOtp = new AppEroor("OTP is Expired", 404);
export const invaledOtp = new AppEroor("Invaled OTP", 401);
