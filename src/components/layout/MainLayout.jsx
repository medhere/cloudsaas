import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from './TopNavbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
