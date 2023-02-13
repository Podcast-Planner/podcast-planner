import { useState, useEffect } from 'react';
import axios from 'axios';
// import Playlist from './Playlist';
import Loader from "./Loader";


const GenreApi = () => {
    // Setting state with our application
    const [genres, setGenres] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState('');
    const [userQuery, setUserQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://listen-api.listennotes.com/api/v2/genres', {
                    headers: {
                        "X-ListenAPI-Key": '9a92e5d7fee14b86ad0d4bf6c532f35e',
                    },
                    params: {
                        top_level_only: 1,
                    }
                });
                // console.log(response.data);
                setGenres(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGenre();
    }, []);
     if (loading) return <Loader />;
     if (error) return alert(`An error occurred: ${error.message}`);

    // console.log(error.message);
    // grabbing the podcast selected by the user
    const handleFormChange = (event) => {
        setUserPlaylist(event.target.value)
    }
    // stopping the default action of the form
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setUserQuery(userQuery)
    }
    //  Array.from
    console.log(genres);
    const genresArray = genres.genres;


    return (
        <>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor='podcastSelector' className='hidden'>Podcast</label>
            <div className='box'>
                <h2 className='subHeading'>Find your perfect <span class='newLine'>podcast playlist</span></h2>
                <select className='dropdownMenu' onChange={handleFormChange}>
                    <option value=''disabled selected> {userPlaylist}-- What genre? --</option>
                    {genresArray && genresArray.map((genreArray =>
                        <option key={genreArray.id} value={genreArray.id}>{genreArray.name}</option>
                    ))
                    }
                </select>
                <div className='buttons'>
                    <button className='back'>Back</button>
                    <button className='create'>Create</button>
                </div>
            </div>
        </form>
        </>                
    );

}

export default GenreApi;
