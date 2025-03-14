import React, { useState } from 'react';
import { ChevronRight, Book, FileText, Code, Server, Database, Shield, Settings, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeDoc, setActiveDoc] = useState('introduction');

  // Documentation structure
  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book size={20} />,
      docs: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'installation', title: 'Installation' },
        { id: 'account-setup', title: 'Account Setup' }
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
# Introduction to CloudSaaS

Welcome to CloudSaaS, the all-in-one cloud platform for modern applications. This documentation will help you get started with our platform and make the most of our services.

## What is CloudSaaS?

CloudSaaS is a comprehensive cloud platform that provides infrastructure, deployment, and management tools for applications of all sizes. Whether you're building a small personal project or enterprise-grade applications, CloudSaaS offers the tools and services you need.

## Key Features

- **Scalable Infrastructure**: Deploy your applications on our global network of data centers
- **Managed Databases**: Choose from a variety of database solutions with automatic backups and scaling
- **CI/CD Integration**: Seamlessly integrate with your existing development workflow
- **Team Collaboration**: Invite team members and manage permissions
- **Monitoring & Analytics**: Get insights into your application's performance and usage

## Getting Started

To get started with CloudSaaS, you'll need to:

1. Create an account
2. Set up your first project
3. Deploy your application

Follow our [Quick Start Guide](/documentation/quick-start) to deploy your first application in minutes.
    `,
    'quick-start': `
# Quick Start Guide

This guide will help you deploy your first application on CloudSaaS in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- A CloudSaaS account
- Your application code in a Git repository
- Basic familiarity with the command line

## Step 1: Create a New Project

1. Log in to your CloudSaaS dashboard
2. Click on "New Project" in the Projects section
3. Enter a name for your project and select the appropriate region
4. Click "Create Project"

## Step 2: Connect Your Repository

1. In your project dashboard, go to the "Deployments" tab
2. Click "Connect Repository"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize CloudSaaS to access your repositories
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

Congratulations! Your application is now live on CloudSaaS.

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Documentation Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold">Documentation</h1>
        </div>
        
        <nav className="p-4">
          {docSections.map((section) => (
            <div key={section.id} className="mb-4">
              <button
                onClick={() => setActiveSection(section.id === activeSection ? null : section.id)}
                className="flex items-center justify-between w-full text-left px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500">{section.icon}</span>
                  {section.title}
                </div>
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              {activeSection === section.id && (
                <div className="mt-1 pl-8 space-y-1">
                  {section.docs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDoc(doc.id)}
                      className={`block w-full text-left px-2 py-2 text-sm rounded-md ${
                        activeDoc === doc.id
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
      <div className="flex-1 overflow-auto p-8">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap">{currentDocContent}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
