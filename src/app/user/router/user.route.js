import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";
import { withCache } from "../../../lib/cache/cache.js"
const userRouter = Router()


userRouter.get("/get-all-user", withCache() ,getAllUsers)

export default userRouter; 