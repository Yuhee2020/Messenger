import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Incoming} from "../../pages/messenger/messeges/Incoming";
import {Outgoing} from "../../pages/messenger/messeges/Outgoing";

export const INCOMING = 'incoming'
export const OUTGOING = 'outgoing'

const MessengerRouting = () => {
    return (
        <div>
            <div>
                <Routes>
                        <Route path={INCOMING} element={<Incoming/>}/>
                        <Route path={OUTGOING} element={<Outgoing/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default MessengerRouting;