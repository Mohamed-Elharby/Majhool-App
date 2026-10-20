export class AppEroor extends Error{
    statusCode;
    isOperaors;
    constructor(message, statusCode , isOperaors = true){
        super(message);
        this.statusCode = statusCode
        this.isOperaors = isOperaors
        Error.captureStackTrace(this , this.constructor)
    }
}