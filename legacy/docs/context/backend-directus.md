# Directus Backend Context

## Stack & Services
- Docker Compose runs `postgres` and `directus` containers (`backend/docker-compose.yml`).
- Environment defaults live in `.env.example`; `.env` is read by Compose for local overrides.
- Custom `Dockerfile` copies the committed schema snapshot into the image before handing control to `entrypoint.sh`.

## Bootstrapping Flow
1. `docker compose up -d` brings up PostgreSQL, waits for health, and then starts Directus (`backend/docker-compose.yml`).
2. `entrypoint.sh` runs `directus bootstrap` and applies `/directus/snapshots/schema.yaml` if present.
3. Local scripts `npm run schema:snapshot` / `npm run schema:apply:local` capture and replay schema changes.

## Schema & Content
- Snapshot: `backend/snapshots/schema.yaml` defines the `posts` collection with status workflow (`draft`/`published`/`archived`) and associated fields.
- Assets: Uploaded files land in the `uploads/` volume mounted at `/directus/uploads` for persistence.

## Environment Variables
- Database: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and optional `DATABASE_URL`.
- Directus admin bootstrap: `ADMIN_EMAIL` and `ADMIN_PASSWORD` (defaults `admin@example.com` / `General@7`).
- Public URL & CORS: `PUBLIC_URL`, `CORS_ENABLED`, `CORS_ORIGIN` ensure the Remix frontend (`http://localhost:4444`) can access the API.

## Utilities & Commands
- `npm run start:backend`: wrapper for `docker compose up -d` from the repository root.
- `npm run schema:snapshot`: execs into the Directus container to snapshot schema back into `backend/snapshots/schema.yaml`.
- `npm run schema:apply:local`: copies the snapshot into the container and reapplies it (`directus schema apply`).
- `docker compose -f backend/docker-compose.yml logs directus`: inspect Directus startup output if schema apply fails.

## Deployment Considerations
- For production, supply a `DATABASE_URL` and stronger `KEY`/`SECRET` values.
- Storage volumes (`postgres_data`, `directus_uploads`, `directus_extensions`, `directus_snapshots`) are declared in Compose for data durability.
- When updating collections, always run `npm run schema:snapshot` and commit the new `schema.yaml` to keep environments in sync.
