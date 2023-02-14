import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader";


const Form = () => {
    // Setting state with our application
    const [genres, setGenres] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState('');
    const [userQuery, setUserQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [length, setLength] = useState('');
    const [queryLength, setQueryLength] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://listen-api.listennotes.com/api/v2/genres', {
                    headers: {
                        "X-ListenAPI-Key": '9a92e5d7fee14b86ad0d4bf6c532f35e',
                    },
                    params: {
                        top_level_only: 1,
                    }
                });
                // console.log(response.data);
                setGenres(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGenre();
    }, []);
     if (loading) return <Loader />;
     if (error) return alert(`An error occurred: ${error.message}`);

    // console.log(error.message);
    
    //grabbing the value typed in by the user
    const handleLengthInputChange = (event) => {
        setLength(event.target.value);
    }
    //updating the queryLength with value typed in by the user
    const handleLengthFormSubmit = (event) => {
        //stopping the default action of the form
        event.preventDefault();
        //removing the white space from the length text
        const controlledLengthInput = length.trim();
        //updating the queryLength state and clearing the input
        setQueryLength(controlledLengthInput);
        setLength('');
    }

    // grabbing the podcast selected by the user
    const handleFormChange = (event) => {
        setUserPlaylist(event.target.value)
    }
    // stopping the default action of the form
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setUserQuery(userQuery)
        navigate('/new-playlist');
    }
    //  Array.from
    console.log(genres);
    const genresArray = genres.genres;

    const handleBackClick = e =>{
        e.preventDefault();
        navigate('/');
        setQueryLength('')
    }


    return (
        <>
        <form onSubmit={handleFormSubmit}>
            {queryLength?
                <div className='box' id='dropdown'>
                    <label htmlFor='podcastSelector' className='hidden'>Podcast</label>
                    <h2 className='subHeading'>Find your perfect <span className='newLine'>podcast playlist</span></h2>
                    <select className='dropdownMenu' onChange={handleFormChange}>
                        <option value='' disabled selected> {userPlaylist}-- What genre? --</option>
                        {genresArray && genresArray.map((genreArray =>
                            <option key={genreArray.id} value={genreArray.id}>{genreArray.name}</option>
                        ))
                        }
                    </select>
                    <div className='buttons'>
                        <button className='back' onClick={handleBackClick}>Back</button>
                        <button className='create' onClick={handleFormSubmit}>Create</button>
                    </div>
                </div>
            :
            <div className='box'id='input'>
                <h2 className='subHeading'>Find your perfect <span
                className='newLine'>podcast playlist</span></h2>
                <div className='flex'>
                    <label htmlFor='length'>length</label>
                    <input 
                    placeholder='How long is your walk?'
                    type='text'
                    id='length'
                    onChange={handleLengthInputChange}
                    value={length} />
                </div>
                <button className='next' onClick={handleLengthFormSubmit}>Next</button>
            </div> 
            }

        
        </form>
        </>                
    );

}

export default Form;
