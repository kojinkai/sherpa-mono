# Sherpa

A modern monorepo for IPO tracking and financial data management, built with Next.js, Supabase, and Prisma.

## 🏗️ Project Structure

This monorepo is organized using pnpm workspaces and contains the following packages:

```
sherpa-mono/
├── apps/
│   └── web/                    # Next.js web application
├── packages/
│   ├── database/              # Prisma database package
│   └── edge-functions/        # Supabase Edge Functions
└── pnpm-workspace.yaml        # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18+ (recommended: 22+)
- **pnpm**: 10.12.1+ (specified in package.json)
- **Docker**: For local Supabase development
- **Deno**: For Edge Function development and testing
- **Supabase CLI**: For local development

> **Note**: PostgreSQL will be automatically installed via Docker when you run the Edge Functions for the first time using `pnpm supabase:start`.
>
> **macOS users**: Install Deno with `brew install deno`
### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd sherpa-mono
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create `.env` files in the following locations:

   **Root `.env**:\*\*

   ```env
   DATABASE_URL="your-database-url"
   SUPABASE_URL="your-supabase-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   FINNHUB_API_TOKEN="your-finnhub-api-token"
   ```

   **For developing the edge functions locally (packages/edge-functions/supabase/functions/.env):**

   ```env
   TEST_SUPABASE_URL="your-test-supabase-url"
   TEST_SUPABASE_ANON_KEY="your-test-supabase-anon-key"
   ```

4. **Set up the database:**

> **Note**: You can develop against a local version of Supabase if you run `pnpm supabase:start` from root. You will need to update the `DATABASE_URL` environment variable in the .env file you create in the `packages/database` directory to point PrismaJS to the local database URL. This URL is printed to the terminal when you run the `pnpm supabase:start` command
```bash
cd packages/database
pnpm db:generate    # Generate Prisma client
pnpm db:migrate     # Run migrations
pnpm db:seed        # Seed with initial data
```

5. **Start development:**
   ```bash
   pnpm dev            # Start web app and generate DB client
   ```

## 📦 Packages

### Apps

#### `web` - Next.js Web Application

- **Location**: `apps/web/`
- **Description**: Main web application built with Next.js 15, React 19, and Tailwind CSS
- **Features**: Authentication, IPO tracking interface, Tailwind Catalyst UI components

### Packages

#### `database` - Prisma Database Package

- **Location**: `packages/database/`
- **Description**: Database schema, migrations, and Prisma client
- **Features**: IPO data models, database seeding, migration management

**Scripts:**

```bash
pnpm --filter database db:generate    # Generate Prisma client
pnpm --filter database db:migrate     # Run database migrations
pnpm --filter database db:deploy      # Deploy migrations to production
pnpm --filter database db:seed        # Seed database with initial data
pnpm --filter database db:studio      # Open Prisma Studio
```

#### `edge-functions` - Supabase Edge Functions

- **Location**: `packages/edge-functions/`
- **Description**: Serverless functions for data processing and API endpoints
- **Features**: IPO calendar refresh, Finnhub API integration

**Scripts:**

```bash
pnpm --filter edge-functions test     # Run Deno tests
pnpm --filter edge-functions start    # Start Supabase and serve functions
pnpm --filter edge-functions stop     # Stop Supabase
```

## 🛠️ Development Scripts

### Root Level Scripts

```bash
pnpm dev              # Start development (web app + DB generation)
pnpm build            # Build all packages and deploy DB
pnpm start            # Start production web server
pnpm studio           # Open Prisma Studio
pnpm supabase:start   # Start Supabase locally
pnpm supabase:stop    # Stop Supabase
```

### Individual Package Scripts

**Web App:**

```bash
pnpm --filter web dev     # Development server
pnpm --filter web build   # Production build
pnpm --filter web start   # Production server
```

**Database:**

```bash
pnpm --filter database db:generate    # Generate Prisma client
pnpm --filter database db:migrate     # Run migrations
pnpm --filter database db:deploy      # Deploy to production
pnpm --filter database db:seed        # Seed database
pnpm --filter database db:studio      # Open Prisma Studio
```

**Edge Functions:**

```bash
pnpm --filter edge-functions test     # Run tests
pnpm --filter edge-functions start    # Start Supabase + functions
pnpm --filter edge-functions stop     # Stop Supabase
```

## 🧪 Testing

### Edge Function Tests

```bash
pnpm --filter edge-functions test
```

### Web App Tests

```bash
pnpm --filter web test
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Database**: Prisma ORM with PostgreSQL
- **Package Manager**: pnpm with workspaces
- **Testing**: Deno test framework for Edge Functions

### Data Flow

1. **Edge Functions** fetch IPO data from Finnhub API
2. **Database** stores and manages IPO information
3. **Web App** provides user interface for viewing and managing data
4. **Supabase** handles authentication and real-time features

## 📝 Environment Variables

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `FINNHUB_API_TOKEN`: Finnhub API token for IPO data

### Test Environment Variables

- `TEST_SUPABASE_URL`: Test Supabase project URL
- `TEST_SUPABASE_ANON_KEY`: Test Supabase anonymous key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm test`
5. Submit a pull request

## 📄 License

ISC License - see package.json for details