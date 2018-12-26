import MapWithMarker from "./pages/TrailFinder/MapWithMarker";

// import React, { Component } from "react";
// import Spinner from "./Spinner";
// import MapWithMarker from "./MapWithMarker";
// import TrailFetch from "./TrailFetch";
// import Helmet from "react-helmet";

// class Mapview extends Component {
//   _isMounted = false;

//   state = {
//     latitude: 0,
//     longitude: 0,
//     isMarkerShown: false,
//     showMap: true
//   };

//   componentDidMount() {
//     this._isMounted = true;
//     this.getGeoLocation();
//   }

//   shouldComponentUpdate = (nextProps, nextState) => {
//     return this.state.isMarkerShown !== nextState.isMarkerShown;
//   };

//   // Queries geolocation API and returns Position object
//   // Success/fail callback invoked
//   getGeoLocation = () => {
//     const geo = navigator.geolocation;
//     geo &&
//       geo.getCurrentPosition(
//         position => this._isMounted && this.setCurrentPosition(position),
//         err =>
//           this._isMounted && console.warn(`ERROR(${err.code}): ${err.message}`)
//       );
//   };

//   setCurrentPosition = position => {
//    this.props.setLocation(position)

//     // const { coords } = position;
//     // this.setState({
//     //   isMarkerShown: true,
//     //   latitude: coords.latitude,
//     //   longitude: coords.longitude
//     // });
//   };

//   renderMap = () => {
//     const { latitude, longitude, isMarkerShown } = this.state;
//     return (
//       isMarkerShown && (
//         <div className="map-container">
//           <MapWithMarker
//             latitude={latitude}
//             longitude={longitude}
//             handleLocationChange={this.handleLocationChange}
//           />
//         </div>
//       )
//     );
//   };
//   handleLocationChange = (latitude, longitude) => {
//     this.setState({ latitude, longitude });
//   };

//   renderLoadingState = () => <Spinner />;

//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   render() {
//     const { showMap, latitude, longitude } = this.state;
//     return (
//       <div className="map-view-page">
//         <Helmet
//           bodyAttributes={{
//             style: "background-color : rgba(255, 255, 255, 0.979)"
//           }}
//         />
//         {showMap ? this.renderMap() : this.renderLoadingState()}
//         <TrailFetch latitude={latitude} longitude={longitude} />
//       </div>
//     );
//   }
// }
// export default Mapview;

// MapWithMarker
//
// import React, { Component } from "react";
// import GoogleMapComponent from "./GoogleMapComponent";

// class MapWithMarker extends Component {
//   state = {
//     isMarkerShown: false,
//     onDragEnd: f => f,
//     onMarkerMounted: f => f,
//     newLat: 0,
//     newLng: 0
//   };

//   componentWillMount() {
//     const refs = {};
//     const { handleLocationChange } = this.props;

//     this.setState({
//       onMarkerMounted: ref => {
//         refs.marker = ref;
//       },

//       onDragEnd: () => {
//         // get position from map marker
//         const position = refs.marker.getPosition();
//         // store latitude and longitude in state
//         const newLat = parseFloat(position.lat());
//         const newLng = parseFloat(position.lng());

//         this.setState({ newLat, newLng });
//         handleLocationChange(newLat, newLng);
//       }
//     });
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true });
//     }, 1000);
//   };

//   componentDidMount() {
//     this.delayedShowMarker();
//   }

//   render() {
//     const {
//       isMarkerShown,
//       onDragEnd,
//       onMarkerMounted,
//       newLat,
//       newLng
//     } = this.state;

//     const { latitude, longitude } = this.props;

//     return (
//       // If marker moves, set position, else use geolocation
//       <GoogleMapComponent
//         isMarkerShown={isMarkerShown}
//         onDragEnd={onDragEnd}
//         onMarkerMounted={onMarkerMounted}
//         defaultCenter={
//           newLat && newLng
//             ? { lat: newLat, lng: newLng }
//             : { lat: latitude, lng: longitude }
//         }
//       />
//     );
//   }
// }
// export default MapWithMarker;
