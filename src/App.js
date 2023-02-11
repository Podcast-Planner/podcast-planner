import firebase from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect } from "react";
import "./App.scss";
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
