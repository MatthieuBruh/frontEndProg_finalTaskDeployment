import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'


function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setTraining({...training, customer: props.data.links[0].href});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setTraining(currTraining => ({...currTraining, date: training.date.toISOString()}));
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date: new Date(),
            duration: '',
            activity: '',
            customer: ''
        });
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>ADD TRAINING</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            // Date picker in form DD.MM.YYYY HH:MM
                            label="Date"
                            inputFormat="dd.MM.yyyy HH:mm"
                            value={training.date}
                            onChange={(newValue) => {
                                setTraining({...training, date: newValue});
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTraining;