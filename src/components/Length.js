import SwipeLeft from "./SwipeLeft";

const Length = ({ formValues, handleLengthInputChange, handleNextClick }) => {
  return (
    <SwipeLeft>
      <div className="box lengthContainer">
        <h2 className="subHeading">Find your perfect podcast playlist</h2>
        <legend>How long will your walk be?</legend>
        <label>{formValues.length} Minutes</label>
        <input
          type="range"
          id="length"
          min="5"
          max="60"
          defaultValue="5"
          onChange={handleLengthInputChange}
        />
        <button className="next" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </SwipeLeft>
  );
};

export default Length;
