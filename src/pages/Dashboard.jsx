import React from 'react';
import { Server, Users, Clock, AlertTriangle, CreditCard, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for projects
const projectsData = [
  { id: 1, name: 'E-commerce Platform', cpu: 65, memory: 42, storage: 78 },
  { id: 2, name: 'Marketing Website', cpu: 25, memory: 18, storage: 45 },
  { id: 3, name: 'API Server', cpu: 85, memory: 72, storage: 60 },
  { id: 4, name: 'Admin Dashboard', cpu: 35, memory: 28, storage: 52 },
  { id: 5, name: 'Mobile Backend', cpu: 55, memory: 48, storage: 65 }
];

// Sample data for announcements
const announcements = [
  { 
    id: 1, 
    title: 'Scheduled Maintenance', 
    date: 'Nov 15, 2023', 
    preview: 'Scheduled maintenance on our database servers. Expect brief downtime...',
    priority: 'high'
  },
  { 
    id: 2, 
    title: 'New Feature Release', 
    date: 'Nov 10, 2023', 
    preview: 'We\'ve added new deployment options for static sites...',
    priority: 'medium'
  },
  { 
    id: 3, 
    title: 'Security Update', 
    date: 'Nov 5, 2023', 
    preview: 'Important security patches have been applied to all servers...',
    priority: 'high'
  }
];

const Dashboard = () => {
  // Get 3 random projects for resource usage display
  const getRandomProjects = (projects, count) => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const randomProjects = getRandomProjects(projectsData, 3);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Server className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Deployments Today</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Alerts</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Resource Usage from Random Projects */}
        <div className="p-6 bg-white rounded-lg shadow lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Project Resource Usage</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {randomProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-3 font-medium text-gray-900 truncate">{project.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">CPU</span>
                      <span className="text-xs text-gray-500">{project.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${project.cpu > 70 ? 'red' : project.cpu > 40 ? 'yellow' : 'green'}-600 h-1.5 rounded-full`} 
                        style={{ width: `${project.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Memory</span>
                      <span className="text-xs text-gray-500">{project.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${project.memory > 70 ? 'red' : project.memory > 40 ? 'yellow' : 'green'}-600 h-1.5 rounded-full`} 
                        style={{ width: `${project.memory}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Storage</span>
                      <span className="text-xs text-gray-500">{project.storage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${project.storage > 70 ? 'red' : project.storage > 40 ? 'yellow' : 'green'}-600 h-1.5 rounded-full`} 
                        style={{ width: `${project.storage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link to="./projects" className="text-sm text-blue-600 hover:text-blue-800">
              View all projects →
            </Link>
          </div>
        </div>
        
        {/* Quick Billing Information */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Billing Overview</h2>
            <CreditCard className="text-blue-600" size={20} />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Plan</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-medium">Pro Plan</p>
                <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  Active
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Next Payment</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-medium">$49.00</p>
                <p className="text-sm text-gray-500">Dec 1, 2023</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Resource Usage</p>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>Projects</span>
                    <span>10 of 15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '66.7%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>Storage</span>
                    <span>250GB of 500GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link to="./billing" className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800">
              <span>View billing details</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Announcements */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Announcements</h2>
          <Bell className="text-blue-600" size={20} />
        </div>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className={`w-2 h-2 mt-2 mr-2 rounded-full bg-${announcement.priority === 'high' ? 'red' : 'yellow'}-500`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                    <span className="text-xs text-gray-500">{announcement.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.preview}</p>
                </div>
              </div>
              <div className="mt-2 text-right">
                <Link 
                  to={`/support/announcements/${announcement.id}`} 
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <Link to="./support/announcements" className="text-sm text-blue-600 hover:text-blue-800">
            View all announcements →
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-gray-100">
                <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-full">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Project "E-commerce" deployed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="./activity" className="mt-4 text-sm text-blue-600 hover:text-blue-800">
            View all activity →
          </Link>
        </div>
        
        {/* Alerts */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold">Alerts</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-red-500 rounded bg-red-50">
              <div className="flex">
                <AlertTriangle className="mr-3 text-red-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-red-800">High CPU usage on "API Server"</p>
                  <p className="mt-1 text-xs text-red-700">CPU usage has been above 90% for 15 minutes</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-yellow-500 rounded bg-yellow-50">
              <div className="flex">
                <AlertTriangle className="mr-3 text-yellow-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Storage limit approaching</p>
                  <p className="mt-1 text-xs text-yellow-700">Project "CMS" is at 85% of storage limit</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 rounded bg-blue-50">
              <div className="flex">
                <AlertTriangle className="mr-3 text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-800">Billing cycle ending soon</p>
                  <p className="mt-1 text-xs text-blue-700">Your current billing cycle ends in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
