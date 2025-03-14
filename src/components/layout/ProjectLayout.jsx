import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import ProjectSidebar from './ProjectSidebar';

const ProjectLayout = () => {
  const { projectId } = useParams();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <ProjectSidebar projectId={projectId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
