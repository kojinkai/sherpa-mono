# Database Package

This package contains the database schema, seed data scripts, and related utilities for the Sherpa project.

## Prisma Commands

This package uses [Prisma](https://www.prisma.io/) as the ORM and migration tool. The following npm scripts are available for common database tasks:

### Generate Prisma Client

Regenerate the Prisma client after changing the schema:

```sh
pnpm run db:generate
```

### Run Migrations

Create a new migration after editing `schema.prisma` and apply it to your database:

```sh
pnpm run db:migrate
```

Apply existing migrations to the database (for production/deployment):

```sh
pnpm run db:deploy
```

### Seed the Database

Run the seed script (make sure your database is running and configured):

```sh
pnpm run db:seed
```

### Open Prisma Studio

Launch the Prisma Studio GUI to explore and edit your data:

```sh
pnpm run db:studio
```

---

## Regenerating Seed Data

To regenerate the IPO seed data, follow these steps:

1. **Set the Finnhub API Key**

   - Ensure the `FINNHUB_API_KEY` environment variable is set in your shell. This is required for the script to fetch data from the Finnhub API.

2. **Compile the Seed Data Script**

   - Run the following command to compile `create-seed-data.ts`:
     ```sh
     pnpx tsc --esModuleInterop create-seed-data.ts
     ```

3. **Run the Compiled Script**
   - Execute the script with your API key:
     ```sh
     export FINNHUB_API_KEY=<YOUR_FINNHUB_API_KEY> && node create-seed-data.js
     ```

Replace `<YOUR_FINNHUB_API_KEY>` with your actual Finnhub API key.

---

For more details, see the source files in this directory.
