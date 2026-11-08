import { AppEroor } from "../../../pkg/error/customError.js";

export const notFoundMessages=  new AppEroor("No Private Messages Found.", 404);
export const notYourMessage =  new AppEroor("This Message Does not belong to you", 403);
export const onlyViewOwnMessages =  new AppEroor("You are only allowed to view your own messages.", 403);