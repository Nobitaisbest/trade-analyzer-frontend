import { Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "./Navbar";

const Layout = (props) => {

    return (
        <>
        <NavbarComponent />
        <Container>
        <div className="d-flex mt-1 justify-content-center">
            <Row>
                <Col sm="12">
                    {props.children}
                </Col>
            </Row>
        </div>
        </Container>
        </>
        
    )
};

export default Layout;
