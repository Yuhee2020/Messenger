import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/Store";
import {Message} from "../../../components/message/Message";
import {setIsNewMessage} from "../../../store/messagesReducer";

export const Incoming = () => {

    const dispatch = useAppDispatch()
    const messages=useAppSelector(state => state.messages.incomingMess)
    const handleMessagesClick=()=>{
        dispatch(setIsNewMessage(false))
    }

    if(!messages.length){
        return <div>No messages</div>
    }
    return (
        <div onClick={handleMessagesClick}>
            {messages.map(mess=>{
                return <Message key={mess._id} message={mess} type="in"/>
            })}
        </div>
    );
};

