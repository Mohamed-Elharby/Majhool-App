import jwt from "jsonwebtoken";
import { env } from "../env/env.js";

export function generateToken(payload) {
    return jwt.sign(payload , env.jwt.JWT_SECRET , {expiresIn:"1h"})
}