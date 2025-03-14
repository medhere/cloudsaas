import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import AppSidebar from './AppSidebar';

const AppLayout = () => {
  const { projectId, appId } = useParams();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar projectId={projectId} appId={appId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
