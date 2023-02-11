import { useState, useEffect } from 'react';
import axios from 'axios';

 const GetGenre = () => {
    const [genre, setGenre] = useState('');
    console.log (genre);
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
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
            console.log(response.data);
            setGenre(response.data.name);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        };
        fetchGenre();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
        <p>Get Genre Component</p>
    </div>
  )

}

export default GetGenre;






