import {z} from"zod"

export const registerDTO = z.object({
    name:z.string().min(4).max(20).trim(),
    email:z.email().toLowerCase().trim(),
    password:z.string().min(5).max(100),
    picture:z.string().optional(),
    // dob:z.date().optional()
    dob:z.coerce.date().optional()
})
export const confermEmailDTO = z.object({
    email:z.email().toLowerCase().trim(),
    code:z.string().length(6).trim()
})
export const loginDTO = z.object({
    email:z.email().toLowerCase().trim(),
    password:z.string().min(5).max(100)
})
export const resendOtpDTO = z.object({
    email:z.email().toLowerCase().trim()
})
export const resetPasswordDTO = z.object({
    email:z.email().toLowerCase().trim(),
    newPassword:z.string().min(5).max(100),
    code:z.string().length(6).trim()
})