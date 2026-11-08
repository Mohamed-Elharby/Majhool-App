class Logger {
    constructor(){
        if(!Logger.instance){
            return Logger.instance = this
        }
        return Logger.instance
    }
    log(level , message , metaData = {}){
        let messageOpj ={
            level:level,
            message:message,
            time: new Date(),
            ...metaData,
        }
        console.log(JSON.stringify(messageOpj));
    }
    info(message , metaData = {}){
        this.log("info",message , metaData)
    }
    error(message , metaData = {}){
        this.log("error",message , metaData)
    }
    debug(message , metaData = {}){
        this.log("debug",message , metaData)
    }
}

export const logger = new Logger()