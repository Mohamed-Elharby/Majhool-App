import { User } from "../model/user.model.js";

export async function allUser(){
    return await User.find({},{name:1 , email:1 , profilePicture:1 , coverImages:1})
}

export async function checkUserExsitsById(id){
    return await  User.findOne({_id:id, isDeleted:false },
        {password:0,updatedAt:0,deleteAt:0,isDeleted:0,},{});       
}

export async function updateProfilePicture(id , profilePicture ) {
return User.findByIdAndUpdate({_id:id},{$set:{profilePicture:profilePicture}},{returnDocument:"after"})
}

export async function uploadCoverImges(id , coverImges ) {
return User.findByIdAndUpdate(
    {_id:id},{$set:{coverImages:coverImges}},{returnDocument:"after"}
)}

export async function deleteProfilePicture(id ) {
return User.findByIdAndUpdate(id, {
    $unset: { profilePicture: 1 }
})
}

export async function deleteCoverImges(id ) {
return User.findByIdAndUpdate(id, {
    $unset: { coverImages: 1 }
})
}