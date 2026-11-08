import bcrypt from"bcrypt"

export async function hashPassword(password ,saltRounds) {
    return await bcrypt.hash(password , saltRounds)
}
export async function comparePassword( password , userPassword ) {
    return await bcrypt.compare( password , userPassword )
}