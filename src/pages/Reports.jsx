import React from 'react';
import {useFetching} from "../Hooks/useFetching";
import {ReportService} from "../API/ReportService";
import Loader from "../UI/Loader/Loader";

const Reports = () => {
    const [reports, setReports] = React.useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const reportService = new ReportService(accessToken);
    const [fetchedReports, isReportsLoading, reportsError] = useFetching(async () => {
        const userId = localStorage.getItem("userId");
        const response = await reportService.GetReportsOfUser(userId, pageNumber, pageSize)
        setReports([...reports, response.data])
    })
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);

    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '10px'}}>Your reports</h1>
            {isReportsLoading ?
                <Loader/> :
                reports//must be nice report component
            }
        </div>
    );
};

export default Reports;