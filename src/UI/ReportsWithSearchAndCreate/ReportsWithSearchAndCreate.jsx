import React from 'react';
import SearchBox from "../SearchBox/SearchBox";
import CreateButton from "../CreateButton/CreateButton";
import ReportsList from "../ReportsList/ReportsList";
import classes from "./ReportsWithSearchAndCreate.module.css";

const ReportsWithSearchAndCreate = ({reports, query, setQuery}) => {
    return (
        <div>

            <div>
                <div className={classes.search_and_create_div}>
                    <SearchBox query={query} setQuery={setQuery}/>
                    <CreateButton/>
                </div>
                <ReportsList reports={reports}/>
            </div>
        </div>
    );
};

export default ReportsWithSearchAndCreate;