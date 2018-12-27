import React, { Component } from "react";

class TrailFilterSection extends Component {
  state = {
    maxDistance: 30,
    maxResults: 15,
    minLength: 0,
    minStars: 0
  };

  handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
    console.log(e.target.value);
    console.log(this.state);
  };

  render() {
    const { maxDistance, maxResults, minLength, minStars } = this.state;
    return (
      <div className="trail-filter-section">
        <form className="trail-filter-form">
          <label className="trail-filter trail-filter--distance">
            Distance to trail
            <input
              type="range"
              name="maxDistance"
              min="30"
              max="200"
              defaultValue="30"
              step="10"
              onChange={this.handleChange}
            />
            Value: {maxDistance}
          </label>
          <label className="trail-filter trail-filter--maxResults">
            Max Results
            <input
              type="range"
              name="maxResults"
              min="10"
              max="500"
              value="15"
            />
          </label>
          <label className="trail-filter trail-filter--minLength">
            Minimum Trail Length
            <input type="range" name="minLength" min="0" max="500" value="0" />
          </label>
          <label className="trail-filter trail-filter--starRating">
            Minimum Star Rating
            <input type="range" name="minStars" min="0" max="4" value="0" />
          </label>

          <input
            className="trail-filter-form__submit-button"
            type="submit"
            value="Submit"
          />
          <input className="trail-filter-form__reset-button" type="reset" />
        </form>
      </div>
    );
  }
}
export default TrailFilterSection;
