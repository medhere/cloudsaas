import { createHashRouter } from 'react-router-dom';
import App from './App';

// Layouts
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProjectLayout from './components/layout/ProjectLayout';
import AppLayout from './components/layout/AppLayout';

// Public pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import HomeDocumentation from './pages/HomeDocumentation';


// Dashboard pages
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectCreate from './pages/ProjectCreate';
import TeamManagement from './pages/TeamManagement';
import TeamInvite from './pages/TeamInvite';
import Analytics from './pages/Analytics';
import ActivityLogs from './pages/ActivityLogs';
import Billing from './pages/Billing';
import InvoiceDetail from './pages/InvoiceDetail';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Support from './pages/Support';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Documentation from './pages/Documentation';

// Project pages
import ProjectOverview from './pages/project/ProjectOverview';
import ProjectManage from './pages/project/ProjectManage';
import ProjectChangeConfig from './pages/project/ProjectChangeConfig';
import ProjectApplications from './pages/project/ProjectApplications';
import ProjectCreateApplication from './pages/project/ProjectCreateApplication';
import ProjectMarketplace from './pages/project/ProjectMarketplace';
import ProjectKeys from './pages/project/ProjectKeys';
import ProjectDeployment from './pages/project/ProjectDeployment';
import ProjectDNS from './pages/project/ProjectDNS';
import ProjectNetwork from './pages/project/ProjectNetwork';
import ProjectShell from './pages/project/ProjectShell';
import ProjectFirewall from './pages/project/ProjectFirewall';
import ProjectRegistry from './pages/project/ProjectRegistry';
import ProjectEvents from './pages/project/ProjectEvents';
import ProjectMonitoring from './pages/project/ProjectMonitoring';

// App pages
import AppOverview from './pages/app/AppOverview';
import AppLogs from './pages/app/AppLogs';
import AppDomains from './pages/app/AppDomains';
import AppStorage from './pages/app/AppStorage';
import AppProcesses from './pages/app/AppProcesses';
import AppConfigManager from './pages/app/AppConfigManager';
import AppConfigFiles from './pages/app/AppConfigFiles';
import AppShell from './pages/app/AppShell';
import AppGitDeployment from './pages/app/AppGitDeployment';
import AppSSL from './pages/app/AppSSL';
import AppPorts from './pages/app/AppPorts';
import AppServiceACL from './pages/app/AppServiceACL';
import AppUsersACL from './pages/app/AppUsersACL';
import AppCron from './pages/app/AppCron';
import AppProxy from './pages/app/AppProxy';
import AppIntegration from './pages/app/AppIntegration';
import AppBuilder from './pages/app/AppBuilder';
import AppRoutine from './pages/app/AppRoutine';
import AppMonit from './pages/app/AppMonit';


export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'login', element: <AuthPage /> },
          { path: 'register', element: <AuthPage isRegister={true} /> },
          { path: 'pricing', element: <PricingPage /> },
          { path: 'features', element: <FeaturesPage /> },
        ],
      },
      { path: 'documentation', element: <HomeDocumentation /> },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'projects', element: <Projects /> },
          { path: 'projects/create', element: <ProjectCreate /> },
          { path: 'team', element: <TeamManagement /> },
          { path: 'team/invite', element: <TeamInvite /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'activity', element: <ActivityLogs /> },
          { path: 'billing', element: <Billing /> },
          { path: 'billing/invoice/:invoiceId', element: <InvoiceDetail /> },
          { path: 'settings', element: <Settings /> },
          { path: 'security', element: <Security /> },
          { path: 'support', element: <Support /> },
          { path: 'announcements', element: <Announcements /> },
          { path: 'announcements/:announcementId', element: <AnnouncementDetail /> },
        ],
      },
      { path: '/dashboard/documentation', element: <Documentation /> },
      {
        path: '/project/:projectId',
        element: <ProjectLayout />,
        children: [
          { index: true, element: <ProjectOverview /> },
          { path: 'manage', element: <ProjectManage /> },
          { path: 'change-config', element: <ProjectChangeConfig /> },
          { path: 'applications', element: <ProjectApplications /> },
          {path: 'create-application', element: <ProjectCreateApplication />},
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
      {
        path: '/project/:projectId/app/:appId',
        element: <AppLayout />,
        children: [
          { index: true, element: <AppOverview /> },
          { path: 'overview', element: <AppOverview /> },
          { path: 'logs', element: <AppLogs /> },
          { path: 'domains', element: <AppDomains /> },
          { path: 'storage', element: <AppStorage /> },
          { path: 'processes', element: <AppProcesses /> },
          { path: 'config', element: <AppConfigManager /> },
          { path: 'config/files', element: <AppConfigFiles /> },
          { path: 'shell', element: <AppShell /> },
          { path: 'git', element: <AppGitDeployment /> },
          { path: 'ssl', element: <AppSSL /> },
          { path: 'ports', element: <AppPorts /> },
          { path: 'acl/services', element: <AppServiceACL /> },
          { path: 'acl/users', element: <AppUsersACL /> },
          { path: 'cron', element: <AppCron /> },
          { path: 'proxy', element: <AppProxy /> },
          { path: 'integration', element: <AppIntegration /> },
          { path: 'builder', element: <AppBuilder /> },
          { path: 'routine', element: <AppRoutine /> },
          { path: 'monit', element: <AppMonit /> },
        ],
      },
    ],
  },
]);
