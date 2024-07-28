import axios from "axios";
import {BaseService} from "./BaseService";

export class ReportService extends BaseService {

    constructor() {
        super();
    }

    async GetReportsOfUser(id, pageNumber = 1, pageSize = 10) {
        return await axios.get(this.baseURL + 'api/v1/Report/reports/' + id, {
            params: {
                pageNumber,
                pageSize
            },
            headers: this.baseHeaders
        }).catch(function (error) {
            return error
        });
    }

    async GetReportById(id) {
        return await axios.get(this.baseURL + 'api/v1/Report/' + id, {
            headers: this.baseHeaders
        }).catch(function (error) {
            return error
        });
    }

    async DeleteReport(id) {
        return await axios.delete(this.baseURL + 'api/v1/Report/' + id, {
            headers: this.baseHeaders
        }).catch(function (error) {
            return error
        })
    }

    async CreateReport(name, description, userId) {
        return await axios.post(this.baseURL + 'api/v1/Report/', {
            name: name,
            description: description,
            userId: userId
        }, {
            headers: this.baseHeaders
        })
            .catch(function (error) {
                return error
            })
    }

    async UpdateReport(id, name, description) {
        return await axios.put(this.baseURL + 'api/v1/Report/', {
            id: id,
            name: name,
            description: description,
        }, {
            headers: this.baseHeaders
        }).catch(function (error) {
            return error
        })
    }
}