import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import MainLayout from './components/layout/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import ProjectCreate from './pages/ProjectCreate.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import TeamInvite from './pages/TeamInvite.jsx'
import Billing from './pages/Billing.jsx'
import InvoiceDetail from './pages/InvoiceDetail.jsx'
import Analytics from './pages/Analytics.jsx'
import ActivityLogs from './pages/ActivityLogs.jsx'
import Security from './pages/Security.jsx'
import Settings from './pages/Settings.jsx'
import Support from './pages/Support.jsx'
import Documentation from './pages/Documentation.jsx'
import Announcements from './pages/Announcements.jsx'
import AnnouncementDetail from './pages/AnnouncementDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'projects/create',
        element: <ProjectCreate />
      },
      {
        path: 'team',
        element: <TeamManagement />
      },
      {
        path: 'team/invite',
        element: <TeamInvite />
      },
      {
        path: 'billing',
        element: <Billing />
      },
      {
        path: 'billing/invoice/:id',
        element: <InvoiceDetail />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'activity',
        element: <ActivityLogs />
      },
      {
        path: 'security',
        element: <Security />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'support',
        element: <Support />
      },
      {
        path: 'documentation',
        element: <Documentation />
      },
      {
        path: 'announcements',
        element: <Announcements />
      },
      {
        path: 'announcements/:id',
        element: <AnnouncementDetail />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
