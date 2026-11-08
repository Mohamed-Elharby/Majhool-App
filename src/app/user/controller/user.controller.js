import * as userService from "../service/user.service.js"

export async function getAllUsers(req,res,next) {
    try {
        const users = await userService.getAllUser()
        res.json({
            count:users.length,
            success:true,
            allUser:{users}
        })
    } catch (error) {
        next(error)
    }
}

export async function getProfile(req,res,next) {
    try {
        const id = req.user.id        
        const userData = await userService.getProfile(id)
        res.json({
            message:"Your Profile",
            data:userData
        })
    } catch (error) {
        next(error)
    }
}

export async function uploadProfilePicture(req,res,next) {
    try {
        const id = req.user.id;        
        const profilePicture = req.file
        await userService.uploadProfilePicture(id , profilePicture)
        res.json({
            message:"Profile picture updated successfully.",
            success:true,
            })
    } catch (error) {
        next(error)
    }
}

export async function uploadCoverImges(req,res,next) {
    try {
        const id = req.user.id;        
        const coverImges = req.files;
        await userService.uploadCoverImges(id , coverImges)
        res.json({
            message:"coverImges updated successfully.",
            success:true,
            })
    } catch (error) {
        next(error)
    }
}

export async function deletProfilePicture(req,res,next) {
    try {
        await userService.deletProfilePicture(req.user.id)
        res.json({
            message:"Profile Picture Deleted Successfully.",
            success:true,
            })
    } catch (error) {
        next(error)
    }
}

export async function deleteCoverImges(req,res,next) {
    try {
        await userService.deletCoverImges(req.user.id)
        res.json({
            message:"Cover Imges Deleted Successfully.",
            success:true,
            })
    } catch (error) {
        next(error)
    }
}

export async function logOut(req,res,next) {
    try {
        res.clearCookie("access-token");
        res.json({
            message:"Logged out successfully",
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteAccount(req,res,next) {
    try {
        const id = req.user.id
        await userService.deleteAccount(id)
        res.clearCookie("access-token");
        res.json({
        message: "Your account will be permanently deleted within 30 days. Log in to recover it.",
        success:true
        })
    } catch (error) {
        next(error)
    }
}