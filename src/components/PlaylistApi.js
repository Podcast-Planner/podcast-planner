import { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist';

const PlaylistApi = () => {

        // Store user inputs as values to be passed as arguments for 2nd API call.
              const [formValues, setFormValues] = useState({
                lenMin: 0,
                lenMax: 0,
                genre: "",
              });


  // Save playlist data from API call to stateful variable
  const [playlist, setPlaylist] = useState([]);
  console.log(playlist)

  useEffect(() => {
    
    // Function to fetch data from API based on user inputs (will be called onSubmit & onClick)
    const getPlaylist = () => {
        // setLoading(true);
        axios({
        url: "https://listen-api.listennotes.com/api/v2/search",
        headers: {
            "X-ListenAPI-Key": "9a92e5d7fee14b86ad0d4bf6c532f35e",
        },
        params: {
            q: "podcast",
            type: "episode",
            len_min: formValues.lenMin,
            len_max: formValues.lenMax,
            genre_ids: formValues.genre,
            language: "English",
        },
        })
        .then((res) => {
            setPlaylist(res.data.results);
            // setLoading(false);
        })
        .catch((err) => {
            alert(err);
            // setLoading(false);
        });
    };
    getPlaylist();

  },[]);
  

    return (
        <div>
            <h2>This is the playlist component</h2>
            
            <Playlist playlist={playlist} />



        </div>

    )
}

export default PlaylistApi;
