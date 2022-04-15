import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link variant="h6" color="primary.contrastText" underline="none" sx={{ flexGrow: 1 }} component={RouterLink} to="/">
            CS411 Project
          </Link>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/albums">Albums</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;