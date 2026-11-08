import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import { idempotency } from "../../../pkg/idempotency/idempotency.js";
export const authRouter = Router();

authRouter.post("/register",
    authController.addUser
);
authRouter.patch("/verify-account", 
    authController.userConferm
);
authRouter.post("/login", 
    authController.userLogin
);
authRouter.post("/resend-otp",
    idempotency(300), 
    authController.newOtp
);
authRouter.patch(
    "/reset-password",
    idempotency(),
    authController.resetPassword,
);
authRouter.post("/login-with-google",
    authController.loginWithGoogel
);
authRouter.patch(
    "/enable-tow-step-verification",
    authController.enableTowStepVerification
);
authRouter.post(
    "/verify-tow-step-verification",
    authController.verifyTowStepVerification
);