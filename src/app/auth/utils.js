import { time } from "../../pkg/utils/time.js"

export function setCookies(res , token) {
    res.cookie("access-token",token,{
    httpOnly:true,
    path: "/",
    maxAge: time("1h")
    })
}