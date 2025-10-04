# Directus Backend Context

## Stack & Services
- Docker Compose runs `postgres` and `directus` containers (`backend/docker-compose.yml`).
- Environment defaults live in `.env.example`; `.env` is read by Compose for local overrides.
- Custom `Dockerfile` copies the committed schema snapshot, seed data, and helper scripts into the image before handing control to `entrypoint.sh`.

## Bootstrapping Flow
1. `docker compose up -d` brings up PostgreSQL, waits for health, and then starts Directus (`backend/docker-compose.yml`).
2. `entrypoint.sh` waits for the database socket, runs `directus bootstrap`, and applies `/directus/snapshots/schema.yaml` if present.
3. `backend/migrate-and-seed.sh` (or `npm run seed`) can be used after Directus is running to apply the schema again and/or seed posts in an idempotent way.

## Schema & Content
- Snapshot: `backend/snapshots/schema.yaml` defines the `posts` collection with fields for title, slug, HTML content, excerpt, featured image relation, status workflow (`draft`/`published`/`archived`), and audit timestamps.
- Files: `seed-data.json` stores three example posts accessed by `scripts/seed.cjs` (which upserts records based on slug).
- Assets: Uploaded files land in the `uploads/` volume mounted at `/directus/uploads` for persistence.

## Environment Variables
- Database: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and optional `DATABASE_URL`.
- Directus admin bootstrap: `ADMIN_EMAIL` and `ADMIN_PASSWORD` (defaults `admin@example.com` / `General@7`).
- Public URL & CORS: `PUBLIC_URL`, `CORS_ENABLED`, `CORS_ORIGIN` ensure the Remix frontend (`http://localhost:4444`) can access the API.

## Utilities & Commands
- `npm run start:backend`: wrapper for `docker compose up -d` from the repository root.
- `npm run schema:snapshot`: execs into the Directus container to snapshot schema back into `backend/snapshots/schema.yaml`.
- `npm run schema:apply:local`: copies the snapshot into the container and reapplies it (`directus schema apply`).
- `npm run seed`: executes `node /directus/scripts/seed.cjs` inside the running container (safe to rerun thanks to slug-based upserts).
- `backend/migrate-and-seed.sh`: interactive helper combining the previous commands with a simple menu.

## Deployment Considerations
- For production, supply a `DATABASE_URL` and stronger `KEY`/`SECRET` values.
- Storage volumes (`postgres_data`, `directus_uploads`, `directus_extensions`, `directus_snapshots`) are declared in Compose for data durability.
- After deploying to Render (or any container host), run `node /directus/scripts/seed.cjs` once per environment to populate sample content if desired.
- When updating collections, always run `npm run schema:snapshot` and commit the new `schema.yaml` to keep environments in sync.
