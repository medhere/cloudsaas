import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Network, Plus, Trash2, Edit2, ExternalLink, Lock, Unlock, AlertTriangle } from 'lucide-react';

const AppPorts = () => {
  const { projectId, appId } = useParams();
  const [ports, setPorts] = useState([
    { 
      id: 1, 
      port: 8080, 
      protocol: 'http', 
      service: 'Web Server', 
      exposed: true, 
      url: 'https://app.example.com',
      internal: false
    },
    { 
      id: 2, 
      port: 3000, 
      protocol: 'http', 
      service: 'API Server', 
      exposed: true, 
      url: 'https://api.example.com',
      internal: false
    },
    { 
      id: 3, 
      port: 5432, 
      protocol: 'tcp', 
      service: 'PostgreSQL', 
      exposed: false, 
      url: null,
      internal: true
    },
    { 
      id: 4, 
      port: 6379, 
      protocol: 'tcp', 
      service: 'Redis', 
      exposed: false, 
      url: null,
      internal: true
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPort, setCurrentPort] = useState({ port: '', protocol: 'http', service: '', exposed: false, internal: false });
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (port = null) => {
    if (port) {
      setCurrentPort({ ...port });
      setIsEditing(true);
    } else {
      setCurrentPort({ port: '', protocol: 'http', service: '', exposed: false, internal: false });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentPort({
      ...currentPort,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const portValue = parseInt(currentPort.port);
    
    if (isEditing) {
      setPorts(ports.map(port => 
        port.id === currentPort.id ? { 
          ...currentPort, 
          port: portValue,
          url: currentPort.exposed ? `https://${currentPort.protocol === 'http' ? '' : currentPort.protocol + '.'}${appId}.example.com` : null
        } : port
      ));
    } else {
      const newPort = {
        ...currentPort,
        id: Date.now(),
        port: portValue,
        url: currentPort.exposed ? `https://${currentPort.protocol === 'http' ? '' : currentPort.protocol + '.'}${appId}.example.com` : null
      };
      setPorts([...ports, newPort]);
    }
    
    closeModal();
  };

  const deletePort = (id) => {
    setPorts(ports.filter(port => port.id !== id));
  };

  const toggleExposed = (id) => {
    setPorts(ports.map(port => {
      if (port.id === id) {
        const exposed = !port.exposed;
        return { 
          ...port, 
          exposed,
          url: exposed ? `https://${port.protocol === 'http' ? '' : port.protocol + '.'}${appId}.example.com` : null
        };
      }
      return port;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Port Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Port
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Application Ports</h2>
        
        {ports.length === 0 ? (
          <div className="text-center py-8">
            <Network className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No ports configured</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a port for your application.</p>
            <div className="mt-6">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="-ml-1 mr-2" />
                Add Port
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Port
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Protocol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ports.map((port) => (
                  <tr key={port.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{port.port}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {port.protocol.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {port.service}
                      {port.internal && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Internal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {port.exposed ? (
                        <span className="flex items-center text-green-600">
                          <Unlock size={16} className="mr-1" /> Exposed
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500">
                          <Lock size={16} className="mr-1" /> Private
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {port.url ? (
                        <a 
                          href={port.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {port.url} <ExternalLink size={14} className="ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-400">Not exposed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => toggleExposed(port.id)}
                          className={`${port.exposed ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                          title={port.exposed ? 'Make private' : 'Expose port'}
                          disabled={port.internal}
                        >
                          {port.exposed ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                        <button 
                          onClick={() => openModal(port)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deletePort(port.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          disabled={port.internal}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium">Port Security Information</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p className="mb-2">
                Exposing ports makes your application accessible from the internet. Only expose ports that are necessary for your application to function.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>HTTP/HTTPS ports (80, 443) are automatically routed through our proxy service</li>
                <li>Internal services like databases should generally remain private</li>
                <li>All exposed ports are protected by our DDoS protection and firewall</li>
                <li>Consider using service ACLs for additional security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding/editing ports */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditing ? 'Edit Port' : 'Add Port'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                            Port Number
                          </label>
                          <input
                            type="number"
                            name="port"
                            id="port"
                            min="1"
                            max="65535"
                            value={currentPort.port}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="8080"
                          />
                        </div>
                        <div>
                          <label htmlFor="protocol" className="block text-sm font-medium text-gray-700">
                            Protocol
                          </label>
                          <select
                            id="protocol"
                            name="protocol"
                            value={currentPort.protocol}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="http">HTTP</option>
                            <option value="https">HTTPS</option>
                            <option value="tcp">TCP</option>
                            <option value="udp">UDP</option>
                            <option value="ws">WebSocket</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                            Service Name
                          </label>
                          <input
                            type="text"
                            name="service"
                            id="service"
                            value={currentPort.service}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Web Server"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="exposed"
                            id="exposed"
                            checked={currentPort.exposed}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="exposed" className="ml-2 block text-sm text-gray-900">
                            Expose to Internet
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="internal"
                            id="internal"
                            checked={currentPort.internal}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="internal" className="ml-2 block text-sm text-gray-900">
                            Internal Service
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppPorts;
