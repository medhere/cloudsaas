import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GitBranch, RefreshCw, Play, GitCommit, GitPullRequest, Clock, Check, X, AlertTriangle } from 'lucide-react';

const AppGitDeployment = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('settings');
  
  // Mock data for git repository
  const gitRepo = {
    url: 'https://github.com/example/repo.git',
    branch: 'main',
    lastCommit: '3a7bd92',
    lastCommitMessage: 'Update dependencies and fix navigation bug',
    lastDeployed: '2023-06-15 14:32:45',
    deploymentMethod: 'Automatic',
    webhookUrl: 'https://example.com/webhook/app123',
  };

  // Mock data for deployment history
  const deployments = [
    { id: 1, version: 'v1.0.5', status: 'Success', timestamp: '2023-06-15 14:32:45', duration: '1m 45s', commit: '3a7bd92', branch: 'main', author: 'John Doe' },
    { id: 2, version: 'v1.0.4', status: 'Success', timestamp: '2023-06-14 10:15:22', duration: '1m 38s', commit: '8c4e7d1', branch: 'main', author: 'Jane Smith' },
    { id: 3, version: 'v1.0.3', status: 'Failed', timestamp: '2023-06-13 16:45:10', duration: '0m 52s', commit: 'f2a6b9c', branch: 'feature/new-api', author: 'Bob Johnson' },
    { id: 4, version: 'v1.0.2', status: 'Success', timestamp: '2023-06-12 09:22:33', duration: '1m 41s', commit: '5d9e8f7', branch: 'main', author: 'John Doe' },
    { id: 5, version: 'v1.0.1', status: 'Success', timestamp: '2023-06-10 11:05:18', duration: '1m 30s', commit: '1b3c5d7', branch: 'main', author: 'Jane Smith' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Git Deployment: {appId}</h1>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <RefreshCw size={18} />
            <span>Sync Repository</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Play size={18} />
            <span>Deploy Now</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Repository Settings
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deployment History
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'webhooks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Webhooks
          </button>
        </nav>
      </div>

      {/* Repository Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <GitBranch className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-medium">Repository Settings</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Configure the Git repository for this application.
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700">Repository URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="repo-url"
                  className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={gitRepo.url}
                  readOnly
                />
                <button className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Change
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <select
                id="branch"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                defaultValue={gitRepo.branch}
              >
                <option>main</option>
                <option>develop</option>
                <option>staging</option>
                <option>feature/new-api</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Deployment Method</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    id="auto-deploy"
                    name="deployment-method"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={gitRepo.deploymentMethod === 'Automatic'}
                  />
                  <label htmlFor="auto-deploy" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Automatic Deployment</span>
                    <span className="block text-sm text-gray-500">Deploy automatically when changes are pushed to the selected branch.</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="manual-deploy"
                    name="deployment-method"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={gitRepo.deploymentMethod === 'Manual'}
                  />
                  <label htmlFor="manual-deploy" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Manual Deployment</span>
                    <span className="block text-sm text-gray-500">Deploy only when manually triggered.</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center">
                <input
                  id="build-cache"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked
                />
                <label htmlFor="build-cache" className="ml-2 block text-sm text-gray-900">
                  Enable build cache
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 ml-6">
                Improves build performance by caching dependencies between deployments.
              </p>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deployment History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Deployment History</h2>
            <p className="mt-1 text-sm text-gray-500">
              Recent deployment history for this application.
            </p>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
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
                    <div className="text-sm font-medium text-gray-900">{deployment.version}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      deployment.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {deployment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitBranch size={16} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{deployment.branch}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitCommit size={16} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{deployment.commit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{deployment.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{deployment.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{deployment.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View Logs</a>
                    <a href="#" className="text-blue-600 hover:text-blue-900">Rollback</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Webhooks */}
      {activeTab === 'webhooks' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Webhook Configuration</h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure webhooks to trigger deployments from your Git provider.
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
                  value={gitRepo.webhookUrl}
                  readOnly
                />
                <button className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 shadow-sm text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Copy
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Add this webhook URL to your Git provider to trigger automatic deployments.
              </p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Keep this webhook URL secret. Anyone with this URL can trigger deployments to your application.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Webhook Events</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select which events should trigger a deployment.
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="push-event"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked
                  />
                  <label htmlFor="push-event" className="ml-2 block text-sm text-gray-900">
                    Push events
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="tag-event"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked
                  />
                  <label htmlFor="tag-event" className="ml-2 block text-sm text-gray-900">
                    Tag events
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="pr-event"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="pr-event" className="ml-2 block text-sm text-gray-900">
                    Pull request events
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Recent Webhook Deliveries</h3>
              <div className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <GitPullRequest size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Push to main</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>2023-06-15 14:30:22</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <Check size={14} className="mr-1" />
                    Success
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <GitPullRequest size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Push to main</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>2023-06-14 10:12:45</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <Check size={14} className="mr-1" />
                    Success
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <GitPullRequest size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Push to feature/new-api</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>2023-06-13 16:42:18</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    <X size={14} className="mr-1" />
                    Failed
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Regenerate Webhook
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppGitDeployment;
