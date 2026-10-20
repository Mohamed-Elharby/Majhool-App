import { AppEroor } from "../../../pkg/error/customError.js";
import { checkUserExsitsById } from "../../user/repository/user.repository.js";
import * as error  from "../../user/userError.js";
import * as messageRepo from "../repository/message.repository.js";

export async function createMessage(content , receiver , sender_id , senderName) {
    const user = await checkUserExsitsById(receiver)
    if (!user) throw error.userNotExsists
    return await messageRepo.saveMessageInDB(content , receiver , sender_id , senderName)
}

export async function gwetOwnMessages(userId) {
    const message = await messageRepo.gwetOwnMessages(userId)   
    if(message.length == 0)throw new AppEroor("No Private Messages Found.",404)
    return message
}

// Format Messages In Response
export function formatMessagesResponse(messages){
    return messages.map((message)=>{
    const messageOpject = message.toObject()
    if(messageOpject.sender_id){
    delete messageOpject.senderName
    }else{
    messageOpject.sender_id = messageOpject.senderName 
    delete messageOpject.senderName
    }
    messageOpject.sender_info = messageOpject.sender_id ;
    delete messageOpject.sender_id            
    return messageOpject
    })
}