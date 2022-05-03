import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, Button, CircularProgress, Divider,
  IconButton, Stack
} from '@mui/material';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [success, setSuccess] = useState(true);

  // get user's favorite playlists
  const getFavorites = () => {
    axios.get('/get_favorites')
      .then(res => {
        setFavorites(res.data.favorites);
        setSuccess(res.data.success);
      })
  }

  // toggle favorite status of user's playlist
  const toggleFavorite = (id) => {
    axios.get(`/toggle_favorite?id=${id}`)
    .then(res => {
      console.log(res.data);
      getFavorites();
    });
  }

  // sort playlist by favorites
  useEffect(() => {
    if (playlists && favorites) {
      setPlaylists([
        ...playlists?.filter(playlist => 
          favorites?.some(favorite => favorite?.playlist_id === playlist?.id)),
        ...playlists?.filter(playlist => 
          !favorites?.some(favorite => favorite?.playlist_id === playlist?.id))
        ]);
    }
  }, [favorites])

  // get user's playlists on mount
  useEffect(() => {
    axios.get('/playlists')
      .then(res => {
        setPlaylists(res.data.playlists.items)
        getFavorites();
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
                <Stack direction="row" spacing={2}>
                  <Button component={RouterLink} variant="contained" to={`/playlist/${playlist.id}`}>View</Button>
                  <IconButton onClick={() => toggleFavorite(playlist.id)}>
                    { favorites.some(favorite => favorite.playlist_id === playlist.id) ?
                      <StarIcon fontSize="small" color="warning"/>
                      :
                      <StarBorderIcon fontSize="small"/>
                    }
                  </IconButton>
                </Stack>
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