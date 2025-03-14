import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileJson, FileText, Save, Download, Upload, RefreshCw, AlertTriangle } from 'lucide-react';

const AppConfigFiles = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('appjson');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [appJsonContent, setAppJsonContent] = useState(`{
  "name": "${appId}",
  "description": "A sample application",
  "keywords": [
    "productivity",
    "cloud",
    "saas"
  ],
  "website": "https://example.com/",
  "repository": "https://github.com/username/repo",
  "logo": "https://example.com/logo.png",
  "success_url": "/welcome",
  "scripts": {
    "postdeploy": "bundle exec rake db:migrate"
  },
  "env": {
    "SECRET_TOKEN": {
      "description": "A secret key for verifying the integrity of signed cookies.",
      "generator": "secret"
    },
    "WEB_CONCURRENCY": {
      "description": "The number of processes to run.",
      "value": "5"
    }
  },
  "formation": {
    "web": {
      "quantity": 1,
      "size": "standard-1x"
    },
    "worker": {
      "quantity": 1,
      "size": "standard-1x"
    }
  },
  "addons": [
    "heroku-postgresql",
    "papertrail"
  ],
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    },
    {
      "url": "heroku/ruby"
    }
  ]
}`);

  const [procfileContent, setProcfileContent] = useState(`web: npm start
worker: node worker.js
release: npm run db:migrate
cron: node cron-worker.js`);

  const saveConfig = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  const downloadConfig = () => {
    const content = activeTab === 'appjson' ? appJsonContent : procfileContent;
    const filename = activeTab === 'appjson' ? 'app.json' : 'Procfile';
    
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (activeTab === 'appjson') {
        setAppJsonContent(content);
      } else {
        setProcfileContent(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration Files</h1>
          <p className="text-gray-600 mt-1">Manage app.json and Procfile configurations</p>
        </div>
        <div className="flex space-x-2">
          <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <Upload size={16} className="mr-2" />
            Upload
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <button 
            onClick={downloadConfig}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download size={16} className="mr-2" />
            Download
          </button>
          <button 
            onClick={saveConfig}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            Save
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Configuration saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('appjson')}
              className={`${
                activeTab === 'appjson'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileJson size={18} className="mr-2" />
              app.json
            </button>
            <button
              onClick={() => setActiveTab('procfile')}
              className={`${
                activeTab === 'procfile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileText size={18} className="mr-2" />
              Procfile
            </button>
          </nav>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {activeTab === 'appjson' ? (
            <div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      The app.json file defines your application, its dependencies, and various configuration variables.
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                rows={20}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md font-mono"
                value={appJsonContent}
                onChange={(e) => setAppJsonContent(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      The Procfile specifies the commands that are executed by the app on startup. Format: <process type>: <command>
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                rows={10}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md font-mono"
                value={procfileContent}
                onChange={(e) => setProcfileContent(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {activeTab === 'appjson' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              app.json Reference
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Common Properties</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">name</code>: Application name</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">description</code>: Brief description</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">keywords</code>: Array of keywords</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">website</code>: Application website URL</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">repository</code>: Code repository URL</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">logo</code>: URL to application logo</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Advanced Properties</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">env</code>: Environment variables</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">formation</code>: Process formation</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">addons</code>: Required add-ons</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">buildpacks</code>: Buildpack configurations</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">scripts</code>: Custom scripts to run</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">success_url</code>: URL to redirect to after deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'procfile' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Procfile Reference
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Common Process Types</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">web</code>: Web server process</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">worker</code>: Background worker process</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">clock</code>: Scheduled job process</li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">release</code>: Commands to run during release phase</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Format Examples</h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">web: npm start</code></li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">worker: node worker.js</code></li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">release: npm run db:migrate</code></li>
                  <li><code className="text-xs bg-gray-100 px-1 py-0.5 rounded">cron: node cron-worker.js</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppConfigFiles;
