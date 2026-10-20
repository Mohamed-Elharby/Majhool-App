import { Schema , model } from "mongoose";
import { boolean } from "zod";

const messageSchema = new Schema({
    content:{
        type:String,
        required:true,
        minlength:10,
        maxlength:200
    },
    receiver:{
        type:Schema.Types.ObjectId ,
        ref:"User",
        required:true,
    },
    sender_id:{
        type:Schema.Types.ObjectId ,
        ref:"User",
        require:true,
    },
    senderName:{
        type:String ,
        ref:"User",
        require:true,
        default:"Majhool User"
    },
    isDeleted:{
        type:boolean , default:false}
}
,{
    timestamps:true
})

export const Message = model("Message", messageSchema)