import axios from "axios";

export class ReportService {
    static baseURL;

    constructor(accessToken) {
        this.accessToken = accessToken;
        this.baseURL = "https://localhost:3306/";
    }

    UpdateToken(newToken) {
        this.accessToken = newToken;
    }

    async GetReportsOfUser(id, pageNumber = 1, pageSize = 10) {
        return await axios.get(this.baseURL + 'api/v1/Report/reports/' + id, {
            params: {
                pageNumber,
                pageSize
            },
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + this.accessToken
            }
        }).catch(function (error) {
            return error
        });
    }

    async GetReportById(id) {
        return await axios.get(this.baseURL + 'api/v1/Report/' + id, {
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + this.accessToken
            }
        }).catch(function (error) {
            return error
        });
    }

    async DeleteReport(id) {
        return await axios.delete(this.baseURL + 'api/v1/Report/' + id, {
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + this.accessToken
            }
        }).catch(function (error) {
            return error
        })
    }

    async CreateReport(name, description, userId) {
        return await axios.post(this.baseURL + 'api/v1/Report/', {
            data: {
                name,
                description,
                userId
            },
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + this.accessToken
            }
        }).catch(function (error) {
            return error
        })
    }

    async UpdateReport(id, name, description) {
        return await axios.put(this.baseURL + 'api/v1/Report/', {
            data: {id, name, description},
            headers: {
                Accept: 'text/plain',
                contentType: 'application/json',
                authorization: 'Bearer ' + this.accessToken
            }
        }).catch(function (error) {
            return error
        })
    }
}