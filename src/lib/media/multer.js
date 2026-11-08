import multer, { diskStorage } from "multer";

import crypto from "crypto";
import { AppEroor } from "../../pkg/error/customError.js";

function uploadFile(allawedTypes = ["image/png","image/jpeg"]) {
    return multer({
        fileFilter:(req,file,cb)=>{
            if (!allawedTypes.includes(file.mimetype)) {
                return cb(new AppEroor("Invaled File Types" , 400),false)
            }
            cb(null , true)
        },
        storage:diskStorage({
            destination:"upload",
            filename:function(req , file ,cd) {
                cd(null ,`${crypto.randomUUID()}${file.originalname}`)
            }
        })
    })
}
export function uploadeSingleFile(fieldName  , allawedTypes ) {
    return uploadFile(allawedTypes).single(fieldName);
}
export function uploadeArrayFile(fieldName , maxCount , allawedTypes) {
    return uploadFile(allawedTypes).array(fieldName , maxCount);
}
export function uploadeFieldsFile(fields , allawedTypes){
    return uploadFile(allawedTypes).fields(fields);
}