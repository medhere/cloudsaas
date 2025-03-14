import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Plus, Edit, Trash2, X, Server } from 'lucide-react';

const AppServiceACL = () => {
  const { projectId, appId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data for service access control
  const services = [
    { id: 1, name: 'Database', type: 'PostgreSQL', access: 'Full Access', ips: ['10.0.0.1/32', '10.0.0.2/32'] },
    { id: 2, name: 'Redis Cache', type: 'Redis', access: 'Read Only', ips: ['10.0.0.1/32'] },
    { id: 3, name: 'Storage', type: 'S3', access: 'Full Access', ips: ['10.0.0.1/32', '10.0.0.3/32'] },
    { id: 4, name: 'Message Queue', type: 'RabbitMQ', access: 'Producer Only', ips: ['10.0.0.1/32'] },
  ];

  // Access types
  const accessTypes = [
    { id: 'full', name: 'Full Access', description: 'Complete access to the service' },
    { id: 'read', name: 'Read Only', description: 'Can only read data from the service' },
    { id: 'write', name: 'Write Only', description: 'Can only write data to the service' },
    { id: 'producer', name: 'Producer Only', description: 'Can only produce messages' },
    { id: 'consumer', name: 'Consumer Only', description: 'Can only consume messages' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Service Access Control: {appId}</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-gray-400 mr-3" />
            <h2 className="text-lg font-medium">Service Access Control</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage which services this application can access and the level of access granted.
          </p>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Access Level
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allowed IPs
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{service.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    service.access === 'Full Access' ? 'bg-green-100 text-green-800' : 
                    service.access === 'Read Only' ? 'bg-blue-100 text-blue-800' : 
                    service.access === 'Write Only' ? 'bg-yellow-100 text-yellow-800' : 
                    service.access === 'Producer Only' ? 'bg-purple-100 text-purple-800' : 
                    service.access === 'Consumer Only' ? 'bg-indigo-100 text-indigo-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {service.access}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {service.ips.map((ip, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {ip}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Network Security */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Network Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure network security settings for this application.
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Default Network Policy</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="allow-all"
                  name="network-policy"
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="allow-all" className="ml-2 block text-sm text-gray-900">
                  Allow All
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="deny-all"
                  name="network-policy"
                  type="radio"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked
                />
                <label htmlFor="deny-all" className="ml-2 block text-sm text-gray-900">
                  Deny All
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Application Firewall</h3>
            <div className="flex items-center">
              <input
                id="enable-firewall"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked
              />
              <label htmlFor="enable-firewall" className="ml-2 block text-sm text-gray-900">
                Enable application firewall
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              The application firewall provides additional protection against common web attacks.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">IP Whitelist</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center">
                10.0.0.1/32
                <button className="ml-1 text-gray-500 hover:text-gray-700">
                  <X size={14} />
                </button>
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center">
                10.0.0.2/32
                <button className="ml-1 text-gray-500 hover:text-gray-700">
                  <X size={14} />
                </button>
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center">
                10.0.0.3/32
                <button className="ml-1 text-gray-500 hover:text-gray-700">
                  <X size={14} />
                </button>
              </span>
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Add IP address (e.g., 192.168.1.1/32)"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Add Service Access</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                  type="text"
                  id="service-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Database, Cache, etc."
                />
              </div>
              <div>
                <label htmlFor="service-type" className="block text-sm font-medium text-gray-700">Service Type</label>
                <select
                  id="service-type"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>Redis</option>
                  <option>MongoDB</option>
                  <option>RabbitMQ</option>
                  <option>S3</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="access-level" className="block text-sm font-medium text-gray-700">Access Level</label>
                <select
                  id="access-level"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {accessTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="allowed-ips" className="block text-sm font-medium text-gray-700">Allowed IPs</label>
                <textarea
                  id="allowed-ips"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter IP addresses, one per line (e.g., 10.0.0.1/32)"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Enter one IP address per line in CIDR notation.</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppServiceACL;
