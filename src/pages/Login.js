import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Toast, ToastContainer, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../utils/Auth";
import { onLogon } from "../utils/Utils";
import Layout from "./components/Layout";

const LoginErrorToast = (props) => {
    const msg = props.msg;
    return (
        <>
            {msg.length > 0 && 
            <ToastContainer position="top-end">
            <Toast show="true" onClose={props.onClose} bg="danger">
                <Toast.Header>
                    <strong className="mr-auto">Login Error!</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{msg}</Toast.Body>
            </Toast>
        </ToastContainer>}
        </>
    )
};

const LoginForm = (props) => {
    return (
        <Form onSubmit={(e) => props.handleSubmit(e)}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter Username" 
                value={props.inputValues.username} onChange={props.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" 
                value={props.inputValues.password} onChange={props.handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit">
                <Spinner 
                            style={{display: "none"}}
                            ref={props.spinnerRef}
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    Login
                </Button>
            </Form.Group>
        </Form>
    )
};

const Login = () => {

    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({username: '', password: ''});
    const [loginError, setLoginError] = useState('');

    const spinnerRef = React.createRef();

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };

    const closeToast = () => {
        setLoginError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin(inputValues, spinnerRef)
            .then((res) => {
                setLoginError('');
                onLogon(res).then((r) => navigate('/dashboard'));
            })
            .catch((err) => {
              const errData = err.response?.data;
                if(err.response && err.response.status === 400) {
                    setLoginError(errData);
                } else if (err.response && err.response.status === 401) {
                  setLoginError(errData.error);
                } else {
                  setLoginError('Something went wrong! ' + JSON.stringify(errData));
                }
            });
    };

    return (
        <Layout>
            <div className='d-flex mt-5 pt-5 justify-content-center'>
                <Row>
                    <Col sm="12">
                        <LoginErrorToast msg={loginError} onClose={closeToast} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header>Login</Card.Header>
                            <Card.Body>
                                <Card.Title>Login to {process.env.REACT_APP_NAME}</Card.Title>
                                <div>
                                    <LoginForm 
                                        spinnerRef={spinnerRef}
                                        inputValues={inputValues}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
};

export default Login;
