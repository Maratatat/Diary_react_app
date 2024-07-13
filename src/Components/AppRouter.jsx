import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../Routes";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    return (
        <div>
            {
                isAuth
                    ?
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route path={route.path} Component={route.component} key={route.path}/>
                        )}
                    </Routes>
                    :
                    <Routes>
                        {publicRoutes.map(route =>
                            <Route path={route.path} Component={route.component} key={route.path}/>
                        )}
                    </Routes>
            }
        </div>
    );
};

export default AppRouter;