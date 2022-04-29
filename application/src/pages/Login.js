import {
  Box, Typography, CircularProgress
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  useEffect(() => {
    axios.get('/login')
      .then(res => {
        window.location.href = res.data.redirect;
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <Box>
      <Typography variant="body1" mb={2}>
        Redirecting to Spotify Auth...
      </Typography>
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default Login;