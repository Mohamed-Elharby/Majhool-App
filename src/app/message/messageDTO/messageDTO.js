import { Types } from "mongoose";
import { z } from "zod";

export const messageDTO = z.object({
    content:z.string().min(10).max(200).trim(),
    receiver:z.string().trim().refine((value)=>{
        return Types.ObjectId.isValid(value);
    }),
})