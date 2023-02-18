import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ScrollToTop from "./ScrollToTop";
import PageFade from "./PageFade";
import Length from "./Length";
import Genre from "./Genre";

const Form = ({ formValues, setFormValues, headerRef }) => {
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
    setFormValues({ ...formValues, length: 5 });
    setGenreSelections([]);
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
    localStorage.setItem('offset', 0);
  };
  //  Array.from
  const genresArray = genres.genres;

  const handleBackClick = (e) => {
    e.preventDefault();
    setNext(false);
    setFormValues({ ...formValues, length: 5 });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setNext(true);
  };

  return (
    <PageFade>
      <form className="form">
        {next ? (
          <Genre
            genresArray={genresArray}
            handleFormChange={handleFormChange}
            handleBackClick={handleBackClick}
            navigate={navigate}
            genreSelections={genreSelections}
          />
        ) : (
          <Length
            formValues={formValues}
            handleLengthInputChange={handleLengthInputChange}
            handleNextClick={handleNextClick}
          />
        )}
      </form>
      <ScrollToTop headerRef={headerRef} />
    </PageFade>
  );
};

export default Form;
