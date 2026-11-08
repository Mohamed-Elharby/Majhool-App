import { Message } from "../model/message.model.js";

export async function saveMessageInDB(content , receiver , sender_id , senderName ,isAnonymous ) {
    return  Message.create({content , receiver , sender_id , senderName , isAnonymous})
}
export async function gwetOwnMessages(userId) {
    return  Message.find(
        {receiver:userId},
        {},
        {populate:{path:"sender_id",select:["email","provider","name"]}})
}

export async function checkMessageById(messageId) {
    return Message.findOne({_id:messageId})
}

export async function ubdateMessageById(messageId,result) {
    return Message.findByIdAndUpdate({_id:messageId},{isAnonymous:result},{returnDocument:"after"})
}

export async function deleteMessageById(messageId) {
    return Message.findOneAndDelete({_id:messageId})
}