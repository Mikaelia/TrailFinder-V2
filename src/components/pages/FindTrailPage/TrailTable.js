import React from "react";
import v4 from "uuid";
import Trail from "./Trail";
import Spinner from "../../Spinner";

const TrailTable = ({ trails, geolocation, selectTrail, children }) => {
  return (
    <div className="trail-container">
      {children}
      {trails ? (
        trails.map(trail => (
          <Trail
            key={v4()}
            trail={trail}
            geolocation={geolocation}
            onClick={() => selectTrail(trail)}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default TrailTable;
