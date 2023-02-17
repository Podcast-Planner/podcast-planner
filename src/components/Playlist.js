import { useState, useRef } from "react";
import { NotePencil, Play, Trash } from "phosphor-react";
import firebase from "../firebase";
import { getDatabase, update, remove, ref } from "firebase/database";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const confirmDelete = withReactContent(Swal)


const Playlist = ({ playlistObject, formValues, setFormValues, firebaseKey }) => {
  const [playPodcast, setPlayPodcast] = useState("");
  const [editTitle, setEditTitle] = useState(false)
  const [newTitle ,setNewTitle] = useState('')
  const [list, setList] = useState([...playlistObject]);
 
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

  const dragItem = useRef();
  const dragOverItem = useRef();
  
  const dragStart = (e, position) => {
    dragItem.current = position;
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position;

  }

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  }

  const handleTrash = e => {
    e.preventDefault()
    const database = getDatabase(firebase);
    confirmDelete.fire({
      title: <h3>Are you sure you want to delete?</h3>,
      showCancelButton: true,
      confirmButtonColor: '#0e444f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(database, firebaseKey));
      }
    })
    
    
  }


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
        {list.map(
          ({ audio, id, image, podcast_title_original, title_original }, index) => {
            return (
              <li className='podcastImage' key={id} 
              draggable 
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              >
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
                  <button href="#" className="playIcon" title="Video Play">
                    <Play size={40} weight="fill" color='#ffa62b' />
                    </button>
                   <div className="overlay">
                   </div>
                  {id === playPodcast ? (
                    <audio src={audio} title={title_original}
                    controls></audio>
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
