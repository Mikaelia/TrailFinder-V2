import React, { Component } from "react";
import Trail from "./pages/FindTrailPage/Trail";
import v4 from "uuid";
import { db } from "../base";
import Helmet from "react-helmet";
import Spinner from "./Spinner";

class Trailmarks extends Component {
  state = {
    trails: null,
    latitude: null,
    longitude: null
  };

  componentWillMount = () => {
    db.collection("trails")
      .get()
      .then(snapshot => {
        let trails = snapshot.docs.map(item => item.data());
        this.setState({ trails });
      });
  };

  renderTrails = trails =>
    trails.length !== 0 ? (
      <ul className="trailmarks">
        {trails.map(trail => (
          <Trail key={v4()} trail={trail} />
        ))}
      </ul>
    ) : (
      <h1
        style={{ position: "absolute", top: "50%", left: "calc(50% - 16rem)" }}
      >
        No trails saved. Go find some!
      </h1>
    );

  render() {
    const { trails } = this.state;
    const list = (trails && this.renderTrails(trails)) || <Spinner />;
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style: "background-color : rgba(255, 255, 255, 0.979)"
          }}
        />
        <div className="trailmarks-page">
          <h1 className="trailmarks__header">Trailmarks</h1>
          {list}
        </div>
      </div>
    );
  }
}
export default Trailmarks;
