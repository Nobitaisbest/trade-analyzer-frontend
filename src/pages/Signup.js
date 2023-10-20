import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doSignup } from "../utils/Auth";
import { onLogon } from "../utils/Utils";
import Layout from "./components/Layout";

const SignupErrorToast = (props) => {
    const msg = props.msg;
    return (
        <>
            {msg.length > 0 && 
            <ToastContainer position="top-end">
            <Toast show="true" onClose={props.onClose} bg="danger">
                <Toast.Header>
                    <strong className="mr-auto">Signup Error!</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{msg}</Toast.Body>
            </Toast>
        </ToastContainer>}
        </>
    )
};

const SignupForm = (props) => {
    return (
        <Form onSubmit={(e) => props.handleSubmit(e)}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter Name" 
                value={props.inputValues.name} onChange={props.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter Username" 
                value={props.inputValues.username} onChange={props.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" 
                value={props.inputValues.email} onChange={props.handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" 
                value={props.inputValues.password} onChange={props.handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
};

const Signup = () => {

    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({name: '', username: '', email: '', password: ''});
    const [signupError, setSignupError] = useState('');

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };

    const closeToast = () => {
        setSignupError('');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        doSignup(inputValues)
            .then((res) => {
                console.log('Signup success response:', res);
                setSignupError('');
                onLogon(res);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error('Signup error:', err);
                setSignupError(err.response?.data || 'An error occurred during signup');
            });
    };
    

    return (
        <Layout>
            <div className='d-flex mt-5 pt-5 justify-content-center'>
                <Row>
                    <Col sm="12">
                        <SignupErrorToast msg={signupError} onClose={closeToast} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header>Sign Up</Card.Header>
                            <Card.Body>
                                <Card.Title>Signup for {process.env.REACT_APP_NAME}</Card.Title>
                                <Row>
                                    <SignupForm 
                                        inputValues={inputValues}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                    />
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
};

export default Signup;
