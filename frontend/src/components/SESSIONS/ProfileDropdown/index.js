import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import UserIconInactive from '../../../assets/UserIconNoHover.png'
import UserIconActive from '../../../assets/UserIconHover.png'
import { useDispatch } from 'react-redux';
import './ProfileDropdown.css'
import { Redirect } from 'react-router-dom';


function ProfileDropdown({ user }) {
  // const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    window.location.href =`/`
  };

  return (
  <div className="logged-in-dropdown">
      <button 
        // className="logged-in-drop-button"
        className="nav-icon"
        onMouseOver={e => (setIsHover(true))} 
        onMouseOut={e => (setIsHover(false))}
        onClick={e => (setIsHover(true))}
      >
        <img className="nav-icon"
          src={isHover ? UserIconActive : UserIconInactive}
        />  
        <br />
        <label htmlFor="logged-in-dropdown-content">
          Profile
        </label>
      </button>
      <div className="logged-in-dropdown-content" id="logged-in-dropdown-content">
          <p className="dropdown-link" id="greeting-dropdown">
            Welcome back, {user.username}
          </p>
        <a className="dropdown-link" onClick={logout} id="log-out-button">Log Out</a>
      </div>
    </div>
  )
}

export default ProfileDropdown;