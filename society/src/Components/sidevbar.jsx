import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import {
  FaBuilding,
  FaMoneyBill,
  FaWrench,
  FaSwimmingPool,
  FaHome,
  FaUserFriends,
  FaStickyNote,
  FaUserTie,
  FaUserCheck,
  FaParking,
  FaCommentDots
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Society Admin</h2>
      <ul className="nav-links">
        <li><NavLink to="/society"><FaBuilding /> Societies</NavLink></li>
        <li><NavLink to="/transaction"><FaMoneyBill /> Transactions</NavLink></li>
        <li><NavLink to="/maintenance"><FaWrench /> Maintenance</NavLink></li>
        <li><NavLink to="/amenity"><FaSwimmingPool /> Amenities</NavLink></li>
       
        <li><NavLink to="/notice"><FaStickyNote /> Notices</NavLink></li>
        <li><NavLink to="/flatUser"><FaUserTie /> FlatUser</NavLink></li>
        <li><NavLink to="/visitor"><FaUserCheck /> Visitors</NavLink></li>
        <li><NavLink to="/parking"><FaParking /> Parking</NavLink></li>
        <li><NavLink to="/complaint"><FaCommentDots /> Complaints</NavLink></li>
      </ul>
    </div>
  );
}
