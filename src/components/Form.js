import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const [users, setUsers] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState('');
    const [userQuery, setUserQuery] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => setUsers(response.data))
            .then((error) => console.log(error));
    }, []);

    // grabbing the podcast selected by the user
    const handleFormChange = (event) => {
        setUserPlaylist(event.target.value)
    }

    // stopping the default action of the form
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setUserQuery(userQuery)

    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label htmlFor='podcastSelector' className='visuallyhidden'>Podcast</label>
            <div className='box'>
                <select className="dropdownMenu" onChange={handleFormChange}>
                    <option value={userPlaylist}>--Select Podcast--</option>
                    {users.map((user =>
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))
                    }
                </select>
                <button className='submit'>Submit</button>
            </div>
        </form>
    );
}
export default Form;
