import { Router } from "express";
import * as messageController from "../controller/message.controller.js";
import { authGuard } from "../../../lib/auth/authGuard.js";
export const messageRoture = Router();

messageRoture.post(
    "/send-anonymous-message",
    authGuard,
    messageController.sendAnonymousMessage,
);

messageRoture.post(
    "/send-public-message",
    authGuard,
    messageController.sendPublicMessage,
);

messageRoture.get(
    "/get-own-message",
    authGuard,
    messageController.getOwnMessages,
);

messageRoture.delete(
    "/delet-message/:messageId",
    authGuard,
    messageController.deletMessage,
);