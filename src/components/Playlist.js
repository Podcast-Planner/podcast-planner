import { useState } from 'react';

const Playlist = ({playlist}) => {
    const [playPodcast, setPlayPodcast] = useState('')

    return(
        <div>
            <h2>Your Walking Playlist</h2>
            <ul className='playlist'>
                {playlist.map(({audio, id, image, podcast_title_original, title_original}) => {
                    return(
                        <li key={id}>
                            <button onClick={e => setPlayPodcast(e.currentTarget.id)} className='mediaContainer' id={id}>
                                {id === playPodcast 
                                ? <iframe src={audio} title={title_original}></iframe>
                                :<img src={`${image}`} alt={`cover for ${podcast_title_original}`}></img>
                                }
                            </button>
                            <div className='playlistInfo'>
                                <h3>{title_original}</h3>
                                <p>{podcast_title_original}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Playlist;