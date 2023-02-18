import { useState, useEffect } from "react";
import firebase from "../firebase";
import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Playlist from "./Playlist";
import ScrollToTop from "./ScrollToTop";
import PageFade from "./PageFade";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowsClockwise, HeartStraight } from "phosphor-react";

const Results = ({ formValues, setFormValues, headerRef }) => {
  // Save playlist data from API call to stateful variable
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [userOrderPlaylist, setUserOrderPlaylist] = useState([]);
  const [offset, setOffset] = useState(
    localStorage.getItem('offset') 
    ? localStorage.getItem('offset')
    : 0
    );

    console.log(userOrderPlaylist);
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
          safe_mode: 1,
        },
      })
        .then((res) => {
          setNewPlaylist(res.data.results);
          localStorage.setItem('offset', offset)
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
    
  const updatePlaylist = (newOrder) => {
    !newOrder ? setUserOrderPlaylist(newPlaylist) : setUserOrderPlaylist(newOrder);
    console.log(newOrder);
  };
  
    const handleClick = () => {
    const saveToPlaylists = (userOrderPlaylist < 1 ? newPlaylist : userOrderPlaylist )
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const firebaseObj = { playlist: saveToPlaylists, formValues: formValues }
    push(dbRef, firebaseObj);
    navigate('/playlists');
  }


  

  const handleRefresh = () => {
    refresh ? setRefresh(false) : setRefresh(true);
  };

  if (loading) return <Loader />;
  if (error) return alert(`An error occurred: ${error.message}`);

  
  return (
    
    <PageFade>
      <div className="results">
        <div className="playlistButtons">
          <div>
            <p>Back</p>
            <Link to="/">
              <ArrowLeft size={40} />
            </Link>
          </div>
          <div>
            <p>New Playlist</p>
            <button className='icon' onClick={handleRefresh}>
              <ArrowsClockwise size={40} color="#ffa62b" weight="fill" style={{ backgroundColor: '#001e31' }} />
            </button>
          </div>
          <div>
            <p>Save</p>
            <button className='icon' onClick={handleClick}>
              <HeartStraight size={40} color="#ffa62b" weight="fill" style={{ backgroundColor: '#001e31' }} />
            </button>
          </div>
        </div>
        {newPlaylist.length === 0 ? (
          <h2>
            Sorry, there are no additional {formValues.title} podcasts.
          </h2>
        ) : (
          <div className='iconContainer'>
            <Playlist
              playlistObject={newPlaylist}
              formValues={formValues}
              setFormValues={setFormValues}
              updatePlaylist={updatePlaylist}
            />
            
          </div>
        )}
        <ScrollToTop headerRef={headerRef} />
      </div>
    </PageFade>
  );
};


export default Results;
