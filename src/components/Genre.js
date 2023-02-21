import SwipeRight from "./SwipeRight";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Genre = ({
  genresArray,
  handleFormChange,
  handleBackClick,
  navigate,
  genreSelections,
}) => {
  const noGenre = withReactContent(Swal);

  const handleNoGenre = (e) => {
    e.preventDefault();
    noGenre.fire({
      title: <h3>Please Select a Genre</h3>,
      icon: "warning",
      confirmButtonColor: "#0e444f",
      confirmButtonText: "Okay!",
    });
  };

  return (
    <SwipeRight>
      <div className="box" id="input">
        <h2 className="subHeading">Find your perfect podcast playlist</h2>
        <div className="buttons">
          <button type="button" className="back" onClick={handleBackClick}>
            Back
          </button>
          <button
            type="submit"
            className="create"
            onClick={
              !genreSelections.length
                ? (e) => handleNoGenre(e)
                : () => navigate("/new-playlist")
            }
          >
            Create
          </button>
        </div>
        <legend>Select Your Genres:</legend>
        <ul className="genreContainer">
          {genresArray.map((genreArray) => (
            <li key={genreArray.id} className="genre">
              <input
                id={genreArray.id}
                name={genreArray.name}
                type="checkbox"
                value={genreArray.id}
                onChange={handleFormChange}
                aria-checked="false"
              />
              <label htmlFor={genreArray.id}>{genreArray.name}</label>
            </li>
          ))}
        </ul>
      </div>
    </SwipeRight>
  );
};

export default Genre;
