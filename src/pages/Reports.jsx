import React, {useContext, useEffect, useRef, useState} from 'react';
import {useFetching} from "../Hooks/useFetching";
import {ReportService} from "../API/ReportService";
import {UpdateTokens} from "../API/UpdateTokens";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import ReportsWithSearchAndCreate from "../UI/ReportsWithSearchAndCreate/ReportsWithSearchAndCreate";
import {useSearchedReports} from "../Hooks/UseSearchedReports";
import {useObserver} from "../Hooks/UseObserver";
import Loader from "../UI/Loader/Loader";

const Reports = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [reports, setReports] = React.useState([]);
    const [query, setQuery] = useState('')
    const searchedReports = useSearchedReports(reports, query)
    const accessToken = localStorage.getItem("accessToken");
    const reportService = new ReportService(accessToken);
    const [fetchReports, isReportsLoading, reportsError] = useFetching(async (pageNumber, pageSize) => {
        await getReports(pageNumber, pageSize)
    })
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(0);
    const lastElement = useRef(null)

    useEffect(() => {
        fetchReports(pageNumber, pageSize)
    }, [pageNumber, pageSize])

    useObserver(lastElement, pageNumber < Math.ceil(totalPages / pageSize), isReportsLoading, () => setPageNumber(pageNumber + 1))
    
    const getReports = async (pageNumber, pageSize) => {
        const userId = localStorage.getItem("userId");
        const response = await reportService.GetReportsOfUser(userId, pageNumber, pageSize)
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, fetchReports, reportService, pageNumber, pageSize)
        } else {
            setReports([...reports, ...response.data.data])
            setTotalPages(response.data.totalCount)
        }

    }

    const deleteReport = async (id) => {
        const response = await reportService.DeleteReport(id);
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, deleteReport, reportService, id)
        } else {
            setReports(reports.filter(report => report.id !== id))
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Your reports</h1>
            {reportsError && <h2 style={{textAlign: 'center'}}>An error occurred: {reportsError}</h2>}
            <ReportsWithSearchAndCreate isReportsLoading={isReportsLoading} reports={searchedReports} query={query}
                                        setQuery={setQuery} reportService={reportService} deleteReport={deleteReport}/>
            <div ref={lastElement} style={{height: '20px'}}></div>
            {isReportsLoading &&
                <Loader/>}
        </div>
    );
};

export default Reports;