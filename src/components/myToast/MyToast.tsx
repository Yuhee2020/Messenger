import React from 'react';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import {useAppDispatch, useAppSelector} from "../../store/Store";
import {ToastContainer} from "react-bootstrap";
import {setSuccessMessage} from "../../store/appReducer";

export function MyToast() {
    const dispatch = useAppDispatch()
    const successMessage = useAppSelector(state => state.app.successMessage)


    const handleClose = () => {
        dispatch(setSuccessMessage(null))
    }

    return (
        <Row>
                <ToastContainer className="p-5" position='bottom-center'>
                    <Toast bg="dark bg-gradient" onClose={handleClose} show={!!successMessage} delay={3000} autohide>
                        <Toast.Body className="text-white">{successMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
        </Row>
    );
}

