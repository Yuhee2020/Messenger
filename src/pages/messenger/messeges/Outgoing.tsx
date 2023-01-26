import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/Store";
import {getOutgoingMessagesTC} from "../../../store/messagesReducer";
import {Message} from "../../../components/message/Message";


export const Outgoing = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages.outgoingMess)

    useEffect(() => {
        dispatch(getOutgoingMessagesTC())
    }, [])

    if (!messages.length) {
        return <div>No messages</div>
    }

    return (
        <div>
            {messages.map(mess => {
                return <Message key={mess._id} message={mess} type="out"/>
            })}
        </div>
    );
};

