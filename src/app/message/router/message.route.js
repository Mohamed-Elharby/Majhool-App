import { Router } from "express";
import * as messageController from "../controller/message.controller.js";
import { authGuard } from "../../../lib/auth/authGuard.js";
const messageRoture = Router();

messageRoture.post("/send-message-anonymous", messageController.sendMessage);
messageRoture.post("/send-message-public",authGuard,messageController.sendMessage);
messageRoture.get("/get-own-message",authGuard,messageController.getOwnMessages);

export default messageRoture;
