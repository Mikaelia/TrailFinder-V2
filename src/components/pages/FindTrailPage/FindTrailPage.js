import React, { Component } from "react";
import axios from "axios";
import Helmet from "react-helmet";
import MapSection from "./MapSection";
import TrailTable from "./TrailTable";
import Spinner from "../../Spinner";
import TrailFilterSection from "./TrailFilterSection";

import { getGeoLocation } from "../../../helpers/geolocation";
import { db, app } from "../../../base";

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
    maxDistance: 30,
    maxResults: 15,
    sortBy: "quality",
    minLength: 0,
    minStars: 0,
    savedTrails: null,
    trailResults: null,
    selectedTrails: [],
    error: null,
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      isLoading: true
    });
    // retrieve and set current user's location
    getGeoLocation(this.setLocation);
    const user = app.auth().currentUser.email;

    //retrieve already saved trails from firebase
    db.collection("trails")
      .get()
      .then(snapshot => {
        let trails = snapshot.docs.filter(item => {
          return user === item.data().user;
        });
        this.setState({
          savedTrails: trails
        });
      });
  }

  // set initial location
  setLocation = position => {
    const { coords } = position;
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

  // Adjusts location based on map marker move
  updateLocation = (latitude, longitude) => {
    this.setState(
      {
        latitude,
        longitude
      },
      () => this.fetchNearbyHikingTrails(this.state)
    );
  };

  // fetch trails with user filters enabled
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
    this.setState({
      isLoading: true
    });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_LAT}${latitude}&${PARAM_LON}${longitude}&${PARAM_MAXDISTANCE}${maxDistance}&${PARAM_MAXRESULTS}${maxResults}&${PARAM_SORTBY}${sortBy}&${PARAM_MINLENGTH}${minLength}&${PARAM_MINSTARS}${minStars}&${API_KEY}`
    )
      .then(result => {
        const trails = result.data.trails;
        this._isMounted &&
          this.setState({
            trailResults: trails,
            isLoading: false
          });
      })
      .catch(
        error =>
          this._isMounted &&
          this.setState({
            error
          })
      );
  };

  onSelectTrail = selectedTrail => {
    const { savedTrails } = this.state;
    // assign "saved" or "unsaved" prop to selected trail
    selectedTrail["saved"] = !savedTrails.every(
      trail => trail.name !== selectedTrail.name
    );
    console.log("This trail is already saved?", selectedTrail.saved);
    if (selectedTrail.selected) {
      this.setState({
        selectedTrails: [...this.state.selectedTrails, selectedTrail]
      });
    } else {
      this.setState({
        selectedTrails: [
          this.state.selectedTrails.filter(
            trail => trail.id !== selectedTrail.id
          )
        ]
      });
    }
  };

  onSaveTrails = () => {
    // Get current user
    const user = app.auth().currentUser.email;
    const { selectedTrails } = this.state;
    // make sure trail not already saved
    const filteredTrails = selectedTrails.filter(trail => !trail.saved);
    console.log("filtered trails", filteredTrails);
    filteredTrails.map(trail =>
      // add user to trail prop
      db.collection("trails").add({ ...trail, user })
    );
    this.setState({
      selectedTrails: []
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      latitude,
      longitude,
      isLoading,
      trailResults,
      geolocation
    } = this.state;
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style: "background-color : #437A87"
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
              <div className="trail-list-section">
                <button
                  className="save-trail-button"
                  onClick={this.onSaveTrails}
                >
                  Save Trails
                </button>
                <TrailTable
                  geolocation={geolocation}
                  trails={trailResults}
                  selectTrail={this.onSelectTrail}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FindTrailPage;
