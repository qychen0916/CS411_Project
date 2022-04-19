import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Stack
} from '@mui/material';
import axios from 'axios';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get('/playlists')
      .then(res => {
        setPlaylists(res.data.playlists.items)
      });
  }, [])

  return (
    <Box>
      <Typography variant="h3" mb={2}>Playlists</Typography>
      <ul>
        {playlists?.map(playlist => (
          <li>Playlist Name: {playlist.name}</li>
        ))}
      </ul>
    </Box>
  )
}

export default Playlists;