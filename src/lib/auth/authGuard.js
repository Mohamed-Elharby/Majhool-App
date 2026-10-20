import jwt from "jsonwebtoken";
import { AppEroor } from "../../pkg/error/customError.js";
import { env } from "../env/env.js";

export function authGuard(req, res, next) {
    try {
    const token = req.cookies.token;
    if (!token) throw new AppEroor("No Token Provider", 403);
    req.user = jwt.verify(token, env.jwt.JWT_SECRET);
    next();
    } catch (error) {
    next(error);
    }
}