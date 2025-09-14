# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Multi-Tenant SaaS Notes Application

A secure, multi-tenant notes application with role-based access control and subscription plans.

## Features

- Multi-tenancy with data isolation
- JWT-based authentication
- Role-based access control (Admin/Member)
- Subscription plans (Free/Pro) with feature gating
- Full CRUD operations for notes
- Responsive design with Tailwind CSS

## Multi-Tenancy Approach

This application uses a **shared schema with tenant ID column** approach. All data is stored in a single database with tenant IDs used to isolate data between different companies. This approach provides:

1. **Data Isolation**: Each tenant can only access their own data through tenant ID checks
2. **Scalability**: Easy to add new tenants without schema changes
3. **Maintenance**: Single database to maintain and backup

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend