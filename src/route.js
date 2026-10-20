import { Router } from "express";
import authRoute from './app/auth/router/auth.route.js';
import messageRoture from './app/message/router/message.route.js';
import userRouter from './app/user/router/user.route.js';

export const appRouter = Router();

appRouter.use("/auth",authRoute);
appRouter.use("/user",userRouter);
appRouter.use("/message",messageRoture);
