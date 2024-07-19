import axios from "axios";

export class TokenService {

    static async UpdateTokens() {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('https://localhost:3306/api/Token/refresh?api-version=1', {
            body: JSON.stringify({accessToken, refreshToken}),
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + accessToken
            }
        })
        return response;
    }
}