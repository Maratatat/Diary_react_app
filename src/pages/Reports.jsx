import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useFetching} from "../Hooks/useFetching";
import {UpdateTokens} from "../API/UpdateTokens";
import { useNavigate} from "react-router-dom";
import {AuthContext, ReportServiceContext} from "../context";
import ReportsWithSearchAndCreate from "../UI/ReportsWithSearchAndCreate/ReportsWithSearchAndCreate";
import {useSearchedReports} from "../Hooks/UseSearchedReports";
import {useObserver} from "../Hooks/UseObserver";
import Loader from "../UI/Loader/Loader";
import {useModal} from '@ebay/nice-modal-react';
import ReportInfoModal from "../UI/ReportInfoModal/ReportInfoModal";

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
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, fetchReports, reportService, pageNumber, pageSize)
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
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, deleteReport, reportService, id)
        } else {
            setReports(reports.filter(report => report.id !== id))
        }
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