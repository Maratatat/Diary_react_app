import axios from "axios";

export class TokenService {

    static async UpdateTokens() {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post('https://localhost:3306/api/Token/refresh?api-version=1',
            {
                accessToken: accessToken,
                refreshToken: refreshToken
            },
            {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                }
            }
        ).catch(function (error) {
            return error
        });


        return response;
    }
}