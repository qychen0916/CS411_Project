
import { useEffect, useState } from 'react';
import {
	Box, Typography, Card, CardContent, Stack, Button
} from '@mui/material';
import axios from 'axios';

const Track = ({trackName, albumArt, trackArtists}) => {
  const [youtube, setYoutube] = useState();

  useEffect(() => {
    axios.get(`/youtubesearch?video=${trackName + ' ' + trackArtists.map(artist => artist.name).join(', ')}`).then((res) => {
      setYoutube(res.data.video.result[0].link);
    })
  }, []);

  return (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={2}>
      <img src={albumArt} alt={trackName} height={128}/>
        <Box>
        <Typography variant="h6">{trackName}</Typography>
        <Typography variant="subtitle2" mb={2}>
          {trackArtists.map(artist => artist.name).join(', ')}
        </Typography>
        <Button variant="contained" href={youtube} target="_blank">Watch on YouTube</Button>
        </Box>
      </Stack>
    </CardContent>
  </Card>
  )
}

export default Track;