import { Message } from "../model/message.model.js";

export async function saveMessageInDB(content , receiver , sender_id , senderName) {
    return  Message.create({content , receiver , sender_id , senderName})
}
export async function gwetOwnMessages(userId) {
    return  Message.find(
        {receiver:userId},
        {},
        {populate:{path:"sender_id",select:["email","provider","name"]}})
}