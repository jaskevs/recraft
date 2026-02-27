# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference Commands

```bash
# Development
pnpm dev                    # Start dev server (http://localhost:3000)
pnpm build                  # Production build
pnpm lint                   # Run ESLint
pnpm lint:fix               # Auto-fix lint issues

# Database (PostgreSQL 16 via Docker)
docker compose -f database/docker-compose.yml --env-file database/.env up -d   # Start DB
docker compose -f database/docker-compose.yml --env-file database/.env down    # Stop DB

# Testing
pnpm test:int               # Integration tests (Vitest)
pnpm test:e2e               # E2E tests (Playwright)
pnpm exec vitest run path/to/test.int.spec.ts --config ./vitest.config.mts     # Single integration test
pnpm exec playwright test tests/e2e/spec.e2e.spec.ts --config=playwright.config.ts  # Single e2e test

# Payload CLI
pnpm generate:types         # Generate TypeScript types from Payload config
pnpm payload migrate:create # Create migration (before deploying schema changes)
pnpm payload migrate        # Run pending migrations
```

## Architecture Overview

**Stack:** Payload CMS 3.64.0 + Next.js 15 (App Router) + PostgreSQL + React 19

**Connection flow:**
1. `database/docker-compose.yml` → PostgreSQL 16 Alpine on host port **5434**
2. `DATABASE_URI` env var → `postgresAdapter` in `src/payload.config.ts`
3. `withPayload()` in `next.config.js` integrates Payload into Next.js
4. Dev mode uses `push: true` (auto-sync schema); production requires explicit migrations

**Seeding:** POST to `/next/seed` with `Authorization: JWT <token>` header (requires authenticated user). Creates demo author (`demo-author@example.com` / `password`), sample posts, pages, forms, and nav.

**Key files:**
- `src/payload.config.ts` — Main CMS config (collections, globals, plugins, DB adapter)
- `next.config.js` — Next.js config wrapped with `withPayload()`
- `database/docker-compose.yml` — PostgreSQL Docker setup (the only docker-compose file)
- `.env` — Environment variables (`DATABASE_URI`, `PAYLOAD_SECRET`, etc.)

**Collections:** Pages, Posts, Media, Categories, Users
**Globals:** Header, Footer
**Plugins:** formBuilder, nestedDocs, redirects, seo, search

**Routes:**
- `/[slug]` — Pages | `/posts/[slug]` — Posts | `/search` — Search
- `/admin` — Payload admin panel | `/api` — REST & GraphQL

## Key Conventions

- **Package manager:** pnpm
- **Node:** 18.20.2+ or 20.9.0+
- **Styling:** TailwindCSS + shadcn/ui (CSS variables, `[data-theme='dark']` selector)
- **Rich text:** Lexical editor (`@payloadcms/richtext-lexical`)
- **Access control:** `src/access/` — `authenticated`, `anyone`, `authenticatedOrPublished`
- **Revalidation:** Collections use `afterChange` hooks to call `revalidatePath()` for ISR
- **Blocks:** `src/blocks/` — Each block has `config.ts` + `Component.tsx`, registered in `RenderBlocks.tsx`
- **Auto-generated types:** `src/payload-types.ts` — **DO NOT EDIT**, regenerate with `pnpm generate:types`

## Detailed Documentation

See [README.md](README.md) for complete documentation including:
- Theme JSON schema (colors, typography, spacing, breakpoints)
- Full directory structure
- Layout builder system & adding new blocks
- Production deployment (Vercel, self-hosting)
- Migration workflow details
