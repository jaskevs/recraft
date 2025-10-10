# reCraft Blog Overview

## Repository Layout
- `frontend/`: Remix-based web client that renders public blog pages and pulls data from Directus.
- `backend/`: Dockerized Directus headless CMS with PostgreSQL and schema snapshots.
- `docs/context/`: Onboarding docs for architecture, frontend, and backend specifics.
- `package.json`: Configures npm workspaces and shared commands for starting backend and frontend services.

## Architecture Snapshot
- Content authors work in Directus (`backend/`), which persists data to PostgreSQL and exposes REST endpoints.
- The Remix frontend (`frontend/app/lib/directus.ts`) uses `@directus/sdk` REST helpers to fetch published posts and related assets.
- Environment variables flow from server to browser via `getEnv` (`frontend/app/utils/env.server.ts`) and are injected into `window.ENV` in `root.tsx`.
- Styling leans on Tailwind-generated CSS (`frontend/app/styles/minimalist.css`) with bespoke utility classes for the minimalist aesthetic.

## Development Workflow
- Start everything: `npm run start` (spins up Directus via Docker Compose, then the Remix dev server).
- Backend only: `npm run start:backend` (runs `docker compose up -d` in `backend/`).
- Frontend only: `npm run start:frontend` (executes `npm run dev` in `frontend/`).
- Snapshot schema from a running Directus instance: `npm run schema:snapshot` (copies to `backend/snapshots/schema.yaml`).
- Apply schema to a local Directus container: `npm run schema:apply:local`.

## Data Model Highlights
- Snapshot (`backend/snapshots/schema.yaml`) defines a `posts` collection with status, slug, excerpt, HTML content, featured image relation, and timestamps.

## Helpful References
- Backend deep dive: `docs/context/backend-directus.md`
- Frontend deep dive: `docs/context/frontend-remix.md`
- Schema workflow guidance: `backend/MIGRATION.md`