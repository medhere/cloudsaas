import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar } from 'lucide-react';

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
  }
];

const AnnouncementDetail = () => {
  const { id } = useParams();
  const announcement = announcements.find(a => a.id === parseInt(id, 10));
  
  if (!announcement) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Announcement Not Found</h1>
        <p className="text-gray-600 mb-6">The announcement you're looking for doesn't exist or has been removed.</p>
        <Link to="/support/announcements" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Announcements
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link to="/support/announcements" className="text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold">Announcement</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start space-x-3 mb-6">
          <div className={`p-3 rounded-full ${announcement.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
            <Bell className={`${announcement.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <Calendar size={16} className="mr-1" />
              <span>{announcement.date}</span>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content }}></div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link to="/support/announcements" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Announcements
            </Link>
            
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-800">Share</button>
              <button className="text-gray-600 hover:text-gray-800">Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
