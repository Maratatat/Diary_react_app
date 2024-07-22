import {TokenService} from "./TokenService";
import axios from "axios";

export const UpdateTokens = async (setIsAuth, navigate, callback, service, ...args) => {
    const response = await TokenService.UpdateTokens()
    if (axios.isAxiosError(response)) {
        alert("Sorry, your tokens are not valid. Please authorize again")
        setIsAuth(false)
        localStorage.removeItem("auth")
        navigate('/auth') 
    } else {
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        service.accessToken = localStorage.getItem("accessToken")
        callback(...args)
    }

}