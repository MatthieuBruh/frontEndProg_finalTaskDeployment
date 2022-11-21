import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit';


function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({});

    /**
     * Opens the dialog window for editing a customer.
     */
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            email: props.data.email,
            phone: props.data.phone,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city
        });
    };

    /**
     * Closes the dialog window for editing a customer.
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Save the customer with the given information to the database and close the dialog window.
     */
    const handleSave = () => {
        props.updateCustomer(props.data.links[0].href, customer);
        setOpen(false);
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });

    };

    return (
        <div>
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClickOpen}>
                <Edit />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit a customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First name"
                        fullWidth
                        variant="standard"
                        value={customer.firstname}
                        onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    />
                    
                    <TextField
                        margin="dense"
                        label="Last name"
                        fullWidth
                        variant="standard"
                        value={customer.lastname}
                        onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    />
                    
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}
                    />
                    
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        value={customer.phone}
                        onChange={e => setCustomer({...customer, phone: e.target.value})}
                    />
                    
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                        value={customer.postcode}
                        onChange={e => setCustomer({...customer, postcode: e.target.value})}
                    />

                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                        value={customer.city}
                        onChange={e => setCustomer({...customer, city: e.target.value})}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default EditCustomer;