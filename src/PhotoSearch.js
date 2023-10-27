import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';

const PhotoSearch = () => {
    const [query, setQuery] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const accessKey = 'oOiSvNXyFY3jxQasmMzllTb7QE2AOiQwLaC_RDrdIXI';

    const handleSearch = () => {
        setLoading(true);
        setPage(1);
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`)
            .then((response) => {
                setPhotos(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const loadMorePhotos = () => {
        setLoading(true);
        setPage(page + 1);
        axios.get(`https://api.unsplash.com/search/photos?page=${page + 1}&query=${query}&client_id=${accessKey}`)
            .then((response) => {
                setPhotos([...photos, ...response.data.results]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div style={{
                margin: '0 30px',
                height: '70px',
            }}>
                <TextField
                    label="Search for Photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button style={{ fontSize: 25, marginLeft: 10 }} variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>


            <Grid container spacing={2} >
                {photos.map((photo, index) => (
                    <Grid item xs={6} md={3} key={index}>
                        <img src={photo.urls.small} alt={photo.alt_description} />
                    </Grid>
                ))}
            </Grid>
            {loading && <CircularProgress></CircularProgress> }
            {photos.length > 0 && !loading && (
                <Button variant="contained" color="primary" onClick={loadMorePhotos}>
                    Load More
                </Button>
            )}
        </div>
    );
};

export default PhotoSearch;
