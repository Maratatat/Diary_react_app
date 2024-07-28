import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import AppRouter from "./Components/AppRouter";
import {AuthContext, ReportServiceContext} from "./context";
import {ReportService} from "./API/ReportService";

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
        <ReportServiceContext.Provider value={reportService}>
            <AuthContext.Provider value={{isAuth, setIsAuth}}>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </ReportServiceContext.Provider>
  );
}

export default App;
