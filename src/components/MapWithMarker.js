import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

class MapWithMarker extends Component {
  state = {
    isMarkerShown: false,
    onDragEnd: f => f,
    onMarkerMounted: f => f,
    newLat: 0,
    newLng: 0
  };

  componentWillMount() {
    const refs = {};

    this.setState({
      onMarkerMounted: ref => {
        refs.marker = ref;
      },

      onDragEnd: () => {
        // get position from map marker
        const position = refs.marker.getPosition();
        // store latitude and longitude in state
        const newLat = parseFloat(position.lat());
        const newLng = parseFloat(position.lng());

        this.setState({ newLat, newLng });
      }
    });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  render() {
    const {
      isMarkerShown,
      onDragEnd,
      onMarkerMounted,
      newLat,
      newLng
    } = this.state;

    const { latitude, longitude } = this.props;

    return (
      // If marker moves, set position, else use geolocation
      <GoogleMapComponent
        isMarkerShown={isMarkerShown}
        onDragEnd={onDragEnd}
        onMarkerMounted={onMarkerMounted}
        defaultCenter={
          newLat && newLng
            ? { lat: newLat, lng: newLng }
            : { lat: latitude, lng: longitude }
        }
      />
    );
  }
}
export default MapWithMarker;
