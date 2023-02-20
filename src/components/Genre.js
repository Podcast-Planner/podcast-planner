import SwipeRight from "./SwipeRight";

const Genre = ({
  genresArray,
  handleFormChange,
  handleBackClick,
  navigate,
  genreSelections
}) => {
  return (
    <SwipeRight>
      <div className="box" id="input">
        <h2 className="subHeading">Find your perfect podcast playlist</h2>
        <legend htmlFor="podcastSelector">Select Your Genres:</legend>
        <ul className="genreContainer">
          {
            genresArray.map((genreArray) => (
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
        <div className="buttons">
          <button type="button" className="back" onClick={handleBackClick}>
            Back
          </button>
          <button type="submit" className='create' disabled={ genreSelections[0] ? false : true} onClick={() => navigate("/new-playlist")}>
            Create
          </button>
        </div>
      </div>
    </SwipeRight>
  );
};

export default Genre;
