import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GitBranch, GitPullRequest, RefreshCw, Check, AlertTriangle, Plus } from 'lucide-react';

const ProjectDeployment = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('git');
  const [showAddRepoForm, setShowAddRepoForm] = useState(false);
  
  // Mock data for deployments
  const deployments = [
    { 
      id: 1, 
      repo: 'github.com/user/frontend-app', 
      branch: 'main', 
      lastDeploy: '2 hours ago',
      status: 'success',
      commit: 'a1b2c3d',
      message: 'Update homepage design'
    },
    { 
      id: 2, 
      repo: 'github.com/user/api-server', 
      branch: 'develop', 
      lastDeploy: '1 day ago',
      status: 'failed',
      commit: 'e4f5g6h',
      message: 'Add user authentication endpoints'
    },
    { 
      id: 3, 
      repo: 'github.com/user/admin-panel', 
      branch: 'feature/dashboard', 
      lastDeploy: '3 days ago',
      status: 'success',
      commit: 'i7j8k9l',
      message: 'Implement analytics dashboard'
    },
  ];
  
  // Mock data for Git providers
  const gitProviders = [
    { id: 'github', name: 'GitHub', connected: true, username: 'username' },
    { id: 'gitlab', name: 'GitLab', connected: false },
    { id: 'bitbucket', name: 'Bitbucket', connected: false },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Deployment Settings: {projectId}</h1>
        <button 
          onClick={() => setShowAddRepoForm(!showAddRepoForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Repository</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('git')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'git'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Git Providers
          </button>
          <button
            onClick={() => setActiveTab('deployments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'deployments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deployments
          </button>
        </nav>
      </div>
      
      {/* Git Providers */}
      {activeTab === 'git' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Connected Git Providers</h2>
          
          <div className="space-y-4">
            {gitProviders.map((provider) => (
              <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 mr-3">
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${provider.id}/${provider.id}-original.svg`} 
                        alt={provider.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{provider.name}</h3>
                      {provider.connected && (
                        <p className="text-sm text-gray-500">
                          Connected as {provider.username}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {provider.connected ? (
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      Disconnect
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <GitBranch className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Automatic Deployments
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Connect your Git provider to enable automatic deployments when you push to your repository.
                    You can configure branch-specific deployments and build settings for each repository.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Repository Form */}
      {showAddRepoForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Repository</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="gitProvider" className="block text-sm font-medium text-gray-700 mb-1">
                Git Provider
              </label>
              <select
                id="gitProvider"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="github">GitHub</option>
                <option value="gitlab">GitLab</option>
                <option value="bitbucket">Bitbucket</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="repository" className="block text-sm font-medium text-gray-700 mb-1">
                Repository
              </label>
              <input
                type="text"
                id="repository"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="username/repository"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                id="branch"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="main"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="buildCommand" className="block text-sm font-medium text-gray-700 mb-1">
                Build Command
              </label>
              <input
                type="text"
                id="buildCommand"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="npm run build"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="outputDir" className="block text-sm font-medium text-gray-700 mb-1">
                Output Directory
              </label>
              <input
                type="text"
                id="outputDir"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="dist"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddRepoForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Repository
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Deployments */}
      {activeTab === 'deployments' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repository
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Deployment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deployments.map((deployment) => (
                <tr key={deployment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitBranch className="text-gray-500 mr-2" size={18} />
                      <div className="text-sm font-medium text-gray-900">{deployment.repo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{deployment.branch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {deployment.lastDeploy}
                      <div className="text-xs text-gray-400">
                        {deployment.commit}: {deployment.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      deployment.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {deployment.status === 'success' ? (
                        <Check size={14} className="mr-1" />
                      ) : (
                        <AlertTriangle size={14} className="mr-1" />
                      )}
                      {deployment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end">
                      <RefreshCw size={16} className="mr-1" />
                      <span>Redeploy</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectDeployment;
