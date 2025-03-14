import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Plus, Trash2, Download, Upload } from 'lucide-react';

const AppConfigManager = () => {
  const { projectId, appId } = useParams();
  const [envVars, setEnvVars] = useState([
    { key: 'NODE_ENV', value: 'production', isSecret: false },
    { key: 'PORT', value: '8080', isSecret: false },
    { key: 'DATABASE_URL', value: 'postgres://user:pass@host:5432/db', isSecret: true },
    { key: 'API_KEY', value: 'sk_test_51HZ9J2EzKb', isSecret: true },
  ]);
  const [newVar, setNewVar] = useState({ key: '', value: '', isSecret: false });

  const handleAddVar = () => {
    if (newVar.key.trim() === '') return;
    setEnvVars([...envVars, { ...newVar }]);
    setNewVar({ key: '', value: '', isSecret: false });
  };

  const handleRemoveVar = (index) => {
    const updated = [...envVars];
    updated.splice(index, 1);
    setEnvVars(updated);
  };

  const handleVarChange = (index, field, value) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Config Manager</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center">
            <Upload size={16} className="mr-2" />
            Import
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Environment Variables</h2>
        <p className="text-gray-500 mb-4">
          Configure environment variables for your application. Secret values are encrypted and only revealed during deployment.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-gray-500">
            <div className="col-span-4">Key</div>
            <div className="col-span-6">Value</div>
            <div className="col-span-1">Secret</div>
            <div className="col-span-1"></div>
          </div>

          {envVars.map((variable, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  value={variable.key}
                  onChange={(e) => handleVarChange(index, 'key', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6">
                <input
                  type={variable.isSecret ? 'password' : 'text'}
                  value={variable.value}
                  onChange={(e) => handleVarChange(index, 'value', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  checked={variable.isSecret}
                  onChange={(e) => handleVarChange(index, 'isSecret', e.target.checked)}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleRemoveVar(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-12 gap-4 items-center border-t pt-4">
            <div className="col-span-4">
              <input
                type="text"
                placeholder="KEY_NAME"
                value={newVar.key}
                onChange={(e) => setNewVar({ ...newVar, key: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <input
                type={newVar.isSecret ? 'password' : 'text'}
                placeholder="value"
                value={newVar.value}
                onChange={(e) => setNewVar({ ...newVar, value: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <input
                type="checkbox"
                checked={newVar.isSecret}
                onChange={(e) => setNewVar({ ...newVar, isSecret: e.target.checked })}
                className="h-5 w-5 text-blue-600"
              />
            </div>
            <div className="col-span-1">
              <button
                onClick={handleAddVar}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Config History</h2>
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">Config updated</p>
              <p className="text-sm text-gray-500">2 days ago by admin@example.com</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Restore</button>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">Added DATABASE_URL</p>
              <p className="text-sm text-gray-500">1 week ago by dev@example.com</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Restore</button>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">Initial configuration</p>
              <p className="text-sm text-gray-500">2 weeks ago by admin@example.com</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">Restore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppConfigManager;
