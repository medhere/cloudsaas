import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Github, GitBranch, GitPullRequest, RefreshCw, Save, Plus, Trash2, GitlabFilled, ExternalLink } from 'lucide-react';

// Custom GitlabFilled icon since it's not in lucide-react
const GitlabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
  </svg>
);

const AppIntegration = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('github');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [githubConfig, setGithubConfig] = useState({
    enabled: true,
    repository: 'username/repo-name',
    branch: 'main',
    autoDeployEnabled: true,
    deployOnPush: true,
    deployOnPR: false,
    secretToken: 'gh_secret_token_123456789',
    webhookUrl: `https://api.example.com/hooks/github/${appId}`
  });
  
  const [gitlabConfig, setGitlabConfig] = useState({
    enabled: false,
    repository: '',
    branch: 'main',
    autoDeployEnabled: false,
    deployOnPush: true,
    deployOnMR: false,
    secretToken: '',
    webhookUrl: `https://api.example.com/hooks/gitlab/${appId}`
  });

  const saveIntegration = () => {
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

  const generateToken = () => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    if (activeTab === 'github') {
      setGithubConfig({...githubConfig, secretToken: `gh_${token}`});
    } else {
      setGitlabConfig({...gitlabConfig, secretToken: `gl_${token}`});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration & Deployment</h1>
          <p className="text-gray-600 mt-1">Manage CI/CD integrations with GitHub and GitLab</p>
        </div>
        <div>
          <button 
            onClick={saveIntegration}
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
                Integration configuration saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('github')}
              className={`${
                activeTab === 'github'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <Github size={18} className="mr-2" />
              GitHub Integration
            </button>
            <button
              onClick={() => setActiveTab('gitlab')}
              className={`${
                activeTab === 'gitlab'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
            >
              <GitlabIcon size={18} className="mr-2" />
              GitLab Integration
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'github' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Github size={24} className="text-gray-700 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">GitHub Integration</h3>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="github-toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={githubConfig.enabled}
                    onChange={() => setGithubConfig({...githubConfig, enabled: !githubConfig.enabled})}
                  />
                  <label
                    htmlFor="github-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      githubConfig.enabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  ></label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="github-repo" className="block text-sm font-medium text-gray-700">
                    GitHub Repository
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      github.com/
                    </span>
                    <input
                      type="text"
                      id="github-repo"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="username/repository"
                      value={githubConfig.repository}
                      onChange={(e) => setGithubConfig({...githubConfig, repository: e.target.value})}
                      disabled={!githubConfig.enabled}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="github-branch" className="block text-sm font-medium text-gray-700">
                    Branch to Deploy
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <GitBranch size={16} />
                    </span>
                    <input
                      type="text"
                      id="github-branch"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="main"
                      value={githubConfig.branch}
                      onChange={(e) => setGithubConfig({...githubConfig, branch: e.target.value})}
                      disabled={!githubConfig.enabled}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="github-autodeploy"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={githubConfig.autoDeployEnabled}
                    onChange={() => setGithubConfig({...githubConfig, autoDeployEnabled: !githubConfig.autoDeployEnabled})}
                    disabled={!githubConfig.enabled}
                  />
                  <label htmlFor="github-autodeploy" className="ml-2 block text-sm text-gray-900">
                    Enable automatic deployments
                  </label>
                </div>

                <div className="pl-6 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="github-deploy-push"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={githubConfig.deployOnPush}
                      onChange={() => setGithubConfig({...githubConfig, deployOnPush: !githubConfig.deployOnPush})}
                      disabled={!githubConfig.enabled || !githubConfig.autoDeployEnabled}
                    />
                    <label htmlFor="github-deploy-push" className="ml-2 block text-sm text-gray-900">
                      Deploy on push to {githubConfig.branch}
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="github-deploy-pr"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={githubConfig.deployOnPR}
                      onChange={() => setGithubConfig({...githubConfig, deployOnPR: !githubConfig.deployOnPR})}
                      disabled={!githubConfig.enabled || !githubConfig.autoDeployEnabled}
                    />
                    <label htmlFor="github-deploy-pr" className="ml-2 block text-sm text-gray-900">
                      Deploy pull requests (preview environments)
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900">Webhook Configuration</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add this webhook to your GitHub repository settings to enable automatic deployments.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700">
                      Webhook URL
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="webhook-url"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 sm:text-sm"
                        value={githubConfig.webhookUrl}
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigator.clipboard.writeText(githubConfig.webhookUrl)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="webhook-secret" className="block text-sm font-medium text-gray-700">
                      Webhook Secret
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="webhook-secret"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 sm:text-sm"
                        value={githubConfig.secretToken}
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={generateToken}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <a 
                    href={`https://github.com/${githubConfig.repository}/settings/hooks/new`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Set up webhook in GitHub
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GitlabIcon size={24} className="text-gray-700 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">GitLab Integration</h3>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="gitlab-toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={gitlabConfig.enabled}
                    onChange={() => setGitlabConfig({...gitlabConfig, enabled: !gitlabConfig.enabled})}
                  />
                  <label
                    htmlFor="gitlab-toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      gitlabConfig.enabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  ></label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="gitlab-repo" className="block text-sm font-medium text-gray-700">
                    GitLab Repository
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      gitlab.com/
                    </span>
                    <input
                      type="text"
                      id="gitlab-repo"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="username/repository"
                      value={gitlabConfig.repository}
                      onChange={(e) => setGitlabConfig({...gitlabConfig, repository: e.target.value})}
                      disabled={!gitlabConfig.enabled}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gitlab-branch" className="block text-sm font-medium text-gray-700">
                    Branch to Deploy
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <GitBranch size={16} />
                    </span>
                    <input
                      type="text"
                      id="gitlab-branch"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="main"
                      value={gitlabConfig.branch}
                      onChange={(e) => setGitlabConfig({...gitlabConfig, branch: e.target.value})}
                      disabled={!gitlabConfig.enabled}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="gitlab-autodeploy"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={gitlabConfig.autoDeployEnabled}
                    onChange={() => setGitlabConfig({...gitlabConfig, autoDeployEnabled: !gitlabConfig.autoDeployEnabled})}
                    disabled={!gitlabConfig.enabled}
                  />
                  <label htmlFor="gitlab-autodeploy" className="ml-2 block text-sm text-gray-900">
                    Enable automatic deployments
                  </label>
                </div>

                <div className="pl-6 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="gitlab-deploy-push"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={gitlabConfig.deployOnPush}
                      onChange={() => setGitlabConfig({...gitlabConfig, deployOnPush: !gitlabConfig.deployOnPush})}
                      disabled={!gitlabConfig.enabled || !gitlabConfig.autoDeployEnabled}
                    />
                    <label htmlFor="gitlab-deploy-push" className="ml-2 block text-sm text-gray-900">
                      Deploy on push to {gitlabConfig.branch}
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="gitlab-deploy-mr"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={gitlabConfig.deployOnMR}
                      onChange={() => setGitlabConfig({...gitlabConfig, deployOnMR: !gitlabConfig.deployOnMR})}
                      disabled={!gitlabConfig.enabled || !gitlabConfig.autoDeployEnabled}
                    />
                    <label htmlFor="gitlab-deploy-mr" className="ml-2 block text-sm text-gray-900">
                      Deploy merge requests (preview environments)
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900">Webhook Configuration</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add this webhook to your GitLab repository settings to enable automatic deployments.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gitlab-webhook-url" className="block text-sm font-medium text-gray-700">
                      Webhook URL
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="gitlab-webhook-url"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 sm:text-sm"
                        value={gitlabConfig.webhookUrl}
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigator.clipboard.writeText(gitlabConfig.webhookUrl)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gitlab-webhook-secret" className="block text-sm font-medium text-gray-700">
                      Webhook Secret Token
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="gitlab-webhook-secret"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 sm:text-sm"
                        value={gitlabConfig.secretToken}
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={generateToken}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <a 
                    href={`https://gitlab.com/${gitlabConfig.repository}/-/hooks`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Set up webhook in GitLab
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppIntegration;
