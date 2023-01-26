import React from 'react';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import {useAppSelector} from "../../store/Store";
import {ToastContainer} from "react-bootstrap";

export function NewMessageAlert() {

    const isNewMessage = useAppSelector(state => state.messages.isNewMessage)

    return (
        <Row>
            <ToastContainer className="p-1" position='top-center'>
                <Toast bg="dark bg-gradient" show={isNewMessage} >
                    <Toast.Body className="text-white" style={{textAlign:"center"}}>You have a new message</Toast.Body>
                </Toast>
            </ToastContainer>
        </Row>
    );
}