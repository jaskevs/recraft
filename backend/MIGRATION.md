# Directus Migration & Data Recovery Guide

This guide explains how to restore the Directus schema and seed data that ship with the repository, and how to migrate existing content if you are moving from the legacy MySQL setup to PostgreSQL.

## Recommended: Apply Schema and Sample Content
1. Start the containers:
   ```bash
   cd backend
   docker compose up -d
   ```
2. Run the helper script (Git Bash, WSL, or any POSIX shell):
   ```bash
   ./migrate-and-seed.sh
   ```
3. Choose option **2** when prompted to apply the schema and seed the sample posts.

Behind the scenes the script waits for the health endpoint, applies `snapshots/schema.yaml`, then executes `/directus/scripts/seed.cjs` inside the container.

## CLI Alternatives
- Apply schema manually:
  ```bash
  docker compose exec directus npx directus schema apply /directus/snapshots/schema.yaml --yes
  ```
- Seed sample data manually:
  ```bash
  npm run seed                # wrapper around docker compose exec directus node /directus/scripts/seed.cjs
  ```

The seed script is idempotent: posts are matched by slug and updated if they already exist.

## Production / Render Workflow
1. Deploy the backend image using `backend/Dockerfile` (schema snapshot and seed assets are baked in).
2. After the service is running, open a Render shell (or task) and execute:
   ```bash
   node /directus/scripts/seed.cjs
   ```
3. Optionally expose `DIRECTUS_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` if they differ from defaults so the seed script can authenticate.

Whenever you change collections via the Directus admin UI:
1. Run `npm run schema:snapshot` locally to refresh `backend/snapshots/schema.yaml`.
2. Commit the updated snapshot and redeploy so the new structure is applied automatically on next boot.

## What the Snapshot Contains
- `posts` collection with status workflow (`draft`, `published`, `archived`)
- Field definitions for title, slug, HTML content, excerpt, featured image, and timestamps
- Collection settings such as default sort order and archive handling

## Seed Data Contents
- Three example posts with HTML content, slugs, excerpts, and publish dates
- SEO-ready fields you can customise or replace with real data

## Migrating Existing MySQL Content
If you still have access to the legacy MySQL volume, export the data and transform it before importing into PostgreSQL.

1. Dump the old MySQL database (container named `backend_mysql_data` in the previous stack):
   ```bash
   docker run --rm -v backend_mysql_data:/var/lib/mysql mysql:8.0 \
     mysqldump -h localhost -u directus -pdirectus directus > backup.sql
   ```
2. Adjust the SQL for PostgreSQL compatibility (data types, quoting, reserved words).
3. Import into PostgreSQL using `psql` or a migration tool of your choice.

## Post-Migration Checklist
- Visit the Directus admin panel: http://localhost:8055/admin
- Log in with `admin@example.com` / `General@7` (change immediately in production)
- Verify posts, assets, and permissions
- Start the Remix frontend (`npm run start:frontend`) and check that `/` and `/blog` render data

Need more background? See `docs/context/backend-directus.md` for architecture details.

