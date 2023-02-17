import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Playlist from "./Playlist";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { ArrowsClockwise, HeartStraight, X } from "phosphor-react";

const Results = ({ formValues, setFormValues }) => {
  // Save playlist data from API call to stateful variable
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
          offset: offset,
          unique_podcasts: 1,
        },
      })
        .then((res) => {
          setNewPlaylist(res.data.results);
          setOffset(res.data.next_offset);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    getPlaylist();
  }, [refresh]);

    

  const handleClick = () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const firebaseObj = { playlist: userOrderPlaylist, formValues: formValues }
    push(dbRef, firebaseObj);
    navigate('/playlists');
  }

  const [userOrderPlaylist, setUserOrderPlaylist] = useState([]);

  const updatePlaylist = (newOrder) => {
    setUserOrderPlaylist(newOrder);
    console.log(newOrder);
  };

  const handleRefresh = () => {
    refresh ? setRefresh(false) : setRefresh(true);
  }

  if (loading) return <Loader />;
  if (error) return alert(`An error occurred: ${error.message}`);

  return (
    <div className="results">
        {newPlaylist.length === 0 ? (<h2>Sorry, no podcasts were found in {formValues.genre} for the length of {formValues.length} minutes</h2>) : (
          <div>
            <Playlist playlistObject={newPlaylist} formValues={formValues} setFormValues={setFormValues} updatePlaylist={updatePlaylist}/>
            <div className='playlistButtons'>
              <button onClick={handleClick}><HeartStraight size={64} color="#d01116" weight="fill" /></button>
              <button onClick={handleRefresh}><ArrowsClockwise size={64} weight="fill" /></button>
              <Link to='/'><X size={64} /></Link>
            </div>
          </div>
        )
        }

    </div>
  );
};

export default Results;
