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
    const value = parseInt(e.target.value);
    const name = e.target.name;
    this.setState({ [name]: value });
    console.log(e.target.value);
    console.log(this.state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { onTrailFiltersSubmit } = this.props;
    onTrailFiltersSubmit(this.state);
  };

  render() {
    const { maxDistance, maxResults, minLength, minStars } = this.state;
    return (
      <div className="trail-filter-section">
        <form onSubmit={this.onSubmit} className="trail-filter-form">
          <label className="trail-filter trail-filter--distance">
            Distance to Trailhead
            <input
              type="range"
              name="maxDistance"
              min="0"
              max="200"
              defaultValue="30"
              step="10"
              onChange={this.handleChange}
            />
            <p>
              <span> {maxDistance}</span> miles max to trail
            </p>
          </label>
          <label className="trail-filter trail-filter--maxResults">
            Max Results
            <input
              type="range"
              name="maxResults"
              min="10"
              max="500"
              defaultValue="15"
              step="10"
              onChange={this.handleChange}
            />
            <p>
              # Trails returned: <span> {maxResults}</span>
            </p>
          </label>
          <label className="trail-filter trail-filter--minLength">
            Min Trail Length
            <input
              type="range"
              name="minLength"
              min="0"
              max="100"
              defaultValue="0"
              step="1"
              onChange={this.handleChange}
            />
            <p>
              At least <span> {minLength}</span> miles long
            </p>
          </label>
          <label className="trail-filter trail-filter--starRating">
            Star Rating
            <input
              type="range"
              name="minStars"
              min="0"
              max="4"
              defaultValue="0"
              step="1"
              onChange={this.handleChange}
            />
            <p>
              Rated <span>{minStars}+ </span> stars
            </p>
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
