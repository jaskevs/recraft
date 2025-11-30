# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This repository hosts a Payload CMS + Next.js website template and a PostgreSQL database used by that site.

Current layout:
- Application (Payload CMS + Next.js) in the **repository root**.
- PostgreSQL instance for the app in `database/`.

The canonical source of truth for contributor docs, commands, and workflows is `README.md`. WARP should treat this file as a concise navigation layer and defer to `README.md` (and `database/README.md`) for detail.

## Repository layout (high level)

- Application (Payload Website Template) – Next.js App Router + Payload CMS app in the repo root (`./`). Includes migrations, linting, Vitest integration tests, and Playwright end-to-end tests.
- `database/` – Standalone Postgres service for the Payload website, managed via `database/docker-compose.yml`. See `database/README.md`.
- `AGENTS.md` – Points agents (including WARP) at `README.md` as the main contributor guide.

Legacy monorepo code in directories like `backend/` and `frontend/` is no longer used and can be ignored (or removed once no longer needed).

## Application (Payload Website Template)

Location: repository root (`./`).

### Install dependencies

The site uses `pnpm` and expects a recent Node 18+ and pnpm 9+ environment.

- Install dependencies:
  - `pnpm install`

### Run the development server

From the repo root:

- Start dev server (Next.js + Payload):
  - `pnpm dev`

By default the app runs on `http://localhost:3000`.

### Build and run in production mode

From the repo root:

- Build the application:
  - `pnpm build`
- Start in production mode (after `pnpm build`):
  - `pnpm start`

### Linting

From the repo root:

- Run ESLint:
  - `pnpm lint`
- Auto-fix lint issues where possible:
  - `pnpm lint:fix`

### Tests

Automated tests for this project live alongside the app (Vitest for integration/unit; Playwright for end-to-end tests).

From the repo root:

- Run the full test suite (integration + e2e):
  - `pnpm test`
- Run only integration tests (Vitest):
  - `pnpm test:int`
- Run only end-to-end tests (Playwright):
  - `pnpm test:e2e`

Run a single test file or subset:

- Vitest (integration tests):
  - `pnpm exec vitest run path/to/test-file.test.ts --config ./vitest.config.mts`
- Playwright (e2e tests):
  - `pnpm exec playwright test tests/e2e/your-spec-name.spec.ts --config=playwright.config.ts`

Refer to `vitest.config.mts`, `vitest.setup.ts`, and `playwright.config.ts` for test structure and conventions.

### Database & migrations

The application is configured to use PostgreSQL via the Payload Postgres adapter. The recommended local database runs from `database/` (see below).

For schema changes and migrations, use the Payload CLI scripts exposed via `pnpm` from the repo root (names and exact arguments are defined in `package.json`). Typical flows:

- Create a new migration for local development:
  - `pnpm payload migrate:create`
- Apply pending migrations against the configured database:
  - `pnpm payload migrate`

Additional details and environment-variable requirements live in `README.md`.

## Database (Payload Postgres service)

Location: `database/`

This folder defines a standalone Postgres instance intended for use with the Payload website. Data is persisted in a named Docker volume.

Common commands (from repo root):

- Start the database with the provided env file:
  - `docker compose -f database/docker-compose.yml --env-file database/.env up -d`
- Stop the database (preserving data):
  - `docker compose -f database/docker-compose.yml --env-file database/.env down`
- View database logs:
  - `docker compose -f database/docker-compose.yml --env-file database/.env logs`

Connection strings (from `database/README.md`):

- From the host:
  - `postgres://payload:payload_pass@localhost:5434/recraft_payload`
- From another container on the same Docker network:
  - `postgres://payload:payload_pass@payload-postgres:5432/recraft_payload`

## Where to look for more detail

- Root-level contributor and architecture docs:
  - `README.md`
- Package-specific docs:
  - `database/README.md`

When in doubt, prefer the guidance in these README files; keep this `WARP.md` aligned with them when workflows or commands change.
