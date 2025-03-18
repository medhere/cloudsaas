the main menu will contain the following:
Dashboard – Overview of projects, billing, resource usage, recent activity, and alerts.
Projects – Create, Manage and Delete all projects (servers).
Billing – Subscription plans, invoices, and payment methods.
Settings – User settings, API keys, and notifications.
Team Management – Invite/manage team members, roles, and permissions.
Activity Logs – Track system actions (server creation, deployments, billing events).
Security – 2FA, SSH key management, login history, and access control.
Support – Documentation, help center, ticketing system, and live chat.

The project-specific menu will contain the following:
Overview - each project is actually a server, show server specs and usage and anylytics
Manage- shutdown, reset, change setup, view and manage backups
Applications - view and manage web deployed applications and docker applications
Marketplace - show generic open source docker acontainerss that can be deployed
Project Keys - server ssh keys management
Deployment Settings - git auth settings
DNS Manager - manage DNS settings
Network Manager - managers docker network
Shell - project shell commands
Firewall - manages UFW on server
Registry - docker registry management
Events Log - server and docker logs
Monitoring - server and docker monitoring

the application-specific menu will contain:
Overview - shows quick info about the app
Logs - app logs
Users ACL - control list
Service ACL - service control lists
App Builder - builderpack settings
Git Deployment - git and repo deployment
Config Manager - handles environment variables for app
App Domains - manages domains for app
SSL Certificates - ssl manager and letsencrypt
Process and Resources- manages app processes and resource usage
Process Shell Commands - sends command to docker application
Cron Tasks - handles cron
Ports - manages app ports
Proxy - manages proxy and setsup nginx.conf.sigil
Storage - managers docker storage for app
Integration and Deployment - manage github actions and gitlab CI
AppJson and Procfile - configs app.json and procfile, stores and downloads
Routine Tasks - cleanup, events, app url list
App Monit - monit setup and management for app
