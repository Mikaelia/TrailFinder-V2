import geolib from "geolib";

export const calcDistanceToTrail = (trailLocation, geolocation) => {
  return `${geolib.convertUnit(
    "mi",
    geolib.getDistance(trailLocation, geolocation),
    2
  )}
    miles away`;
};
