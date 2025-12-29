# Payload CMS Website Template

A production-ready content management system built with Payload CMS 3 and Next.js 15. This template provides a complete website solution with a powerful admin panel, flexible layout builder, and beautifully designed frontend.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Development Commands](#development-commands)
- [Environment Configuration](#environment-configuration)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Theme Configuration](#theme-configuration)
- [Collections & Content Model](#collections--content-model)
- [Layout Builder System](#layout-builder-system)
- [Access Control](#access-control)
- [Hooks & Revalidation](#hooks--revalidation)
- [Testing](#testing)
- [Database & Migrations](#database--migrations)
- [Production Deployment](#production-deployment)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **CMS** | Payload CMS 3.64.0 |
| **Framework** | Next.js 15.4.7 (App Router) |
| **Runtime** | React 19.1.0 |
| **Database** | PostgreSQL (via @payloadcms/db-postgres) |
| **Styling** | TailwindCSS 3.4.3 + shadcn/ui |
| **Rich Text** | Lexical Editor (@payloadcms/richtext-lexical) |
| **Testing** | Vitest (integration) + Playwright (e2e) |
| **Package Manager** | pnpm 9+ |
| **Node** | 18.20.2+ or 20.9.0+ |

---

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
cd recraft

# Copy environment variables
cp .env.example .env

# Install dependencies
pnpm install
```

### 2. Configure Environment

Edit `.env` with your configuration:

```env
DATABASE_URI=postgres://payload:payload_pass@localhost:5434/recraft_payload
PAYLOAD_SECRET=your-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=your-cron-secret
PREVIEW_SECRET=your-preview-secret
```

### 3. Start Database (Docker)

```bash
# Start PostgreSQL database
docker compose -f database/docker-compose.yml --env-file database/.env up -d
```

### 4. Run Development Server

```bash
# Start Next.js + Payload dev server
pnpm dev

# Access the application
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin
```

### 5. Seed Database (Optional)

Login to `/admin` and click "Seed Database" button, or visit:
```
http://localhost:3000/next/seed
```

**Demo User:**
- Email: `demo-author@payloadcms.com`
- Password: `password`

---

## Development Commands

### Common Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server (requires build first)

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix linting issues

# Testing
pnpm test             # Run all tests (integration + e2e)
pnpm test:int         # Run integration tests (Vitest)
pnpm test:e2e         # Run e2e tests (Playwright)

# Run single test
pnpm exec vitest run path/to/test.int.spec.ts --config ./vitest.config.mts
pnpm exec playwright test tests/e2e/spec-name.e2e.spec.ts --config=playwright.config.ts
```

### Payload CLI Commands

```bash
# Type Generation
pnpm generate:types   # Generate TypeScript types from Payload config

# Database Migrations
pnpm payload migrate:create   # Create new migration (before deploying schema changes)
pnpm payload migrate          # Run pending migrations

# Direct Payload CLI access
pnpm payload [command]
```

### Database Commands

```bash
# Start database
docker compose -f database/docker-compose.yml --env-file database/.env up -d

# Stop database (preserves data)
docker compose -f database/docker-compose.yml --env-file database/.env down

# View logs
docker compose -f database/docker-compose.yml --env-file database/.env logs -f
```

**Connection Strings:**
- From host: `postgres://payload:payload_pass@localhost:5434/recraft_payload`
- From container: `postgres://payload:payload_pass@payload-postgres:5432/recraft_payload`

---

## Environment Configuration

### Required Environment Variables

```bash
# Database connection string (PostgreSQL)
DATABASE_URI=postgres://user:password@host:port/database

# Secret for encrypting JWT tokens (generate secure random string)
PAYLOAD_SECRET=your-secret-here

# Public URL for the application (no trailing slash)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Secret for authenticating scheduled jobs/cron
CRON_SECRET=your-cron-secret

# Secret for validating draft preview requests
PREVIEW_SECRET=your-preview-secret
```

### Optional Environment Variables

```bash
# Vercel deployment (auto-detected)
VERCEL_PROJECT_PRODUCTION_URL=your-project.vercel.app

# Node environment
NODE_ENV=development # or production
```

---

## Project Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Application                  │
│  ┌───────────────────────┬──────────────────────────┐  │
│  │   Frontend (Public)   │   Admin Panel (Payload)  │  │
│  │                       │                          │  │
│  │  - Pages (/[slug])    │  - Collections UI        │  │
│  │  - Posts (/posts)     │  - Content Editor        │  │
│  │  - Search             │  - Media Library         │  │
│  │  - Sitemaps           │  - User Management       │  │
│  └───────────────────────┴──────────────────────────┘  │
│                           │                             │
│                  ┌────────▼────────┐                    │
│                  │  Payload CMS    │                    │
│                  │  - Collections  │                    │
│                  │  - Globals      │                    │
│                  │  - Plugins      │                    │
│                  └────────┬────────┘                    │
│                           │                             │
│                  ┌────────▼────────┐                    │
│                  │   PostgreSQL    │                    │
│                  │   (Docker)      │                    │
│                  └─────────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### Route Structure

```
/                        → Homepage (Pages collection)
/[slug]                  → Dynamic pages (Pages collection)
/posts                   → Blog archive
/posts/[slug]            → Individual post
/posts/page/[number]     → Paginated posts
/search                  → Search results
/admin                   → Payload admin panel
/api                     → REST API & GraphQL
```

---

## Directory Structure

<details>
<summary><strong>Complete src/ Directory Tree (Click to expand)</strong></summary>

```
src/
├── access/                          [Authorization & Access Control]
│   ├── authenticated.ts             - Requires user login
│   ├── anyone.ts                    - Public access
│   └── authenticatedOrPublished.ts  - Logged in OR published content
│
├── app/                             [Next.js App Router]
│   ├── (frontend)/                  [Public website routes]
│   │   ├── layout.tsx               - Root layout (Header/Footer)
│   │   ├── page.tsx                 - Homepage
│   │   ├── not-found.tsx            - 404 page
│   │   ├── globals.css              - TailwindCSS styles
│   │   ├── typography.css           - Typography styles
│   │   ├── minimalist.css           - Minimalist design system
│   │   ├── (sitemaps)/
│   │   │   ├── pages-sitemap.xml/route.ts
│   │   │   └── posts-sitemap.xml/route.ts
│   │   ├── [slug]/
│   │   │   ├── page.tsx             - Dynamic pages (server)
│   │   │   └── page.client.tsx      - Client interactivity
│   │   ├── posts/
│   │   │   ├── page.tsx             - Posts archive
│   │   │   ├── page.client.tsx      - Archive client code
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx         - Single post
│   │   │   │   └── page.client.tsx  - Post client code
│   │   │   └── page/[pageNumber]/
│   │   │       ├── page.tsx         - Paginated posts
│   │   │       └── page.client.tsx
│   │   ├── search/
│   │   │   ├── page.tsx
│   │   │   └── page.client.tsx
│   │   └── next/
│   │       ├── preview/route.ts     - Enable preview mode
│   │       ├── exit-preview/route.ts
│   │       └── seed/route.ts        - Database seeding
│   │
│   └── (payload)/                   [Payload admin & API]
│       ├── layout.tsx
│       ├── admin/[[...segments]]/
│       │   ├── page.tsx             - Admin UI
│       │   └── not-found.tsx
│       └── api/
│           ├── [...slug]/route.ts   - REST API
│           ├── graphql/route.ts     - GraphQL endpoint
│           └── graphql-playground/route.ts
│
├── blocks/                          [Layout Builder Blocks]
│   ├── RenderBlocks.tsx             - Block router
│   ├── ArchiveBlock/                [Post archive display]
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── Banner/                      [Alert banners]
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── CallToAction/                [CTA sections]
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── Code/                        [Syntax highlighted code]
│   │   ├── config.ts
│   │   ├── Component.tsx
│   │   ├── Component.client.tsx
│   │   └── CopyButton.tsx
│   ├── Content/                     [Rich text content]
│   │   ├── config.ts
│   │   └── Component.tsx
│   ├── Form/                        [Dynamic forms]
│   │   ├── config.ts
│   │   ├── Component.tsx
│   │   ├── fields.tsx
│   │   ├── Checkbox/index.tsx
│   │   ├── Country/
│   │   │   ├── index.tsx
│   │   │   └── options.ts
│   │   ├── Email/index.tsx
│   │   ├── Error/index.tsx
│   │   ├── Message/index.tsx
│   │   ├── Number/index.tsx
│   │   ├── Select/index.tsx
│   │   ├── State/
│   │   │   ├── index.tsx
│   │   │   └── options.ts
│   │   ├── Text/index.tsx
│   │   ├── Textarea/index.tsx
│   │   └── Width/index.tsx
│   ├── MediaBlock/                  [Image/video blocks]
│   │   ├── config.ts
│   │   └── Component.tsx
│   └── RelatedPosts/
│       └── Component.tsx
│
├── collections/                     [Payload Collections]
│   ├── Categories.ts                - Nested taxonomy
│   ├── Media.ts                     - File uploads
│   ├── Pages/
│   │   ├── index.ts                 - Page collection config
│   │   └── hooks/
│   │       └── revalidatePage.ts    - ISR cache revalidation
│   ├── Posts/
│   │   ├── index.ts                 - Post collection config
│   │   └── hooks/
│   │       ├── populateAuthors.ts   - Auto-populate authors
│   │       └── revalidatePost.ts    - ISR cache revalidation
│   └── Users/
│       └── index.ts                 - Authentication
│
├── components/                      [React Components]
│   ├── AdminBar/                    - Edit bar for authenticated users
│   ├── BeforeDashboard/             - Dashboard welcome widget
│   │   └── SeedButton/              - Database seed button
│   ├── BeforeLogin/                 - Login page message
│   ├── Card/                        - Card wrapper
│   ├── CollectionArchive/           - Archive listing
│   ├── Link/                        - Enhanced Next.js Link
│   ├── LivePreviewListener/         - Draft preview sync
│   ├── Logo/                        - Site logo
│   ├── Media/                       - Media components
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   ├── ImageMedia/index.tsx
│   │   └── VideoMedia/index.tsx
│   ├── PageRange/                   - Pagination info
│   ├── Pagination/                  - Page controls
│   ├── PayloadRedirects/            - Redirect handler
│   ├── RichText/                    - Lexical renderer
│   ├── theme/                       - Theme components
│   │   ├── Navigation.tsx
│   │   └── Typography.tsx
│   └── ui/                          - shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       └── textarea.tsx
│
├── endpoints/                       [API Endpoints & Seed Data]
│   └── seed/
│       ├── index.ts                 - Seed orchestration
│       ├── home.ts, contact-page.ts - Page seeds
│       ├── contact-form.ts          - Form seed
│       ├── post-1.ts, post-2.ts, post-3.ts
│       └── image-1.ts, image-2.ts, image-3.ts, image-hero-1.ts
│
├── fields/                          [Reusable Field Configs]
│   ├── defaultLexical.ts            - Default rich text config
│   ├── link.ts                      - Link field (internal/external)
│   └── linkGroup.ts                 - Multiple links
│
├── Footer/                          [Global Footer]
│   ├── config.ts                    - Footer schema
│   ├── Component.tsx                - Footer renderer
│   ├── RowLabel.tsx                 - Admin UI label
│   └── hooks/revalidateFooter.ts
│
├── Header/                          [Global Header]
│   ├── config.ts                    - Header schema
│   ├── Component.tsx                - Server component
│   ├── Component.client.tsx         - Client features
│   ├── Nav/index.tsx                - Navigation
│   ├── RowLabel.tsx
│   └── hooks/revalidateHeader.ts
│
├── heros/                           [Hero Templates]
│   ├── RenderHero.tsx               - Hero router
│   ├── config.ts                    - Hero field config
│   ├── HighImpact/index.tsx         - Large hero + media
│   ├── MediumImpact/index.tsx       - Medium hero + media
│   ├── LowImpact/index.tsx          - Minimal hero
│   └── PostHero/index.tsx           - Blog post hero
│
├── hooks/                           [Global Payload Hooks]
│   ├── populatePublishedAt.ts       - Auto-set publish date
│   └── revalidateRedirects.ts       - Revalidate redirects
│
├── plugins/                         [Payload Plugins]
│   └── index.ts                     - Plugin configuration
│       Includes:
│       - formBuilderPlugin (Forms)
│       - nestedDocsPlugin (Categories)
│       - redirectsPlugin (URL redirects)
│       - seoPlugin (SEO metadata)
│       - searchPlugin (Full-text search)
│
├── providers/                       [React Context Providers]
│   ├── index.tsx                    - Provider composition
│   ├── HeaderTheme/index.tsx        - Header theme
│   └── Theme/                       - Theme management
│       ├── index.tsx                - Theme provider
│       ├── types.ts                 - TypeScript types
│       ├── shared.ts                - Utilities
│       ├── InitTheme/index.tsx      - Initialization
│       └── ThemeSelector/           - Theme switcher
│           ├── index.tsx
│           └── types.ts
│
├── search/                          [Search Integration]
│   ├── beforeSync.ts                - Data transformation
│   ├── fieldOverrides.ts            - Search field config
│   └── Component.tsx                - Search UI
│
├── utilities/                       [Helper Functions]
│   ├── canUseDOM.ts                 - Browser detection
│   ├── deepMerge.ts                 - Object merge
│   ├── formatAuthors.ts             - Author formatting
│   ├── formatDateTime.ts            - Date/time formatting
│   ├── generateMeta.ts              - SEO metadata
│   ├── generatePreviewPath.ts       - Preview URLs
│   ├── getDocument.ts               - Fetch document
│   ├── getGlobals.ts                - Fetch globals
│   ├── getMediaUrl.ts               - Media URLs
│   ├── getMeUser.ts                 - Current user
│   ├── getRedirects.ts              - Redirect rules
│   ├── getURL.ts                    - Server URLs
│   ├── mergeOpenGraph.ts            - OG tags
│   ├── toKebabCase.ts               - String formatting
│   ├── ui.ts                        - UI utilities
│   ├── useClickableCard.ts          - Card interactions
│   └── useDebounce.ts               - Debounce hook
│
├── payload.config.ts                [Main Payload Config]
│   - Database: PostgreSQL
│   - Collections: [Pages, Posts, Media, Categories, Users]
│   - Globals: [Header, Footer]
│   - Plugins: Form, SEO, Search, Redirects, Nested Docs
│
├── payload-types.ts                 [Auto-generated Types - DO NOT EDIT]
├── environment.d.ts                 [Environment types]
└── cssVariables.js                  [CSS breakpoints]
```

</details>

---

## Theme Configuration

### Theme JSON Schema

The application uses a dual-theme system (light/dark) with CSS variables. Here's the complete theme configuration:

```json
{
  "themeSystem": {
    "type": "css-variables",
    "modes": ["light", "dark"],
    "selector": "[data-theme='dark']",
    "defaultTheme": "light",
    "storageKey": "payload-theme",
    "provider": "src/providers/Theme/index.tsx"
  },

  "colorPalette": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "222.2 84% 4.9%",
      "card": "240 5% 96%",
      "card-foreground": "222.2 84% 4.9%",
      "popover": "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      "primary": "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      "secondary": "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      "muted": "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      "accent": "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      "destructive": "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      "border": "240 6% 80%",
      "input": "214.3 31.8% 91.4%",
      "ring": "222.2 84% 4.9%",
      "success": "196 52% 74%",
      "warning": "34 89% 85%",
      "error": "10 100% 86%"
    },
    "dark": {
      "background": "0 0% 0%",
      "foreground": "210 40% 98%",
      "card": "0 0% 4%",
      "card-foreground": "210 40% 98%",
      "popover": "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      "primary": "210 40% 98%",
      "primary-foreground": "222.2 47.4% 11.2%",
      "secondary": "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      "muted": "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      "accent": "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      "border": "0 0% 15% / 0.8",
      "input": "217.2 32.6% 17.5%",
      "ring": "212.7 26.8% 83.9%",
      "success": "196 100% 14%",
      "warning": "34 51% 25%",
      "error": "10 39% 43%"
    }
  },

  "typography": {
    "fontFamilies": {
      "sans": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "serif": "'Crimson Text', Georgia, serif",
      "mono": "'JetBrains Mono', 'Courier New', monospace"
    },
    "fontSizes": {
      "xs": "clamp(0.75rem, 1.5vw, 0.875rem)",
      "sm": "clamp(0.875rem, 2vw, 1rem)",
      "base": "clamp(1rem, 2.5vw, 1.125rem)",
      "lg": "clamp(1.125rem, 3vw, 1.25rem)",
      "xl": "clamp(1.25rem, 3.5vw, 1.5rem)",
      "2xl": "clamp(1.5rem, 4vw, 2rem)",
      "3xl": "clamp(2rem, 5vw, 3rem)",
      "4xl": "clamp(2.5rem, 6vw, 4rem)",
      "5xl": "clamp(3rem, 7vw, 5rem)"
    },
    "headings": {
      "h1": { "fontSize": "var(--text-4xl)", "fontWeight": 700, "lineHeight": 1.1, "letterSpacing": "-0.03em" },
      "h2": { "fontSize": "var(--text-3xl)", "fontWeight": 600, "letterSpacing": "-0.025em" },
      "h3": { "fontSize": "var(--text-2xl)", "fontWeight": 600 },
      "h4": { "fontSize": "var(--text-xl)", "fontWeight": 500 }
    }
  },

  "spacing": {
    "xs": "0.5rem",
    "sm": "1rem",
    "md": "1.5rem",
    "lg": "2rem",
    "xl": "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
    "4xl": "8rem"
  },

  "layout": {
    "maxWidthContent": "680px",
    "maxWidthWide": "1200px",
    "headerHeight": "72px",
    "containerPadding": {
      "default": "1rem",
      "sm": "1rem",
      "md": "2rem",
      "lg": "2rem",
      "xl": "2rem",
      "2xl": "2rem"
    }
  },

  "borderRadius": {
    "radius": "0.2rem",
    "sm": "calc(var(--radius) - 4px)",
    "md": "calc(var(--radius) - 2px)",
    "lg": "var(--radius)"
  },

  "animations": {
    "transitions": {
      "fast": "150ms ease",
      "base": "250ms ease",
      "slow": "350ms ease"
    },
    "shadows": {
      "sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
      "md": "0 4px 6px rgba(0, 0, 0, 0.05)",
      "lg": "0 10px 15px rgba(0, 0, 0, 0.08)",
      "xl": "0 20px 25px rgba(0, 0, 0, 0.1)"
    }
  },

  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px",
    "3xl": "1920px"
  },

  "tailwindConfig": {
    "path": "tailwind.config.mjs",
    "cssPath": "src/app/(frontend)/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": "",
    "darkMode": ["selector", "[data-theme='dark']"]
  },

  "shadcnConfig": {
    "configPath": "components.json",
    "style": "default",
    "rsc": true,
    "tsx": true,
    "aliases": {
      "components": "@/components",
      "utils": "@/utilities/ui"
    }
  }
}
```

### Modifying Theme Colors

To update theme colors, edit `src/app/(frontend)/globals.css`:

```css
:root {
  --background: 0 0% 100%;        /* HSL values */
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}

[data-theme='dark'] {
  --background: 0 0% 0%;
  --foreground: 210 40% 98%;
  /* ... other variables */
}
```

### Adding Custom Fonts

1. Update `src/app/(frontend)/layout.tsx`:
```tsx
const FONT_STYLESHEET_URL = 'https://fonts.googleapis.com/css2?family=YourFont...'
```

2. Update CSS variables in `globals.css`:
```css
:root {
  --font-sans-stack: 'YourFont', -apple-system, sans-serif;
}
```

---

## Collections & Content Model

### Pages Collection

**Location:** `src/collections/Pages/index.ts`

**Features:**
- Layout builder with blocks: CallToAction, Content, MediaBlock, Archive, FormBlock
- Hero sections (4 impact levels: none, low, medium, high)
- Draft/publish workflow with versioning
- Live preview support
- SEO metadata fields
- Auto-revalidation on publish

**Fields:**
- `title` (text, required)
- `hero` (group) - Hero configuration
- `layout` (blocks) - Page content blocks
- `meta` (group) - SEO fields
- `slug` (text, auto-generated from title)
- `publishedAt` (date)

**URL Pattern:** `/{slug}`

### Posts Collection

**Location:** `src/collections/Posts/index.ts`

**Features:**
- Lexical rich text editor with inline blocks (Banner, Code, MediaBlock)
- Hero image upload
- Categories (relationship, nested taxonomy)
- Related posts (relationship)
- Author relationships (auto-populated)
- Draft/publish with scheduled publishing
- SEO metadata

**Fields:**
- `title` (text, required)
- `heroImage` (upload, relationship to Media)
- `content` (richText, Lexical)
- `categories` (relationship, hasMany)
- `relatedPosts` (relationship, hasMany)
- `authors` (relationship, hasMany to Users)
- `populatedAuthors` (array, read-only, auto-populated)
- `meta` (group) - SEO fields
- `slug` (text)
- `publishedAt` (date)

**URL Pattern:** `/posts/{slug}`

### Media Collection

**Location:** `src/collections/Media.ts`

**Features:**
- Image/video uploads
- Sharp image processing
- Pre-configured sizes
- Focal point support
- Manual resizing

### Categories Collection

**Location:** `src/collections/Categories.ts`

**Features:**
- Nested taxonomy using `@payloadcms/plugin-nested-docs`
- Hierarchical structure (e.g., "News > Technology")
- Used to organize posts

### Users Collection

**Location:** `src/collections/Users/index.ts`

**Features:**
- Authentication-enabled
- Admin panel access
- Role-based permissions

---

## Layout Builder System

### Available Blocks for Pages

| Block | Purpose | Config |
|-------|---------|--------|
| **Archive** | Display filtered post listings | `src/blocks/ArchiveBlock/` |
| **CallToAction** | CTA sections with links | `src/blocks/CallToAction/` |
| **Content** | Rich text content areas | `src/blocks/Content/` |
| **MediaBlock** | Images/videos with captions | `src/blocks/MediaBlock/` |
| **Form** | Dynamic form builder | `src/blocks/Form/` |

### Available Blocks for Posts (Inline)

| Block | Purpose | Config |
|-------|---------|--------|
| **Banner** | Alert/notice banners | `src/blocks/Banner/` |
| **Code** | Syntax-highlighted code with copy button | `src/blocks/Code/` |
| **MediaBlock** | Media embeds within content | `src/blocks/MediaBlock/` |

### Adding a New Block

1. Create directory: `src/blocks/YourBlock/`
2. Create `config.ts`:
```typescript
import type { Block } from 'payload'

export const YourBlock: Block = {
  slug: 'yourBlock',
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
    },
  ],
}
```

3. Create `Component.tsx`:
```typescript
import React from 'react'

export const YourBlockComponent: React.FC<{ content: string }> = ({ content }) => {
  return <div>{content}</div>
}
```

4. Add to collection (e.g., `Pages/index.ts`):
```typescript
import { YourBlock } from '@/blocks/YourBlock/config'

fields: [
  {
    name: 'layout',
    type: 'blocks',
    blocks: [YourBlock, /* other blocks */],
  },
]
```

5. Add to `RenderBlocks.tsx`:
```typescript
import { YourBlockComponent } from '@/blocks/YourBlock/Component'

const blockComponents = {
  yourBlock: YourBlockComponent,
  // ...
}
```

---

## Access Control

### Access Control Functions

**Location:** `src/access/`

```typescript
// authenticated.ts - Requires login
export const authenticated = ({ req: { user } }) => Boolean(user)

// anyone.ts - Public access
export const anyone = () => true

// authenticatedOrPublished.ts - Public if published, otherwise authenticated
export const authenticatedOrPublished = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

### Applying Access Control

```typescript
export const YourCollection: CollectionConfig = {
  access: {
    create: authenticated,           // Only logged-in users can create
    read: authenticatedOrPublished,  // Public can read published, logged-in can read all
    update: authenticated,           // Only logged-in users can update
    delete: authenticated,           // Only logged-in users can delete
  },
  // ...
}
```

---

## Hooks & Revalidation

### On-Demand ISR Revalidation

**Pattern:** Collections use `afterChange` hooks to revalidate Next.js cache when content is published.

**Example:** `src/collections/Pages/hooks/revalidatePage.ts`

```typescript
import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req }) => {
  if (doc._status === 'published') {
    const path = `/${doc.slug}`
    req.payload.logger.info(`Revalidating page at path: ${path}`)
    revalidatePath(path)
  }
  return doc
}
```

### Hook Types

| Hook | Purpose | Example |
|------|---------|---------|
| `beforeChange` | Modify data before save | `populatePublishedAt.ts` |
| `afterChange` | Actions after save | `revalidatePage.ts`, `revalidatePost.ts` |
| `afterRead` | Modify data on read | `populateAuthors.ts` |
| `afterDelete` | Actions after delete | `revalidateDelete` |

### Global Hooks

**Location:** `src/hooks/`

- `populatePublishedAt.ts` - Auto-set `publishedAt` timestamp on first publish
- `revalidateRedirects.ts` - Rebuild redirect cache when redirects change

---

## Testing

### Integration Tests (Vitest)

**Location:** `tests/int/`
**Pattern:** `*.int.spec.ts`
**Config:** `vitest.config.mts`

```bash
# Run all integration tests
pnpm test:int

# Run specific test
pnpm exec vitest run tests/int/api.int.spec.ts --config ./vitest.config.mts
```

**Example Test:**
```typescript
import { describe, it, expect } from 'vitest'

describe('API Tests', () => {
  it('should fetch posts', async () => {
    // Test code
  })
})
```

### E2E Tests (Playwright)

**Location:** `tests/e2e/`
**Pattern:** `*.e2e.spec.ts`
**Config:** `playwright.config.ts`

```bash
# Run all e2e tests
pnpm test:e2e

# Run specific test
pnpm exec playwright test tests/e2e/frontend.e2e.spec.ts
```

**Example Test:**
```typescript
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle(/Payload/)
})
```

---

## Database & Migrations

### PostgreSQL with Payload

**Adapter:** `@payloadcms/db-postgres`
**Config:** `src/payload.config.ts`

```typescript
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI || '',
  },
  push: process.env.NODE_ENV !== 'production', // Auto-push in dev
})
```

### Migration Workflow

**Development (Local):**
- `push: true` automatically applies schema changes
- No migrations needed during development

**Production:**

1. Create migration:
```bash
pnpm payload migrate:create
```

2. Commit migration files (created in `migrations/` directory)

3. Deploy code

4. Run migrations on server:
```bash
pnpm payload migrate
```

### Important Notes

- Always create migrations before deploying schema changes to production
- Migrations run sequentially and track execution in database
- Setting `push: true` in production risks data loss and migration conflicts

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production `DATABASE_URI`
- [ ] Generate secure `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`
- [ ] Set correct `NEXT_PUBLIC_SERVER_URL`
- [ ] Create and run migrations: `pnpm payload migrate:create` → `pnpm payload migrate`
- [ ] Build application: `pnpm build`
- [ ] Configure `CRON_SECRET` for scheduled jobs

### Build & Start

```bash
# 1. Run migrations
pnpm payload migrate

# 2. Build for production
pnpm build

# 3. Start production server
pnpm start
```

### Vercel Deployment

**Database:** Use Vercel Postgres adapter

```bash
pnpm add @payloadcms/db-vercel-postgres
```

**Config:**
```typescript
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // ...
})
```

**Storage:** Optional Vercel Blob Storage

```bash
pnpm add @payloadcms/storage-vercel-blob
```

**Note:** Vercel free tier limits cron jobs to daily execution.

### Self-Hosting

Deploy to any Node.js hosting platform:
- VPS (DigitalOcean, Linode, AWS EC2)
- DigitalOcean App Platform
- Coolify
- Heroku

**Requirements:**
- Node.js 18.20.2+ or 20.9.0+
- PostgreSQL database
- Environment variables configured

---

## Contributing

### Code Style

- TypeScript strict mode
- ESLint configuration in `eslint.config.mjs`
- Run `pnpm lint:fix` before committing

### Adding Features

1. Create feature branch
2. Implement changes
3. Add tests (integration and/or e2e)
4. Run full test suite: `pnpm test`
5. Run linter: `pnpm lint`
6. Update this README if adding new patterns/conventions
7. Submit PR

### Documentation

- Keep README.md as single source of truth
- Update theme JSON when modifying styles
- Document new blocks in Layout Builder section
- Add migration notes for breaking changes

---

## License

MIT

---

## Support

- **Issues:** [GitHub Issues](https://github.com/payloadcms/payload/issues)
- **Discord:** [Payload Discord](https://discord.com/invite/payload)
- **Discussions:** [GitHub Discussions](https://github.com/payloadcms/payload/discussions)

---

## Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
