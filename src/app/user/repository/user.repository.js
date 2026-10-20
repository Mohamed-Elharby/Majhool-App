import { User } from "../model/user.model.js";

export async function allUser(){
    const user = await User.find()
    return user
}

export async function checkUserExsitsById(id){
    const user = await  User.findOne({ _id: id, isDeleted:false },{password:0},{});
    return user
}