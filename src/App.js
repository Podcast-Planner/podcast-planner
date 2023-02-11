import firebase from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import Loader from './components/Loader'

function App() {
  // Store user inputs as values to be passed as arguments for 2nd API call.
  const [formValues, setFormValues] = useState({
    lenMin: 0,
    lenMax: 0,
    genre: "",
  });

  // Save playlist data from API call to stateful variable
  const [playlist, setPlaylist] = useState([]);
    
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

import Loader from './components/Loader';
// import Playlist from "./components/Playlist";
import GenreApi from "./components/GenreApi";
import PlaylistApi from "./components/PlaylistApi";

function App() {
  
  // Pull data from firebase on component mount
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (res) => {
      const data = res.val();
      console.log(data);
    });
  }, []);

  
  return (
    <div>
      {/* <Loader /> */}

        <header>
          <Form />
          <h1> Podcast Planner </h1>
        </header>
      
      
      <Loader />
      <header>
        <h1> Podcast Planner </h1>
      </header>
      
      {/* These are placeholders for when we have the data populating from the forms and Api's */}
      <PlaylistApi />
      <GenreApi />

    </div>
  );
}

export default App;
