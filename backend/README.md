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
- **PostgreSQL** (`recraft-space-postgres`)
  - Port `5432` exposed locally (configurable via `POSTGRES_HOST_PORT`)
  - Health check uses `pg_isready`
- **Directus** (`recraft-space-directus`)
  - Port `8055` exposed locally (`DIRECTUS_HOST_PORT`)
  - Applies `snapshots/schema.yaml` on startup if present
  - CORS defaults allow Remix dev servers (`http://localhost:3000`, `5173`, `4444`)

## Environment Variables
Copy `.env.example` to `.env` and tweak as required:
- `POSTGRES_*` – database credentials and port mapping
- `KEY` / `SECRET` – Directus security keys (replace for non-local use)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` – bootstrap admin account
- `PUBLIC_URL` – base URL served by Directus
- `CORS_ORIGIN` – CSV list of allowed origins
- Optional `DATABASE_URL` – overrides individual DB vars (handy for Render/production)

## Schema & Data
- Schema snapshots live in `snapshots/`; commit `schema.yaml` to version Directus structure
- `backend/scripts/seed.cjs` ships inside the Directus container for deterministic seeding
- `backend/migrate-and-seed.sh` wraps common tasks (start containers, apply schema, seed sample posts)
- Sample content resides in `seed-data.json`; the seed script is idempotent and matches posts by `slug`

## Helpful Commands
- `npm run schema:snapshot` – capture the current schema from the running container
- `npm run schema:apply:local` – copy the snapshot into the container and apply it
- `npm run seed` – execute `node /directus/scripts/seed.cjs` inside the container (Directus must be running)
- `docker logs recraft-space-directus` – inspect Directus startup output
- `docker logs recraft-space-postgres` – inspect PostgreSQL startup output

## Render / Production Notes
- Build the backend image from `backend/Dockerfile`; the image already contains the schema snapshot and seed assets
- After the first deploy, run `node /directus/scripts/seed.cjs` inside the container (Render one-off shell or background job) to apply the sample data. Rerun whenever you want to re-seed; the script upserts by slug.
- When you adjust collections in Directus, run `npm run schema:snapshot` locally and commit the updated `backend/snapshots/schema.yaml` so production tracks the same structure
- Remember to replace default credentials/keys with secure values in Render environment variables

For more context, see `docs/context/backend-directus.md` and `backend/MIGRATION.md`.
