import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Playlist from "./Playlist";
import Loader from "./Loader";
import { Link } from "react-router-dom"
import { HeartStraight, X } from "phosphor-react"

const Results = ({ formValues }) => {
  // Save playlist data from API call to stateful variable
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from API based on user inputs (will be called onSubmit & onClick)
    const getPlaylist = () => {
      setLoading(true);
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
          genre_ids: formValues.genreId,
          language: "English",
        },
      })
        .then((res) => {
          setNewPlaylist(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    getPlaylist();
  }, []);


  const handleClick = () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const firebaseObj = { playlist: newPlaylist, formValues: formValues }
    push(dbRef, firebaseObj);
    navigate('/playlists');
  }

  if (loading) return <Loader />;
  if (error) return alert(`An error occurred: ${error.message}`);

  return (
    <div className="results">
      <Playlist playlistObject={newPlaylist} formValues={formValues} />
      <div className='playlistButtons'>
        <button class='iconHeart' onClick={handleClick}><HeartStraight size={64} color="#d01116" weight="fill" /></button>
        <Link to='/'><X size={64} /></Link>
      </div>
    </div>
  );
};

export default Results;
