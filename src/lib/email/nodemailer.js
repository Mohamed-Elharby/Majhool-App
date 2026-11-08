import nodemailer from "nodemailer";
import { env } from "../env/env.js";

const transport = await nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:env.nodemailer.EMAIl_USER,
        pass:env.nodemailer.EMAIl_PASSWORD
    }
})

export async function sendEmail(to,subject,html) {
    await transport.sendMail({
        from:`"Majhool-App"<${env.nodemailer.EMAIl_USER}>`,
        to:to,
        subject:subject,
        html:html
    })
    
}