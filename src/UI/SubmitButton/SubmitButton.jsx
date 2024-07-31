import React from 'react';
import classes from './SubmitButton.module.css'
import SubmitLoader from "../SubmitLoader/SubmitLoader";

const SubmitButton = ({updateReport, isReportUpdating}) => {
    return (
        <button onClick={updateReport} className={classes.button + ' ' + (isReportUpdating && classes.active)}
                type={"submit"}>
            {isReportUpdating
                ?
                <SubmitLoader/>
                :
                <p className={"btnText"}>Submit</p>
            }
        </button>
    );
};

export default SubmitButton;