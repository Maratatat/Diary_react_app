import React, {useContext, useRef, useState} from 'react';
import './AuthorizationForm.css'
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../API/AuthService";
import axios from "axios";

const AuthorizationForm = () => {
    const [isRightPanelActive, setRightPanelActive] = useState(false);
    const [registerSpanErrorMessage, setRegisterSpanErrorMessage] = useState("");
    const [loginSpanErrorMessage, setLoginSpanErrorMessage] = useState("");
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [authData, setAuthData] = useState({login: "", password: '', passwordConfirm: ""});
    const registrationFormRef = useRef(null);
    const loginFormRef = useRef(null);
    const auth = async (event, isRegister) => {
        event.preventDefault()
        if (isRegister) {
            const registerResponse = await AuthService.Register(authData.login, authData.password, authData.passwordConfirm);
            if (axios.isAxiosError(registerResponse)) {
                setRegisterSpanErrorMessage(registerResponse.response.data.errorMessage || registerResponse.message)
                return
            }
        }
        const loginResponse = await AuthService.Login(authData.login, authData.password);
        if (axios.isAxiosError(loginResponse)) {
            setLoginSpanErrorMessage(loginResponse.response.data.errorMessage || loginResponse.message)
            return
        }
        setIsAuth(true)
        localStorage.setItem("auth", 'true')
        Object.keys(loginResponse.data.data).forEach((key) => {
            const value = loginResponse.data.data[key];
            localStorage.setItem(key, value);
        });
        navigate('/reports')
    }
    const setCurrentInputsValues = (form) => {
        form.current.querySelectorAll('input').forEach((element) => {
            if (element.placeholder === "Login") {
                authData.login = element.value
            }
            if (element.placeholder === "Password") {
                authData.password = element.value
            }
            if (element.placeholder === "PasswordConfirm") {
                authData.passwordConfirm = element.value
            }
        })
    }

    return (
        <div className="body">
            <div className={"container " + (isRightPanelActive && "right-panel-active")} id="container">
                <div className="form-container sign-up-container">
                    <form ref={registrationFormRef} onSubmit={(e) => auth(e, true)}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Login"
                               onChange={(e) => setAuthData({...authData, login: e.target.value})}/>
                        <input type="password" placeholder="Password"
                               onChange={(e) => setAuthData({...authData, password: e.target.value})}/>
                        <input type="password" placeholder="Password confirm"
                               onChange={(e) => setAuthData({...authData, passwordConfirm: e.target.value})}/>
                        <span className="errorSpan">{registerSpanErrorMessage}</span>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form ref={loginFormRef} onSubmit={(e) => auth(e, false)}>
                        <h1>Sign in</h1>

                        <input type="text" placeholder="Login"
                               onChange={(e) => setAuthData({...authData, login: e.target.value})}/>
                        <input type="password" placeholder="Password"
                               onChange={(e) => setAuthData({...authData, password: e.target.value})}/>
                        <span className="errorSpan">{loginSpanErrorMessage}</span>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => {
                                setRightPanelActive(false);
                                setCurrentInputsValues(loginFormRef)
                            }}>Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={(event) => {
                                setRightPanelActive(true);
                                setCurrentInputsValues(registrationFormRef)
                            }}>Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AuthorizationForm;