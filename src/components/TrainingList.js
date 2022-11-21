import React, { useState, useEffect } from "react";
import { API_URL } from '../constants';

// Styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
// Table
import { AgGridReact } from "ag-grid-react";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";

// Import date-fns
import { format } from 'date-fns';

function TrainingList() {
    const [search, setSearch] = useState('');
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        {
            headerName: "Actions",
            cellRenderer: params => {
                return (
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => deleteTraining(params.data)}>
                        <Delete color="error" />
                    </IconButton>
                );
            },
            width: 150,
        },
        { headerName: "Activity", field: "activity", sortable: true, filter: true, width: 300 },
        { headerName: "Date", field: "date", sortable: true, filter: true, width: 300},
        { headerName: "Duration", field: "duration", sortable: true, filter: true, width: 300 },
        { headerName: "Customer", field: "customer", sortable: true, filter: true, width: 300 },
    ]);

    const fetchTrainings = () => {
        fetch(API_URL + '/trainings')
        .then(response => response.json())
        .then(data => {
            ( async () => {
                let trainingList = [];
                for (let i = 0; i < data.content.length; i++) {
                    await fetch(data.content[i].links[2].href)
                    .then(response => response.json())
                    .then(customer => {
                        trainingList.push({
                            activity: data.content[i].activity,
                            date: format(new Date(data.content[i].date), 'dd.MM.yyyy HH:mm'),
                            duration: data.content[i].duration,
                            customer: customer.firstname + " " + customer.lastname,
                            links: data.content[i].links
                        });
                    })
                }
                setTrainings(trainingList);
            })();
        })
        .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const deleteTraining = (training) => {
        if (window.confirm('Are you sure?')) {
            fetch(training.links[0].href, { method: 'DELETE' })
            .then(_ => fetchTrainings())
            .catch(err => console.error(err))
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const filtredTrainings = trainings.filter(training => {
        return training.activity.toLowerCase().includes(search.toLowerCase());
    });

    return(
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <div style={{ display: 'flex' }} >
                    <h1>Trainings</h1>
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
                                            onClick={() => console.log('Search')}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>
                </div>

                <AgGridReact
                    rowData={filtredTrainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            
        </div>
    );
}

export default TrainingList;