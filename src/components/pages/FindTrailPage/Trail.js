/*
ascent: 996
conditionDate: "1970-01-01 00:00:00"
conditionDetails: null
conditionStatus: "Unknown"
descent: -996
difficulty: "blue"
high: 534
id: 7001511
imgMedium: "https://cdn-files.apstatic.com/hike/7006875_medium_1441144829.jpg"
imgSmall: "https://cdn-files.apstatic.com/hike/7006875_small_1441144829.jpg"
imgSmallMed: "https://cdn-files.apstatic.com/hike/7006875_smallMed_1441144829.jpg"
imgSqSmall: "https://cdn-files.apstatic.com/hike/7006875_sqsmall_1441144829.jpg"
latitude: 38.1891
length: 9.8
location: "Inverness, California"
longitude: -122.9543
low: 83
name: "Tomales Point Trail"
starVotes: 44
stars: 4.6
summary: "A trail with spectacular coastal views and probable elk sightings."
type: "Featured Hike"
url: "https://www.hikingproject.com/trail/7001511/tomales-point-trail"
*/

import React from "react";

const Trail = ({ trail, calcDistanceToTrail }) => {
  const distanceToUser = calcDistanceToTrail({
    latitude: trail.latitude,
    longitude: trail.longitude
  });

  return (
    <div className="trail">
      <h2 className="trail__header">{trail.name}</h2>
      <div className="trail__features">
        <h4 className="trail__feature trail__location">{trail.location}</h4>
        <div className="trail__feature trail__distance-to-user">
          {distanceToUser}
        </div>
        <div className="trail__feature trail__length">
          Length: {trail.length} miles
        </div>
        <div className={`trail__feature`}>
          Difficulty:
          <span
            className={`trail__difficulty difficulty--${trail.difficulty}`}
          />
        </div>
        <div className="trail__feature trail__feature">
          Rating: {trail.stars}, Votes: {trail.starVotes}
        </div>
        <div className="trail__feature trail__summary">{trail.summary}</div>
      </div>
    </div>
  );
};
export default Trail;
