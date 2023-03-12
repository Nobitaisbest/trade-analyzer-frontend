import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";

import { isLoggedIn } from "../utils/Utils";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UploadCSV from "./components/UploadCSV";
import ViewData from "./components/ViewData";
import { fetchAllTradeData, removeAll, removeItem } from "../utils/TradeData";
import TradeSummary from "./components/TradeSummary";

const DashboardContent = () => {
    const [dataset, setDataset] = useState([]);
    const [doReload, setDoReload] = useState(false);
    const [currencySymbols, setCurrencySymbols] = useState([]);

    const toggleDoReload = () => {
        setDoReload(!doReload);
    };

    const handleDelete = (id) => {
        removeItem(id).then(() => {
            toggleDoReload();
        });
    };

    const handleDeleteAll = () => {
        removeAll().then(() => {
            toggleDoReload();
        });
    };

    const updateCurrencySymbols = (dataset) => {
        const executedSymbols = dataset.map((item) => item.executedCurrency);
        const tradingTotalSymbols = dataset.map((item) => item.tradingTotalCurrency);
        const uniqueSymbols = [...new Set(executedSymbols.concat(tradingTotalSymbols))];
        if(JSON.stringify(uniqueSymbols) !== JSON.stringify(currencySymbols)) {
            setCurrencySymbols(uniqueSymbols);
        }
    };

    useEffect(() => {
        async function fetchDataset() {
            const updatedDataset = await fetchAllTradeData();
            if (JSON.stringify(updatedDataset) !== JSON.stringify(dataset)) {
                setDataset(updatedDataset);
                updateCurrencySymbols(updatedDataset);
            }
        }
        
        fetchDataset();
    }, [doReload]);


    return (
        <Layout>
            <div className='d-flex mt-5 pt-5 justify-content-center'>
                <h1 className='text-dark'>Dashboard</h1>
            </div>
            <Container>
                <Row>
                    <Col sm="12">
                        <Row>
                            <Col sm="12">
                                <Container className="mb-1">
                                    <UploadCSV toggleDoReload={toggleDoReload} />
                                    { dataset.length > 0 
                                    && <TradeSummary 
                                    dataset={dataset} currencySymbols={currencySymbols} /> }
                                </Container>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                            <Container>
                                <ViewData dataset={dataset} handleDelete={handleDelete} 
                                currencySymbols={currencySymbols} handleDeleteAll={handleDeleteAll} 
                                toggleDoReload={toggleDoReload} />
                            </Container>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        </Layout>
    )  
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLoggedIn() {
            const loginStatus = await isLoggedIn();
            if (!loginStatus ) {
                navigate('/login');
            } else {
                setLoggedIn(loginStatus);
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <>
            {loggedIn && <DashboardContent />}
        </>
    )
};

export default Dashboard;
