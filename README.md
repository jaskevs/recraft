# reCraft Blog

reCraft pairs a Directus 10 backend with a Remix 2 frontend to deliver a modern publishing workflow. This monorepo bundles both services plus supporting documentation so local development, schema management, and deployment stay in sync.

## Tech Stack
- Directus 10 + PostgreSQL 16 orchestrated with Docker Compose
- Remix 2 (React 18, TypeScript) served by Vite during development
- Tailwind CSS theme with minimalist overrides for typography and layout

## Project Structure & Module Organization
- `backend/` — Directus configuration, custom `extensions/`, persistent volumes, and Docker assets.
- `backend/snapshots/schema.yaml` — committed schema snapshot; regenerate after collection or field updates.
- `frontend/` — Remix workspace with routes in `app/routes/`, components in `app/components/`, and global styles in `app/styles/`.
- `docs/context/` — onboarding context for architecture, frontend, and backend decisions.
- `scripts/` — cross-cutting automation (linting, migrations, etc.) as they are introduced.

## Development Commands
- `npm install` — install workspace dependencies (runs frontend install via npm workspaces).
- `npm run start:backend` — launch Directus + PostgreSQL via Docker using `backend/.env` values.
- `npm run start:frontend` — start the Remix dev server (`http://localhost:5173`).
- `npm run start` — spin up backend and frontend sequentially; confirm container health with `docker compose -f backend/docker-compose.yml ps`.
- `npm run build` — create production assets in `frontend/build/`; run before releases or deployment packaging.
- `npm run clean` — tear down containers and clear `.cache`, `build/`, and `node_modules/` for a fresh state.
- `cd frontend && npm run preview` — serve the built bundle on port 4444 for stakeholder reviews.
- `npm run schema:snapshot` / `npm run schema:apply:local` — capture or apply Directus schema changes inside the running container.

## Coding Style & Naming Conventions
- TypeScript throughout; 2-space indentation, ES modules, and prefer named exports for shared utilities.
- Remix route naming follows dot/param conventions (`blog._index.tsx`, `blog.$slug.tsx`). Components live in `app/components/` with PascalCase filenames.
- Styling relies on Tailwind utility classes; global overrides should live in `app/styles/` and be registered through the `links()` export.

## Testing & QA
- Automated tests are not yet configured; run `npm run build` and exercise key flows via `npm run preview` for smoke coverage.
- Future unit/integration suites should live alongside source files as `*.test.ts[x]` or under `frontend/tests/` and `backend/tests/` as coverage grows.

## Environment & Configuration
- Copy `backend/.env.example` to `.env` (never commit secrets). Align `DIRECTUS_URL` with the Remix app by editing `frontend/app/utils/env.server.ts` or injecting env vars at deploy time.
- After altering Directus content models, run `npm run schema:snapshot` and commit the updated `backend/snapshots/schema.yaml` so new environments bootstrap correctly.
- Review `backend/MIGRATION.md` and `docs/context/*` for deeper architectural notes and operational guidance.

## Contribution Guidelines
- Use imperative, concise commit subjects under 70 characters (e.g., `Add author bio section`, `Fix Directus image proxy`).
- Pull requests should summarize scope, link issues, document env or schema changes, and attach UI/API evidence when relevant.
- Verify Docker services and the Remix build before opening a PR to reduce reviewer churn.

## Documentation
- Primary contributor reference: this `README.md`.
- Additional background: `docs/context/overview.md`, `docs/context/backend-directus.md`, `docs/context/frontend-remix.md`.

Feel free to extend these guidelines as the automation, testing strategy, and deployment footprint evolve.
