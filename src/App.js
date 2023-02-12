// Methods
import firebase from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Components
import Loader from "./components/Loader";
import SavedLists from "./components/SavedLists";
import GenreApi from "./components/GenreApi";
import PlaylistApi from "./components/PlaylistApi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

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

  // Create a reference point for ScrollToTop.js functionality
  const headerRef = useRef(null);

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

      <Header headerRef={headerRef} />

      {/* These are the links that create the slug so that the Routes can work properly */}
      <Link to="/"></Link>
      <Link to="/genre"></Link>
      <Link to="/new-playlist"></Link>
      <Link to="/playlists"></Link>

      <Routes>
        <Route path="/" element="*** Placeholder for the Podcast minutes ***" />
        <Route path="/genre" element={<GenreApi />} />
        <Route
          path="/new-playlist"
          element="*** Placeholder for the api query results ***"
        />
        <Route
          path="/playlists"
          element={
            <SavedLists
              savedPlaylists={savedPlaylists}
              formValues={formValues}
              headerRef={headerRef}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* These are placeholders for when we have the data populating from the forms and Api's */}
      <PlaylistApi formValues={formValues} />

      <Footer />
    </div>
  );
}

export default App;
