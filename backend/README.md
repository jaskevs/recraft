# reCraft Backend (Directus)

Directus drives the blog content layer, backed by PostgreSQL. Everything is containerised so the CMS can be started locally with a single command.

## Quick Start
```bash
# from repository root
cd backend
cp .env.example .env  # customise if needed

# start Directus and PostgreSQL
docker compose up -d

# stop containers
docker compose down

# reset database and uploads (DESTROYS local content)
docker compose down -v
```

## Services
- **PostgreSQL** (`postgres`)
  - Port `5432` exposed locally (configurable via `POSTGRES_HOST_PORT`)
  - Health check uses `pg_isready`
- **Directus** (`directus`)
  - Port `8055` exposed locally (`DIRECTUS_HOST_PORT`)
  - Applies `snapshots/schema.yaml` on startup if present
  - CORS defaults allow Remix dev servers (`http://localhost:3000`, `5173`, `4444`)

## Environment Variables
Copy `.env.example` to `.env` and tweak as required:
- `POSTGRES_*` - database credentials and port mapping
- `KEY` / `SECRET` - Directus security keys (replace for non-local use)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` - bootstrap admin account
- `PUBLIC_URL` - base URL served by Directus
- `CORS_ORIGIN` - CSV list of allowed origins
- Optional `DATABASE_URL` - overrides individual DB vars (handy for Render/production)

## Schema Workflow
- Schema snapshots live in `snapshots/`; commit `schema.yaml` to version Directus structure
- On container start the snapshot is applied automatically (idempotent)
- After making model changes in Directus:
  1. Run `npm run schema:snapshot`
  2. Commit the updated `backend/snapshots/schema.yaml`
  3. Redeploy so the new schema applies in other environments

## Helpful Commands
- `npm run schema:snapshot` - capture the current schema from the running container
- `npm run schema:apply:local` - copy the snapshot into the container and apply it
- `docker compose -f backend/docker-compose.yml logs directus` - inspect Directus startup output
- `docker compose -f backend/docker-compose.yml logs postgres` - inspect PostgreSQL startup output

## Render / Production Notes
- Build the backend image from `backend/Dockerfile`; the image already contains the schema snapshot
- Provide secure credentials and `DATABASE_URL` via environment variables
- Run `npm run schema:snapshot` after any datamodel changes so production stays in sync

For more context, see `docs/context/backend-directus.md` and `backend/MIGRATION.md`.

