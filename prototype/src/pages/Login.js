import {
  Box, Typography
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
      <Typography variant="h3" mb={2}>Login</Typography>
      <Typography>Example Login Page</Typography>
    </Box>
  )
}

export default Login;