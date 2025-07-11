// src/Components/Header.jsx
import React from 'react';
import './header.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaHome, FaUserFriends } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();

  const adminName = localStorage.getItem('adminName') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-title">Super Admin Panel</h1>
        <ul className="nav-links-header">
          <li>
            <NavLink to="/flatDetails">
              <FaHome className="nav-icon" /> Flats
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdetails">
              <FaUserFriends className="nav-icon" /> Users
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header-right">
        <span className="admin-name">Welcome, {adminName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="logout-icon" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
