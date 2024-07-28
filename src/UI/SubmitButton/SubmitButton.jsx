import React from 'react';
import classes from './SubmitButton.module.css'

const SubmitButton = ({updateReport}) => {
    return (
        <button onClick={updateReport} className={classes.button} type={"submit"}>
            <p className="btnText">Submit</p>
        </button>
    );
};

export default SubmitButton;