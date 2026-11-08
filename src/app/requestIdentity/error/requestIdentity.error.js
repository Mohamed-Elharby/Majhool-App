import { AppEroor } from "../../../pkg/error/customError.js";

export const publicMessage = new AppEroor("Sender identity is already public", 400);
export const reqPending = new AppEroor("Request is already pending", 409);
export const reqRejected =  new AppEroor("Your request was rejected", 403);
export const notFondReq =  new AppEroor("You don't have any pending identity requests", 404);
export const notSendReq =  new AppEroor("You don't send identity requests", 404);
export const invalidReq =  new AppEroor("Invalid request ID.", 404);
export const reqRejectedBefore = new AppEroor("You have rejected this request before", 409);
export const invalidStatus = new AppEroor("Invalid Status. Allowed Values are 'accepted' or 'rejected'" , 400);
export const notYourRequest = new AppEroor("This request does not belong to you", 403);