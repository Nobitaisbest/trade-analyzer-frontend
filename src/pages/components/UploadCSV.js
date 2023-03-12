import React, { useState } from "react";
import { Button, Card, Form, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doUploadCsv } from "../../utils/TradeData";
import { doLogout } from "../../utils/Utils";

const UploadErrorToast = (props) => {
    const msg = props.msg;
    return (
        <>
            {msg.length > 0 && 
            <ToastContainer position="top-end">
            <Toast show="true" onClose={props.onClose} bg="danger" delay={7000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">CSV Upload Error!</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{msg}</Toast.Body>
            </Toast>
        </ToastContainer>}
        </>
    )
};

const UploadSuccessToast = (props) => {
    const msg = props.msg;
    return (
        <>
            {msg.length > 0 && 
            <ToastContainer position="top-end">
            <Toast show="true" onClose={props.onClose} bg="success" delay={7000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">CSV Upload Success!</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{msg}</Toast.Body>
            </Toast>
        </ToastContainer>}
        </>
    )
};

const UploadCsvForm = (props) => {
    return (
        <>
            <Form onSubmit={(e) => props.handleSubmit(e)}>
                <Form.Group controlId="formBasicFile">
                    <Form.Label>Select CSV File</Form.Label>
                    <Form.Control name="file" type="file" 
                    placeholder="Select CSV file" accept=".csv" ref={props.fileRef} />
                </Form.Group>
                <Form.Group controlId="formBasicSkipHeadder">
                    <Form.Check 
                    {...props.inputValues.skipHeadder ? {checked: true} : {checked: false}}
                    name="skipHeadder" onChange={(e) => props.handleInputChange(e)} 
                    type="checkbox" value={props.inputValues.skipHeadder}
                    label="Skip the first row?" />
                </Form.Group>
                <Form.Group controlId="formBasicoverrideSimilarRecords">
                    <Form.Check 
                    {...props.inputValues.overrideSimilarRecords ? {checked: true} : {checked: false}}
                    name="overrideSimilarRecords" onChange={(e) => props.handleInputChange(e)} 
                    type="checkbox" value={props.inputValues.overrideSimilarRecords}
                    label="Replace existing similar records?" />
                </Form.Group>
                {/* <Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group> */}
            </Form>
        </>
    )
};

const UploadCSV = (props) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({skipHeadder: true, overrideSimilarRecords: true});
    const [uploadErrorMsg, setUploadErrorMsg] = useState("");
    const [uploadSuccessMsg, setUploadSuccessMsg] = useState("");

    const closeToast = () => {
        setUploadErrorMsg("");
        setUploadSuccessMsg("");
    };

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: !inputValues[e.target.name]});
    };

    const toggleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    const fileRef = React.createRef();
    const spinnerRef = React.createRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = fileRef.current.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const lines = e.target.result;
            doUploadCsv(lines, inputValues, spinnerRef)
            .then((res) => {
                setUploadSuccessMsg(res);
                props.toggleDoReload();
            }
            ).catch((err) => {
                const errData = err.response?.data;
                setUploadErrorMsg(errData);
                if(err.response.status === 401) {
                    setUploadErrorMsg(errData + " | You will be redirected to login page in 3 seconds");
                    setTimeout(() => {
                        doLogout();
                        navigate("/login");
                    }, 3000);
                }
            })
            .finally(() => {
                toggleShow(e);
            });
        };
        reader.readAsText(file);
    };

    return (
        <>
        <UploadSuccessToast msg={uploadSuccessMsg} onClose={closeToast} />
        <UploadErrorToast msg={uploadErrorMsg} onClose={closeToast} />
            <Button variant="info" onClick={(e) => toggleShow(e)}>
                Upload CSV
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Header>Upload CSV File</Card.Header>
                            <Card.Body>
                                <Card.Title>Select the CSV file containing trade dataset.</Card.Title>
                                <div>
                                    <UploadCsvForm 
                                    inputValues={inputValues}
                                    handleInputChange={handleInputChange}
                                    fileRef={fileRef} handleSubmit={handleSubmit} />
                                </div>
                            </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        <Spinner 
                            style={{display: "none"}}
                            ref={spinnerRef}
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default UploadCSV;