import { useState, useEffect } from "react";
import axios from "axios";


const GenreApi = ({isLoading}) => {
  const [genre, setGenre] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
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
        isLoading(false);
      }
    };
    fetchGenre();
  }, []);



  return (
    <div>
      {/* Pass the Genre list to the Select drop down list of genres */}
      {/* <selectMenu data={genre} /> */}
    </div>
  );
};

export default GenreApi;
