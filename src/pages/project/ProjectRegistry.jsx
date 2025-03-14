import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Plus, Trash2, RefreshCw, Tag, Clock, Download, Upload, Copy } from 'lucide-react';

const ProjectRegistry = () => {
  const { projectId } = useParams();
  const [showAddRepositoryForm, setShowAddRepositoryForm] = useState(false);
  
  // Mock data for Docker registry repositories
  const [repositories, setRepositories] = useState([
    { 
      id: 1, 
      name: 'frontend-app', 
      tags: ['latest', 'v1.0.0', 'v1.1.0', 'staging'],
      pulls: 245,
      size: '1.2 GB',
      lastUpdated: '2 days ago'
    },
    { 
      id: 2, 
      name: 'backend-api', 
      tags: ['latest', 'v2.3.1', 'stable', 'dev'],
      pulls: 189,
      size: '850 MB',
      lastUpdated: '5 days ago'
    },
    { 
      id: 3, 
      name: 'database', 
      tags: ['latest', 'v1.0.0', 'postgres-13'],
      pulls: 78,
      size: '500 MB',
      lastUpdated: '1 week ago'
    },
    { 
      id: 4, 
      name: 'cache-service', 
      tags: ['latest', 'v1.2.0', 'redis-6'],
      pulls: 156,
      size: '120 MB',
      lastUpdated: '3 days ago'
    },
  ]);
  
  const handleAddRepository = (e) => {
    e.preventDefault();
    // Implementation would go here
    setShowAddRepositoryForm(false);
  };
  
  const handleDeleteRepository = (id) => {
    setRepositories(repositories.filter(repo => repo.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Docker Registry: {projectId}</h1>
        <button 
          onClick={() => setShowAddRepositoryForm(!showAddRepositoryForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Repository</span>
        </button>
      </div>
      
      {/* Registry Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Package className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Registry Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Repositories</p>
            <p className="text-2xl font-medium">{repositories.length}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Images</p>
            <p className="text-2xl font-medium">
              {repositories.reduce((total, repo) => total + repo.tags.length, 0)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Pulls</p>
            <p className="text-2xl font-medium">
              {repositories.reduce((total, repo) => total + repo.pulls, 0)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Storage Used</p>
            <p className="text-2xl font-medium">2.67 GB</p>
          </div>
        </div>
      </div>
      
      {/* Add Repository Form */}
      {showAddRepositoryForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Repository</h2>
          <form onSubmit={handleAddRepository}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="repoName" className="block text-sm font-medium text-gray-700 mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  id="repoName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., my-application"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </label>
                <select
                  id="visibility"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of this repository"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddRepositoryForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Repository
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Repositories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Docker Repositories</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Repository
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pulls
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {repositories.map((repo) => (
              <tr key={repo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="text-gray-500 mr-2" size={18} />
                    <div className="text-sm font-medium text-gray-900">{repo.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {repo.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded flex items-center"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                    {repo.tags.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                        +{repo.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{repo.pulls}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{repo.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {repo.lastUpdated}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" title="Pull">
                      <Download size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-900" title="Push">
                      <Upload size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900" title="Copy Pull Command">
                      <Copy size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteRepository(repo.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Registry Usage Guide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Registry Usage Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Login to Registry</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                docker login registry.{projectId}.example.com
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Push an Image</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                docker tag local-image:tag registry.{projectId}.example.com/repository-name:tag
                docker push registry.{projectId}.example.com/repository-name:tag
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Pull an Image</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                docker pull registry.{projectId}.example.com/repository-name:tag
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegistry;
