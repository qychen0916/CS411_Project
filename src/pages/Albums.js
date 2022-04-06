/*display the albums gotten from the searched artistname*/

import { useEffect, useState } from 'react';
import {
	Box, Typography, TextField, Button, Stack
} from '@mui/material';
import axios from 'axios';

const Albums = () => {
	// stores the date as a string
	const [albums, setAlbums] = useState([]);
	
	const [formValue, setFormValue] = useState({
		artistName: ''
	});
	
	const handleChange = (e) => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value
		});
	} 
	
	// gets the albums by making an API request to the backend
	const getAlbumsByName = () => {
		axios.post('/albumsearch',formValue)
		.then(res => {
			setAlbums(res.data.albums);
			console.log(typeof albums)
		})
		.catch(err => {
			console.log(err);
		});
	}
	
	const getAlbums = () => {
		axios.get('/albumsearch')
		.then(res => {
			setAlbums(res.data.albums);
		})
		.catch(err => {
			console.log(err);
		});
	}
	
	useEffect(() => {
		getAlbumsByName();
		getAlbums();
	}, [])	
	
	return (
		<Box>
		<Stack spacing={2} mb={4}>
		<TextField name="artistName" label="Enter Artist Name" variant="outlined" value={formValue.artistName} onChange={handleChange} />
		<Button variant="contained" onClick={getAlbumsByName}>Submit</Button>
		</Stack>
		<br/>
		<Typography mb={2}>These are the albums returned from the server: </Typography>
		<ul>
		{albums.map(album => (
			<li>{album}</li>
		))}
		</ul>
		</Box>
	)
}

export default Albums;