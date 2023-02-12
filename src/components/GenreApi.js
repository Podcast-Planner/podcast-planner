import { useState, useEffect } from "react";
import axios from "axios";
import Playlist from "./Playlist";
import Loader from "./Loader";

const GenreApi = () => {
  const [genre, setGenre] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://listen-api.listennotes.com/api/v2/genres",
          {
            headers: {
              "X-ListenAPI-Key": "9a92e5d7fee14b86ad0d4bf6c532f35e",
            },
            params: {
              top_level_only: 1,
            },
          }
        );
        // console.log(response.data);
        setGenre(response.data);
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
  // console.log(error.message)

  return (
    <div>
      {/* Pass the Genre list to the Select drop down list of genres */}
      {/* <selectMenu data={genre} /> */}
    </div>
  );
};

export default GenreApi;
