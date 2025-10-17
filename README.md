# reCraft Blog

reCraft is a modern tech blog stack that pairs a Directus headless CMS with a Remix frontend. This repository hosts both projects plus supporting tooling so the site can be developed and deployed from a single workspace.

## Tech Stack
- **Backend**: Directus 10 running on PostgreSQL 16 via Docker Compose
- **Frontend**: Remix 2 (React 18 + TypeScript) served through Vite during development
- **Styling**: Tailwind-generated minimalist theme with custom CSS utilities
- **Deployment**: Docker images for both services; ready for Render, Dokploy, or any container host

## Repository Layout
- `backend/` - Directus configuration, Docker Compose definitions, and schema snapshots
- `frontend/` - Remix application with routes, components, utilities, and static assets
- `docs/context/` - Architecture notes for onboarding (overview, backend, frontend)
- Root `package.json` - NPM workspace and convenience scripts for local dev and schema management

## Getting Started
```bash
# install dependencies for the workspace
npm install

# start Directus (Docker) and the Remix dev server
npm run start

# alternatively run services individually
npm run start:backend
npm run start:frontend
```

Useful extras:
- `npm run schema:snapshot` - capture the live Directus schema into `backend/snapshots/schema.yaml`
- `npm run schema:apply:local` - push the snapshot back into the running Directus container
- `npm run clean` - tear down containers and remove Remix build artifacts

## Backend Notes
- Environment defaults live in `backend/.env.example`; copy to `.env` for local overrides
- `backend/docker-compose.yml` runs PostgreSQL and Directus with health checks and persistent volumes
- Directus automatically applies the committed schema snapshot on startup via `entrypoint.sh`
- **Schema Management**: All field/collection changes are version-controlled in `backend/snapshots/schema.yaml`
  - After making changes in Directus admin UI, run `npm run schema:snapshot` to capture them
  - The snapshot uses PostgreSQL vendor format and will auto-apply on fresh deployments
- Additional detail: `docs/context/backend-directus.md` and `backend/MIGRATION.md`

## Frontend Notes
- Configure the Directus URL through `DIRECTUS_URL` (defaults to `http://localhost:8055`)
- Data fetching helpers live in `frontend/app/lib/directus.ts`
- Global layout is defined in `frontend/app/root.tsx`; routes under `frontend/app/routes/`
- Additional detail: `docs/context/frontend-remix.md`

## Documentation
- High-level overview: `docs/context/overview.md`
- Directus migration & schema workflow: `backend/MIGRATION.md`

Feel free to tailor these docs to match your team's workflow once you settle on a long-term deployment target.