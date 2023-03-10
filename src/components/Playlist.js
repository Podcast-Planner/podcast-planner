import { useState, useRef } from "react";
import { NotePencil, Play, Trash } from "phosphor-react";
import firebase from "../firebase";
import { getDatabase, update, remove, ref } from "firebase/database";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const confirmDelete = withReactContent(Swal);

const Playlist = ({
  playlistObject,
  formValues,
  setFormValues,
  updatePlaylist,
  firebaseKey,
}) => {
  const [playPodcast, setPlayPodcast] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [list, setList] = useState([...playlistObject]);

  const noTitle = withReactContent(Swal);

  const handleNoTitle = (e) => {
    e.preventDefault();
    noTitle.fire({
      title: <h3>Please Enter a Title</h3>,
      icon: "warning",
      confirmButtonColor: "#0e444f",
      confirmButtonText: "Okay!",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTitle) {
      handleNoTitle(e);
    } else {
      if (firebaseKey) {
        const database = getDatabase(firebase);
        const childRef = ref(database, `${firebaseKey}/formValues`);
        update(childRef, { ...formValues, title: newTitle });
        setEditTitle(false);
      } else {
        setFormValues({ ...formValues, title: newTitle });
        setEditTitle(false);
      }
    }
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    updatePlaylist(copyListItems);
  };

  const handleTrash = (e) => {
    e.preventDefault();
    const database = getDatabase(firebase);
    confirmDelete
      .fire({
        title: <h3>Are you sure you want to delete?</h3>,
        showCancelButton: true,
        confirmButtonColor: "#0e444f",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          remove(ref(database, firebaseKey));
        }
      });
  };

  return (
    <div className="playlistContainer">
      {editTitle ? (
        <form className="title" onSubmit={handleSubmit}>
          <label htmlFor="editTitle"></label>
          <input
            id="editTitle"
            placeholder={formValues.title}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <button className='confirmEdit'>Save</button>
        </form>
      ) : (
        <div className="title">
          <h3>{formValues.title}</h3>
          <div className="savedListsIcons">
            <button className="icon edit" onClick={() => setEditTitle(true)}>
              <NotePencil
                size={40}
                weight="fill"
                style={{ backgroundColor: "#001e31" }}
              />
            </button>
            {firebaseKey ? (
              <button className="icon trash" onClick={handleTrash}>
                <Trash
                  size={40}
                  weight="fill"
                  style={{ backgroundColor: "#001e31" }}
                />
              </button>
            ) : null}
          </div>
        </div>
      )}

      <ul className="playlist">
        {list.map(
          (
            { audio, id, image, podcast_title_original, title_original },
            index
          ) => {
            return (
              <li
                className="podcastImage"
                key={id}
                draggable={window.location.pathname !== "/playlists"}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
              >
                <div
                  onClick={(e) => setPlayPodcast(e.currentTarget.id)}
                  className="mediaContainer"
                  id={id}
                >
                  <div className="flexImage">
                    <img
                      src={`${image}`}
                      alt={`cover for ${podcast_title_original}`}
                    ></img>
                  </div>
                  <div className="overlay"></div>
                  {id === playPodcast ? (
                    <audio src={audio} title={title_original} controls></audio>
                  ) : (
                    <button href="#" className="playIcon" title="Video Play">
                      <Play size={40} weight="fill" color="#ffa62b" />
                    </button>
                  )}
                </div>
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
