import React from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../store/Store";
import {sendMessageTC} from "../../../store/messagesReducer";
import Card from 'react-bootstrap/Card'

export const SendingMessages = () => {
    const dispatch = useAppDispatch()
    const usersNames = useAppSelector(state => state.auth.usersNames)

    const formik = useFormik({
        initialValues: {
            recipient: "",
            subject: "",
            message: "",
        },
        validate: (values: FormikValuesType) => {
            const errors: FormikErrorsType = {};
            if (!values.recipient) {
                errors.recipient = 'Recipient required';
            }
            if (!values.subject) {
                errors.subject = 'Subject required';
            }
            if (!values.recipient) {
                errors.message = 'Message required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(sendMessageTC(values))
            formik.resetForm()
        },
    });

    return (
        <Card style={{padding:20}}>
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Select
                    {...formik.getFieldProps('recipient')}
                    isInvalid={formik.touched.recipient && !!formik.errors.recipient}
                >
                    <option>Select recipient</option>
                    {usersNames.map((un) => {
                        return <option key={un} value={un}>{un}</option>
                    })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.recipient}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter message subject</Form.Label>
                <Form.Control type="text"
                              isInvalid={formik.touched.subject && !!formik.errors.subject}
                              {...formik.getFieldProps('subject')}
                              placeholder="subject"/>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.subject}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter text message</Form.Label>
                <Form.Control
                    isInvalid={formik.touched.message && !!formik.errors.message}
                    {...formik.getFieldProps('message')}
                    as="textarea" rows={3}/>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="dark bg-gradient">Send message</Button>
        </Form>
        </Card>
    );
};

export default SendingMessages;

export type FormikValuesType={
    recipient: string
    subject: string
    message: string
}

type FormikErrorsType={
    recipient?: string
    subject?: string
    message?: string
}

