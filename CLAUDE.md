# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js 15 (App Router), TypeScript, and PostgreSQL. It provides a production-ready content management system with a beautifully designed frontend for websites, blogs, and portfolios.

**Tech Stack:**
- **Backend:** Payload CMS 3.64.0 with PostgreSQL adapter
- **Frontend:** Next.js 15.4.7 (App Router) with React 19
- **Styling:** TailwindCSS with shadcn/ui components
- **Rich Text:** Lexical editor
- **Testing:** Vitest (integration) + Playwright (e2e)
- **Package Manager:** pnpm 9+
- **Node:** 18.20.2+ or 20.9.0+

## Development Commands

### Common Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server (must run build first)
pnpm start

# Linting
pnpm lint           # Check for linting errors
pnpm lint:fix       # Auto-fix linting issues

# Testing
pnpm test           # Run all tests (integration + e2e)
pnpm test:int       # Run integration tests with Vitest
pnpm test:e2e       # Run e2e tests with Playwright

# Run a single integration test
pnpm exec vitest run path/to/test.int.spec.ts --config ./vitest.config.mts

# Run a single e2e test
pnpm exec playwright test tests/e2e/spec-name.e2e.spec.ts --config=playwright.config.ts
```

### Payload CLI Commands

```bash
# Generate TypeScript types from Payload config
pnpm generate:types

# Create a new database migration (required before deploying schema changes)
pnpm payload migrate:create

# Run pending migrations
pnpm payload migrate

# Access Payload CLI directly
pnpm payload [command]
```

### Database Setup

The repository includes a Docker-based PostgreSQL setup in `database/`:

```bash
# Start the Postgres database
docker compose -f database/docker-compose.yml --env-file database/.env up -d

# Stop the database (preserves data)
docker compose -f database/docker-compose.yml --env-file database/.env down

# View database logs
docker compose -f database/docker-compose.yml --env-file database/.env logs
```

**Connection Strings:**
- From host: `postgres://payload:payload_pass@localhost:5434/recraft_payload`
- From container: `postgres://payload:payload_pass@payload-postgres:5432/recraft_payload`

### Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret for encrypting JWT tokens
- `NEXT_PUBLIC_SERVER_URL` - Public URL (no trailing slash), e.g., `http://localhost:3000`
- `CRON_SECRET` - Secret for authenticating scheduled jobs
- `PREVIEW_SECRET` - Secret for validating draft preview requests

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public-facing website routes
│   │   ├── [slug]/       # Dynamic page routes
│   │   ├── posts/        # Blog post routes
│   │   ├── search/       # Search functionality
│   │   └── (sitemaps)/   # XML sitemaps
│   └── (payload)/        # Payload admin panel routes
│       ├── admin/        # Admin UI
│       └── api/          # API endpoints
├── collections/           # Payload collections (content types)
│   ├── Pages.ts          # Page collection with layout builder
│   ├── Posts.ts          # Blog posts with rich text
│   ├── Media.ts          # File uploads
│   ├── Categories.ts     # Nested taxonomy
│   └── Users.ts          # Authentication
├── blocks/                # Layout builder blocks
│   ├── ArchiveBlock/     # Post archive with filtering
│   ├── Banner/           # Inline banner alerts
│   ├── CallToAction/     # CTA sections
│   ├── Code/             # Code syntax highlighting
│   ├── Content/          # Rich text content
│   ├── Form/             # Dynamic form builder
│   ├── MediaBlock/       # Image/video blocks
│   └── RenderBlocks.tsx  # Block renderer component
├── heros/                 # Hero components
│   ├── HighImpact/       # Large hero with media
│   ├── MediumImpact/     # Medium hero with media
│   ├── LowImpact/        # Minimal hero
│   └── PostHero/         # Blog post hero
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   └── theme/            # Custom themed components
├── providers/             # React context providers
│   ├── Theme/            # Theme (dark/light mode)
│   └── HeaderTheme/      # Header theme context
├── access/                # Access control functions
│   ├── authenticated.ts       # Requires authentication
│   ├── authenticatedOrPublished.ts  # Public or authenticated
│   └── anyone.ts         # Public access
├── hooks/                 # Payload hooks
│   ├── populatePublishedAt.ts     # Auto-populate publish date
│   └── revalidateRedirects.ts     # Revalidate on redirect changes
├── fields/                # Reusable field configs
│   ├── link.ts           # Link field
│   ├── linkGroup.ts      # Group of links
│   └── defaultLexical.ts # Default Lexical editor config
├── utilities/             # Helper functions
├── plugins/               # Payload plugin configuration
│   └── index.ts          # SEO, Search, Redirects, Forms, Nested Docs
├── Footer/                # Footer global config
├── Header/                # Header global config
└── payload.config.ts      # Main Payload configuration
```

### Collections & Content Model

**Pages** (`src/collections/Pages/index.ts`)
- Layout builder with blocks: CallToAction, Content, MediaBlock, Archive, FormBlock
- Hero field with 4 impact levels (none, low, medium, high)
- Draft/publish workflow with versioning
- Live preview and draft preview support
- SEO metadata fields
- Revalidates Next.js cache on publish via `afterChange` hook

**Posts** (`src/collections/Posts/index.ts`)
- Lexical rich text editor with inline blocks (Banner, Code, MediaBlock)
- Hero image upload
- Categories and related posts relationships
- Author relationships (populated via `populatedAuthors` field)
- Draft/publish workflow with scheduled publishing
- SEO metadata fields
- URL pattern: `/posts/[slug]`

**Media** (`src/collections/Media.ts`)
- Image/video uploads with Sharp image processing
- Pre-configured sizes and focal point support

**Categories** (`src/collections/Categories.ts`)
- Nested taxonomy using `@payloadcms/plugin-nested-docs`
- Used to organize posts hierarchically

**Users** (`src/collections/Users.ts`)
- Authentication-enabled collection
- Admin panel access control

### Globals

**Header** (`src/Header/config.ts`)
- Navigation links configured in admin panel
- Revalidates frontend on changes

**Footer** (`src/Footer/config.ts`)
- Footer content and links
- Revalidates frontend on changes

### Layout Builder System

Pages use a flexible layout builder with these blocks:

1. **Archive** - Display filtered post archives
2. **CallToAction** - CTA sections with links
3. **Content** - Rich text content with Lexical
4. **MediaBlock** - Images/videos with captions
5. **Form** - Dynamic forms via `@payloadcms/plugin-form-builder`

Posts use Lexical rich text with inline blocks:

1. **Banner** - Alert/notice banners
2. **Code** - Syntax-highlighted code blocks with copy button
3. **MediaBlock** - Media embeds within content

### Access Control Patterns

Access control is defined in `src/access/`:

- **authenticated** - Only logged-in users (admin operations)
- **authenticatedOrPublished** - Public if published, otherwise authenticated only
- **anyone** - Always public

Applied to collections:
- Pages/Posts: Public read for published content, authenticated for create/update/delete
- Media: Conditional access based on usage
- Categories: Public read, authenticated write

### Hooks & Revalidation

**On-Demand Revalidation:**
- `revalidatePage` (Pages) - Revalidates `/[slug]` on publish
- `revalidatePost` (Posts) - Revalidates `/posts/[slug]` on publish
- `revalidateHeader` / `revalidateFooter` - Revalidates when globals change
- `revalidateRedirects` - Rebuilds redirect cache

**Data Population:**
- `populatePublishedAt` - Auto-sets `publishedAt` timestamp on first publish
- `populateAuthors` - Populates user data for post authors (works around access control)

### Draft Preview & Live Preview

- **Draft Preview:** Generate preview URLs before publishing (`generatePreviewPath` utility)
- **Live Preview:** Real-time preview in admin panel with responsive breakpoints (mobile/tablet/desktop)
- Preview secret validation via `PREVIEW_SECRET` env var

### Plugins Configuration

All plugins configured in `src/plugins/index.ts`:

1. **@payloadcms/plugin-redirects** - Manage URL redirects from admin
2. **@payloadcms/plugin-nested-docs** - Nested categories
3. **@payloadcms/plugin-seo** - SEO meta fields (title, description, OG image)
4. **@payloadcms/plugin-form-builder** - Dynamic form creation
5. **@payloadcms/plugin-search** - Full-text search on posts (index synced via `beforeSync` hook)

### Jobs & Scheduled Publishing

Payload jobs configured in `payload.config.ts`:

- Scheduled publish/unpublish via `drafts.schedulePublish: true`
- Job execution authenticated via `CRON_SECRET` header or logged-in user
- Note: On Vercel free tier, cron limited to daily execution

### Frontend Routing

**App Router Structure:**
- `(frontend)` - Public website routes
  - `/` - Homepage (src/app/(frontend)/page.tsx)
  - `/[slug]` - Dynamic pages
  - `/posts` - Post archive
  - `/posts/[slug]` - Individual posts
  - `/search` - Search results
- `(payload)` - Admin and API routes
  - `/admin` - Payload admin panel
  - `/api` - REST API and GraphQL endpoints

### Database Migrations (PostgreSQL)

**Local Development:**
- `push: true` is enabled for non-production (auto-push schema changes)
- Use `pnpm payload migrate:create` before deploying schema changes
- Use `pnpm payload migrate` on server to run migrations

**Important:** When making schema changes in production:
1. Create migration locally: `pnpm payload migrate:create`
2. Commit migration files
3. Run on server before starting: `pnpm payload migrate`

### Testing Strategy

**Integration Tests** (Vitest):
- Located in `tests/int/`
- Pattern: `*.int.spec.ts`
- Environment: jsdom
- Setup file: `vitest.setup.ts`

**E2E Tests** (Playwright):
- Located in `tests/e2e/`
- Pattern: `*.e2e.spec.ts`
- Runs against dev server (auto-starts via `webServer` config)
- Browser: Chromium

### Styling Conventions

- **TailwindCSS** for utility-first styling
- **shadcn/ui** components in `src/components/ui/`
- **Geist font** family
- **Dark mode** support via theme provider
- Component configuration: `components.json`

### TypeScript

- Generated types: `src/payload-types.ts` (auto-generated, don't edit manually)
- Run `pnpm generate:types` after schema changes
- Path aliases configured in `tsconfig.json` (e.g., `@/` maps to `src/`)

## Key Implementation Patterns

### Adding a New Block

1. Create directory in `src/blocks/YourBlock/`
2. Create `config.ts` with block configuration
3. Create `Component.tsx` for frontend rendering
4. Add to appropriate collection's block array (Pages or Posts)
5. Import and add to `RenderBlocks.tsx` mapping

### Adding a New Collection

1. Create file in `src/collections/YourCollection.ts`
2. Define `CollectionConfig` with fields, access control, hooks
3. Add to `collections` array in `src/payload.config.ts`
4. Run `pnpm generate:types` to update TypeScript types
5. Create migration if using Postgres: `pnpm payload migrate:create`

### Implementing Access Control

```typescript
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const YourCollection: CollectionConfig = {
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  // ...
}
```

### Adding Revalidation Hooks

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateYourCollection: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    revalidatePath(`/your-path/${doc.slug}`)
  }
  return doc
}
```

## Common Workflows

### Seeding the Database

1. Login to admin panel at `/admin`
2. Click "Seed Database" button (creates demo content and user)
3. Demo user: `demo-author@payloadcms.com` / `password`

**Warning:** Seeding is destructive and drops existing data.

### Working with Lexical Rich Text

Default Lexical config in `src/fields/defaultLexical.ts` includes:
- Heading, paragraph, list features
- Link support
- Upload feature for media
- Horizontal rule
- Block quote

Extend per-collection in collection config (see Posts collection for example with inline blocks).

### Managing Redirects

1. Create/edit redirects in admin panel
2. Redirects automatically integrated via `@payloadcms/plugin-redirects`
3. Frontend checks redirects in `PayloadRedirects` component
4. Revalidation happens automatically via `revalidateRedirects` hook

## Production Deployment

1. Set `DATABASE_URI` to production Postgres instance
2. Ensure `push: false` in production (set via `NODE_ENV=production`)
3. Run migrations: `pnpm payload migrate`
4. Build: `pnpm build`
5. Start: `pnpm start`
6. Configure `CRON_SECRET` for scheduled jobs

**Vercel Deployment:**
- Use `@payloadcms/db-vercel-postgres` adapter
- Optional: `@payloadcms/storage-vercel-blob` for blob storage
- Cron limited to daily execution on free tier

## Legacy Code

The `legacy/` directory contains old Remix frontend and Directus backend code. This is no longer used and can be ignored. The current implementation is a unified Payload + Next.js application in the repository root.
