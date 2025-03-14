import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Server, Save, RefreshCw, Download, Upload, AlertTriangle } from 'lucide-react';

const AppProxy = () => {
  const { projectId, appId } = useParams();
  const [proxyConfig, setProxyConfig] = useState(`# nginx.conf.sigil for ${appId}
server {
  listen      [::]:80;
  listen      80;
  server_name {{ .NOSSL_SERVER_NAME }};
  access_log  /var/log/nginx/{{ .APP }}-access.log;
  error_log   /var/log/nginx/{{ .APP }}-error.log;

  # Redirect all HTTP requests to HTTPS
  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen      [::]:443 ssl http2;
  listen      443 ssl http2;
  server_name {{ .SSL_SERVER_NAME }};
  access_log  /var/log/nginx/{{ .APP }}-access.log;
  error_log   /var/log/nginx/{{ .APP }}-error.log;

  ssl_certificate     {{ .APP_SSL_PATH }}/server.crt;
  ssl_certificate_key {{ .APP_SSL_PATH }}/server.key;

  keepalive_timeout   70;
  add_header          Alternate-Protocol  443:npn-spdy/2;
  location / {
    proxy_pass http://{{ .APP }};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Port $server_port;
    proxy_set_header X-Request-Start $msec;
  }

  location /assets {
    alias /app/public/assets;
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  # Custom error pages
  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /app/public;
  }
}`);

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleConfigChange = (e) => {
    setProxyConfig(e.target.value);
  };

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
    const element = document.createElement('a');
    const file = new Blob([proxyConfig], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `nginx.conf.sigil`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proxy Configuration</h1>
          <p className="text-gray-600 mt-1">Manage Nginx proxy settings for your application</p>
        </div>
        <div className="flex space-x-2">
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
            Save Configuration
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
                Proxy configuration saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center">
            <Server size={20} className="mr-2 text-gray-500" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              nginx.conf.sigil
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            This configuration will be used to set up the Nginx proxy for your application.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Be careful when editing this file. Incorrect configuration may cause your application to be inaccessible.
                </p>
              </div>
            </div>
          </div>
          <textarea
            rows={20}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md font-mono"
            value={proxyConfig}
            onChange={handleConfigChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AppProxy;
