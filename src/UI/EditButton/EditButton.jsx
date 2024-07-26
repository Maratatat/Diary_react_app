import React from 'react';
import classes from './EditButton.module.css'

const DeleteButton = () => {
    return (
        <button className={classes.button + " noselect"}><span className={classes.text}>Edit</span><span
            className={classes.icon}><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            width="24px" height="24px">  <path
            d="M19.17188,2c-0.72375,0 -1.4475,0.27562 -2,0.82813l-1.17187,1.17188l4,4l1.17188,-1.17187c1.104,-1.104 1.104,-2.895 0,-4c-0.5525,-0.5525 -1.27625,-0.82812 -2,-0.82812zM14.5,5.5l-11.5,11.5v4h4l11.5,-11.5z"></path></svg></span>
        </button>
    );
};

export default DeleteButton;