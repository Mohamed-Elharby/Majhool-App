import { allUser } from "../repository/user.repository.js";

export async function getAllUser() {
    return await allUser()    
}