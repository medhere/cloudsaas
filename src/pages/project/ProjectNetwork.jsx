import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Network, Plus, Trash2, RefreshCw, Link as LinkIcon } from 'lucide-react';

const ProjectNetwork = () => {
  const { projectId } = useParams();
  const [showAddNetworkForm, setShowAddNetworkForm] = useState(false);
  
  // Mock data for networks
  const [networks, setNetworks] = useState([
    { 
      id: 1, 
      name: 'frontend-network', 
      driver: 'bridge', 
      subnet: '172.18.0.0/16',
      gateway: '172.18.0.1',
      containers: ['web-server', 'nginx-proxy'],
      created: '10 days ago'
    },
    { 
      id: 2, 
      name: 'backend-network', 
      driver: 'bridge', 
      subnet: '172.19.0.0/16',
      gateway: '172.19.0.1',
      containers: ['api-server', 'database', 'redis'],
      created: '10 days ago'
    },
    { 
      id: 3, 
      name: 'monitoring-network', 
      driver: 'bridge', 
      subnet: '172.20.0.0/16',
      gateway: '172.20.0.1',
      containers: ['prometheus', 'grafana'],
      created: '5 days ago'
    },
  ]);
  
  const handleAddNetwork = (e) => {
    e.preventDefault();
    // Implementation would go here
    setShowAddNetworkForm(false);
  };
  
  const handleDeleteNetwork = (id) => {
    setNetworks(networks.filter(network => network.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Network Manager: {projectId}</h1>
        <button 
          onClick={() => setShowAddNetworkForm(!showAddNetworkForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Create Network</span>
        </button>
      </div>
      
      {/* Network Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Network className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Network Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Networks</p>
            <p className="text-2xl font-medium">{networks.length}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Connected Containers</p>
            <p className="text-2xl font-medium">
              {networks.reduce((total, network) => total + network.containers.length, 0)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Default Network</p>
            <p className="text-lg font-medium">bridge</p>
          </div>
        </div>
      </div>
      
      {/* Add Network Form */}
      {showAddNetworkForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Create Docker Network</h2>
          <form onSubmit={handleAddNetwork}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="networkName" className="block text-sm font-medium text-gray-700 mb-1">
                  Network Name
                </label>
                <input
                  type="text"
                  id="networkName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., app-network"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="networkDriver" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver
                </label>
                <select
                  id="networkDriver"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="bridge">bridge</option>
                  <option value="host">host</option>
                  <option value="overlay">overlay</option>
                  <option value="macvlan">macvlan</option>
                  <option value="none">none</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="subnet" className="block text-sm font-medium text-gray-700 mb-1">
                  Subnet
                </label>
                <input
                  type="text"
                  id="subnet"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 172.21.0.0/16"
                />
              </div>
              
              <div>
                <label htmlFor="gateway" className="block text-sm font-medium text-gray-700 mb-1">
                  Gateway
                </label>
                <input
                  type="text"
                  id="gateway"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 172.21.0.1"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Advanced Options
              </label>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="internal"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="internal" className="ml-2 block text-sm text-gray-700">
                    Internal Network
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ipv6"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ipv6" className="ml-2 block text-sm text-gray-700">
                    Enable IPv6
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddNetworkForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Network
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Networks List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Docker Networks</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subnet
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Containers
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {networks.map((network) => (
              <tr key={network.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Network className="text-gray-500 mr-2" size={18} />
                    <div className="text-sm font-medium text-gray-900">{network.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {network.driver}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {network.subnet}
                    <div className="text-xs text-gray-400">
                      Gateway: {network.gateway}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {network.containers.length} containers
                    <div className="flex flex-wrap gap-1 mt-1">
                      {network.containers.map((container, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                        >
                          {container}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{network.created}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <LinkIcon size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteNetwork(network.id)}
                      className="text-red-600 hover:text-red-900"
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
      
      {/* Network Management Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Network Management Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Docker Network Drivers</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li><strong>bridge</strong>: Default network driver for standalone containers</li>
              <li><strong>host</strong>: Removes network isolation between container and host</li>
              <li><strong>overlay</strong>: Connect multiple Docker daemons together</li>
              <li><strong>macvlan</strong>: Assign a MAC address to a container</li>
              <li><strong>none</strong>: Disable all networking for a container</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Common Network Commands</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                # List networks
                docker network ls

                # Inspect network
                docker network inspect [network-name]

                # Connect container to network
                docker network connect [network-name] [container-name]

                # Disconnect container from network
                docker network disconnect [network-name] [container-name]
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectNetwork;
