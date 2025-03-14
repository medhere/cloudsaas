import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Globe, Plus, Trash2, Check, X, ExternalLink } from 'lucide-react';

const AppDomains = () => {
  const { projectId, appId } = useParams();
  const [domains, setDomains] = useState([
    { domain: 'app.example.com', verified: true, primary: true, ssl: true },
    { domain: 'api.example.com', verified: true, primary: false, ssl: true },
    { domain: 'staging.example.com', verified: false, primary: false, ssl: false },
  ]);
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = () => {
    if (newDomain.trim() === '') return;
    setDomains([...domains, { domain: newDomain, verified: false, primary: false, ssl: false }]);
    setNewDomain('');
  };

  const handleRemoveDomain = (index) => {
    const updated = [...domains];
    updated.splice(index, 1);
    setDomains(updated);
  };

  const handleSetPrimary = (index) => {
    const updated = domains.map((domain, i) => ({
      ...domain,
      primary: i === index
    }));
    setDomains(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">App Domains</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
            <Check size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Domain Management</h2>
        <p className="text-gray-500 mb-4">
          Configure custom domains for your application. Verify domain ownership by adding the required DNS records.
        </p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter domain (e.g., app.example.com)"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddDomain}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Domain
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SSL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Primary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {domains.map((domain, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{domain.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {domain.verified ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {domain.ssl ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Enable SSL
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {domain.primary ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Primary
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleSetPrimary(index)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Set as Primary
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <a href={`https://${domain.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <ExternalLink size={16} />
                      </a>
                      <button 
                        onClick={() => handleRemoveDomain(index)}
                        className="text-red-500 hover:text-red-700"
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
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">DNS Configuration</h2>
        <p className="text-gray-500 mb-4">
          To verify domain ownership, add the following DNS records to your domain's DNS settings.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {domains.filter(d => !d.verified).map((domain, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan="2" className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{domain.domain}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      CNAME
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {domain.domain.split('.')[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono bg-gray-50 p-1">
                      proxy.example.com
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TXT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      _verify.{domain.domain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono bg-gray-50 p-1">
                      verify-domain={appId}-{Math.random().toString(36).substring(2, 10)}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppDomains;
