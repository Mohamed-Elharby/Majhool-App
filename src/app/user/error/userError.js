import { AppEroor } from "../../../pkg/error/customError.js";

export const userExsists = new AppEroor("User Already Esists", 403);
export const userNotExsists = new AppEroor("User Not Esists", 404);
export const invalidCredentials = new AppEroor("Invalid email or password", 401)
export const userVeryfied = new AppEroor("User Already veryfied", 409);
export const userNotVeryfied = new AppEroor("User Not Verified", 401);
export const notFoundImges = new AppEroor("No file image exists.",404)
