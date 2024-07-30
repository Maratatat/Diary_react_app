import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useFetching} from "../Hooks/useFetching";
import {UpdateTokens} from "../Utils/UpdateTokens";
import {useNavigate} from "react-router-dom";
import {AuthContext, ReportServiceContext} from "../context";
import ReportsWithSearchAndCreate from "../UI/ReportsWithSearchAndCreate/ReportsWithSearchAndCreate";
import {useSearchedReports} from "../Hooks/UseSearchedReports";
import {useObserver} from "../Hooks/UseObserver";
import Loader from "../UI/Loader/Loader";
import {useModal} from '@ebay/nice-modal-react';
import ReportInfoModal from "../UI/ReportInfoModal/ReportInfoModal";
import axios from "axios";
import {CheckIsError} from "../Utils/CheckIsError";

const Reports = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [reports, setReports] = React.useState([]);
    const [query, setQuery] = useState('')
    const searchedReports = useSearchedReports(reports, query)
    const reportService = useContext(ReportServiceContext)
    const [fetchReports, isReportsLoading, reportsError] = useFetching(async (pageNumber, pageSize) => {
        const userId = localStorage.getItem("userId");
        const response = await reportService.GetReportsOfUser(userId, pageNumber, pageSize)
        if (axios.isAxiosError(response)) {
            if (response.response) {
                if (response.response.status === 401) {
                    await UpdateTokens(setIsAuth, navigate, fetchReports, reportService, pageNumber, pageSize)
                } else if (response.response.status === 400) {
                    setReports([])
                    setTotalPages(0)
                } else {
                    throw new Error(response.response.data.errorMessage || response.message);
                }
            } else {
                throw new Error(response.message)
            }
        } else {
            setReports([...reports, ...response.data.data])
            setTotalPages(response.data.totalCount)
        }
    })
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(0);
    const lastElement = useRef(null)
    const reportModal = useModal(ReportInfoModal);

    useEffect(() => {
        fetchReports(pageNumber, pageSize)
    }, [pageNumber, pageSize])

    useObserver(lastElement, pageNumber < Math.ceil(totalPages / pageSize), isReportsLoading, () => setPageNumber(pageNumber + 1))
    
    const deleteReport = async (id) => {
        const response = await reportService.DeleteReport(id);
        await CheckIsError(response, setIsAuth, navigate, deleteReport, () => setReports(reports.filter(report => report.id !== id)), reportService, id)
    }
    const editReport = (id) => {
        navigate("/reports/" + id)
    }

    //Modal
    const handleNewReport = useCallback(() => {
        reportModal.show().then( (newReport) => {
            setReports([newReport, ...reports]);
        });
    }, [reportModal, reports]);
    //Modal


    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Your reports</h1>
            {reportsError && <h2 style={{textAlign: 'center'}}>An error occurred: {reportsError}</h2>}
            <ReportsWithSearchAndCreate reports={searchedReports} query={query}
                                        setQuery={setQuery} reportService={reportService} deleteReport={deleteReport}
                                        editReport={editReport} createReport={handleNewReport}/>
            <div ref={lastElement} style={{height: '20px'}}></div>
            {isReportsLoading &&
                <Loader/>}
        </div>
    );
};

export default Reports;