import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, ChevronRight, Search } from 'lucide-react';

// Sample data for announcements
const announcements = [
  { 
    id: 1, 
    title: 'Scheduled Maintenance', 
    date: 'Nov 15, 2023', 
    preview: 'Scheduled maintenance on our database servers. Expect brief downtime...',
    content: `
      <p>Dear valued customers,</p>
      <p>We will be performing scheduled maintenance on our database servers on November 15, 2023, from 2:00 AM to 4:00 AM UTC. During this time, you may experience brief periods of downtime or degraded performance.</p>
      <p>This maintenance is necessary to implement important updates that will improve the overall reliability and performance of our platform.</p>
      <h3>What to expect:</h3>
      <ul>
        <li>Database services may be unavailable for short periods</li>
        <li>API requests might experience increased latency</li>
        <li>Dashboard metrics may not update in real-time</li>
      </ul>
      <p>We recommend scheduling critical deployments or operations outside of this maintenance window.</p>
      <p>Thank you for your understanding and patience as we work to improve our services.</p>
      <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
    `,
    priority: 'high'
  },
  { 
    id: 2, 
    title: 'New Feature Release', 
    date: 'Nov 10, 2023', 
    preview: 'We\'ve added new deployment options for static sites...',
    content: `
      <p>We're excited to announce the release of new deployment options for static sites!</p>
      <p>Starting today, you can take advantage of the following new features:</p>
      <h3>New capabilities:</h3>
      <ul>
        <li>Automatic HTTPS certificate provisioning</li>
        <li>Custom build commands for static site generators</li>
        <li>Improved caching controls for better performance</li>
        <li>Branch-based preview deployments</li>
      </ul>
      <p>These new features are available to all customers on Pro and Enterprise plans at no additional cost.</p>
      <p>Check out our <a href="#" class="text-blue-600 hover:underline">documentation</a> for more details on how to use these new features.</p>
      <p>We hope these improvements enhance your development workflow!</p>
    `,
    priority: 'medium'
  },
  { 
    id: 3, 
    title: 'Security Update', 
    date: 'Nov 5, 2023', 
    preview: 'Important security patches have been applied to all servers...',
    content: `
      <p>We have recently applied important security patches to all our servers to address several vulnerabilities.</p>
      <p>These updates were deployed without any service interruption and include:</p>
      <h3>Security improvements:</h3>
      <ul>
        <li>Patched OpenSSL vulnerabilities (CVE-2023-XXXX)</li>
        <li>Updated authentication mechanisms for enhanced security</li>
        <li>Improved rate limiting to prevent brute force attacks</li>
        <li>Enhanced logging for better security monitoring</li>
      </ul>
      <p>No action is required on your part, but we recommend reviewing your application's security practices regularly.</p>
      <p>As always, if you notice any suspicious activity on your account, please contact our security team immediately.</p>
      <p>Your trust is important to us, and we remain committed to maintaining the highest security standards for our platform.</p>
    `,
    priority: 'high'
  },
  { 
    id: 4, 
    title: 'Platform Performance Improvements', 
    date: 'Oct 28, 2023', 
    preview: 'We\'ve made significant improvements to our platform\'s performance...',
    content: `
      <p>We're pleased to announce that we've made significant improvements to our platform's performance.</p>
      <p>After extensive optimization work, you should notice:</p>
      <ul>
        <li>Up to 40% faster deployment times</li>
        <li>Reduced latency for API requests</li>
        <li>More responsive dashboard and UI</li>
        <li>Faster build times for all project types</li>
      </ul>
      <p>These improvements have been rolled out to all regions and are available to all customers immediately.</p>
      <p>We're committed to continuously improving our platform's performance and reliability.</p>
    `,
    priority: 'medium'
  },
  { 
    id: 5, 
    title: 'New Region: Asia Pacific', 
    date: 'Oct 20, 2023', 
    preview: 'We\'ve launched a new deployment region in Asia Pacific...',
    content: `
      <p>We're excited to announce the launch of our new deployment region in Asia Pacific (ap-southeast-1).</p>
      <p>This new region provides:</p>
      <ul>
        <li>Lower latency for users in Asia Pacific</li>
        <li>Improved compliance with regional data regulations</li>
        <li>Enhanced disaster recovery options</li>
        <li>Better global distribution for your applications</li>
      </ul>
      <p>You can select this region when creating new projects or migrate existing projects through the project settings page.</p>
      <p>This expansion is part of our commitment to providing a global, high-performance platform for all your applications.</p>
    `,
    priority: 'medium'
  }
];

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search announcements..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-4 ${announcement.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <Bell className={`${announcement.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold text-gray-900">{announcement.title}</h2>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span className="text-sm">{announcement.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{announcement.preview}</p>
                  <div className="mt-4 flex justify-end">
                    <Link 
                      to={`/support/announcements/${announcement.id}`} 
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {announcements.length} announcements
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
