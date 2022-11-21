import React from "react";
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EventIcon from '@mui/icons-material/Event';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from "@mui/material/Drawer";
import BarChartIcon from '@mui/icons-material/BarChart';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function AppDrawer(props) {
    const theme = useTheme();
    
    return (
        <Drawer
            sx={{
                width: props.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: props.drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.open}
        >
        <DrawerHeader>
            <IconButton onClick={props.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
            <ListItem button onClick={() => { props.handleDrawer('/'); }}>
                <ListItemIcon>
                    <ContactsIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button onClick={() => { props.handleDrawer('/trainings'); }}>
                <ListItemIcon>
                    <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary="Trainings" />
            </ListItem>
            <ListItem button onClick={() => { props.handleDrawer('/calendar'); }}>
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
            </ListItem>
            <ListItem button onClick={() => { props.handleDrawer('/statistics') }}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
            </ListItem>
        </List>
      </Drawer>
    );
}

export default AppDrawer;