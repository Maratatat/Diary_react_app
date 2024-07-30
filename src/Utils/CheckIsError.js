import axios from "axios";
import {UpdateTokens} from "./UpdateTokens";

export const CheckIsError = async (response, setIsAuth, navigate, updateCallback, nonErrorCallback, reportService, ...updateCallbackArgs) => {
    if (axios.isAxiosError(response)) {
        if (response.response && response.response.status === 401) {
            await UpdateTokens(setIsAuth, navigate, updateCallback, reportService, ...updateCallbackArgs);
        } else {
            if (response.response) {
                alert(response.response.data.errorMessage || response.message)
            } else {
                alert(response.message)
            }
            navigate("/reports")
        }
    } else {
        nonErrorCallback()
    }
}