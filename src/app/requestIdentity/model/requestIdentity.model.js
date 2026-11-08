import { model , Schema } from "mongoose";

const schema = new Schema({
    messageId:{type:Schema.Types.ObjectId , ref:"Message"},
    senderReq:{type:Schema.Types.ObjectId , ref:"User"},
    reciverReq:{type:Schema.Types.ObjectId , ref:"User"},
    status:{type:String,enum: ['pending', 'accepted', 'rejected'],
        default:"pending",lowercase: true,trim:true}
},
{timestamps: true}
)

export const RequestModel = model("RequestModel",schema)