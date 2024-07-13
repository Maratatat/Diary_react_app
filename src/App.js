import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import AppRouter from "./Components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
        }
    }, [])
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
  );
}

export default App;
