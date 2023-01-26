import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import {useAppDispatch} from "../../store/Store";
import {logoutTC} from "../../store/authReducer";

export const Header = () => {

    const dispatch = useAppDispatch()
    const username= localStorage.getItem('userName')
    const handleLogoutClick=()=>{
        dispatch(logoutTC())
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark bg-gradient">
            <Container>
                <Navbar.Brand>User Name: '{username}'</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Button onClick={handleLogoutClick} variant="outline-light">LOGOUT</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

