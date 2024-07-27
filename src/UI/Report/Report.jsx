import React from 'react';
import classes from './Report.module.css'
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

const Report = ({report}) => {
    return (
        <div className={classes.main_div}>
            <div className={classes.upper_data_div}>
                <h3>{report.name}</h3>
                <div className={classes.button_div}>
                    <EditButton/>
                    <DeleteButton/>
                </div>
            </div>
            <p>{report.description}</p>
            <span className={classes.span}>{report.dateLastEdited}</span>
        </div>
    );
};

export default Report;