import {TokenService} from "./TokenService";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

export class BaseService {
    constructor() {
        this.accessToken = localStorage.getItem("accessToken");
        this.baseURL = "https://localhost:3306/";
        this.baseHeaders = {
            Accept: 'text/plain',
            contentType: 'application/json',
            authorization: 'Bearer ' + this.accessToken
        };
    }

    async UpdateTokens(callback, ...args) {
        const {isAuth, setIsAuth} = useContext(AuthContext);
        const navigate = useNavigate();
        const response = await TokenService.UpdateTokens()
        if (axios.isAxiosError(response)) {
            /*do modal window message to user*/
            setIsAuth(false)
            navigate('/auth')
        } else {
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem("refreshToken", response.data.refreshToken)
        }
        callback(...args)
    }
}