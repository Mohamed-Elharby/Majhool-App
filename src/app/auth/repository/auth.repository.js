import {User} from"../../user/model/user.model.js"

export async function checkUserExsistByEmail(userData){
    return await User.findOne({email:userData.email})
}
export async function saveUserInDB(userData){
    return await User.create(userData)
}

export async function updatedUserByEmail(email , updatedData) {
    return await User.findOneAndUpdate({email:email} ,
        updatedData,{returnDocument:"after"})
}