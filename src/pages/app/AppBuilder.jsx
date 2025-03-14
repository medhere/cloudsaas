import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, RefreshCw, Save, Check, AlertTriangle } from 'lucide-react';

const AppBuilder = () => {
  const { projectId, appId } = useParams();
  const [selectedBuilder, setSelectedBuilder] = useState('heroku/nodejs');
  
  // Mock data for buildpacks
  const buildpacks = [
    { id: 'heroku/nodejs', name: 'Node.js', description: 'Official Heroku buildpack for Node.js applications', version: '175', recommended: true },
    { id: 'heroku/python', name: 'Python', description: 'Official Heroku buildpack for Python applications', version: '189', recommended: false },
    { id: 'heroku/ruby', name: 'Ruby', description: 'Official Heroku buildpack for Ruby applications', version: '222', recommended: false },
    { id: 'heroku/php', name: 'PHP', description: 'Official Heroku buildpack for PHP applications', version: '192', recommended: false },
    { id: 'heroku/go', name: 'Go', description: 'Official Heroku buildpack for Go applications', version: '156', recommended: false },
    { id: 'heroku/java', name: 'Java', description: 'Official Heroku buildpack for Java applications', version: '69', recommended: false },
    { id: 'heroku/scala', name: 'Scala', description: 'Official Heroku buildpack for Scala applications', version: '87', recommended: false },
    { id: 'heroku/clojure', name: 'Clojure', description: 'Official Heroku buildpack for Clojure applications', version: '86', recommended: false },
  ];

  // Mock build history
  const buildHistory = [
    { id: 1, version: 'v1.0.5', status: 'Success', timestamp: '2023-06-15 14:32:45', duration: '1m 45s', commit: '3a7bd92' },
    { id: 2, version: 'v1.0.4', status: 'Success', timestamp: '2023-06-14 10:15:22', duration: '1m 38s', commit: '8c4e7d1' },
    { id: 3, version: 'v1.0.3', status: 'Failed', timestamp: '2023-06-13 16:45:10', duration: '0m 52s', commit: 'f2a6b9c' },
    { id: 4, version: 'v1.0.2', status: 'Success', timestamp: '2023-06-12 09:22:33', duration: '1m 41s', commit: '5d9e8f7' },
    { id: 5, version: 'v1.0.1', status: 'Success', timestamp: '2023-06-10 11:05:18', duration: '1m 30s', commit: '1b3c5d7' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">App Builder: {appId}</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <RefreshCw size={18} />
          <span>Rebuild Application</span>
        </button>
      </div>

      {/* Buildpack Selection */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-gray-400 mr-3" />
            <h2 className="text-lg font-medium">Buildpack Selection</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Choose the buildpack that best matches your application's technology stack.
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildpacks.map((buildpack) => (
              <div 
                key={buildpack.id}
                onClick={() => setSelectedBuilder(buildpack.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedBuilder === buildpack.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{buildpack.name}</h3>
                  {buildpack.recommended && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{buildpack.description}</p>
                <div className="mt-2 text-xs text-gray-500">Version: {buildpack.version}</div>
                {selectedBuilder === buildpack.id && (
                  <div className="mt-2 text-blue-600 flex items-center">
                    <Check size={16} className="mr-1" />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
              <Save size={18} />
              <span>Save Buildpack Configuration</span>
            </button>
          </div>
        </div>
      </div>

      {/* Build Configuration */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Build Configuration</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure additional build settings for your application.
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="node-version" className="block text-sm font-medium text-gray-700">Node.js Version</label>
            <select
              id="node-version"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option>18.x (Latest LTS)</option>
              <option>16.x</option>
              <option>14.x</option>
              <option>12.x</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="npm-version" className="block text-sm font-medium text-gray-700">NPM Version</label>
            <select
              id="npm-version"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option>Latest</option>
              <option>8.x</option>
              <option>7.x</option>
              <option>6.x</option>
            </select>
          </div>
          
          <div>
            <div className="flex items-center">
              <input
                id="cache-modules"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked
              />
              <label htmlFor="cache-modules" className="ml-2 block text-sm text-gray-900">
                Cache node_modules between builds
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500 ml-6">
              Improves build performance by caching dependencies.
            </p>
          </div>
          
          <div>
            <div className="flex items-center">
              <input
                id="skip-pruning"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="skip-pruning" className="ml-2 block text-sm text-gray-900">
                Skip pruning devDependencies
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500 ml-6">
              Keep development dependencies in the production build.
            </p>
          </div>
          
          <div>
            <label htmlFor="build-command" className="block text-sm font-medium text-gray-700">Custom Build Command</label>
            <input
              type="text"
              id="build-command"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="npm run build"
            />
            <p className="mt-1 text-xs text-gray-500">
              Override the default build command. Leave empty to use the default.
            </p>
          </div>
        </div>
      </div>

      {/* Build History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Build History</h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent build history for this application.
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
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commit
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buildHistory.map((build) => (
              <tr key={build.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{build.version}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    build.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {build.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{build.timestamp}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{build.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{build.commit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900">View Logs</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppBuilder;
