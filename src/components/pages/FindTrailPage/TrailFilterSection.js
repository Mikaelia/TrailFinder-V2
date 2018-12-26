import React from "react";

const TrailFilterSection = () => (
  <div className="trail-filter-section">
    <form className="trail-filter-form">
      <label className="trail-filter__distance">
        Distance to trail
        <input type="range" name="maxDistance" min="30" max="200" />
      </label>
      <label className="trail-filter__maxResults">
        Max Results
        <input type="range" name="maxResults" min="10" max="500" />
      </label>
      <label className="trail-filter__minLength">
        Minimum Trail Length
        <input type="range" name="maxResults" min="0" max="500" />
      </label>
      <label className="trail-filter__starRating">
        Minimum Star Rating
        <input type="range" name="minStars" min="0" max="4" />
      </label>

      <input
        className="trail-filter__submit-button"
        type="submit"
        value="Submit"
      />
      <input className="trail-filter__reset-button" type="reset" />
    </form>
  </div>
);
export default TrailFilterSection;
