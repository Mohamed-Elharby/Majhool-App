import { OTP } from "../../auth/model/otp.model.js";

export async function saveOtpInDb(otp) {
    return await OTP.create(otp)
}

export async function checkOtpByEmail(email) {
    return await OTP.findOne({email:email})
}

export async function deleteOtpsByEmail(email){
    return await OTP.deleteMany({email:email})
}