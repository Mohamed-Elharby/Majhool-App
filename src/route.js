import { Router } from "express";
import {authRouter} from './app/auth/router/auth.route.js';
import {messageRoture} from './app/message/router/message.route.js';
import {userRouter} from './app/user/router/user.route.js';
import { requestIdentityRouter } from "./app/requestIdentity/router/requestIdentity.route.js";

export const appRouter = Router();

appRouter.use("/auth",authRouter);
appRouter.use("/user",userRouter);
appRouter.use("/message",messageRoture);
appRouter.use("/requestIdentity",requestIdentityRouter);