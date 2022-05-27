import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">Logo</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <button className="btn btn-small" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
