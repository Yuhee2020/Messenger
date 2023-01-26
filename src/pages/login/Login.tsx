import React from 'react';
import {Button,} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './Login.scss'
import {useFormik} from "formik";
import {loginTC} from "../../store/authReducer";
import {useAppDispatch, useAppSelector} from "../../store/Store";
import {Navigate} from 'react-router-dom';

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLogin=useAppSelector(state => state.auth.isLogin)

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validate: (values: FormikValuesType) => {
            const errors: FormikErrorType = {};
            if (!values.username) {
                errors.username = 'Login required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });
    if (isLogin) {
        return <Navigate to={'messenger/incoming'}/>
    }
    return (
        <div className="loginContainer">
            <Card className="loginBox">
                <Card.Body>
                    <Card.Title>Login please</Card.Title>
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                isInvalid={formik.touched.username && !!formik.errors.username}
                                placeholder="login"
                                {...formik.getFieldProps('username')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="dark">LOGIN</Button>
                    </form>
                </Card.Body>
            </Card>
        </div>

    );
};



type FormikErrorType = {
    username?: string
}
type FormikValuesType = {
    username: string
}