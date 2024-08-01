import React, {useContext} from 'react';
import classes from './Navbar.module.css';
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate('/auth')
    }

    return (
        <nav className={classes.navbar} style={{justifyContent: !isAuth && 'center'}}>
            {isAuth &&
                <div className={classes.logout_div}>
                    <a className={classes.button} onClick={logout}>
                        <svg className={classes.svg} width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                                stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#fff" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className={classes.logout}>LOGOUT</div>
                    </a>

                </div>
            }
            <nav className={classes.navigation}>
                <li onClick={() => navigate('/about')}>About</li>
                {
                    isAuth
                        ?
                        <li onClick={() => navigate('/reports')}>Reports</li>
                        :
                        <li onClick={() => navigate('/auth')}>Authorize</li>
                }
            </nav>
        </nav>
    );
};

export default Navbar;