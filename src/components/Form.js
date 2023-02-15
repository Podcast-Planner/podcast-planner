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
  const [isChecked, setIsChecked] = useState({});
  const [genreSelections, setGenreSelections] = useState([]);

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
    // Dupe of genreSelections array to update based on user selections, and pass in setGenreSelections
    let newArray = genreSelections;
    // Variable used to find selected ID in newArray and remove it if un-checked by user.
    const index = newArray.indexOf(e.target.id);

    // Change checkbox's checked state and update selected genres when you check and uncheck an input
    if (!isChecked[e.target.id]) {
      // If checkbox is not checked, set to checked and push genre ID to newArray
      setIsChecked({
        ...isChecked,
        [e.target.id]: true,
      });
      newArray.push(e.target.id);
    } else {
      // If checkbox IS checked, set to !checked and remove genre ID from newArray if it has been previously checked.
      setIsChecked({
        ...isChecked,
        [e.target.id]: false,
      });
      if (index > -1) {
        newArray.splice(index, 1);
      }
    }

    // Update user selections by passing newArray as argument
    setGenreSelections(newArray);

    // Update form values based on user selections
    setFormValues({
      ...formValues,
      // Change our array of user selections into a single comma-separated string to be read by the API
      genreId: genreSelections.toString(),
      // Go into our genre array and find the object that matches the first genreID in our user selection array. Once it is found, give us the name of the genre to be displayed in our title.
      title: `${formValues.length} minutes of ${
        genresArray.find((index) => index.id === parseInt(genreSelections[0]))
          .name
      }${genreSelections.length > 1 ? " & More" : ""}`,
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
      <form className="form">
        {next ? (
          <div className="box" id="dropdown">
            <h2 className="subHeading">
              Find your perfect{" "}
              <span className="newLine">podcast playlist.</span>
            </h2>
            <label htmlFor="podcastSelector">Select Your Genres:</label>
            {genresArray &&
              genresArray.map((genreArray) => (
                <div key={genreArray.id}>
                  <label htmlFor={genreArray.id}>{genreArray.name}</label>
                  <input
                    id={genreArray.id}
                    name={genreArray.name}
                    type="checkbox"
                    value={genreArray.id}
                    onChange={handleFormChange}
                  />
                </div>
              ))}
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
