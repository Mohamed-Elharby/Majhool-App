import { RequestModel } from "../model/requestIdentity.model.js";

export async function createRerequestIdentity(messageId,senderReq,reciverReq,status,) {
  return RequestModel.create({
    messageId: messageId,
    senderReq: senderReq,
    reciverReq: reciverReq,
    status: status,
  });
}

export async function getRerequestIdentity(data) {
  return RequestModel.find(data);
}

export async function getSentRequestsIdentity(messageId) {
  return RequestModel.findOne({messageId:messageId})
}

export async function getRerequestIdentityByID(id) {
  return RequestModel.findOne({_id:id})
}

export async function checkRerequestIdentity(messageId) {
  return RequestModel.findOne({ messageId : messageId });
}

export async function ubdateRerequestIdentity(id , result) {
  return RequestModel.findOneAndUpdate({_id : id },{status:result},{returnDocument:"after"});
}

export async function deleteRerequestIdentity(id) {
  return RequestModel.findByIdAndDelete({_id:id})
}

