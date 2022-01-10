import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import AuthFormModal from '../AuthFormModal';
import logo from '../../assets/lvlup-full-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        {/* <SignupFormModal /> */}
        <AuthFormModal />
      </>
    );
  }

  return (
    <ul className="nav">
      <li>
        <NavLink exact to="/" className="nav-home-link">
          {/* <i className="fas fa-home"></i> */}
          <img src={logo} alt="Levelup Logo" height="20px" />
        </NavLink>
      </li>
      <li className="nav-links">
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
