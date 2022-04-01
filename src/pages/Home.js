import { useEffect, useState } from 'react';
import {
  Box, Typography
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [date, setDate] = useState('');

  const getDate = () => {
    axios.get('/date')
    .then(res => {
      setDate(res.data.date);
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getDate();
  }, [])

  return (
    <Box>
      <Typography variant="h3" mb={2}>Home</Typography>
      <Typography>Example Home Page</Typography>
      <Typography>As an example, this date is returned from the server: {date}</Typography>
    </Box>
  )
}

export default Home;