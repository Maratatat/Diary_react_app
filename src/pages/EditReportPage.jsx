import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../Hooks/useFetching";
import {AuthContext, ReportServiceContext} from "../context";
import {UpdateTokens} from "../API/UpdateTokens";
import EditReportComponent from "../UI/EditReportComponent/EditReportComponent";

const EditReportPage = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const reportService = useContext(ReportServiceContext);
    const [fetchReport, isReportLoading, reportError] = useFetching(async () => {
        await getReport()
    })
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dateLastEdited, setDateLastEdited] = useState("")

    const getReport = async () => {
        const response = await reportService.GetReportById(params.id, name, description)
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, getReport, reportService, params.id)
        } else {
            setName(response.data.data.name);
            setDescription(response.data.data.description)
            setDateLastEdited(response.data.data.dateLastEdited)
        }
    }

    const updateReport = async (name, description) => {
        const response = await reportService.UpdateReport(params.id, name, description)
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, updateReport, reportService, name, description)
        } else {
            alert("Successfully updated report.")
            navigate("/reports")
        }
    }

    useEffect(() => {
        fetchReport()
    }, []);

    return (
        <EditReportComponent name={name} description={description} setName={setName} setDescription={setDescription}
                             dateLastEdited={dateLastEdited} updateReport={updateReport}
                             isReportLoading={isReportLoading} reportError={reportError}/>
    );
};

export default EditReportPage;