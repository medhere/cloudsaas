import React, { useState, useEffect } from 'react';
import { ArrowLeft, Server, Cpu, HardDrive, Wifi, Code, Package, Globe, Database } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProjectCreateApplication = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [appName, setAppName] = useState('');
  const [appSlug, setAppSlug] = useState('');
  const [domainName, setDomainName] = useState('');
  const [addToDNS, setAddToDNS] = useState(true);
  const [restartPolicy, setRestartPolicy] = useState('always');
  
  // Resource limits
  const [cpuLimit, setCpuLimit] = useState(1);
  const [memoryLimit, setMemoryLimit] = useState(512);
  const [memorySwap, setMemorySwap] = useState(1024);
  const [networkLimit, setNetworkLimit] = useState(100);
  const [networkIngress, setNetworkIngress] = useState(100);
  const [networkEgress, setNetworkEgress] = useState(100);
  
  // Runtime and builder
  const [runtimeLanguage, setRuntimeLanguage] = useState('nodejs');
  const [builder, setBuilder] = useState('dockerfile');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [createdAppId, setCreatedAppId] = useState('');
  
  // Generate slug from app name
  useEffect(() => {
    if (appName) {
      setAppSlug(appName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [appName]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your API
    console.log({
      appName,
      appSlug,
      domainName,
      addToDNS,
      restartPolicy,
      resources: {
        cpu: cpuLimit,
        memory: memoryLimit,
        memorySwap,
        network: networkLimit,
        networkIngress,
        networkEgress
      },
      runtimeLanguage,
      builder
    });
    
    // Simulate successful creation
    setCreatedAppId(appSlug);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/project/${projectId}/applications`);
  };
  
  const navigateToApp = (route) => {
    setShowModal(false);
    navigate(`/project/${projectId}/app/${createdAppId}/${route}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/project/${projectId}/applications`} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Create Application</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Basic Information</h2>
            <p className="text-sm text-gray-500">Application details and configuration</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="app-name" className="block mb-1 text-sm font-medium text-gray-700">
                Application Name
              </label>
              <input
                type="text"
                id="app-name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="My Awesome App"
                required
              />
            </div>
            
            <div>
              <label htmlFor="app-slug" className="block mb-1 text-sm font-medium text-gray-700">
                Application Slug
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                  app/
                </span>
                <input
                  type="text"
                  id="app-slug"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appSlug}
                  onChange={(e) => setAppSlug(e.target.value)}
                  placeholder="my-awesome-app"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                This will be used in URLs and commands
              </p>
            </div>
            
            <div>
              <label htmlFor="domain-name" className="block mb-1 text-sm font-medium text-gray-700">
                Domain Name
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                  https://
                </span>
                <input
                  type="text"
                  id="domain-name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  placeholder="myapp.example.com"
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="add-to-dns"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={addToDNS}
                  onChange={(e) => setAddToDNS(e.target.checked)}
                />
                <label htmlFor="add-to-dns" className="block ml-2 text-sm text-gray-700">
                  Add to DNS automatically
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="restart-policy" className="block mb-1 text-sm font-medium text-gray-700">
                Restart Policy
              </label>
              <select
                id="restart-policy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={restartPolicy}
                onChange={(e) => setRestartPolicy(e.target.value)}
              >
                <option value="always">Always</option>
                <option value="no">No</option>
                <option value="unless-stopped">Unless Stopped</option>
                <option value="on-failure">On Failure</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Defines when the application should be automatically restarted
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Resource Limits</h2>
            <p className="text-sm text-gray-500">Configure the resources allocated to your application</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu size={18} className="text-gray-500" />
                  <label htmlFor="cpu-limit" className="block text-sm font-medium text-gray-700">
                    CPU Limit
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{cpuLimit} Core{cpuLimit > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                id="cpu-limit"
                min="0.5"
                max="8"
                step="0.5"
                value={cpuLimit}
                onChange={(e) => setCpuLimit(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>0.5 Core</span>
                <span>8 Cores</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-gray-500" />
                  <label htmlFor="memory-limit" className="block text-sm font-medium text-gray-700">
                    Memory Limit
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{memoryLimit} MB</span>
              </div>
              <input
                type="range"
                id="memory-limit"
                min="128"
                max="8192"
                step="128"
                value={memoryLimit}
                onChange={(e) => setMemoryLimit(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>128 MB</span>
                <span>8 GB</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive size={18} className="text-gray-500" />
                  <label htmlFor="memory-swap" className="block text-sm font-medium text-gray-700">
                    Memory Swap
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{memorySwap} MB</span>
              </div>
              <input
                type="range"
                id="memory-swap"
                min="256"
                max="16384"
                step="256"
                value={memorySwap}
                onChange={(e) => setMemorySwap(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>256 MB</span>
                <span>16 GB</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wifi size={18} className="text-gray-500" />
                  <label htmlFor="network-limit" className="block text-sm font-medium text-gray-700">
                    Network Limit
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{networkLimit} Mbps</span>
              </div>
              <input
                type="range"
                id="network-limit"
                min="10"
                max="1000"
                step="10"
                value={networkLimit}
                onChange={(e) => setNetworkLimit(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>10 Mbps</span>
                <span>1 Gbps</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wifi size={18} className="text-gray-500" />
                    <label htmlFor="network-ingress" className="block text-sm font-medium text-gray-700">
                      Network Ingress
                    </label>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{networkIngress} Mbps</span>
                </div>
                <input
                  type="range"
                  id="network-ingress"
                  min="10"
                  max="1000"
                  step="10"
                  value={networkIngress}
                  onChange={(e) => setNetworkIngress(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>10 Mbps</span>
                  <span>1 Gbps</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wifi size={18} className="text-gray-500" />
                    <label htmlFor="network-egress" className="block text-sm font-medium text-gray-700">
                      Network Egress
                    </label>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{networkEgress} Mbps</span>
                </div>
                <input
                  type="range"
                  id="network-egress"
                  min="10"
                  max="1000"
                  step="10"
                  value={networkEgress}
                  onChange={(e) => setNetworkEgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>10 Mbps</span>
                  <span>1 Gbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Runtime & Builder</h2>
            <p className="text-sm text-gray-500">Select the runtime environment and build method</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Runtime Language
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {[
                  { id: 'php', name: 'PHP', icon: <Code size={24} /> },
                  { id: 'nodejs', name: 'Node.js', icon: <Code size={24} /> },
                  { id: 'go', name: 'Go', icon: <Code size={24} /> },
                  { id: 'rust', name: 'Rust', icon: <Code size={24} /> },
                  { id: 'ruby', name: 'Ruby', icon: <Code size={24} /> },
                  { id: 'python', name: 'Python', icon: <Code size={24} /> },
                  { id: 'java', name: 'Java', icon: <Code size={24} /> },
                  { id: 'dotnet', name: '.NET', icon: <Code size={24} /> },
                  { id: 'clojure', name: 'Clojure', icon: <Code size={24} /> },
                  { id: 'scala', name: 'Scala', icon: <Code size={24} /> },
                ].map((lang) => (
                  <div
                    key={lang.id}
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer ${
                      runtimeLanguage === lang.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setRuntimeLanguage(lang.id)}
                  >
                    <div className={`${runtimeLanguage === lang.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {lang.icon}
                    </div>
                    <span className="mt-2 text-sm font-medium">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Builder
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {[
                  { id: 'dockerfile', name: 'Dockerfile', icon: <Package size={24} />, description: 'Build using a custom Dockerfile' },
                  { id: 'herokuish', name: 'Herokuish', icon: <Package size={24} />, description: 'Heroku-like build process' },
                  { id: 'lambda', name: 'Lambda Functions', icon: <Server size={24} />, description: 'Serverless function deployment' },
                  { id: 'cloud-native', name: 'Cloud Native', icon: <Globe size={24} />, description: 'Optimized for cloud environments' },
                ].map((build) => (
                  <div
                    key={build.id}
                    className={`flex flex-col p-4 border rounded-md cursor-pointer ${
                      builder === build.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBuilder(build.id)}
                  >
                    <div className="flex items-center">
                      <div className={`${builder === build.id ? 'text-blue-600' : 'text-gray-500'}`}>
                        {build.icon}
                      </div>
                      <span className={`ml-2 font-medium ${builder === build.id ? 'text-blue-700' : 'text-gray-700'}`}>
                        {build.name}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{build.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Monthly Cost</h3>
              <p className="text-sm text-gray-500">Based on your selected configuration</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">$2.00</div>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Link 
            to={`/project/${projectId}/applications`} 
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Application
          </button>
        </div>
      </form>
      
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Application Created Successfully
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your application has been created. You can now manage various aspects of your application.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { id: 'storage', name: 'Storage', icon: <HardDrive size={20} /> },
                    { id: 'network', name: 'Network', icon: <Wifi size={20} /> },
                    { id: 'ports', name: 'Ports', icon: <Server size={20} /> },
                    { id: 'deployment', name: 'Deployment', icon: <Package size={20} /> },
                    { id: 'config-manager', name: 'Config', icon: <Code size={20} /> },
                    { id: 'ssl', name: 'SSL', icon: <Globe size={20} /> },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center p-4 border rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => navigateToApp(item.id)}
                    >
                      <div className="mb-2 text-blue-600">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => navigateToApp('overview')}
                >
                  Go to Application Overview
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Return to Applications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCreateApplication;
