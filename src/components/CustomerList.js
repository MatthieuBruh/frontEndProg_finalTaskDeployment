import React, { useState, useEffect } from "react";
import { API_URL } from '../constants';

// Styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
// Table
import { AgGridReact } from "ag-grid-react";
import { Delete } from "@mui/icons-material";

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

function CustomerList() {
    const [gridApi, setGridApi] = useState(null);
    const [search, setSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [columnDefs] = useState([
        {
            headerName: "Actions",
            width: 120,
            cellRenderer: params => <IconButton
                                        size="small"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={() => deleteCustomer(params.data)}>
                                        <Delete color="error" />
                                    </IconButton>
        },
        {
            headerName: "",
            width: 70,
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} data={params.data} />
        },
        {
            headerName: "",
            width: 150,
            cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />
        },
        {field: 'firstname', headerName: 'First name', sortable: true, filter: true },
        {field: 'lastname', headerName: 'Last name', sortable: true, filter: true },
        {field: 'email', headerName: 'Email', sortable: true, filter: true },
        {field: 'phone', headerName: 'Phone', sortable: true, filter: true },
        {field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, width: 150 },
        {field: 'city', headerName: 'City', sortable: true, filter: true, width: 150 },
    ]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(API_URL + '/customers')
        .then(response => {
            if (response.ok) return response.json();
            alert('Something get wrong');
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    };

    const saveCustomer = (customer) => {
        fetch(API_URL + '/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) return response.json();
            alert('Something get wrong');
        })
        .then(data => getCustomers())
        .catch(err => console.error(err));
    };

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method:'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) getCustomers();
            else alert('Something went wrong in edition.')
        })
        .catch(err => console.log(err));
    };

    const deleteCustomer = (customer) => {
        if (window.confirm('Are you sure?')) {
            fetch(customer.links[0].href, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(err => console.error(err))
        }
    };

    const addTraining = (training) => {
        fetch(API_URL + '/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) return response.json();
            alert('Something get wrong');
        })
        .catch(err => console.error(err));
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredCustomers = customers.filter(customer => {
        return customer.lastname.toLowerCase().includes(search.toLowerCase())
    });

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const exportToCSV = () => {
        const params = {
            columnKeys: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city']
        };
        gridApi.exportDataAsCsv(params);
    };

    return(
        <div>
            <div className="ag-theme-material" style={{height: 600, width: 'auto', margin: 'auto'}}>
                <div style={{ display: 'flex' }} >
                    <h1>Customers</h1>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            placeholder="Search"
                            variant="filled"
                            size="small"
                            sx={{ width: 300, mr: 2 }}
                            value={search}
                            onChange={handleSearch}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                      <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="medium"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            onClick={() => { setSearch('') }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <AddCustomer saveCustomer={saveCustomer} />

                    </div>
                </div>

                <AgGridReact
                    rowData={filteredCustomers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={(params) => onGridReady(params)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={exportToCSV}
                    style={{ marginTop: 10 }}
                >
                    Export to CSV
                </Button>

            </div>
        </div>
    );
}

export default CustomerList;