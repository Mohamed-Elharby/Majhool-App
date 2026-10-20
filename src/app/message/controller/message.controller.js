import { validateDTO } from "../../../lib/validation/validation.js"
import { messageDTO } from "../messageDTO/messageDTO.js"
import * as messagrServce from "../service/message.service.js"

export async function sendMessage(req , res , next) {
    try {        
        const data = validateDTO(messageDTO , req.body)
        let {content , receiver } = data
        let sender_id = req.user?.id        
        let senderName = req.user?.name
        const message = await messagrServce.createMessage(content , receiver , sender_id ,  senderName)
        res.json({
            message:"Message Created Successefully",
            success:true,
            data:message
        })
    } catch (error) {
        next(error)
    }
}

export async function getOwnMessages(req,res,next) {
    try {        
        const userId = req.user.id
        const messages = await messagrServce.gwetOwnMessages(userId)
        const allMessage = messagrServce.formatMessagesResponse(messages)    
        res.json({
            message:"All your private messages.",
            success:true,
            messageCount:messages.length,
            allMessages:allMessage
        })
    } catch (error) {
        next(error)
    }
    
}