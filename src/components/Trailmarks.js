import React, { Component } from "react";
import Trail from "./pages/FindTrailPage/Trail";
import { Link } from "react-router-dom";
import v4 from "uuid";
import { db } from "../base";
import Helmet from "react-helmet";
import Spinner from "./Spinner";
import { RemoveButton } from "./RemoveButton";

class Trailmarks extends Component {
  state = {
    trails: null,
    latitude: null,
    longitude: null
  };

  componentWillMount = () => this.updateTrails();

  // real-time firebase listener
  updateTrails = () => {
    let trails = [];
    db.collection("trails")
      .orderBy("location")
      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            const id = change.doc.id;
            let trail = change.doc.data();
            trail.id = id;
            trails.push(trail);
          }
        });
        this.setState({
          trails
        });
      });
  };

  handleClick = id => {
    db.collection("trails")
      .doc(id)
      .delete()
      .then(this.updateTrails)
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  renderTrails = trails =>
    trails.length !== 0 ? (
      <ul className="trailmarks">
        {trails.map(trail => (
          <Trail key={v4()} trail={trail}>
            <RemoveButton
              classname="remove-trail-button"
              style={{
                width: "1rem",
                height: "1rem"
              }}
              onClick={() => this.handleClick(trail.id)}
            />
            <div className="trail-information-button">
              <Link
                className="trail-detail-link"
                to={`/trail/${trail.id}`}
                style={{
                  textDecoration: "none",
                  color: "black"
                }}
              >
                <span>
                  Details
                  <i
                    className="fas fa-angle-double-right fa-lg"
                    style={{
                      display: "inline",
                      color: "blue"
                    }}
                  />
                </span>
              </Link>
            </div>
          </Trail>
        ))}
      </ul>
    ) : (
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "calc(50% - 16rem)"
        }}
      >
        No trails saved.Go find some!
      </h1>
    );

  render() {
    const { trails } = this.state;
    console.log(trails);
    const list = (trails && this.renderTrails(trails)) || <Spinner />;
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style: "background-color : rgba(255, 255, 255, 0.979)"
          }}
        />
        <div className="trailmarks-page">
          <h1 className="trailmarks__header"> Trailmarks </h1> {list}{" "}
        </div>
      </div>
    );
  }
}

export default Trailmarks;
