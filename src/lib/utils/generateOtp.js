import otpGeneretor from "otp-generator";

export function createOtp() {
    return otpGeneretor.generate(6,{
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
})
}