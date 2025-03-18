import { useState } from 'react';
import { ChevronRight, Book, FileText, Code, Server, Database, Shield, Settings, HelpCircle, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeDoc, setActiveDoc] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  // Documentation structure
  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book size={20} />,
      docs: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'quick-start', title: 'Quick Start Guide' },
      ]
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      icon: <FileText size={20} />,
      docs: [
        { id: 'projects', title: 'Projects' },
        { id: 'environments', title: 'Environments' },
        { id: 'deployments', title: 'Deployments' },
        { id: 'scaling', title: 'Auto Scaling' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Code size={20} />,
      docs: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'endpoints', title: 'Endpoints' },
        { id: 'rate-limits', title: 'Rate Limits' },
        { id: 'webhooks', title: 'Webhooks' }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: <Server size={20} />,
      docs: [
        { id: 'regions', title: 'Regions & Zones' },
        { id: 'compute', title: 'Compute Options' },
        { id: 'networking', title: 'Networking' },
        { id: 'storage', title: 'Storage Solutions' }
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <Database size={20} />,
      docs: [
        { id: 'mysql', title: 'MySQL' },
        { id: 'postgresql', title: 'PostgreSQL' },
        { id: 'mongodb', title: 'MongoDB' },
        { id: 'redis', title: 'Redis' }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} />,
      docs: [
        { id: 'best-practices', title: 'Best Practices' },
        { id: 'encryption', title: 'Encryption' },
        { id: 'compliance', title: 'Compliance' },
        { id: 'access-control', title: 'Access Control' }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      icon: <Settings size={20} />,
      docs: [
        { id: 'teams', title: 'Teams' },
        { id: 'billing', title: 'Billing' },
        { id: 'usage', title: 'Usage & Quotas' },
        { id: 'support', title: 'Support Plans' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle size={20} />,
      docs: [
        { id: 'common-issues', title: 'Common Issues' },
        { id: 'logs', title: 'Logs & Monitoring' },
        { id: 'debugging', title: 'Debugging' },
        { id: 'faq', title: 'FAQ' }
      ]
    }
  ];

  // Sample documentation content
  const documentationContent = {
    'introduction': `
# Introduction to PaaS10

Welcome to PaaS10, the all-in-one cloud platform for modern applications. This documentation will help you get started with our platform and make the most of our services.

## What is PaaS10?

PaaS10 is a comprehensive cloud platform that provides infrastructure, deployment, and management tools for applications of all sizes. Whether you're building a small personal project or enterprise-grade applications, PaaS10 offers the tools and services you need.

## Key Features

- **Scalable Infrastructure**: Deploy your applications on our global network of data centers
- **Managed Databases**: Choose from a variety of database solutions with automatic backups and scaling
- **CI/CD Integration**: Seamlessly integrate with your existing development workflow
- **Team Collaboration**: Invite team members and manage permissions
- **Monitoring & Analytics**: Get insights into your application's performance and usage

## Getting Started

To get started with PaaS10, you'll need to:

1. Create an account
2. Set up your first project
3. Deploy your application

Follow our [Quick Start Guide](/documentation/quick-start) to deploy your first application in minutes.
    `,
    'quick-start': `
# Quick Start Guide

This guide will help you deploy your first application on PaaS10 in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- A PaaS10 account
- Your application code in a Git repository
- Basic familiarity with the command line

## Step 1: Create a New Project

1. Log in to your PaaS10 dashboard
2. Click on "New Project" in the Projects section
3. Enter a name for your project and select the appropriate region
4. Click "Create Project"

## Step 2: Connect Your Repository

1. In your project dashboard, go to the "Deployments" tab
2. Click "Connect Repository"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize PaaS10 to access your repositories
5. Select the repository containing your application

## Step 3: Configure Your Deployment

1. Choose your application type (Node.js, Python, Ruby, etc.)
2. Configure your build settings and environment variables
3. Select your desired compute resources
4. Click "Save Configuration"

## Step 4: Deploy Your Application

1. Click "Deploy" to start the deployment process
2. Monitor the deployment logs in real-time
3. Once deployment is complete, you'll receive a URL for your application

Congratulations! Your application is now live on PaaS10.

## Next Steps

- Set up a custom domain
- Configure auto-scaling
- Add a database
- Set up monitoring and alerts
    `,
    // Add more documentation content as needed
  };

  // Get current documentation content
  const currentDocContent = documentationContent[activeDoc] || 'Documentation content not found.';

  // Filter sections based on search query
  const filteredSections = searchQuery
    ? docSections.map(section => ({
      ...section,
      docs: section.docs.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.docs.length > 0)
    : docSections;

  return (

    <div className=" flex min-h-[calc(100vh-64px)]">
      {/* Documentation Sidebar */}
      <div className="w-64 min-h-full bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
          </div>
        </div>

        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {filteredSections.map((section) => (
            <div key={section.id} className="mb-4">
              <button
                onClick={() => setActiveSection(section.id === activeSection ? null : section.id)}
                className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-left text-gray-700 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500">{section.icon}</span>
                  {section.title}
                </div>
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${activeSection === section.id ? 'rotate-90' : ''
                    }`}
                />
              </button>

              {activeSection === section.id && (
                <div className="pl-8 mt-1 space-y-1">
                  {section.docs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDoc(doc.id)}
                      className={`block w-full text-left px-2 py-2 text-sm rounded-md ${activeDoc === doc.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Documentation Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Back Button */}
        <div className="p-8 mx-auto bg-white rounded-lg shadow-sm max-w-7xl">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap">{currentDocContent}</pre>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Documentation;
