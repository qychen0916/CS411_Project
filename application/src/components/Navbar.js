import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check if the user is logged in
  useEffect(() => {
    axios.get('/amILoggedIn')
      .then(res => {
        setIsLoggedIn(res.data.isLoggedIn);
      })
  }, []);

  return (
  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link variant="h6" color="primary.contrastText" underline="none" sx={{ flexGrow: 1 }} component={RouterLink} to="/">
            CS411 Project
          </Link>
          <Button color="inherit" component={RouterLink} to="/">Playlists</Button>
          <Button color="inherit" component={RouterLink} to="/login">
            {isLoggedIn ? 'Switch Accounts' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;