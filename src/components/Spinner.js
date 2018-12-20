import React from "react";

const Spinner = ({ message = "" }) => (
  <div className="bouncing-loader">
    {message && <h3>{message}</h3>}
    <div className="bouncing-loader__child" />
    <div className="bouncing-loader__child child--1" />
    <div className="bouncing-loader__child child--2" />
  </div>
);
export default Spinner;
