import React, {useEffect} from 'react';

import './App.scss';

import {useAppDispatch, useAppSelector} from "./store/Store";
import {setIsLogin} from "./store/authReducer";
import {BackDrop} from "./components/backDrop/BackDrop";
import {Routing} from "./components/routing/Routing";

function App() {

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.app.isLoading)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setIsLogin(true))
        }
    })
    return (
        <div>
            {isLoading && <BackDrop/>}
            <Routing/>
        </div>
    );
}

export default App;
