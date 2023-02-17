import SwipeRight from "./SwipeRight";

const Genre = ({
  genresArray,
  handleFormChange,
  handleBackClick,
  navigate,
}) => {
  return (
    <SwipeRight>
      <div className="box" id="input">
        <h2 className="subHeading">Find your perfect podcast playlist.</h2>
        <legend htmlFor="podcastSelector">Select Your Genres:</legend>
        <ul className="genreContainer">
          {genresArray &&
            genresArray.map((genreArray) => (
              <li key={genreArray.id} className="genre">
                <input
                  id={genreArray.id}
                  name={genreArray.name}
                  type="checkbox"
                  value={genreArray.id}
                  onChange={handleFormChange}
                />
                <label htmlFor={genreArray.id}>{genreArray.name}</label>
              </li>
            ))}
        </ul>
        <div className="buttons">
          <button className="back" onClick={handleBackClick}>
            Back
          </button>
          <button className="create" onClick={() => navigate("/new-playlist")}>
            Create
          </button>
        </div>
      </div>
    </SwipeRight>
  );
};

export default Genre;
