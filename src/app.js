import './lib/db/mongoose.js'
import express from"express"
import cors from "cors"
import { appRouter } from './route.js'
import { globalError } from './lib/globalError/globalErrror.js';
import { correlationId } from './lib/correlation/correlationId.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from "express-rate-limit";
import { AppEroor } from './pkg/error/customError.js';


export function creatAapp() {
const app = express()

// const limiter = rateLimit({
//     limit:3,
//     windowMs: 5 * 60 * 1000,
//     standardHeaders:"draft-8",
// })

// app.use(limiter)

app.use("/upload" ,express.static("upload"))

app.use(express.json())

app.use(cookieParser())


app.use(cors({origin:"http://localhost:4200"}))

app.use( correlationId )

app.get("/health",(req,res,next)=>{
    console.log("server hit");
    res.json("ok")
})

app.use("/api",appRouter)

app.use(globalError)

return app ;

}