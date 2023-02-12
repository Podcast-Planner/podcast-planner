import { useState } from "react";
import { Link } from 'react-router-dom';
import { HeartStraight, X } from "phosphor-react";

const Playlist = ({ playlistObject, formValues }) => {
  const [playPodcast, setPlayPodcast] = useState("");

  return (
    <div className="playlistContainer">
        <h3>
            {formValues.length} minutes of {formValues.genre}
        </h3>
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
                    <img
                        src={`${image}`}
                        alt={`cover for ${podcast_title_original}`}
                    ></img>
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
        <div className="playlistButtons">
            <Link to='/playlists'><HeartStraight size={32} /></Link>
            <Link to='/'><X size={32} /></Link>
        </div>
    </div>
  );
};

export default Playlist;
