import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Search, Filter, Download, Star } from 'lucide-react';

const ProjectMarketplace = () => {
  const { projectId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for marketplace apps
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'databases', name: 'Databases' },
    { id: 'web-servers', name: 'Web Servers' },
    { id: 'cms', name: 'Content Management' },
    { id: 'dev-tools', name: 'Developer Tools' },
    { id: 'monitoring', name: 'Monitoring' },
  ];
  
  const apps = [
    { 
      id: 1, 
      name: 'PostgreSQL', 
      description: 'Advanced open source database', 
      category: 'databases',
      image: 'https://www.postgresql.org/media/img/about/press/elephant.png',
      stars: 4.8,
      downloads: '10M+',
      tags: ['Database', 'SQL', 'Relational']
    },
    { 
      id: 2, 
      name: 'MongoDB', 
      description: 'NoSQL document database', 
      category: 'databases',
      image: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
      stars: 4.5,
      downloads: '8M+',
      tags: ['Database', 'NoSQL', 'Document']
    },
    { 
      id: 3, 
      name: 'Nginx', 
      description: 'High-performance HTTP server', 
      category: 'web-servers',
      image: 'https://nginx.org/nginx.png',
      stars: 4.9,
      downloads: '15M+',
      tags: ['Web Server', 'Proxy', 'Load Balancer']
    },
    { 
      id: 4, 
      name: 'WordPress', 
      description: 'Popular CMS for websites', 
      category: 'cms',
      image: 'https://s.w.org/style/images/about/WordPress-logotype-standard.png',
      stars: 4.6,
      downloads: '20M+',
      tags: ['CMS', 'Blog', 'PHP']
    },
    { 
      id: 5, 
      name: 'Redis', 
      description: 'In-memory data structure store', 
      category: 'databases',
      image: 'https://redis.io/images/redis-white.png',
      stars: 4.7,
      downloads: '12M+',
      tags: ['Cache', 'NoSQL', 'In-Memory']
    },
    { 
      id: 6, 
      name: 'Grafana', 
      description: 'Analytics & monitoring solution', 
      category: 'monitoring',
      image: 'https://grafana.com/static/assets/img/grafana_logo_swirl.svg',
      stars: 4.6,
      downloads: '5M+',
      tags: ['Monitoring', 'Visualization', 'Analytics']
    },
  ];
  
  // Filter apps based on search and category
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace: {projectId}</h1>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex-shrink-0 mr-3">
                    <img src={app.image} alt={app.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{app.stars}</span>
                      <span className="text-sm text-gray-500 ml-3">
                        <Download className="h-4 w-4 inline mr-1" />
                        {app.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{app.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {app.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                  <Download size={16} />
                  <span>Deploy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredApps.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectMarketplace;
