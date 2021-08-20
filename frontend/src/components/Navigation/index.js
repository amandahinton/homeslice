import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <SignupFormModal />
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="navDiv">

      <div className="navLinks">
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/homes">Homes  </NavLink>
        </div>
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/events">Events  </NavLink>
        </div>
      </div>

      <div  className="logoNavLink">
        <NavLink exact to="/"><img className="navLogo" src="/homeslice_logo.png" alt="logo" /></NavLink>
      </div>

      <div  className="buttonNavLinks">
          {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
