import * as messageRepo from "../../message/repository/message.repository.js";
import * as reqRepo from "../repository/requestIdentity.repository.js";
import * as errorReq from "../error/requestIdentity.error.js"
import * as errorMessage from "../../message/error/messageError.js"

export async function requestIdentity(messageId,senderReq,_reciverReq,status,) {
    const message = await messageRepo.checkMessageById(messageId);
    if (!message) throw errorMessage.notFoundMessages
    if (String(message.receiver) !== senderReq)
        throw errorMessage.onlyViewOwnMessages
    if (message.isAnonymous == false)
        throw errorReq.publicMessage
    const reqExsists = await reqRepo.checkRerequestIdentity(messageId);
    if (!reqExsists) {
        await reqRepo.createRerequestIdentity(messageId,senderReq,message.sender_id,status);
        return;
    }
    if (reqExsists.status == "pending")
        throw errorReq.reqPending
    if (reqExsists.status == "rejected")
        throw errorReq.reqRejected
}

export async function getMyIdentityRequests(reciverReq) {
    const requests = await reqRepo.getRerequestIdentity({reciverReq:reciverReq});    
    if (requests.length == 0)
        throw errorReq.notFondReq
    return requests;
}

export async function getSentIdentityRequests(senderReq) {    
    const requests = await reqRepo.getSentRequestsIdentity(senderReq);        
    if (requests.length == 0)
        throw errorReq.notSendReq
    return requests;
}

export async function acceptOrRejectReq(requestIdentityId, result, reciverReq) {
    let request = "";
    try {
        request = await reqRepo.getRerequestIdentityByID(requestIdentityId);
    } catch (error) {
        throw errorReq.invalidReq;
    }
    if (!request) throw errorReq.invalidReq;
    if (JSON.stringify(request.reciverReq) !== JSON.stringify(reciverReq))
        throw errorReq.invalidReq;
    if (request.status == "rejected")
        throw errorReq.reqRejectedBefore
    result = result.toLowerCase();
    if (result !== "accepted".toLowerCase() && result !== "rejected".toLowerCase())
        throw errorReq.invalidStatus
    if (result === "accepted") {
        await messageRepo.ubdateMessageById(request.messageId, false);
        await reqRepo.deleteRerequestIdentity(requestIdentityId);
        return;
    }
    return await reqRepo.ubdateRerequestIdentity(requestIdentityId, result);
}