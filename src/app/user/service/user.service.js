import * as userRepo from "../repository/user.repository.js";
import * as errorUser from "../error/userError.js";
import fs from "node:fs"
import path from "node:path"

export async function getAllUser() {
    return await userRepo.allUser()    
}

export async function getProfile(id) {
    return await userRepo.checkUserExsitsById(id)
}

export async function uploadProfilePicture(id , file) {
    const user =  await userRepo.checkUserExsitsById(id)
    if(!user) throw errorUser.userNotExsists        
    if(user.profilePicture && fs.existsSync(path.resolve(user.profilePicture))){
        fs.unlinkSync(path.resolve(user.profilePicture))
    }
    await userRepo.updateProfilePicture(id , file.path)    
}

export async function uploadCoverImges(id , file) {
    const user =  await userRepo.checkUserExsitsById(id)
    if(!user) throw errorUser.userNotExsists
    const coverImages = file.map(file => file.path);    
    user.coverImages?.forEach(image => {
        const imagePath = path.resolve(image);        
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    });
    await userRepo.uploadCoverImges(id , coverImages)
}

export async function deletProfilePicture(id) {
    const user =  await userRepo.checkUserExsitsById(id)
    if(!user) throw errorUser.userNotExsists   
    if(!user.profilePicture) throw errorUser.notFoundImges
    if(user.profilePicture && fs.existsSync(path.resolve(user.profilePicture))){
        fs.unlinkSync(path.resolve(user.profilePicture))
    }    
    return await userRepo.deleteProfilePicture(id)
}

export async function deletCoverImges(id) {
    const user =  await userRepo.checkUserExsitsById(id)
    if(!user) throw errorUser.userNotExsists
    if(!user.coverImages) throw errorUser.notFoundImges 
    user.coverImages?.forEach(image => {
        const imagePath = path.resolve(image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    });
    return await userRepo.deleteCoverImges(id)
}

export async function deleteAccount(id) {
    const user = await userRepo.checkUserExsitsById(id)
    if(!user) throw errorUser.userNotExsists
    user.isDeleted = true
    user.deleteAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save()
}