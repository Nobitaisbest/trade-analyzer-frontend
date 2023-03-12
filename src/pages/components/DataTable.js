import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"

const DataTable = (props) => {
    const [dataItems, setDataItems] = useState(props.dataset);

    useEffect(() => {
        setDataItems(props.dataset);
    }, [props.dataset]);
    
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    {props.columns.map((column, index) => (
                        !column.hidden && 
                        <th key={column.dataField}>
                            {column.text}

                        </th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataItems.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        {props.columns.map((column, index) => (
                            !column.hidden && <td key={column.dataField}>{item[column.dataField]}</td>
                        ))}
                        <td>
                            <Button variant="danger" size="sm" className="mr-2" 
                            onClick={ () => props.handleDelete(item["id"]) }>X</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default DataTable;
