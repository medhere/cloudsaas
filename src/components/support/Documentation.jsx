import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Search, Book, Code, Server, Database, Shield, Settings, CreditCard } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Documentation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  
  // Dummy documentation structure
  // In a real app, this would be fetched from an API
  const documentationMenus = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book size={18} />,
      submenus: [
        {
          id: 'introduction',
          title: 'Introduction',
          pages: [
            { id: 'welcome', title: 'Welcome to CloudSaaS' },
            { id: 'overview', title: 'Platform Overview' },
            { id: 'quickstart', title: 'Quick Start Guide' }
          ]
        },
        {
          id: 'account-setup',
          title: 'Account Setup',
          pages: [
            { id: 'create-account', title: 'Creating an Account' },
            { id: 'team-setup', title: 'Setting Up Your Team' },
            { id: 'billing-setup', title: 'Configuring Billing' }
          ]
        }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: <Server size={18} />,
      submenus: [
        {
          id: 'deployment-basics',
          title: 'Deployment Basics',
          pages: [
            { id: 'deployment-overview', title: 'Deployment Overview' },
            { id: 'deployment-methods', title: 'Deployment Methods' },
            { id: 'continuous-deployment', title: 'Continuous Deployment' }
          ]
        },
        {
          id: 'environments',
          title: 'Environments',
          pages: [
            { id: 'environment-types', title: 'Environment Types' },
            { id: 'environment-variables', title: 'Environment Variables' },
            { id: 'environment-config', title: 'Environment Configuration' }
          ]
        }
      ]
    },
    {
      id: 'development',
      title: 'Development',
      icon: <Code size={18} />,
      submenus: [
        {
          id: 'frameworks',
          title: 'Framework Guides',
          pages: [
            { id: 'react', title: 'React Applications' },
            { id: 'vue', title: 'Vue.js Applications' },
            { id: 'angular', title: 'Angular Applications' },
            { id: 'node', title: 'Node.js Applications' }
          ]
        },
        {
          id: 'databases',
          title: 'Database Integration',
          pages: [
            { id: 'mongodb', title: 'MongoDB Integration' },
            { id: 'postgresql', title: 'PostgreSQL Integration' },
            { id: 'mysql', title: 'MySQL Integration' }
          ]
        }
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database size={18} />,
      submenus: [
        {
          id: 'database-setup',
          title: 'Database Setup',
          pages: [
            { id: 'create-database', title: 'Creating a Database' },
            { id: 'connect-database', title: 'Connecting to Your Database' },
            { id: 'database-backup', title: 'Database Backups' }
          ]
        },
        {
          id: 'database-management',
          title: 'Database Management',
          pages: [
            { id: 'scaling', title: 'Scaling Your Database' },
            { id: 'monitoring', title: 'Database Monitoring' },
            { id: 'optimization', title: 'Performance Optimization' }
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={18} />,
      submenus: [
        {
          id: 'security-basics',
          title: 'Security Basics',
          pages: [
            { id: 'security-overview', title: 'Security Overview' },
            { id: 'best-practices', title: 'Security Best Practices' },
            { id: 'compliance', title: 'Compliance and Regulations' }
          ]
        },
        {
          id: 'authentication',
          title: 'Authentication',
          pages: [
            { id: 'auth-methods', title: 'Authentication Methods' },
            { id: 'sso', title: 'Single Sign-On (SSO)' },
            { id: 'mfa', title: 'Multi-Factor Authentication' }
          ]
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: <CreditCard size={18} />,
      submenus: [
        {
          id: 'billing-basics',
          title: 'Billing Basics',
          pages: [
            { id: 'pricing', title: 'Pricing Overview' },
            { id: 'payment-methods', title: 'Payment Methods' },
            { id: 'invoices', title: 'Invoices and Receipts' }
          ]
        },
        {
          id: 'billing-management',
          title: 'Billing Management',
          pages: [
            { id: 'usage-tracking', title: 'Usage Tracking' },
            { id: 'cost-optimization', title: 'Cost Optimization' },
            { id: 'billing-alerts', title: 'Billing Alerts' }
          ]
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={18} />,
      submenus: [
        {
          id: 'account-settings',
          title: 'Account Settings',
          pages: [
            { id: 'profile', title: 'Profile Settings' },
            { id: 'notifications', title: 'Notification Preferences' },
            { id: 'api-keys', title: 'API Keys' }
          ]
        },
        {
          id: 'team-settings',
          title: 'Team Settings',
          pages: [
            { id: 'team-management', title: 'Team Management' },
            { id: 'roles-permissions', title: 'Roles and Permissions' },
            { id: 'audit-logs', title: 'Audit Logs' }
          ]
        }
      ]
    }
  ];

  // Generate dummy markdown content based on the selected page
  useEffect(() => {
    if (activePage) {
      // In a real app, this would fetch the actual markdown file from the server
      const dummyMarkdown = `
# ${activePage.title}

## Overview

This is the documentation for ${activePage.title}. This content would be loaded from a markdown file stored on the server.

## Getting Started

1. First step for ${activePage.title}
2. Second step for ${activePage.title}
3. Third step for ${activePage.title}

## Code Example

\`\`\`javascript
// Example code for ${activePage.title}
function example() {
  console.log("This is an example for ${activePage.title}");
  return true;
}
\`\`\`

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| apiKey | string | null | Your API key for authentication |
| timeout | number | 3000 | Request timeout in milliseconds |
| retries | number | 0 | Number of retry attempts |

## Additional Resources

- [Link to related documentation](#)
- [GitHub repository](#)
- [Community forum](#)

> **Note:** This is a placeholder markdown content. In a real application, this would be loaded from actual documentation files.
      `;
      
      setMarkdownContent(dummyMarkdown);
    } else {
      setMarkdownContent('');
    }
  }, [activePage]);

  // Handle menu click
  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setActiveSubmenu(null);
      setActivePage(null);
    } else {
      setActiveMenu(menuId);
      setActiveSubmenu(null);
      setActivePage(null);
    }
  };

  // Handle submenu click
  const handleSubmenuClick = (submenuId) => {
    if (activeSubmenu === submenuId) {
      setActiveSubmenu(null);
      setActivePage(null);
    } else {
      setActiveSubmenu(submenuId);
      setActivePage(null);
    }
  };

  // Handle page click
  const handlePageClick = (page) => {
    setActivePage(page);
  };

  // Handle back button click
  const handleBackClick = () => {
    if (activePage) {
      setActivePage(null);
    } else if (activeSubmenu) {
      setActiveSubmenu(null);
    } else if (activeMenu) {
      setActiveMenu(null);
    }
  };

  // Filter menus based on search query
  const filteredMenus = searchQuery
    ? documentationMenus.filter(menu => 
        menu.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.submenus.some(submenu => 
          submenu.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          submenu.pages.some(page => 
            page.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      )
    : documentationMenus;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Documentation</h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse our comprehensive documentation for detailed guides and tutorials
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Documentation Menu */}
        <div className="lg:col-span-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="p-2 max-h-[600px] overflow-y-auto">
            {filteredMenus.map((menu) => (
              <div key={menu.id} className="mb-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                    activeMenu === menu.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">{menu.icon}</span>
                    <span className="font-medium">{menu.title}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transform transition-transform ${
                      activeMenu === menu.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {activeMenu === menu.id && (
                  <div className="ml-6 mt-1 space-y-1">
                    {menu.submenus.map((submenu) => (
                      <div key={submenu.id}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                            activeSubmenu === submenu.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleSubmenuClick(submenu.id)}
                        >
                          <span className="text-sm font-medium">{submenu.title}</span>
                          <ChevronRight
                            size={14}
                            className={`transform transition-transform ${
                              activeSubmenu === submenu.id ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        
                        {activeSubmenu === submenu.id && (
                          <div className="ml-4 mt-1 space-y-1">
                            {submenu.pages.map((page) => (
                              <button
                                key={page.id}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${
                                  activePage && activePage.id === page.id
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                                onClick={() => handlePageClick(page)}
                              >
                                {page.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Documentation Content */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          {activePage ? (
            <div>
              <button
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                onClick={handleBackClick}
              >
                <ArrowLeft size={16} className="mr-1" />
                <span>Back to {activeSubmenu ? documentationMenus.find(m => m.id === activeMenu)?.submenus.find(s => s.id === activeSubmenu)?.title : 'menu'}</span>
              </button>
              
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Book size={40} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Documentation</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Select a topic from the menu to view detailed documentation, guides, and tutorials.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-1">Getting Started</h4>
                  <p className="text-sm text-gray-500">Platform basics and setup guides</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-1">Deployment</h4>
                  <p className="text-sm text-gray-500">Learn about deployment options</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium mb-1">Development</h4>
                  <p className="text-sm text-gray-500">Framework-specific guides</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
