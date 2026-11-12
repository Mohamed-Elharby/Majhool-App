import {rateLimit} from "express-rate-limit";


export const generalLimiter = rateLimit({
    limit: 100,
    windowMs: 15 * 60 * 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

export const loginLimiter = rateLimit({
    limit: 5,
    windowMs: 15 * 60 * 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

export const otpLimiter = rateLimit({
    limit: 3,
    windowMs: 5 * 60 * 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

export const messageLimiter = rateLimit({
    limit: 5,
    windowMs: 5 * 60 * 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false
})