import { Schema , model } from "mongoose";

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
        required:true,
    },
    isAnonymous: {
    type: Boolean,
    },
    isDeleted:{
        type:Boolean , default:false}
}
,{
    timestamps:true
})

export const Message = model("Message", messageSchema)