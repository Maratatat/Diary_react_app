import React from 'react';
import SearchBox from "../SearchBox/SearchBox";
import CreateButton from "../CreateButton/CreateButton";
import ReportsList from "../ReportsList/ReportsList";
import classes from "./ReportsWithSearchAndCreate.module.css";
import LoadAllButton from "../UploadAllButton/LoadAllButton";

const ReportsWithSearchAndCreate = ({
                                        reports,
                                        query,
                                        setQuery,
                                        reportService,
                                        deleteReport,
                                        editReport,
                                        createReport,
                                        loadAllReports
                                    }) => {
    return (
        <div>

            <div>
                <div className={classes.search_and_create_div}>
                    <SearchBox query={query} setQuery={setQuery}/>
                    <CreateButton createReport={createReport}/>
                    <LoadAllButton loadAllReports={loadAllReports}/>
                </div>
                <ReportsList reports={reports} reportService={reportService} deleteReport={deleteReport}
                             editReport={editReport}/>
            </div>
        </div>
    );
};

export default ReportsWithSearchAndCreate;