import { useEffect, useState } from "react";
import { Button, Card, Container, FormGroup, FormSelect } from "react-bootstrap";

import DataTable from "./DataTable";

const SelectSideOrCur = (props) => {
    return (
        <div>
            <FormGroup>
                <label>Select buy or sell trades</label>
                <FormSelect defaultValue={"ALL"} name="selected_trade_type" onChange={props.handleSelectFilter}>
                    <option value="ALL">ALL</option>
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                </FormSelect>
            </FormGroup>
            <FormGroup>
                <label>Select currency</label>
                <FormSelect defaultValue={"ALL"} name="selected_currency" onChange={props.handleSelectFilter}>
                    <option value="ALL">ALL</option>
                    {props.currencySymbols.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </FormSelect>                
            </FormGroup>
        </div>
    )
};

const ViewData = (props) => {
    const [dataset, setDataset] = useState(props.dataset);
    const [filters, setFilters] = useState({selected_trade_type: "ALL", selected_currency: "ALL"});

    // {
    //     "id": 1,
    //     "batchId": "5_1678841393193",
    //     "userId": 5,
    //     "date": "2022-05-30T08:20:35",
    //     "orderNo": "5012493254",
    //     "pair": "BTCBUSD",
    //     "type": "Limit",
    //     "side": "SELL",
    //     "orderPrice": 30680,
    //     "amount": 0.00652,
    //     "amountCurrency": "BTC",
    //     "executed": 0.00652,
    //     "executedCurrency": "BTC",
    //     "executedAt": "2022-05-30T08:21:22",
    //     "avgPrice": 30680,
    //     "tradingTotal": 200.0336,
    //     "tradingTotalCurrency": "BUSD",
    //     "status": "FILLED",
    //     "createdAt": "2023-03-15T06:19:53.288203",
    //     "updatedAt": "2023-03-15T06:19:53.288203"
    //   };

    const columns = [
        {dataField: 'id', text: 'ID', hidden: true, sort: true},
        {dataField: 'batchId', text: 'Batch ID', sort: true, hidden: true},
        {dataField: 'userId', text: 'User ID', hidden: true, sort: true},
        {dataField: 'date', text: 'Date', sort: true},
        {dataField: 'side', text: 'Type', sort: true},
        {dataField: 'orderNo', text: 'orderNo', sort: true, hidden: true},
        {dataField: 'pair', text: 'Pair', sort: true},
        {dataField: 'type', text: 'Type', sort: true},
        {dataField: 'orderPrice', text: 'Order Price', sort: true},
        {dataField: 'amount', text: 'Amount', sort: true},
        {dataField: 'amountCurrency', text: 'Amount Currency', sort: true, hidden: true},
        {dataField: 'executed', text: 'Executed', sort: true},
        {dataField: 'executedCurrency', text: 'Currency', sort: true},
        {dataField: 'executedAt', text: 'Executed At', sort: true},
        {dataField: 'avgPrice', text: 'Avg Price', sort: true},
        {dataField: 'tradingTotal', text: 'Trading Total', sort: true},
        {dataField: 'tradingTotalCurrency', text: 'Trading Total Currency', sort: true},
        {dataField: 'status', text: 'Status', sort: true},
        // {dataField: 'createdAt', text: 'Created At'},
        // {dataField: 'updatedAt', text: 'Updated At'}
        // {dataField: 'price', text: 'Price', sort: true},
        // {dataField: 'executed', text: 'Executed', sort: true},
        // {dataField: 'executedCurrency', text: 'Executed Currency', sort: true},
        // {dataField: 'amount', text: 'Amount', sort: true},
        // {dataField: 'amountCurrency', text: 'Amount Currency', sort: true},
        // {dataField: 'fee', text: 'Fee', sort: true},
        // {dataField: 'feeCurrency', text: 'Fee Currency', sort: true},
        // {dataField: 'createdAt', text: 'Created At'},
        // {dataField: 'updatedAt', text: 'Updated At'}
    ];

    useEffect(() => {
        if(filters.selected_trade_type === "ALL" && filters.selected_currency === "ALL") {
            setDataset(props.dataset);
        } else {
            const filteredDataset = props.dataset.filter((item) => {
                return (filters.selected_trade_type === "ALL" || item.side === filters.selected_trade_type) &&
                    (filters.selected_currency === "ALL" 
                    || item.executedCurrency === filters.selected_currency 
                    || item.tradingTotalCurrency === filters.selected_currency);
            });
            setDataset(filteredDataset);
        }
    }, [props.dataset, filters]);


    const handleSelectFilter = (event) => {
        setFilters({...filters, [event.target.name]: event.target.value});
    };

    return (
        <>
            <Card style={ {width: "auto" } }>
                <Card.Header>Trade Data</Card.Header>
                <Card.Body>
                    <Card.Title>
                        <Button variant="info" onClick={props.toggleDoReload} 
                            className="mb-3">Reload dataset</Button>
                            
                        <Button variant="danger" onClick={props.handleDeleteAll} 
                            className="mb-3 mx-1">Delete all</Button>

                        <SelectSideOrCur handleSelectFilter={handleSelectFilter}
                        currencySymbols={props.currencySymbols} />
                    </Card.Title>
                        <div>
                            <DataTable dataset={dataset} 
                                columns={columns} handleDelete={props.handleDelete} />                        
                        </div>
                </Card.Body>
            </Card>
        </>
    )
};

export default ViewData;