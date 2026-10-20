import { z } from "zod";
import { config } from "dotenv"; 

config()

const envSchema = z.object({
    PORT:z.string().default("3000"),
    DB_URI:z.string(),
    EMAIl_USER:z.string().trim().toLowerCase(),
    EMAIl_PASSWORD:z.string(),
    JWT_SECRET:z.string(),
    GOOGLE_WEB_AUTH_CLIENT_ID:z.string(),
    CACHE_REDIS_HOST:z.string(),
    CACHE_REDIS_PORT:z.string().default("6379"),
    CACHE_REDIS_PASSWORD:z.string(),
    MAILJET_API_KEY:z.string(),
    MAILJET_API_SECRET:z.string(),
    MAILJET_FROM_EMAIL:z.string(),
    MAILJET_FROM_NAME:z.string()
})
const parsed = envSchema.parse(process.env)

export const env = {
    PORT:parsed.PORT,
    db:{
        DB_URI:parsed.DB_URI,
    },
    nodemailer:{
        EMAIl_USER:parsed.EMAIl_USER,
        EMAIl_PASSWORD:parsed.EMAIl_PASSWORD,
    },
    jwt:{
        JWT_SECRET:parsed.JWT_SECRET
    },
    authWithGoogle:{
        GOOGLE_WEB_AUTH_CLIENT_ID:parsed.GOOGLE_WEB_AUTH_CLIENT_ID
    },
    redis:{
        CACHE_REDIS_HOST:parsed.CACHE_REDIS_HOST,
        CACHE_REDIS_PORT:parsed.CACHE_REDIS_PORT,
        CACHE_REDIS_PASSWORD:parsed.CACHE_REDIS_PASSWORD
    },
    mailjet:{
        MAILJET_API_KEY:parsed.MAILJET_API_KEY,
        MAILJET_API_SECRET:parsed.MAILJET_API_SECRET,
        MAILJET_FROM_EMAIL:parsed.MAILJET_FROM_EMAIL,
        MAILJET_FROM_NAME:parsed.MAILJET_FROM_NAME
    }
}