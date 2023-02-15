import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Form = ({ formValues, setFormValues }) => {
  // Setting state with our application
  const [genres, setGenres] = useState([]);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
  const handleLengthInputChange = (e) => {
    setFormValues({ ...formValues, length: parseInt(e.target.value) });
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      genre: e.target.selectedOptions[0].innerText,
      genreId: e.target.value,
      title: `${formValues.length} mintues of ${e.target.selectedOptions[0].innerText}`
    });
  };
  //  Array.from
  const genresArray = genres.genres;

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/");
  };


  const handleNextClick = (e) => {
    e.preventDefault();
    setNext(true);
  };


  return (
    <>
      <form className='form'>
        {next ? (
          <div className="box" id="dropdown">
            <label htmlFor="podcastSelector" className="hidden">
              Podcast
            </label>
            <h2 className="subHeading">
              Find your perfect{" "}
              <span className="newLine">podcast playlist.</span>
            </h2>
            <select
              className="dropdownMenu"
              onChange={handleFormChange}
              defaultValue=""
            >
              <option value="" disabled>
                {" "}
                -- What genre? --
              </option>
              {genresArray &&
                genresArray.map((genreArray) => (
                  <option key={genreArray.id} value={genreArray.id}>
                    {genreArray.name}
                  </option>
                ))}
            </select>
            <div className="buttons">
              <button className="back" onClick={handleBackClick}>
                Back
              </button>
              <button
                className="create"
                onClick={() => navigate("/new-playlist")}
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          <div className="box" id="input">
            <h2 className="subHeading">Find your perfect podcast playlist.</h2>
            <div className="flex">
              <label htmlFor="length">How long will your walk be?</label>
              <p>{formValues.length} Minutes</p>
              <input
                type="range"
                id="length"
                min="5"
                max="60"
                defaultValue="5"
                onChange={handleLengthInputChange}
              />
            </div>
            <button className="next" onClick={handleNextClick}>
              Next
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
