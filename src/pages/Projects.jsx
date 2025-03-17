import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  
  const projects = [
    { id: 1, name: 'E-commerce Platform', status: 'Running', type: 'Node.js', slug: 'ecommerce-platform' },
    { id: 2, name: 'Marketing Website', status: 'Running', type: 'Static', slug: 'marketing-website' },
    { id: 3, name: 'API Server', status: 'Running', type: 'Python', slug: 'api-server' },
    { id: 4, name: 'Admin Dashboard', status: 'Stopped', type: 'React', slug: 'admin-dashboard' },
    { id: 5, name: 'Mobile Backend', status: 'Running', type: 'Node.js', slug: 'mobile-backend' },
  ];

  const handleProjectClick = (slug) => {
    navigate(`/project/${slug}`);
  };

  const handleMoreClick = (e, projectId) => {
    e.stopPropagation(); // Prevent card click event from triggering
    // Handle more button click (e.g., show dropdown menu)
    console.log(`More options for project ${projectId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link 
          to="./create"
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>New Project</span>
        </Link>
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="p-4 transition-shadow duration-200 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={(e) => handleMoreClick(e, project.id)}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  project.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
                <span className="text-sm text-gray-500">{project.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
