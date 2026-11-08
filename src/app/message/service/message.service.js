import { checkUserExsitsById } from "../../user/repository/user.repository.js";
import * as errorMessage from "../error/messageError.js";
import * as errorUser from "../../user/error/userError.js";
import * as messageRepo from "../repository/message.repository.js";
import * as reqRepo from "../../requestIdentity/repository/requestIdentity.repository.js";
import * as errorReq from "../../requestIdentity/error/requestIdentity.error.js"

export async function createMessage(content,receiver,sender_id,senderName,isAnonymous,) {
    const user = await checkUserExsitsById(receiver);
    if (!user) throw errorUser.userNotExsists;
    return await messageRepo.saveMessageInDB(
    content,
    receiver,
    sender_id,
    senderName,
    isAnonymous,
    );
}

export async function gwetOwnMessages(userId) {
    const message = await messageRepo.gwetOwnMessages(userId);
    if (message.length === 0) throw errorMessage.notFoundMessages;
    return message;
}

// Format gwet Own Messages In Response
export function formatMessagesResponse(messages) {
    return messages.map((message) => {
    const messageOpject = message.toObject();
    messageOpject.sender_info = messageOpject.sender_id;
    delete messageOpject.sender_id;
    if (messageOpject.isAnonymous == true) {
        messageOpject.sender_info = {
        name: "Majhool User", status: "Unknown",
        };
    }
    if (messageOpject.isAnonymous == false &&
        messageOpject.sender_info !== null)
        {
        messageOpject.sender_info = {
        ...messageOpject.sender_info,
        status: "Active User",
        };
    }
    if (messageOpject.sender_info == null) {
        messageOpject.sender_info = {
        name: "Old User", status: "Inactive User",
        };
    }
    return messageOpject;
    });
}

// Delete the received message and its identity request if exists.
export async function deleteMessage(messageId, userId) {
    const message = await messageRepo.checkMessageById(messageId);
    if (!message) throw errorMessage.notFoundMessages;
    if (String(message.receiver) !== userId)
        throw errorMessage.notYourMessage
    await messageRepo.deleteMessageById(messageId);
    const request = await reqRepo.getSentRequestsIdentity(messageId);
    if (!request) {
    return;
    } else if (String(request.senderReq) !== userId)
        throw errorReq.notYourRequest
    await reqRepo.deleteRerequestIdentity(request._id);
}
