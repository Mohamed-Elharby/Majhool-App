import { AppEroor } from "../../../pkg/error/customError.js";

export const expiredOtp = new AppEroor("OTP is Expired", 404);
export const invaledOtp = new AppEroor("Invaled OTP", 401);
export const towStepVerificationOn = new AppEroor("Two-step verification is enabled.",400)
