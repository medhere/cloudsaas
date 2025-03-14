import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Database, HardDrive, Plus, Trash2, RefreshCw, BarChart2 } from 'lucide-react';

const AppStorage = () => {
  const { projectId, appId } = useParams();
  const [volumes, setVolumes] = useState([
    { id: 1, name: 'app-data', path: '/app/data', size: '2.4 GB', used: '1.1 GB', percent: 45 },
    { id: 2, name: 'app-uploads', path: '/app/uploads', size: '5 GB', used: '3.2 GB', percent: 64 },
    { id: 3, name: 'app-logs', path: '/app/logs', size: '1 GB', used: '0.3 GB', percent: 30 },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newVolume, setNewVolume] = useState({ name: '', path: '', size: '1' });

  const refreshVolumes = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddVolume = () => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const newId = volumes.length > 0 ? Math.max(...volumes.map(v => v.id)) + 1 : 1;
      const volumeToAdd = {
        id: newId,
        name: newVolume.name,
        path: newVolume.path,
        size: `${newVolume.size} GB`,
        used: '0 GB',
        percent: 0
      };
      
      setVolumes([...volumes, volumeToAdd]);
      setNewVolume({ name: '', path: '', size: '1' });
      setShowModal(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteVolume = (id) => {
    if (confirm('Are you sure you want to delete this volume? This action cannot be undone.')) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVolumes(volumes.filter(volume => volume.id !== id));
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Storage Management</h1>
          <p className="text-gray-600 mt-1">Manage Docker volumes and persistent storage for your application</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={refreshVolumes}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Volume
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center">
            <Database size={20} className="mr-2 text-gray-500" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Docker Volumes
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Persistent storage volumes attached to your application
          </p>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Mount Path</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Used</div>
            <div className="col-span-1">Usage</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {volumes.map((volume) => (
            <div key={volume.id} className="px-4 py-4 sm:px-6 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3 font-medium text-gray-900 flex items-center">
                <HardDrive size={16} className="mr-2 text-gray-500" />
                {volume.name}
              </div>
              <div className="col-span-3 text-gray-500">{volume.path}</div>
              <div className="col-span-2 text-gray-500">{volume.size}</div>
              <div className="col-span-2 text-gray-500">{volume.used}</div>
              <div className="col-span-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      volume.percent > 80 ? 'bg-red-500' : 
                      volume.percent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${volume.percent}%` }}
                  ></div>
                </div>
              </div>
              <div className="col-span-1 text-right">
                <button 
                  onClick={() => handleDeleteVolume(volume.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {volumes.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No volumes found. Click "Add Volume" to create one.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center">
            <BarChart2 size={20} className="mr-2 text-gray-500" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Storage Usage
            </h3>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Total Storage</div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">8.4 GB</div>
              <div className="mt-1 text-sm text-gray-500">Allocated across all volumes</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Used Storage</div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">4.6 GB</div>
              <div className="mt-1 text-sm text-gray-500">54.8% of total allocation</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Available Storage</div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">3.8 GB</div>
              <div className="mt-1 text-sm text-gray-500">45.2% of total allocation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Volume Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Volume</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="volume-name" className="block text-sm font-medium text-gray-700">Volume Name</label>
                        <input
                          type="text"
                          id="volume-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="e.g., app-data"
                          value={newVolume.name}
                          onChange={(e) => setNewVolume({...newVolume, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label htmlFor="mount-path" className="block text-sm font-medium text-gray-700">Mount Path</label>
                        <input
                          type="text"
                          id="mount-path"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="e.g., /app/data"
                          value={newVolume.path}
                          onChange={(e) => setNewVolume({...newVolume, path: e.target.value})}
                        />
                      </div>
                      <div>
                        <label htmlFor="volume-size" className="block text-sm font-medium text-gray-700">Size (GB)</label>
                        <input
                          type="number"
                          id="volume-size"
                          min="1"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={newVolume.size}
                          onChange={(e) => setNewVolume({...newVolume, size: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddVolume}
                  disabled={isLoading || !newVolume.name || !newVolume.path}
                >
                  {isLoading ? <RefreshCw size={16} className="mr-2 animate-spin" /> : <Plus size={16} className="mr-2" />}
                  Add Volume
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppStorage;
