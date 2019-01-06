import React, { Component } from "react";
import Spinner from "../../Spinner";
import MapWithMarker from "./MapWithMarker";

class Mapview extends Component {
  _isMounted = false;

  state = {
    isMarkerShown: false,
    showMap: true
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isMarkerShown: true });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.isMarkerShown !== nextState.isMarkerShown;
  };

  handlePositionChange = (latitude, longitude) => {
    this._isMounted && this.props.updateLocation(latitude, longitude);
  };

  renderMap = () => {
    const { isMarkerShown } = this.state;
    const { latitude, longitude } = this.props;
    return (
      isMarkerShown && (
        <div className="map-container">
          <MapWithMarker
            latitude={latitude}
            longitude={longitude}
            handleLocationChange={this.handlePositionChange}
          />
        </div>
      )
    );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isMarkerShown } = this.state;
    return (
      <div className="map-view">
        {isMarkerShown ? this.renderMap() : <Spinner theme="dark" />}
      </div>
    );
  }
}
export default Mapview;
