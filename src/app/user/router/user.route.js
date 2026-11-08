import { Router } from "express";
import * as userController from "../controller/user.controller.js";
import { withCache } from "../../../lib/cache/cache.js";
import {uploadeArrayFile,uploadeFieldsFile,uploadeSingleFile} from "../../../lib/media/multer.js";
import { validationFile } from "../../../lib/media/file.validation.js";
import { authGuard } from "../../../lib/auth/authGuard.js";

export const userRouter = Router();

userRouter.get("/get-all-user", 
    // withCache(), 
    userController.getAllUsers
);
userRouter.get("/get-profile", 
    authGuard, 
    userController.getProfile
);
userRouter.post(
    "/upload-profile-Picture",
    authGuard,
    uploadeSingleFile("Profile-Picture"),
    validationFile(),
    userController.uploadProfilePicture,
);
userRouter.post(
    "/upload-cover-Picture",
    authGuard,
    uploadeArrayFile("cover-Picture", 3),
    userController.uploadCoverImges,
);
userRouter.delete(
    "/delet-profile-picture",
    authGuard,
    userController.deletProfilePicture,
);
userRouter.delete(
    "/delet-cover-imges",
    authGuard,
    userController.deleteCoverImges,
);
userRouter.post("/log-out", 
    authGuard,
    userController.logOut
);
userRouter.post("/delete-account", 
    authGuard,
    userController.deleteAccount
);
