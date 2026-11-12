import { Router } from "express";
import * as messageController from "../controller/message.controller.js";
import { authGuard } from "../../../lib/auth/authGuard.js";
import { messageLimiter } from "../../../lib/rateLimiter/rateLimiter.js";
import { withCache } from "../../../lib/cache/cache.js";
export const messageRoture = Router();

messageRoture.post(
    "/send-anonymous-message",
    messageLimiter,
    authGuard,
    messageController.sendAnonymousMessage,
);

messageRoture.post(
    "/send-public-message",
    messageLimiter,
    authGuard,
    messageController.sendPublicMessage,
);

messageRoture.get(
    "/get-own-message",
    withCache(30*60),
    authGuard,
    messageController.getOwnMessages,
);

messageRoture.delete(
    "/delet-message/:messageId",
    authGuard,
    messageController.deletMessage,
);