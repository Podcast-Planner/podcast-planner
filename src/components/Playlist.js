import { useState } from "react";
import { NotePencil, Play, Trash } from "phosphor-react";
import firebase from "../firebase";
import { getDatabase, update, remove, ref } from "firebase/database";



const Playlist = ({ playlistObject, formValues, setFormValues, firebaseKey }) => {
  const [playPodcast, setPlayPodcast] = useState("");
  const [editTitle, setEditTitle] = useState(false)
  const [newTitle ,setNewTitle] = useState('')


  const handleSubmit = e => {
    e.preventDefault();
    
    if(firebaseKey){
      const database = getDatabase(firebase);
      const childRef = ref(database, `${firebaseKey}/formValues`);
      
      update(childRef, { ...formValues, title: newTitle });
      setEditTitle(false);
    } else { 
      setFormValues({ ...formValues, title: newTitle })
      setEditTitle(false);
    }
  }

  const handleTrash = e => {
    e.preventDefault()
    const database = getDatabase(firebase);
    remove(ref(database, firebaseKey));
  }

  // console.log(playlistObject.length);

  return (
    <div className="playlistContainer">
      {editTitle
        ? <form className='title' onSubmit={handleSubmit}>
            <label htmlFor='editTitle'></label>
            <input id='editTitle' placeholder={formValues.title} onChange={e => setNewTitle(e.target.value)}></input>
          </form>
        : <div className='title'>
            <h3>
              {formValues.title}
            </h3>
            <button onClick={() => setEditTitle(true)}><NotePencil size={32} color="#000000" weight="fill" /></button>
          {firebaseKey
            ? <button onClick={handleTrash}><Trash size={32} weight="fill" /></button>
            : null
          }
          </div>
      }

      
      
      
      <ul className="playlist">
        {playlistObject.map(
          ({ audio, id, image, podcast_title_original, title_original }) => {
            return (
              <li key={id}>
                <button
                  onClick={(e) => setPlayPodcast(e.currentTarget.id)}
                  className="mediaContainer"
                  id={id}
                >
                  <div className = 'flexImage'>
                    <img
                      src={`${image}`}
                      alt={`cover for ${podcast_title_original}`}
                    ></img>
                  <div className='darkOverlay'></div>
                  </div>
                  <div className="overlay">
                    <button href="#" className="playIcon" title="Video Play">
                      <Play size={40} weight="fill" color='#0e444f' />
                    </button>
                  </div>
                  {id === playPodcast ? (
                    <iframe src={audio} title={title_original}></iframe>
                  ) : undefined}
                </button>
                <div className="playlistInfo">
                  <h4>{title_original}</h4>
                  <h5>{podcast_title_original}</h5>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Playlist;
