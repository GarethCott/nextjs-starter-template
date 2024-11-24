# Next.js + Shadcn UI + TanStack Table Starter Template

<div align="center">
  <h2>🔋 Modern Next.js Starter Template</h2>
  <p>A feature-rich starter template combining Next.js, Shadcn UI, TanStack Table, and more.</p>
</div>

## ✨ Features

### Core Technologies

- ⚡️ Next.js 14 with App Router
- ⚛️ React 18
- 🎨 Shadcn UI Components
- 📊 TanStack Table v8
- 🎯 TypeScript
- 💨 Tailwind CSS 3
- 🌙 Dark Mode Support
- 🔒 AWS Amplify Authentication
- 📱 Fully Responsive Design

### Authentication Features

- 🔐 AWS Amplify Integration
  - User Registration & Login
  - Social Sign-in Options
  - Password Reset Flow
  - Protected Routes
  - Session Management
  - JWT Token Handling

### UI Components

- 🎯 Pre-built Shadcn UI Components

  - Buttons, Inputs, Cards
  - Modals, Sheets, Dropdowns
  - Forms, Alerts, Badges
  - Calendar, OTP Input
  - And many more...

- 📊 Advanced Data Table
  - Sorting & Filtering
  - Pagination
  - Column Visibility Toggle
  - Search Functionality
  - Custom Cell Rendering
  - Responsive Design

### Development Features

- 📏 ESLint & Prettier Configuration
- 🃏 Jest Testing Setup
- 📈 Absolute Imports
- 🐶 Husky & Lint Staged
- 🤖 Conventional Commits
- 👷 GitHub Actions
- 🗺 Automatic Sitemap Generation

## 🚀 Quick Start

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📚 Documentation

### Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/
│   │   ├── ui/             # Shadcn UI Components
│   │   │   ├── data-table/ # TanStack Table Components
│   │   │   └── ...         # Other UI Components
│   ├── lib/                # Utility Functions
│   └── styles/             # Global Styles
├── public/                 # Static Files
└── ...
```

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm test`: Run tests

### Key Features Documentation

#### Data Table

The data table component is built on top of TanStack Table and provides:

- Sorting: Click column headers to sort
- Filtering: Use the search box to filter records
- Pagination: Navigate through large datasets
- Column Management: Toggle column visibility
- Responsive: Works on all screen sizes

Example usage:

```tsx
import { DataTable } from '@/components/ui/data-table/data-table';

// Define your columns
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // ... more columns
];

// Your data
const data = [
  {
    id: 1,
    // ... more fields
  },
];

// Use the component
<DataTable columns={columns} data={data} searchKey='email' />;
```

#### Theme Support

The template includes a built-in theme system with light and dark mode support:

- Automatic system preference detection
- Manual theme switching
- Persistent theme selection

#### GraphQL Integration

- 🚀 Apollo Client Setup
  - Server-side Operations
  - Client-side Operations
  - Automatic Auth Token Handling
  - Role-based Access Control

#### GraphQL Client Architecture

The project uses a dual-client architecture for GraphQL operations:

1. **Server-side Client** (`lib/apollo/server-graphql-client.ts`)

   - Used in server components and server actions
   - Automatically includes auth tokens from middleware
   - Handles secure mutations and queries
   - Example usage:

   ```typescript
   import { serverClient } from '@/lib/apollo/server-graphql-client';

   export async function serverAction() {
     const result = await serverClient.query({
       query: YOUR_QUERY,
       variables: { ... }
     });
   }
   ```

2. **Client-side Client** (`lib/graphql-client.ts`)

   - Used in React components with Apollo hooks
   - Fetches auth tokens via secure API endpoint
   - Supports real-time updates and caching
   - Example usage:

   ```typescript
   import { useQuery } from '@apollo/client';

   export function Component() {
     const { data, loading } = useQuery(YOUR_QUERY);
   }
   ```

#### Authentication Flow

1. Middleware validates requests and sets auth headers
2. Server-side: Headers are directly accessed
3. Client-side: Auth tokens fetched via `/api/auth/token`
4. GraphQL requests include proper Hasura headers

#### Environment Setup

Required environment variables for Hasura:

```env
NEXT_PUBLIC_HASURA_GRAPHQL_URL=your-hasura-endpoint
NEXT_PUBLIC_HASURA_ADMIN_SECRET=your-hasura-admin-secret
```

## 🎯 Roadmap

- [ ] Add Form Validation Examples
- [ ] Add API Route Examples
- [ ] Add E2E Testing
- [ ] Add More Complex Table Examples
- [ ] Add Dashboard Layout
- [ ] Add Chart Components
- [ ] Add More Documentation

## 🙏 Acknowledgments

This template was originally forked from [ts-nextjs-tailwind-starter](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter) by [Theodorus Clarence](https://github.com/theodorusclarence). We've built upon his excellent foundation to create this enhanced version with Shadcn UI and TanStack Table integration.
