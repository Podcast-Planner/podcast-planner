import firebase from './firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import './App.scss';
import Loader from './components/Loader'

function App() {

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, res => {
      const data = res.val();
      console.log(data);
    })
  }, []);

  
  return (
    <div>
      <Loader />
      <header>
        <h1> Podcast Planner </h1>
      </header>
    </div>
  );
}

export default App;
