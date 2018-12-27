import React, { Component } from "react";
import axios from "axios";
import Helmet from "react-helmet";
import MapSection from "./MapSection";
import TrailTable from "./TrailTable";
import Spinner from "../../Spinner";
import TrailFilterSection from "./TrailFilterSection";

import { getGeoLocation } from "../../../helpers/geolocation";

import {
  API_KEY,
  DEFAULT_LOCATION,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_LON,
  PARAM_LAT,
  PARAM_MAXDISTANCE, //30-200
  PARAM_MAXRESULTS, //10-500
  PARAM_SORTBY, //quality/distance
  PARAM_MINLENGTH, //default 0
  PARAM_MINSTARS // 0-4
} from "../../../constants";

class FindTrailPage extends Component {
  _isMounted = false;

  state = {
    defaultLocation: DEFAULT_LOCATION,
    latitude: null,
    longitude: null,
    results: null,
    error: null,
    isLoading: false,
    maxDistance: 30,
    maxResults: 15,
    sortBy: "quality",
    minLength: 0,
    minStars: 0
  };

  componentDidMount() {
    this._isMounted = true;
    getGeoLocation(this.setLocation);
    this.setState({ isLoading: true });
  }

  setLocation = position => {
    const { coords } = position;
    console.log("ping");
    this.setState(
      {
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      () =>
        this.fetchNearbyHikingTrails(this.state.latitude, this.state.longitude)
    );
  };

  updateLocation = (latitude, longitude) => {
    this.setState({ latitude, longitude }, () =>
      this.fetchNearbyHikingTrails(this.state.latitude, this.state.longitude)
    );
  };

  fetchNearbyHikingTrails = (lat, lon) => {
    const { maxDistance, maxResults, sortBy, minLength, minStars } = this.state;
    this.setState({ isLoading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_LAT}${lat}&${PARAM_LON}${lon}&${PARAM_MAXDISTANCE}${maxDistance}&${PARAM_MAXRESULTS}${maxResults}&${PARAM_SORTBY}${sortBy}&${PARAM_MINLENGTH}${minLength}&${PARAM_MINSTARS}${minStars}&${API_KEY}`
    )
      .then(
        result =>
          this._isMounted &&
          this.setState({ results: result.data.trails, isLoading: false })
      )
      .catch(error => this._isMounted && this.setState({ error }));
  };

  render() {
    const { latitude, longitude, isLoading, results } = this.state;
    console.log(latitude, longitude, results);
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style: "background-color : rgba(255, 255, 255, 0.979)"
          }}
        />
        <div className="find-trail-page">
          <TrailFilterSection />
          <div className="trail-map-section">
            {latitude && longitude && (
              <MapSection
                latitude={latitude}
                longitude={longitude}
                setLocation={this.setLocation}
                updateLocation={this.updateLocation}
              />
            )}
            {isLoading ? (
              <Spinner theme="light" />
            ) : (
              <TrailTable trails={results} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FindTrailPage;
