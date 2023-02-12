import { useState, useEffect } from "react";
import axios from "axios";
import Playlist from "./Playlist";

const PlaylistApi = ({ formValues }) => {
  // Save playlist data from API call to stateful variable
  const [newPlaylist, setNewPlaylist] = useState([]);

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
          len_min: formValues.length,
          len_max: formValues.length + 1,
          genre_ids: formValues.genre,
          language: "English",
        },
      })
        .then((res) => {
          setNewPlaylist(res.data.results);
          // setLoading(false);
        })
        .catch((err) => {
          alert(err);
          // setLoading(false);
        });
    };
    getPlaylist();
  }, []);

  return (
    <div>
      <h2>Your Walking Playlist</h2>

      <Playlist playlistObject={newPlaylist} formValues={formValues} />
    </div>
  );
};

export default PlaylistApi;
