import React from "react";
import v4 from "uuid";
import Trail from "./Trail";
import Spinner from "../../Spinner";

const TrailTable = ({ trails }) => {
  return (
    <div className="trail-container">
      {trails ? (
        trails.map(trail => <Trail key={v4()} trail={trail} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default TrailTable;
