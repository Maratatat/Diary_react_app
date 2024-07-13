import axios from "axios"

export class AuthService {
    static baseURL = "https://localhost:3306/";

    static async Register(login, password, passwordConfirm) {
        return await axios.post(this.baseURL + "register?api-version=1", {
            login,
            password,
            passwordConfirm
        }).catch(function (response) {
            return response;
        });
    }

    static async Login(login, password) {
        return await axios.post(this.baseURL + "login?api-version=1", {login, password}).catch(function (response) {
            return response;
        });
    }
}