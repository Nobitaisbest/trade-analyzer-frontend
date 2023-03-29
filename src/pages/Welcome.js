import { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { isLoggedIn } from '../utils/Utils';
import Layout from './components/Layout';

const AuthButtons = () => {
    return (
        <>
            <Col sm="6">
                <LinkContainer to='login'>
                    <Button variant='primary' size='lg'>Login</Button>
                </LinkContainer>
            </Col>
            <Col sm="6">
                <LinkContainer to='signup'>
                    <Button variant='primary' size='lg'>Signup</Button>
                </LinkContainer>
            </Col>                              
        </>
    )
};

const DashboardButton = () => {
    return (
        <Col sm="12">
            <LinkContainer to='dashboard'>
                <Button variant='primary' size='lg'>Dashboard</Button>
            </LinkContainer>
        </Col>
    )
};

const Welcome = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    useEffect(() => {
        async function checkLoggedIn() {
            const loginStatus = await isLoggedIn();
            setLoggedIn(loginStatus);
        }

        checkLoggedIn();
    }, [loggedIn, isLoggedIn]);

    return (
        <Layout>
            <div className='d-flex mt-5 pt-5 justify-content-center'>
                <Row>
                    <Col sm="12">
                        <h1 className='text-dark'>Welcome to { process.env.REACT_APP_NAME }</h1>
                    </Col>
                </Row>
            </div>
            <div className='d-flex mt-1 justify-content-center'>
                <Row>
                    <Col sm="12">
                        <p className='text-white text-lg' >Analyze your trades</p>
                    </Col>
                </Row>
            </div>
            <div className='d-flex mt-3 justify-content-center'>
                <Row>
                    {loggedIn && <DashboardButton />}
                    {!loggedIn && <AuthButtons />}
                </Row>
            </div>
        </Layout>
    )
};

export default Welcome;
