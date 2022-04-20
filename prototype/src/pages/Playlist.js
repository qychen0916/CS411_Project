import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, Stack, CircularProgress
} from '@mui/material';
import axios from 'axios';

const Playlist = () => {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    axios.get(`/playlist?id=${id}`)
      .then(res => {
        setPlaylist(res.data.playlist)
      });
  }, [])

  return (
    <Box>
      {playlist && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
          <img src={playlist?.images[0].url} alt={playlist?.name} width="100%"/>
          <CardContent>
            <Typography variant="h5">{playlist?.name}</Typography>
            <Typography variant="subtitle2">by {playlist?.owner.display_name}</Typography>
          </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Typography variant="h4" mb={2}>Tracks</Typography>
          <Stack spacing={3}>
            {playlist?.tracks.items.map(track => {
              return (
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                    <img src={track.track.album.images[0].url} alt={track.track.name} height={128}/>
                      <Box>
                      <Typography variant="h6">{track.track.name}</Typography>
                      <Typography variant="subtitle2">
                        {track.track.artists.map(artist => artist.name).join(', ')}
                      </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )
            })}
          </Stack>
        </Grid>
      </Grid>
      )}
      {
        !playlist && (
          <Box mt={2}>
            <CircularProgress/>
          </Box>
        )
      }
    </Box>
  )
}

export default Playlist;