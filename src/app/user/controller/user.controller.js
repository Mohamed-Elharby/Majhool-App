import {getAllUser} from "../service/user.service.js"

export async function getAllUsers(req,res,next) {
    try {
        const users = await getAllUser()
        res.json({
            count:users.length,
            success:true,
            allUser:{users}
        })
    } catch (error) {
        next(error)
    }
}