import React from 'react';
import {Spinner} from "react-bootstrap";
import './BackDrop.scss'

export const BackDrop = () => {
    return (
        <div className='backDrop'>
            <Spinner animation="border" className='spinner'/>
        </div>
    );
};
