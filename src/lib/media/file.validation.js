import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import { AppEroor } from "../../pkg/error/customError.js";

export const allawedTypes={
    image:["image/png","image/jpeg"],
    document:["application/pdf"]
}
export  function validationFile(allowedType = allawedTypes.image){
return async (req , res , next)=>{
    try {
    const filePath = req.file.path
    const buffer = fs.readFileSync(filePath)
    const type = await fileTypeFromBuffer(buffer)

    if(req.file.size >  5 * 1024 * 1024){
    fs.unlinkSync(filePath)
    throw new AppEroor("File size must not exceed 5 MB",400)
    }

    if(!type || !allowedType.includes(type.mime)){
        fs.unlinkSync(filePath)
        return next(new AppEroor("Invaled File Type",400)) 
    }
    return next()
    } catch (error) {
        next(error)
    }
}
}