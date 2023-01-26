import React from "react";
import {Route, Routes} from "react-router-dom";
import {Login} from "../../pages/login/Login";
import {Messenger} from "../../pages/messenger/Messenger";


export const LOGIN = '/'
export const MESSENGER = '/messenger/*'



export const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={MESSENGER} element={<Messenger/>}/>
            </Routes>
        </div>
    )
}
