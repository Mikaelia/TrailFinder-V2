import React from "react";

const Spinner = ({ theme }) => (
  <div className="bouncing-loader">
    <div className={`bouncing-loader__child  ${theme}`} />
    <div className={`bouncing-loader__child child--1  ${theme}`} />
    <div className={`bouncing-loader__child child--2  ${theme}`} />
  </div>
);
export default Spinner;
