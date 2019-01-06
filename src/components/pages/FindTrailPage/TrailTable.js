import React from "react";
import v4 from "uuid";
import Trail from "./Trail";
import Spinner from "../../Spinner";

const TrailTable = ({ trails, geolocation, selectTrail, children }) => {
  const handlClick = trail => {
    trail.selected = !trail.selected;
    selectTrail(trail);
  };
  return (
    <div className="trail-container">
      {children}
      {trails ? (
        trails.map(trail => (
          <Trail
            key={v4()}
            trail={trail}
            geolocation={geolocation}
            onClick={() => handlClick(trail)}
            selected={trail.selected}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default TrailTable;
