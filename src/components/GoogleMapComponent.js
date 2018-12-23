import React from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Specify own props to pass GoogleMap
const GoogleMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{
          height: `10rem`
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={props.defaultCenter}>
    {props.isMarkerShown && (
      <Marker
        position={props.defaultCenter}
        ref={props.onMarkerMounted}
        onDragEnd={props.onDragEnd}
        draggable
      />
    )}
  </GoogleMap>
));

export default GoogleMapComponent;
