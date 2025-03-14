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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link 
          to="/projects/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Project</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg text-gray-900">{project.name}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={(e) => handleMoreClick(e, project.id)}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
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
