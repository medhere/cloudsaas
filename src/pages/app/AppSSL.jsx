import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Upload, RefreshCw, Shield, AlertTriangle, Check, X } from 'lucide-react';

const AppSSL = () => {
  const { projectId, appId } = useParams();
  const [certificates, setCertificates] = useState([
    { 
      domain: 'app.example.com', 
      issuer: 'Let\'s Encrypt', 
      expires: '2023-12-31', 
      status: 'active',
      autoRenew: true 
    },
    { 
      domain: 'api.example.com', 
      issuer: 'Let\'s Encrypt', 
      expires: '2023-12-31', 
      status: 'active',
      autoRenew: true 
    },
    { 
      domain: 'staging.example.com', 
      issuer: 'Manual Upload', 
      expires: '2023-10-15', 
      status: 'expiring',
      autoRenew: false 
    },
  ]);

  const [activeTab, setActiveTab] = useState('letsencrypt');
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [availableDomains, setAvailableDomains] = useState([
    'test.example.com',
    'dev.example.com',
    'beta.example.com'
  ]);

  const toggleDomainSelection = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SSL Certificates</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
            <RefreshCw size={16} className="mr-2" />
            Renew All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('letsencrypt')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'letsencrypt'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Let's Encrypt (Automatic)
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'manual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manual Certificate
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'letsencrypt' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Issue Let's Encrypt Certificate</h2>
                <p className="text-gray-500 mb-4">
                  Select domains to issue free SSL certificates from Let's Encrypt. Domains must be verified and pointing to your application.
                </p>

                <div className="space-y-3 mb-6">
                  {availableDomains.map((domain, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`domain-${index}`}
                        checked={selectedDomains.includes(domain)}
                        onChange={() => toggleDomainSelection(domain)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`domain-${index}`} className="ml-2 block text-sm text-gray-900">
                        {domain}
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  disabled={selectedDomains.length === 0}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    selectedDomains.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <Lock size={16} className="mr-2" />
                  Issue Certificates
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-md font-medium mb-2">How Let's Encrypt Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>We verify that you control the domain by making an HTTP request</li>
                  <li>Let's Encrypt issues a certificate valid for 90 days</li>
                  <li>Certificates are automatically renewed 30 days before expiration</li>
                  <li>Your application will use the certificate for HTTPS connections</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Upload Custom Certificate</h2>
                <p className="text-gray-500 mb-4">
                  Upload your own SSL certificate and private key. The certificate must be in PEM format.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Domain
                    </label>
                    <input
                      type="text"
                      placeholder="example.com"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate (PEM)
                    </label>
                    <textarea
                      placeholder="-----BEGIN CERTIFICATE-----"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Private Key (PEM)
                    </label>
                    <textarea
                      placeholder="-----BEGIN PRIVATE KEY-----"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Chain (optional)
                    </label>
                    <textarea
                      placeholder="-----BEGIN CERTIFICATE-----"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                    ></textarea>
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
                  <Upload size={16} className="mr-2" />
                  Upload Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Active Certificates</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issuer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auto-Renew
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((cert, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Lock size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{cert.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cert.issuer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cert.expires}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cert.status === 'active' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : cert.status === 'expiring' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Expiring Soon
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cert.autoRenew ? (
                      <span className="text-green-600 flex items-center">
                        <Check size={16} className="mr-1" /> Enabled
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center">
                        <X size={16} className="mr-1" /> Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <RefreshCw size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <X size={16} />
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
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium">SSL Security Settings</h3>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  id="force-ssl"
                  name="force-ssl"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="force-ssl" className="ml-2 block text-sm text-gray-900">
                  Force SSL (redirect HTTP to HTTPS)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="hsts"
                  name="hsts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="hsts" className="ml-2 block text-sm text-gray-900">
                  Enable HSTS (HTTP Strict Transport Security)
                </label>
              </div>
              
              <div>
                <label htmlFor="min-tls" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum TLS Version
                </label>
                <select
                  id="min-tls"
                  name="min-tls"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="1.2"
                >
                  <option value="1.0">TLS 1.0 (Less Secure)</option>
                  <option value="1.1">TLS 1.1</option>
                  <option value="1.2">TLS 1.2 (Recommended)</option>
                  <option value="1.3">TLS 1.3 (Most Secure)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSSL;
