import React from 'react';
import EditReport from "../EditReport/EditReport";
import SubmitButton from "../SubmitButton/SubmitButton";
import classes from "./EditReportComponent.module.css"

const EditReportComponent = ({name, description, dateLastEdited, setName, setDescription, updateReport}) => {
    return (
        <div className={classes.main_div}>
            <h1 style={{textAlign: "center"}}>Edit Report</h1>
            <EditReport name={name} description={description} setName={setName} setDescription={setDescription}
                        dateLastEdited={dateLastEdited}/>
            <SubmitButton updateReport={async () => await updateReport(name, description)}/>
        </div>
    );
};

export default EditReportComponent;