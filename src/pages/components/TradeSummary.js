import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, FormSelect, ListGroup, Modal, Row } from "react-bootstrap";
import { fetchSummary } from "../../utils/TradeData";

const TradeSummaryReport = ({summary}) => {
    return (
        <>
            Trade Summary of {summary.executedCurrency} with {summary.baseCurrency.join(", and ")}<br />
            <ListGroup>
                <ListGroup.Item>
                    <Alert variant="warning">
                        <p>Total sales cost <b>{summary.totalSalesCost} USD</b> </p>
                        <hr />
                        <p className="mb-0">By selling <b>{summary.totalSalesQty} {summary.executedCurrency}</b></p>
                    </Alert>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Alert variant="warning">
                        <p>Total purchase cost <b>{summary.totalPurchaseCost} USD</b> </p>
                        <hr />
                        <p className="mb-0">By buying <b>{summary.totalPurchaseQty} {summary.executedCurrency}</b></p>
                    </Alert>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Alert variant="warning">
                            <p>
                                Remaining <b>{summary.remainingQty} {summary.executedCurrency}</b> 
                                <br /> at a {summary.remainingCost < 0 ? "profit" : "cost"} of
                                <b> { summary.remainingCost < 0 ? summary.remainingCost * -1 : summary.remainingCost}</b>
                            </p>
                            {summary.remainingCost >= 0 &&
                            <>
                                <hr />
                                <h5>Must sell for at least <b>{summary.mustSellPrice}</b></h5>
                            </>
                            }
                    </Alert>
                </ListGroup.Item>
                
            </ListGroup>
        </>
    )
};

const TradeSummaryForm = (props) => {
    const [inputValues, setInputValues] = useState({executedCurrency: "-1"});
    const [summary, setSummary] = useState({});

    const usdPeggedSymbols = ["USDT", "BUSD"];
    const nonPeggedSymbols = props.currencySymbols.filter((symbol) => !usdPeggedSymbols.includes(symbol));

    const handleInputChange = (e) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        async function fetchTradeSummary() {
            const summaryRequest = {
                executedCurrency: inputValues.executedCurrency,
                baseCurrencies: usdPeggedSymbols
            };

            fetchSummary(summaryRequest).then((response) => {
                setSummary(response);
            });
        };

        if(inputValues.executedCurrency !== "-1") {
            fetchTradeSummary();
        }
    }, [inputValues]);

    return (
        <>
            <Container>
            <Row>
                <Col sm="12">
                    <Form.Group controlId="formBasicExecutedCurrency">
                        <Form.Label>Executed Currency</Form.Label>
                        <FormSelect name="executedCurrency" defaultValue={"-1"} onChange={(e) => handleInputChange(e)} >
                            <option value="-1" disabled>Select Executed Currency</option>
                            {nonPeggedSymbols.map((symbol, index) => {
                                    return <option key={index} value={symbol}>{symbol}</option>
                                })
                            }
                        </FormSelect>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    {Object.keys(summary).length > 0 && <TradeSummaryReport summary={summary} />}
                </Col>
            </Row>

            </Container>

        </>
    )
};

const TradeSummary = (props) => {
    const [show, setShow] = useState(false);

    const toggleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <>
            <Button variant="primary" className="mx-1" onClick={toggleShow}>Trade Summary</Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Trade Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Header>View Trade Summary</Card.Header>
                        <Card.Body>
                            <Card.Title>Trade Summary</Card.Title>
                            <>
                                <TradeSummaryForm currencySymbols={props.currencySymbols} />
                            </>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default TradeSummary;
