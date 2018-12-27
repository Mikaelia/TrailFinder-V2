import React, { Component } from "react";
import axios from "axios";
import Helmet from "react-helmet";
import MapSection from "./MapSection";
import TrailTable from "./TrailTable";
import Spinner from "../../Spinner";
import TrailFilterSection from "./TrailFilterSection";

import { getGeoLocation } from "../../../helpers/geolocation";
import geolib from "geolib";

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
    geolocation: null,
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
        geolocation: {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      () => this.fetchNearbyHikingTrails(this.state)
    );
  };

  updateLocation = (latitude, longitude) => {
    this.setState({ latitude, longitude }, () =>
      this.fetchNearbyHikingTrails(this.state)
    );
  };

  onTrailFiltersSubmit = params => {
    this.setState(
      {
        ...this.state,
        ...params
      },
      () => this.fetchNearbyHikingTrails(this.state)
    );
  };

  fetchNearbyHikingTrails = state => {
    const {
      latitude,
      longitude,
      maxDistance,
      maxResults,
      sortBy,
      minLength,
      minStars
    } = state;
    this.setState({ isLoading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_LAT}${latitude}&${PARAM_LON}${longitude}&${PARAM_MAXDISTANCE}${maxDistance}&${PARAM_MAXRESULTS}${maxResults}&${PARAM_SORTBY}${sortBy}&${PARAM_MINLENGTH}${minLength}&${PARAM_MINSTARS}${minStars}&${API_KEY}`
    )
      .then(
        result =>
          this._isMounted &&
          this.setState({ results: result.data.trails, isLoading: false })
      )
      .catch(error => this._isMounted && this.setState({ error }));
  };

  calcDistanceToTrail = trailLocation => {
    const { geolocation } = this.state;
    return `${geolib.convertUnit(
      "mi",
      geolib.getDistance(trailLocation, geolocation),
      2
    )}
    miles away`;
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
          <TrailFilterSection
            onTrailFiltersSubmit={this.onTrailFiltersSubmit}
          />
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
              <TrailTable
                calcDistanceToTrail={this.calcDistanceToTrail}
                trails={results}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FindTrailPage;
