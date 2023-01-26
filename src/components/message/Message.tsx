import React from 'react';
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {MessageType} from "../../api/app-api";
import "./Message.scss"

type PropsType = {
    message: MessageType
    type: "in" | "out"
}

export const Message = ({message, type}: PropsType) => {
    return (
        <div key={message._id} className='messageContainer'>
            <Card>
                <Card.Header className='messageHeader'>
                    {type === "in"
                        ? <div>From: {message.sender}</div>
                        : <div>To: {message.recipient}</div>
                    }
                    <div className='messageDate'>{message.date}</div>
                </Card.Header>
                <Card.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header as='h6'><h6>Subject: {message.subject}</h6></Accordion.Header>
                            <Accordion.Body>
                                <h6>Message:</h6> {message.message}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </div>
    );
};

