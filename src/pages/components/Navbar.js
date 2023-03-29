import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { doLogout, isLoggedIn } from "../../utils/Utils";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    useEffect(() => {
        async function checkLoggedIn() {
            const loginStatus = await isLoggedIn();
            setLoggedIn(loginStatus);

            if (!loginStatus && location.pathname !== '/login' 
                && location.pathname !== '/signup' 
                && location.pathname !== '/') {
                navigate('/login');
            }
        }

        checkLoggedIn();
    }, [loggedIn, isLoggedIn]);

    const handleLogout = (e) => {
        e.preventDefault();
        doLogout();
        navigate('/login');
    };

    return(
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Top Fin Sup</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <LinkContainer to="/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {!loggedIn && 
                        <Nav>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signup">
                                <Nav.Link>Signup</Nav.Link>
                            </LinkContainer>
                        </Nav>}
                    {loggedIn &&     
                        <Nav>
                            <Button onClick={(e) => handleLogout(e)} variant="outline-warning">Logout</Button>
                        </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    )
};

export default NavbarComponent;


// const a = () => {
//     return (
//         <Navbar bg="light" expand="lg">
//         <Container fluid>
//             <LinkContainer to='/'>
//                 <Nav.Brand href="/">TopFinSup</Nav.Brand>
//             </LinkContainer>
            
//             <Nav.Toggle aria-controls="navbarScroll" />
//             <Nav.Collapse id="navbarScroll">
//                 <Nav
//                     className="me-auto my-2 my-lg-0"
//                     style={{ maxHeight: '100px' }}
//                     navbarScroll
//                 >
//                     <LinkContainer to='/home'>
//                         <Nav.Link href="/home">Home</Nav.Link>
//                     </LinkContainer>
//                     <LinkContainer to='/login'>
//                         <Nav.Link href="/login">Login</Nav.Link>
//                     </LinkContainer>
//                     {/* <Link to='/'>Home</Link> */}
//                 </Nav>
//             </Nav.Collapse>
//         </Container>
//         </Navbar>
//     )
// };

// {/* <Nav bg="light" expand="lg">
//                 <ul>
//                     <li>
//                         <Link to='/'>Home</Link>
//                     </li>
//                     <li>
//                         <Link to='/login'>Login</Link>
//                     </li>
//                 </ul>
//             </Nav> */}

//             {/* <Outlet /> */}