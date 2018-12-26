import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

class MapWithMarker extends Component {
  state = {
    isMarkerShown: false,
    onDragEnd: f => f,
    onMarkerMounted: f => f
  };

  componentWillMount() {
    const refs = {};
    const { handleLocationChange } = this.props;

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
        handleLocationChange(newLat, newLng);
      }
    });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1000);
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  render() {
    const { isMarkerShown, onDragEnd, onMarkerMounted } = this.state;
    const { latitude, longitude } = this.props;

    return (
      <GoogleMapComponent
        isMarkerShown={isMarkerShown}
        onDragEnd={onDragEnd}
        onMarkerMounted={onMarkerMounted}
        defaultCenter={{ lat: latitude, lng: longitude }}
      />
    );
  }
}
export default MapWithMarker;
