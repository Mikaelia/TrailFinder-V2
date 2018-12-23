import React, { Component } from "react";
import Spinner from "./Spinner";
import MapWithMarker from "./MapWithMarker";

// import MyFancyComponent from "./Map";

class Mapview extends Component {
  _isMounted = false;

  state = {
    latitude: 0,
    longitude: 0,
    isMarkerShown: false,
    showMap: true
  };

  componentDidMount() {
    this._isMounted = true;
    this.getGeoLocation();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.isMarkerShown !== nextState.isMarkerShown;
  };

  // Queries geolocation API and returns Position object
  // Success/fail callback invoked
  getGeoLocation = () => {
    const geo = navigator.geolocation;
    geo &&
      geo.getCurrentPosition(
        position => this.setCurrentPosition(position),
        err => console.warn(`ERROR(${err.code}): ${err.message}`)
      );
  };

  setCurrentPosition = position => {
    const { coords } = position;
    this.setState({
      isMarkerShown: true,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  renderMap = () => {
    const { latitude, longitude, isMarkerShown } = this.state;
    console.log("ping!");
    return (
      isMarkerShown && (
        <div className="map-container">
          <MapWithMarker latitude={latitude} longitude={longitude} />
          I'm Your Future Map!
        </div>
      )
    );
  };

  renderLoadingState = () => <Spinner />;

  render() {
    const { showMap } = this.state;
    return <div>{showMap ? this.renderMap() : this.renderLoadingState()}</div>;
  }
}
export default Mapview;
