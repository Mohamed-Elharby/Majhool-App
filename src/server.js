import http  from "node:http";
import { creatAapp } from "./app.js";
import './lib/db/mongoose.js'
import mongoose from "mongoose";
import { logger } from "./pkg/looger/logger.js";
import { env } from "./lib/env/env.js";


const server = http.createServer(creatAapp())
server.listen(env.PORT,()=>{
    logger.info(`App listen in port ${env.PORT}`)    
})
function shutDowen(){
    server.close(async ()=>{
        await mongoose.disconnect(),
        process.exit(0)
    })
}
process.on("SIGINT",shutDowen)
process.on("SIGTERM",shutDowen)