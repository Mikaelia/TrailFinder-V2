import React from "react";
import { Cross } from "./LayoutIcons";

export const RemoveButton = ({ onClick, style = {} }) => (
  <button className="btn-remove" onClick={onClick}>
    <Cross style={style} />
  </button>
);
