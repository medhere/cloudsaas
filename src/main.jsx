import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'

// Layouts
import MainLayout from './components/layout/MainLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProjectLayout from './components/layout/ProjectLayout'

// Main pages
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import AuthPage from './pages/AuthPage'

// Dashboard pages
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectCreate from './pages/ProjectCreate'
import TeamManagement from './pages/TeamManagement'
import TeamInvite from './pages/TeamInvite'
import Billing from './pages/Billing'
import InvoiceDetail from './pages/InvoiceDetail'
import Settings from './pages/Settings'
import Security from './pages/Security'
import ActivityLogs from './pages/ActivityLogs'
import Analytics from './pages/Analytics'
import Announcements from './pages/Announcements'
import AnnouncementDetail from './pages/AnnouncementDetail'
import Support from './pages/Support'
import Documentation from './pages/Documentation'

// Project pages
import ProjectOverview from './pages/project/ProjectOverview'
import ProjectManage from './pages/project/ProjectManage'
import ProjectApplications from './pages/project/ProjectApplications'
import ProjectMarketplace from './pages/project/ProjectMarketplace'
import ProjectKeys from './pages/project/ProjectKeys'
import ProjectDeployment from './pages/project/ProjectDeployment'
import ProjectDNS from './pages/project/ProjectDNS'
import ProjectNetwork from './pages/project/ProjectNetwork'
import ProjectShell from './pages/project/ProjectShell'
import ProjectFirewall from './pages/project/ProjectFirewall'
import ProjectRegistry from './pages/project/ProjectRegistry'
import ProjectEvents from './pages/project/ProjectEvents'
import ProjectMonitoring from './pages/project/ProjectMonitoring'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'features', element: <FeaturesPage /> },
          { path: 'pricing', element: <PricingPage /> },
          { path: 'login', element: <AuthPage /> },
          { path: 'register', element: <AuthPage /> },
        ],
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'projects', element: <Projects /> },
          { path: 'projects/create', element: <ProjectCreate /> },
          { path: 'team', element: <TeamManagement /> },
          { path: 'team/invite', element: <TeamInvite /> },
          { path: 'billing', element: <Billing /> },
          { path: 'billing/invoice/:invoiceId', element: <InvoiceDetail /> },
          { path: 'settings', element: <Settings /> },
          { path: 'security', element: <Security /> },
          { path: 'activity', element: <ActivityLogs /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'announcements', element: <Announcements /> },
          { path: 'announcements/:announcementId', element: <AnnouncementDetail /> },
          { path: 'support', element: <Support /> },
          { path: 'docs', element: <Documentation /> },
        ],
      },
      {
        path: 'project/:projectId',
        element: <ProjectLayout />,
        children: [
          { index: true, element: <ProjectOverview /> },
          { path: 'manage', element: <ProjectManage /> },
          { path: 'applications', element: <ProjectApplications /> },
          { path: 'marketplace', element: <ProjectMarketplace /> },
          { path: 'keys', element: <ProjectKeys /> },
          { path: 'deployment', element: <ProjectDeployment /> },
          { path: 'dns', element: <ProjectDNS /> },
          { path: 'network', element: <ProjectNetwork /> },
          { path: 'shell', element: <ProjectShell /> },
          { path: 'firewall', element: <ProjectFirewall /> },
          { path: 'registry', element: <ProjectRegistry /> },
          { path: 'events', element: <ProjectEvents /> },
          { path: 'monitoring', element: <ProjectMonitoring /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
