export const getGeoLocation = setCurrentPosition => {
  const geo = navigator.geolocation;
  geo &&
    geo.getCurrentPosition(
      position => setCurrentPosition(position),
      err => console.warn(`ERROR(${err.code}): ${err.message}`)
    );
};
