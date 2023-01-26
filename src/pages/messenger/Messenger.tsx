import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/Store";
import {LOGIN} from "../../components/routing/Routing";
import {Navigate} from 'react-router-dom';
import {Header} from "../../components/header/Header";
import "./Messenger.scss"
import MessengerRouting from "../../components/routing/MessengerRouting";
import SendingMessages from "./sendingMesseges/SendingMessages";
import {Navigation} from "./navigation/Navigation";
import {MyToast} from "../../components/myToast/MyToast";
import {getUsersNamesTC} from "../../store/authReducer";
import {getIncomingMessagesTC, getInMessIntervTC} from "../../store/messagesReducer";
import {NewMessageAlert} from "../../components/newMessageAlert/NewMessageAlert";

export const Messenger = () => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)

    useEffect(()=>{
        dispatch(getUsersNamesTC())
    },[])

    useEffect(()=>{
        dispatch (getIncomingMessagesTC())
        let interval=setInterval(()=>{
            dispatch (getInMessIntervTC())
        },5000)
        return ()=>clearInterval(interval)
    },[])

    if (!isLogin) {
        return <Navigate to={LOGIN}/>
    }
    return (
        <div>
            <NewMessageAlert/>
            <Header/>
            <MyToast/>
            <div className='contentContainer'>
                <div className='menuContainer'>
                    <Navigation/>
                    <SendingMessages/>
                </div>
                <div className='messagesContainer'>
                    <MessengerRouting/>
                </div>
            </div>
        </div>
    );
};

