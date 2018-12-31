import React, { Component } from "react";
import axios from "axios";
import Helmet from "react-helmet";
import MapSection from "./MapSection";
import TrailTable from "./TrailTable";
import Spinner from "../../Spinner";
import TrailFilterSection from "./TrailFilterSection";

import { getGeoLocation } from "../../../helpers/geolocation";
import { calcDistanceToTrail } from "../../../helpers/distanceToTrail";
import geolib from "geolib";
import { db } from "../../../base";

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
    savedTrails: null,
    selectedTrails: [],
    geolocation: null,
    latitude: null,
    longitude: null,
    trailResults: null,
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
    this.setState({ isLoading: true });
    getGeoLocation(this.setLocation);

    //retrieve saved trails from firebase
    db.collection("trails")
      .get()
      .then(snapshot => {
        let trails = snapshot.docs.map(item => item.data());
        this.setState({ savedTrails: trails });
      });
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
      .then(result => {
        const trails = result.data.trails.map(trail => ({
          ...trail,
          selected: false
        }));
        this._isMounted &&
          this.setState({ trailResults: trails, isLoading: false });
      })
      .catch(error => this._isMounted && this.setState({ error }));
  };

  onSelectTrail = trail => {
    const { trailResults, savedTrails } = this.state;
    // make sure trail not already saved
    const unsavedTrail = savedTrails.every(
      dbTrail => dbTrail.name !== trail.name
    );
    const updatedTrails =
      (unsavedTrail &&
        trailResults.map((storedTrail, i) =>
          trail.id === storedTrail.id
            ? { ...trail, selected: !this.state.trails[i].selected }
            : storedTrail
        )) ||
      savedTrails;

    // Add selected trail to state
    this.setState({
      trails: updatedTrails
    });
  };
  onSaveTrails = () => {
    const { trailResults } = this.state;
    const selectedTrails = trailResults.filter(trail => trail.selected);
    selectedTrails.map(trail => db.collection("trails").add(trail));
  };

  render() {
    const {
      latitude,
      longitude,
      isLoading,
      trailResults,
      geolocation
    } = this.state;
    console.log(latitude, longitude, trailResults);
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
                geolocation={geolocation}
                trails={trailResults}
                selectTrail={this.onSelectTrail}
              >
                <button onClick={this.onSaveTrails}>Save Trails</button>
              </TrailTable>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FindTrailPage;
