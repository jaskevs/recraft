# Remix Frontend Context

## Stack & Tooling
- Remix 2 with React 18 and TypeScript (`frontend/package.json`) deployed via Vite dev server.
- Styling is provided by a handcrafted minimalist CSS theme (`frontend/app/styles/minimalist.css`) alongside optional Tailwind utilities.
- Icons supplied by `@heroicons/react`; Directus API communication handled by `@directus/sdk`.

## Data Access Layer
- `frontend/app/lib/directus.ts` creates a Directus REST client pointing to `process.env.DIRECTUS_URL` (defaults to `http://localhost:8055`).
- Exposes `getPosts()` and `getPost(slug)` helpers that filter for `status = published` and expand the related `featured_image`.
- `getAssetUrl()` builds image URLs with optional resize/quality params, handling different Directus asset shapes.

## Runtime Environment
- `frontend/app/utils/env.server.ts` returns `DIRECTUS_URL`; `root.tsx` injects the value onto `window.ENV`, letting client components reuse it.
- Ensure `DIRECTUS_URL` is set in `.env` or on the process running `npm run dev`/`npm run build` when pointing at non-local Directus instances.

## Routing & Pages
- Home (`app/routes/_index.tsx`): Fetches posts, renders hero plus latest cards, and handles empty/error states.
- Blog index (`app/routes/blog._index.tsx`): Lists all published posts with cards and placeholder pagination.
- Blog detail (`app/routes/blog.$slug.tsx`): Loads a single post, estimates reading time, and renders HTML content via `dangerouslySetInnerHTML`.
- Static content (`about.tsx`, `contact.tsx`, `search.tsx`): Presentational pages; search currently mocks results and needs Directus integration.

## UI Components & Styles
- `components/layout/Navigation.tsx` renders sticky header with scroll/collapse behavior and mobile menu.
- `components/blog/PostCard.tsx` and `components/ui/Typography.tsx` provide reusable typography and post card layouts (extra variations ready for future use).
- Global layout (`root.tsx`) wraps pages with navigation, footer, and global font imports.

## Build & Run
- `npm install` inside `frontend/` installs dependencies.
- `npm run dev` launches Remix in dev mode on port 5173 (proxied to 4444 via Remix/Vite config).
- `npm run build` generates production assets; `npm run preview` or `npm run start` serves the built site.

## Future Enhancements
- Implement search against Directus, replacing the placeholder in `routes/search.tsx`.
- Wire reusable components (e.g., `PostCard`) into the current routes to reduce inline markup duplication.
- Add tests or linting for loaders to catch Directus connectivity issues earlier.
