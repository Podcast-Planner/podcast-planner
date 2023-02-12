// Methods
import firebase from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Loader from "./components/Loader";
import SavedLists from "./components/SavedLists";
import GenreApi from "./components/GenreApi";
import PlaylistApi from "./components/PlaylistApi";

// Assets
import "./App.scss";

function App() {
  // Store user inputs as values to be passed as arguments for 2nd API call.
  const [formValues, setFormValues] = useState({
    length: 0,
    genre: "",
  });

  // All playlists saved by the user (pulled from firebase database)
  const [savedPlaylists, setSavedPlaylists] = useState([]);

  // Pull data from firebase on component mount & change in database
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (res) => {
      const data = res.val();
      const newState = [];
      for (let key in data) {
        newState.push({ key: key, playlist: data[key] });
      }
      setSavedPlaylists(newState);
    });
  }, []);

  return (
    <div>
      {/* <Loader /> */}
      <header>
        <h1> Podcast Planner </h1>
      </header>

      <Routes>
        <Route
          path="/playlists"
          element={
            <SavedLists
              savedPlaylists={savedPlaylists}
              formValues={formValues}
            />
          }
        />
      </Routes>

      {/* These are placeholders for when we have the data populating from the forms and Api's */}
      <PlaylistApi formValues={formValues} />
      <GenreApi />
    </div>
  );
}

export default App;
