import mongoose from"mongoose"
import { env } from "../env/env.js"

mongoose.connect(env.db.DB_URI).catch((error)=>{
console.log(error);

})