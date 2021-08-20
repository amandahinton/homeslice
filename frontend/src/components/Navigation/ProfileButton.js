import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profileButton" onClick={openMenu}>
        <div className="userProfile">
          <i className="fas fa-user-circle" id="profileIcon"/>
          <p className="userProfileName">{user.username}</p>
        </div>
      </button>
      {showMenu && (
        <ul className="profileDropdown">
          <li className="profileDropdownData">{user.firstName} {user.lastName}</li>
          <li className="profileDropdownData">{user.email}</li>
          <li className="profileDropdownData">{user.phone}</li>
          <li>
            <button className="userProfileLogout"onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
