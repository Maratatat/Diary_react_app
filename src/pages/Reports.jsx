import React, {useContext, useEffect} from 'react';
import {useFetching} from "../Hooks/useFetching";
import {ReportService} from "../API/ReportService";
import Loader from "../UI/Loader/Loader";
import {UpdateTokens} from "../API/UpdateTokens";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const Reports = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [reports, setReports] = React.useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const reportService = new ReportService(accessToken);
    const [fetchReports, isReportsLoading, reportsError] = useFetching(async (pageNumber, pageSize) => {
        await getReports(pageNumber, pageSize)
    })
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);


    useEffect(() => {
        fetchReports(pageNumber, pageSize)
    }, [])

    const getReports = async (pageNumber, pageSize) => {
        const userId = localStorage.getItem("userId");
        const response = await reportService.GetReportsOfUser(userId, pageNumber, pageSize)
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, fetchReports, reportService, pageNumber, pageSize)
        } else {
            setReports([...reports, ...response.data.data])
        }

    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Your reports</h1>
            {reportsError && <h2 style={{textAlign: 'center'}}>An error occurred: {reportsError}</h2>}
            {isReportsLoading ?
                <Loader/> :
                reports.map(report =>
                    <div key={report.id}>
                        <h3>{report.name}</h3>
                        <p>{report.description}</p>
                        <strong>Created at: {report.dateCreated}</strong>
                        <br/>
                        <strong>Id: {report.id}</strong>
                    </div>
                )}
        </div>
    );
};

export default Reports;