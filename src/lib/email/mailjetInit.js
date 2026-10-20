import { MailjetProvider } from "../../pkg/email/mailjet.js"
import { env } from "../env/env.js"

export const mailjetProvider = new MailjetProvider({
        apiKey:env.mailjet.MAILJET_API_KEY,
        apiSecret:env.mailjet.MAILJET_API_SECRET,
        fromEmail:env.mailjet.MAILJET_FROM_EMAIL,
        fromName:env.mailjet.MAILJET_FROM_NAME,
})