import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Database, Shield, Users, BarChart2, Code } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-blue-900 sm:pt-32 sm:pb-24 lg:pb-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Cloud Infrastructure Made Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Deploy, scale, and manage your applications with ease. PaaS10 provides everything you need to build and run modern applications in the cloud.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link
                to="/auth"
                className="px-5 py-3 text-base font-semibold text-blue-900 bg-yellow-500 rounded-md shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Get started
              </Link>
              <Link to="/documentation" className="text-base font-semibold leading-6 text-yellow-100 hover:text-yellow-200">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-800">Deploy Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
              Everything you need to deploy your app
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              PaaS10 provides a complete platform for building, deploying, and scaling your applications in the cloud.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <Server className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  Scalable Infrastructure
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Deploy your applications on our global network of data centers with automatic scaling to handle any traffic load.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <Database className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  Managed Databases
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Choose from a variety of database solutions with automatic backups, scaling, and high availability.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  Advanced Security
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Protect your applications with SSL, DDoS protection, and advanced access controls built into the platform.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <Users className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  Team Collaboration
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Invite team members, assign roles, and collaborate on projects with built-in tools for teams of any size.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <BarChart2 className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  Monitoring & Analytics
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Get insights into your application's performance and usage with built-in monitoring and analytics tools.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-blue-900">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg">
                    <Code className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  CI/CD Integration
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Seamlessly integrate with your existing development workflow with support for all major CI/CD platforms.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="max-w-xl mx-auto mt-6 text-lg leading-8 text-blue-100">
              Sign up today and deploy your first application in minutes. No credit card required to get started.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link
                to="/auth"
                className="px-5 py-3 text-base font-semibold text-blue-900 bg-yellow-500 rounded-md shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Sign up for free
              </Link>
              <Link to="/pricing" className="text-base font-semibold leading-6 text-yellow-100 hover:text-yellow-200">
                View pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
