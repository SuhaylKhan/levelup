import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <div>{user.username}</div>
      <button
        className={showMenu ? "menu-button active" : "menu-button"}
        onClick={openMenu}
      >
        <i className="fas fa-chevron-down"></i>
      </button>
      <ul
        className={showMenu ? "profile-dropdown showing" : "profile-dropdown"}
      >
        <li>
          <button onClick={() => history.push(`/users/${user.id}`)} className="nav-auth-link button">
            Your profile
          </button>
        </li>
        <li>
          <button onClick={logout} className="fake-button">
            Log out
          </button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
