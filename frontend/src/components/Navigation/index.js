import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="nav-auth-link">Log in</NavLink>
        <NavLink to="/signup" className="nav-auth-link">Sign up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav">
      <li>
        <NavLink exact to="/" className="nav-home-link">
          <i className="fas fa-home"></i>
        </NavLink>
      </li>
      <li className="nav-links">
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
