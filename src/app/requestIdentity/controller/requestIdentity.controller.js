import * as reqService from "../../requestIdentity/service/requestIdentity.service.js";

export async function requestIdentity(req, res, next) {
    try {
    const messageId = req.params.messageId;
    const senderReq = req.user.id;
    await reqService.requestIdentity(messageId, senderReq);
    res.json({
        message: "Request Sent Successfully",
        success: true,
    });
    } catch (error) {
    next(error);
    }
}

export async function getRequestIdentity(req, res, next) {
    try {
    const reciverReq = req.user.id;
    const ownReq = await reqService.getMyIdentityRequests(reciverReq);
    res.json({
        message: "Own Request",
        success: true,
        data: ownReq,
    });
    } catch (error) {
    next(error);
    }
}
export async function getSentIdentityRequests(req, res, next) {
    try {
    const reciverReq = req.user.id;
    const ownReq = await reqService.getSentIdentityRequests(reciverReq);
    res.json({
        message: "Own Request",
        success: true,
        data: ownReq,
    });
    } catch (error) {
    next(error);
    }
}

export async function acceptOrRejectRequestIdentity(req, res, next) {
    try {
    const requestIdentityId = req.params.reqId;
    const result = req.params.result;
    const reciverReq = req.user.id;
    await reqService.acceptOrRejectReq(requestIdentityId , result , reciverReq);
    res.json({
        message: "Request Upfated Successfully",
        success: true,
    });
    } catch (error) {
    next(error);
    }
}
