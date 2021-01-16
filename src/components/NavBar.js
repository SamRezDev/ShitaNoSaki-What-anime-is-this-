import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="Title">
        <NavLink to="/Home">
          {" "}
          <h2 className="TitleName"> Shita no saki 舌の先 </h2>{" "}
        </NavLink>{" "}
        <span> TN: What anime is this?</span>
      </div>
      <ul>
        <li>
          {" "}
          <NavLink to="/About">ABOUT</NavLink>
        </li>
      </ul>
    </div>
  );
}
