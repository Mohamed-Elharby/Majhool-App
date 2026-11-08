import  {logger}  from "../../pkg/looger/logger.js";
export function globalError(error , req , res ,next) {

    logger.error(error.message,{
        stack:error.stack,
        correlationId:req.correlationId
    })

    if(error.isOperaors == true){
    return res.status(error.statusCode).json({
        message:error.message,
        success:false,
        stack:error.stack
    })
    }
        res.status(500).json({
        message:"Something went wrong.",
        success:false,
        stack:error.stack
    })
}
