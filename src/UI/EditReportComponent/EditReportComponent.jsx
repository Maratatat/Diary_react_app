import React from 'react';
import EditReport from "../EditReport/EditReport";
import SubmitButton from "../SubmitButton/SubmitButton";
import classes from "./EditReportComponent.module.css"
import Loader from "../Loader/Loader";

const EditReportComponent = ({
                                 name,
                                 description,
                                 dateLastEdited,
                                 setName,
                                 setDescription,
                                 updateReport,
                                 isReportLoading
                             }) => {
    return (
        <div style={{padding: '40px 20px'}}>
            {isReportLoading && <Loader/>}
            <div className={classes.main_div}>
                <h1 style={{textAlign: "center"}}>Edit Report</h1>
                <EditReport name={name} description={description} setName={setName} setDescription={setDescription}
                            dateLastEdited={dateLastEdited}/>
                <SubmitButton updateReport={async () => await updateReport(name, description)}/>
            </div>
        </div>
    );
};

export default EditReportComponent;