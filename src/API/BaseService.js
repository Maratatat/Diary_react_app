export class BaseService {
    constructor() {
        this._accessToken = localStorage.getItem("accessToken");
        this.baseURL = "https://localhost:3306/";
        this.baseHeaders = {
            Accept: 'text/plain',
            contentType: 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        };
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(token) {
        this._accessToken = token;
        this.baseHeaders['Authorization'] = `Bearer ${token}`;
    }

}