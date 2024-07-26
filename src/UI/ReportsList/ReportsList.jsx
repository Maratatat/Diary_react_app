import React from 'react';
import classes from "./ReportsList.module.css";
import Report from "../Report/Report";

const ReportsList = ({reports}) => {
    if (!reports.length) {
        return <h1 style={{textAlign: "center"}}>
            No reports to show.
        </h1>
    }

    return (
        <div className={classes.main_div}>
            {
                reports.map(report => <Report report={report}/>)
            }
        </div>
    );
};

export default ReportsList;