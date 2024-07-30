import React from 'react';
import './CreateButton.css'

const CreateButton = ({createReport}) => {
    return (
        <button onClick={createReport} className="button-84">Create report</button>
    );
};

export default CreateButton;