import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Stack
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  // stores the date as a string
  const [date, setDate] = useState('');

  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
  });

  const [names, setNames] = useState([]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  }

  // gets the date by making an API request to the backend
  const getDate = () => {
    axios.get('/date')
    .then(res => {
      setDate(res.data.date);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // gets the names from the database
  const getNames = () => {
    axios.get('/names')
    .then(res => {
      setNames(res.data.names);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // submits name to the backend; update names when submission succeeds
  const submitName = () => {
    axios.post('/name', formValue)
    .then(() => getNames())
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    getDate();
    getNames();
  }, [])

  return (
    <Box>
      <Typography variant="h3" mb={2}>Home</Typography>
      <Typography mb={2}>This date is returned from the server: {date}</Typography>
      <Stack spacing={2} mb={4}>
        <TextField name="firstName" label="Enter First Name" variant="outlined" value={formValue.firstName} onChange={handleChange} />
        <TextField name="lastName" label="Enter Last Name" variant="outlined" value={formValue.lastName} onChange={handleChange} />
        <Button variant="contained" onClick={submitName}>Submit</Button>
      </Stack>
      <Typography variant="h5" mb={2}>Names</Typography>
      <ul>
        {names.map(name => (
          <li key={name._id}>{name.firstName} {name.lastName}</li>
        ))}
      </ul>
    </Box>
  )
}

export default Home;