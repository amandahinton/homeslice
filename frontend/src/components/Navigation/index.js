import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  let pageLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
    pageLinks = (
      <div className="navLinks">
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/homes">Your home  </NavLink>
        </div>
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/events/1">Add tasks  </NavLink>
        </div>
      </div>
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
        {isLoaded && pageLinks}
      </div>
      {/* <div className="navLinks">
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/homes">Your home  </NavLink>
        </div>
        <div className="pageNavLink">
          <NavLink activeStyle={{ color: 'orange' }} exact to="/events/1">Add tasks  </NavLink>
        </div>
      </div> */}

      <div className="logoNavLink">
        <NavLink exact to="/"><img className="navLogo" src="/homeslice_logo.png" alt="logo" /></NavLink>
      </div>

      <div  className="buttonNavLinks">
          {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
