import './lib/db/mongoose.js'
import express from"express"
import cors from "cors"
import { appRouter } from './route.js'
import { globalError } from './lib/globalError/globalErrror.js';
import { correlationId } from './lib/correlation/correlationId.js';
import cookieParser from 'cookie-parser';

export function creatAapp() {

    
    const app = express()
    
    
    app.use(express.json())
    app.use(cookieParser())

app.use(cors({origin:"http://localhost:4200"}))

app.use( correlationId )

app.use("/api",appRouter)

app.use(globalError)

return app ;

}