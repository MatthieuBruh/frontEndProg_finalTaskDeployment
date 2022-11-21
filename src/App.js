import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppMenu from './components/AppDrawer';
import MyCalendar from './components/MyCalendar';
import Statistics from './components/Statistics';

import {Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Routes, Route } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawer = (selectedPage) => {
    navigate(selectedPage);
    setOpen(false);
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'purple' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>

      <AppMenu open={open} handleDrawerClose={handleDrawerClose} handleDrawer={handleDrawer} drawerWidth={drawerWidth} />

      <Main open={open} sx={{ marginTop: 8 }} >

          
        <Routes>
          <Route exact path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Main>

    </Box>
  );
}

export default App;
