import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "./Navigation.scss"


export const Navigation = () => {
    return (
        <Navbar className='nav' bg="dark" variant="dark bg-gradient justify-content-center">
        <Nav fill  className="flex-column">
            <Nav.Link as={NavLink} to="/messenger/incoming" >Incoming messages</Nav.Link>
            <Nav.Link as={NavLink} to="/messenger/outgoing" >Outgoing messages</Nav.Link>
        </Nav>
        </Navbar>
    );
};

