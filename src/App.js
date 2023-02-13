// Methods
import firebase from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import SavedLists from "./components/SavedLists";
import Form from "./components/Form";
import Results from "./components/Results";
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
    <div className="body">


      <Header headerRef={headerRef} />

      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/new-playlist"
          element={<Results formValues={formValues} />}
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
      <Footer />

    </div>
  );
}

export default App;
