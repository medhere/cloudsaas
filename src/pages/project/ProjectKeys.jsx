import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react';

const ProjectKeys = () => {
  const { projectId } = useParams();
  const [showAddKeyForm, setShowAddKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [showKeyValues, setShowKeyValues] = useState({});
  
  // Mock data for SSH keys
  const [sshKeys, setSshKeys] = useState([
    { id: 1, name: 'Development Key', fingerprint: 'SHA256:uNgDHbP9nK8pZ7z+YHrXUFYvZ3NcA+5D9M2HZ8', added: 'Nov 10, 2023' },
    { id: 2, name: 'Deployment Key', fingerprint: 'SHA256:7FtP5jK8nZ9pZ7z+YHrXUFYvZ3NcA+5D9M2HZ8', added: 'Oct 15, 2023' },
    { id: 3, name: 'CI/CD Key', fingerprint: 'SHA256:9HtP5jK8nZ9pZ7z+YHrXUFYvZ3NcA+5D9M2HZ8', added: 'Sep 20, 2023' },
  ]);
  
  const handleAddKey = (e) => {
    e.preventDefault();
    if (newKeyName && newKeyValue) {
      const newKey = {
        id: sshKeys.length + 1,
        name: newKeyName,
        fingerprint: `SHA256:${newKeyValue.substring(0, 30)}...`,
        added: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setSshKeys([...sshKeys, newKey]);
      setNewKeyName('');
      setNewKeyValue('');
      setShowAddKeyForm(false);
    }
  };
  
  const handleDeleteKey = (id) => {
    setSshKeys(sshKeys.filter(key => key.id !== id));
  };
  
  const toggleKeyVisibility = (id) => {
    setShowKeyValues({
      ...showKeyValues,
      [id]: !showKeyValues[id]
    });
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You would typically show a notification here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SSH Keys: {projectId}</h1>
        <button 
          onClick={() => setShowAddKeyForm(!showAddKeyForm)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Add SSH Key</span>
        </button>
      </div>
      
      {/* Add Key Form */}
      {showAddKeyForm && (
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold">Add New SSH Key</h2>
          <form onSubmit={handleAddKey}>
            <div className="mb-4">
              <label htmlFor="keyName" className="block mb-1 text-sm font-medium text-gray-700">
                Key Name
              </label>
              <input
                type="text"
                id="keyName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Development Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="keyValue" className="block mb-1 text-sm font-medium text-gray-700">
                Public Key
              </label>
              <textarea
                id="keyValue"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your SSH public key here (ssh-rsa ...)"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Paste your public SSH key, usually found in ~/.ssh/id_rsa.pub
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddKeyForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Key
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* SSH Keys List */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Fingerprint
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Added
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sshKeys.map((key) => (
              <tr key={key.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Key className="mr-2 text-gray-500" size={18} />
                    <div className="text-sm font-medium text-gray-900">{key.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-mono text-sm text-gray-500">{key.fingerprint}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{key.added}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {showKeyValues[key.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(key.fingerprint)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Copy size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteKey(key.id)}
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
      
      {/* Key Management Info */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">SSH Key Management</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium text-gray-900">Generating SSH Keys</h3>
            <div className="p-4 rounded-md bg-gray-50">
              <pre className="overflow-x-auto text-sm text-gray-700">
                ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 font-medium text-gray-900">Security Best Practices</h3>
            <ul className="pl-5 text-sm text-gray-700 list-disc">
              <li>Never share your private key</li>
              <li>Use a strong passphrase for your SSH key</li>
              <li>Regularly rotate your SSH keys</li>
              <li>Remove unused or compromised keys immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectKeys;
