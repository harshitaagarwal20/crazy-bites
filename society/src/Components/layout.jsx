// src/Layout/Layout.jsx
import React from 'react';
import Sidebar from './sidevbar';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh',  }}>
      <Sidebar />
      <div style={{  display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{  overflowY: 'auto', padding: '20px', paddingLeft: '300px',width:'1030px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
