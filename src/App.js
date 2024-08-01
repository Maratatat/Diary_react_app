import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import {AuthContext, ReportServiceContext} from "./context";
import {ReportService} from "./API/ReportService";
import NiceModal from '@ebay/nice-modal-react';
import Navbar from "./Navbar/Navbar";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const reportService = new ReportService(accessToken)


    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
        }
    }, [])
    return (
        <BrowserRouter>
            <ReportServiceContext.Provider value={reportService}>
                <AuthContext.Provider value={{isAuth, setIsAuth}}>
                    <NiceModal.Provider>
                        <Navbar/>
                        <AppRouter/>
                    </NiceModal.Provider>
                </AuthContext.Provider>
            </ReportServiceContext.Provider>
        </BrowserRouter>
    );
}

export default App;
