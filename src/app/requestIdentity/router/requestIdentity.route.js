import { Router } from "express";
import { authGuard } from "../../../lib/auth/authGuard.js";
import * as requestIdentityController from "../controller/requestIdentity.controller.js";

export const requestIdentityRouter = Router();

requestIdentityRouter.post("/request-identity/:messageId",
    authGuard,
    requestIdentityController.requestIdentity
);

requestIdentityRouter.get("/get-request-identity",
    authGuard,
    requestIdentityController.getRequestIdentity
);
requestIdentityRouter.get("/get-sent-identity-requests",
    authGuard,
    requestIdentityController.getSentIdentityRequests
);

requestIdentityRouter.patch("/update-request-identity/:reqId/:result",
    authGuard,
    requestIdentityController.acceptOrRejectRequestIdentity
);