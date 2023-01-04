import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import UserIconInactive from '../../../assets/UserIconNoHover.png'
import UserIconActive from '../../../assets/UserIconHover.png'
import './ProfileButton.css'

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
      <div class="logged-in-dropdown">
      <button class="logged-in-drop-button">
        <img id="logged-in-profile-icon"
        alt=""
        src={UserIconInactive} 
        onMouseOver={((e) => e.target.src=UserIconActive)}
        onMouseOut={(e) => e.target.src=UserIconInactive}
        onClick={((e) => e.target.src=UserIconActive)}
        />  
        Menu
      </button>
      <div class="logged-in-dropdown-content" id="logged-in-dropdown-content">
          Welcome back, {user.username}
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
      
    </>
  );
}

export default ProfileButton;