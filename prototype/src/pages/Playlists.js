import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, Button, CircularProgress
} from '@mui/material';
import axios from 'axios';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    axios.get('/playlists')
      .then(res => {
        setPlaylists(res.data.playlists.items)
        setSuccess(res.data.success)
      });
  }, [])

  return (
    <Box>
      <Typography variant="h3" mb={2}>Playlists</Typography>
      <Grid container spacing={3}>
        {playlists?.map(playlist => (
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <img src={playlist.images[0].url} alt={playlist.name} width="100%"/>
              <CardContent>
                <Typography variant="h5">{playlist.name}</Typography>
                <Typography variant="subtitle2" mb={2}>by {playlist.owner.display_name}</Typography>
                <Button component={RouterLink} variant="contained" to={`/playlist/${playlist.id}`}>View</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!success && (
        <Typography variant="body1" mt={2}>
          Please login to view your playlists.
        </Typography>
      )}
      {
        playlists?.length === 0 && (
          <Box mt={2}>
            <CircularProgress/>
          </Box>
      )}
    </Box>
  )
}

export default Playlists;