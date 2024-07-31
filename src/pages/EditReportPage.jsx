import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../Hooks/useFetching";
import {AuthContext, ReportServiceContext} from "../context";
import EditReportComponent from "../UI/EditReportComponent/EditReportComponent";
import {CheckIsError} from "../Utils/CheckIsError";

const EditReportPage = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const reportService = useContext(ReportServiceContext);
    const [fetchReport, isReportLoading, reportError] = useFetching(async () => {
        const response = await reportService.GetReportById(params.id, name, description)
        await CheckIsError(response, setIsAuth, navigate, fetchReport, () => {
            setName(response.data.data.name);
            setDescription(response.data.data.description)
            setDateLastEdited(response.data.data.dateLastEdited)
        }, reportService)
    })
    const [updateReport, isReportUpdating] = useFetching(async () => {
        const response = await reportService.UpdateReport(params.id, name, description)
        await CheckIsError(response, setIsAuth, navigate, updateReport, () => {
            alert("Successfully updated report.")
            navigate("/reports")
        }, name, description)
    })
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dateLastEdited, setDateLastEdited] = useState("")


    useEffect(() => {
        fetchReport()
    }, []);

    useEffect(() => {
        if (reportError) {
            alert(reportError)
            navigate("/reports")
        }
    }, [reportError])

    return (
        <EditReportComponent name={name} description={description} setName={setName} setDescription={setDescription}
                             dateLastEdited={dateLastEdited} updateReport={updateReport}
                             isReportLoading={isReportLoading} isReportUpdating={isReportUpdating}/>
    );
};

export default EditReportPage;