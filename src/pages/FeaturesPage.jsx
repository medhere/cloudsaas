import React from 'react';
import { Server, Database, Shield, Users, BarChart2, Code, Globe, Clock, Zap, Cpu, Cloud, Lock } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      name: 'Global Infrastructure',
      description: 'Deploy your applications on our global network of data centers with automatic scaling to handle any traffic load.',
      icon: <Globe className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Managed Databases',
      description: 'Choose from a variety of database solutions with automatic backups, scaling, and high availability.',
      icon: <Database className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Advanced Security',
      description: 'Protect your applications with SSL, DDoS protection, and advanced access controls built into the platform.',
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Team Collaboration',
      description: 'Invite team members, assign roles, and collaborate on projects with built-in tools for teams of any size.',
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Monitoring & Analytics',
      description: "Get insights into your application's performance and usage with built-in monitoring and analytics tools.",
      icon: <BarChart2 className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'CI/CD Integration',
      description: 'Seamlessly integrate with your existing development workflow with support for all major CI/CD platforms.',
      icon: <Code className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Auto Scaling',
      description: 'Automatically scale your applications up or down based on traffic and resource usage.',
      icon: <Zap className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Scheduled Backups',
      description: 'Configure automatic backups for your applications and databases on your preferred schedule.',
      icon: <Clock className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Compute Options',
      description: "Choose from a variety of compute options to match your application's needs and budget.",
      icon: <Cpu className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Serverless Functions',
      description: 'Deploy code without provisioning or managing servers, paying only for the compute time you use.',
      icon: <Cloud className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Private Networking',
      description: 'Secure communication between your services with private networking and VPC support.',
      icon: <Lock className="h-6 w-6 text-blue-600" />
    },
    {
      name: 'Container Registry',
      description: 'Store, manage, and secure your container images with our integrated container registry.',
      icon: <Server className="h-6 w-6 text-blue-600" />
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build in the cloud
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            CloudSaaS provides a complete platform for building, deploying, and scaling your applications with powerful features designed for modern development teams.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        
        {/* Feature Comparison */}
        <div className="mt-32 mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Feature</th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Starter</th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Professional</th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Projects</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">1</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">5</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Environments</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">2</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Unlimited</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Database Storage</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">1GB</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">10GB</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">100GB</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Auto-scaling</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">—</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">✓</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Backups</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Daily</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Hourly</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Continuous</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Support</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Community</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Priority</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">24/7 Phone</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Team Members</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">1</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">10</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">SSO Integration</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">—</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">—</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
