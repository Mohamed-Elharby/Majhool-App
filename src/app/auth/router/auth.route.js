import {Router} from "express";
import * as authController from "../controller/auth.controller.js"
import { idempotency } from "../../../pkg/idempotency/idempotency.js";
const authRouter = Router()

authRouter.post("/register", authController.addUser )
authRouter.patch("/conferm-email", authController.userConferm )
authRouter.post("/login", authController.userLogin )
authRouter.post("/resend-otp", authController.newOtp )
authRouter.patch("/reset-password",idempotency(), authController.resetPassword )
authRouter.post("/login-with-google", authController.loginWithGoogel )

export default authRouter ;