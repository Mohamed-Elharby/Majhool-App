import crypto from "node:crypto"
// import otpGeneretor from "otp-generator";
import { cacheProvider } from "../cache/initCache.js";

export async function createOtp(email) {
    const otp = crypto.randomInt(100000, 999999).toString();
    await cacheProvider.set(`otp:${email}`, otp, 300);
    return otp;
}

