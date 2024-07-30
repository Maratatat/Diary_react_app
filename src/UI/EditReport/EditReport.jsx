import React from 'react';
import classes from './EditReport.module.css'

const EditReport = ({name, setName, description, setDescription, dateLastEdited}) => {
    return (
        <div className={classes.main_div}>
            <textarea value={name} onChange={(e) => setName(e.target.value)}
                      className={classes.name_textarea} placeholder={"Enter report's name"}></textarea>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                      className={classes.description_textarea} placeholder={"Enter report's description"}></textarea>
            <span className={classes.span}>{dateLastEdited}</span>
        </div>
    );
};

export default EditReport;