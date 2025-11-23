#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
APP_DIR="$ROOT/payload"

echo "→ Creating payload/ workspace…"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# --- package.json
cat > package.json <<'JSON'
{
  "name": "@recraft/payload",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx server/dev.ts",
    "build": "payload build && next build",
    "start": "node server/prod.cjs",
    "migrate": "payload migrate",
    "seed": "tsx scripts/seed.ts"
  },
  "dependencies": {
    "payload": "^3.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "express": "^4.19.2",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "dotenv": "^16.4.5",
    "zod": "^3.23.8",
    "sharp": "^0.33.3"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "tsx": "^4.15.7",
    "@types/node": "^22.7.6",
    "@types/express": "^4.17.21",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^3.4.13"
  }
}
JSON

# --- tsconfig
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "allowJs": true,
    "types": ["node"]
  },
  "include": ["."],
  "exclude": ["node_modules"]
}
JSON

# --- env example
cat > .env.example <<'ENV'
PAYLOAD_SECRET=replace-me
REVALIDATE_SECRET=replace-me
DATABASE_URL=postgres://user:pass@localhost:5432/recraft_payload
PUBLIC_SITE_URL=http://localhost:3000

# Optional S3/R2 for prod media
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=

# Optional admin bootstrap
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!
ENV

# --- Next config + Tailwind
cat > next.config.mjs <<'JS'
export default {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' }
    ]
  }
}
JS

cat > postcss.config.cjs <<'JS'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
JS

cat > tailwind.config.cjs <<'JS'
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: []
}
JS

mkdir -p app components components/blocks lib server collections globals blocks scripts public public/fonts public/images styles
cat > app/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

html,body { height: 100%; }
:root { color-scheme: light; }
CSS

# --- Payload config
cat > payload.config.ts <<'TS'
import path from 'path';
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import Users from './collections/Users';
import Authors from './collections/Authors';
import Tags from './collections/Tags';
import Media from './collections/Media';
import Posts from './collections/Posts';
import Pages from './collections/Pages';

import Navigation from './globals/Navigation';
import SiteSettings from './globals/SiteSettings';

const isProd = process.env.NODE_ENV === 'production';

export default buildConfig({
  serverURL: process.env.PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: { titleSuffix: ' • Admin' },
  },
  editor: lexicalEditor({}),
  collections: [Users, Authors, Tags, Media, Posts, Pages],
  globals: [Navigation, SiteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: isProd ? { rejectUnauthorized: false } : false,
    },
  }),
  typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') },
});
TS

# --- Collections
cat > collections/Users.ts <<'TS'
import type { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user && req.user.role === 'admin',
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user && req.user.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' }
      ]
    }
  ],
};
export default Users;
TS

cat > collections/Authors.ts <<'TS'
import type { CollectionConfig } from 'payload/types';

const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'bio', type: 'richText' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'slug', type: 'text', unique: true }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data?.slug) {
          data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        }
        return data;
      }
    ]
  }
};
export default Authors;
TS

cat > collections/Tags.ts <<'TS'
import type { CollectionConfig } from 'payload/types';

const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.label && !data?.slug) {
          data.slug = data.label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        }
        return data;
      }
    ]
  }
};
export default Tags;
TS

# Media with local + (future) S3 toggle
cat > collections/Media.ts <<'TS'
import type { CollectionConfig } from 'payload/types';
import path from 'path';

const useS3 = !!process.env.S3_BUCKET && !!process.env.S3_ACCESS_KEY_ID;

const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true, create: ({ req }) => !!req.user, update: ({ req }) => !!req.user, delete: ({ req }) => !!req.user },
  upload: {
    staticDir: useS3 ? undefined : path.resolve(__dirname, '../media'),
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    imageSizes: [
      { name: 'small', width: 400 },
      { name: 'medium', width: 800 },
      { name: 'large', width: 1600 }
    ]
    // For S3, later add a storage adapter (e.g., plugin-cloud-storage)
  },
  fields: [
    { name: 'alt', type: 'text', required: true }
  ]
};
export default Media;
TS

# Blocks
cat > blocks/Hero.ts <<'TS'
import type { Block } from 'payload/types';
const Hero: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' }
      ]
    }
  ]
};
export default Hero;
TS

cat > blocks/RichText.ts <<'TS'
import type { Block } from 'payload/types';
const RichText: Block = {
  slug: 'richText',
  fields: [{ name: 'content', type: 'richText' }]
};
export default RichText;
TS

cat > blocks/ImageGallery.ts <<'TS'
import type { Block } from 'payload/types';
const ImageGallery: Block = {
  slug: 'imageGallery',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' }
      ]
    }
  ]
};
export default ImageGallery;
TS

# Pages
cat > collections/Pages.ts <<'TS'
import type { CollectionConfig } from 'payload/types';
import Hero from '../blocks/Hero';
import RichText from '../blocks/RichText';
import ImageGallery from '../blocks/ImageGallery';

const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: ({ req, doc }) => doc?.status === 'published' || !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Hero, RichText, ImageGallery]
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' }
      ]
    },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
    { name: 'publishedAt', type: 'date' }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        }
        return data;
      }
    ]
  }
};
export default Pages;
TS

# Posts
cat > collections/Posts.ts <<'TS'
import type { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: ({ req, doc }) => doc?.status === 'published' || !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'body', type: 'richText' },
    { name: 'status', type: 'select', options: ['draft','published'], defaultValue: 'draft' },
    { name: 'publishedAt', type: 'date' }
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        }
        return data;
      }
    ]
  }
};
export default Posts;
TS

# Globals
cat > globals/Navigation.ts <<'TS'
import type { GlobalConfig } from 'payload/types';

const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: { read: () => true, update: ({ req }) => !!req.user },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'external', type: 'checkbox', defaultValue: false }
          ]
        }
      ]
    }
  ]
};
export default Navigation;
TS

cat > globals/SiteSettings.ts <<'TS'
import type { GlobalConfig } from 'payload/types';

const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: { read: () => true, update: ({ req }) => !!req.user },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Recraft' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'twitter', type: 'text' },
        { name: 'github', type: 'text' },
        { name: 'linkedin', type: 'text' }
      ]
    },
    { name: 'defaultOG', type: 'upload', relationTo: 'media' }
  ]
};
export default SiteSettings;
TS

# --- Minimal site (Next App Router)
cat > components/Header.tsx <<'TSX'
import Link from "next/link";
import { getNavigation } from "../lib/serverData";

export default async function Header() {
  const nav = await getNavigation();
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Recraft</Link>
        <nav className="flex gap-4">
          {(nav?.menuItems ?? []).map((m:any, i:number) => (
            m.external
              ? <a key={i} href={m.url} target="_blank" className="hover:underline">{m.label}</a>
              : <Link key={i} href={m.url} className="hover:underline">{m.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
TSX

cat > components/Footer.tsx <<'TSX'
import { getSiteSettings } from "../lib/serverData";

export default async function Footer() {
  const s = await getSiteSettings();
  return (
    <footer className="w-full border-t mt-10">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} {s?.siteName ?? 'Recraft'}</div>
        <div className="flex gap-3">
          {s?.social?.twitter && <a href={s.social.twitter} target="_blank">Twitter</a>}
          {s?.social?.github && <a href={s.social.github} target="_blank">GitHub</a>}
          {s?.social?.linkedin && <a href={s.social.linkedin} target="_blank">LinkedIn</a>}
        </div>
      </div>
    </footer>
  );
}
TSX

cat > components/BlocksRenderer.tsx <<'TSX'
export default function BlocksRenderer({ blocks = [] as any[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((b:any, i:number) => {
        switch (b.blockType) {
          case 'hero':
            return (
              <section key={i} className="mx-auto max-w-5xl px-4">
                <h1 className="text-3xl font-bold">{b.heading}</h1>
                {b.subheading && <p className="text-lg text-gray-600 mt-2">{b.subheading}</p>}
              </section>
            );
          case 'richText':
            return (
              <section key={i} className="mx-auto max-w-3xl px-4 prose">
                <pre className="whitespace-pre-wrap">{JSON.stringify(b.content, null, 2)}</pre>
              </section>
            );
          case 'imageGallery':
            return (
              <section key={i} className="mx-auto max-w-5xl px-4 grid grid-cols-2 gap-4">
                {(b.items ?? []).map((it:any, j:number) => (
                  <figure key={j} className="border rounded p-2">
                    <div className="text-sm text-gray-500">{it.caption}</div>
                  </figure>
                ))}
              </section>
            );
          default:
            return <div key={i} className="mx-auto max-w-5xl px-4">Unknown block: {b.blockType}</div>;
        }
      })}
    </div>
  );
}
TSX

mkdir -p "app/(site)/blog/[slug]"
cat > "app/(site)/layout.tsx" <<'TSX'
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        {/* @ts-expect-error Async Server Component */}
        <Footer />
      </body>
    </html>
  );
}
TSX

cat > "app/(site)/page.tsx" <<'TSX'
import { getHomePage, getRecentPosts } from "../../lib/serverData";
import Link from "next/link";
import BlocksRenderer from "../../components/BlocksRenderer";

export default async function HomePage() {
  const page = await getHomePage();
  const posts = await getRecentPosts(6);
  return (
    <div className="space-y-12">
      {page ? (
        <BlocksRenderer blocks={page.blocks} />
      ) : (
        <section>
          <h1 className="text-3xl font-bold">Welcome to Recraft</h1>
          <p className="text-gray-600">Create a 'home' page in Admin → Pages to replace this.</p>
        </section>
      )}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {posts.map(p => (
            <li key={p.id} className="border rounded p-4">
              <Link href={`/blog/${p.slug}`} className="text-lg font-medium hover:underline">
                {p.title}
              </Link>
              {p.excerpt && <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
TSX

cat > "app/(site)/blog/[slug]/page.tsx" <<'TSX'
import { getPostBySlug } from "../../../lib/serverData";

type Params = { params: { slug: string } };

export default async function PostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return <div>Not found.</div>;
  }
  return (
    <article className="prose max-w-3xl">
      <h1>{post.title}</h1>
      {post.excerpt && <p className="text-gray-600">{post.excerpt}</p>}
      <pre className="whitespace-pre-wrap">{JSON.stringify(post.body, null, 2)}</pre>
    </article>
  );
}
TSX

mkdir -p app/api/revalidate
cat > app/api/revalidate/route.ts <<'TS'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = req.headers.get("x-revalidate-secret");
  if (!secret || auth !== secret) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
TS

# --- lib: minimal server-side fetchers using Payload Local API
cat > lib/serverData.ts <<'TS'
import payload from "payload";

export async function getNavigation() {
  const g = await payload.findGlobal({ slug: "navigation" });
  return g;
}
export async function getSiteSettings() {
  const g = await payload.findGlobal({ slug: "siteSettings" });
  return g;
}
export async function getHomePage() {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" }, status: { equals: "published" } },
    limit: 1
  });
  return docs[0] || null;
}
export async function getRecentPosts(limit = 6) {
  const { docs } = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit
  });
  return docs;
}
export async function getPostBySlug(slug: string) {
  const { docs } = await payload.find({
    collection: "posts",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }]
    },
    limit: 1
  });
  return docs[0] || null;
}
TS

# --- servers
cat > server/dev.ts <<'TS'
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import next from "next";
import payload from "payload";

const dev = process.env.NODE_ENV !== "production";
const port = 3000;

(async () => {
  const app = express();

  await payload.init({
    secret: process.env.PAYLOAD_SECRET || "dev-secret",
    express: app,
    onInit: () => {
      console.log(`Payload Admin: http://localhost:${port}/admin`);
    }
  });

  const nextApp = next({ dev, dir: __dirname + "/.." });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();

  app.all("*", (req, res) => handle(req, res));
  app.listen(port, () => console.log(`Site: http://localhost:${port}`));
})();
TS

cat > server/prod.cjs <<'JS'
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const payload = require("payload");
const next = require("next");

const dev = false;
const port = process.env.PORT || 3000;

(async () => {
  const app = express();

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      console.log(`Payload Admin: http://localhost:${port}/admin`);
    }
  });

  const nextApp = next({ dev, dir: __dirname + "/.." });
  const handle = nextApp.getRequestHandler();

  app.all("*", (req, res) => handle(req, res));
  app.listen(port, () => console.log(`Site: http://localhost:${port}`));
})();
JS

# --- seed script
cat > scripts/seed.ts <<'TS'
import payload from "payload";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  await payload.init({ secret: process.env.PAYLOAD_SECRET || 'dev', local: true });

  // Admin user
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 });
  if (!existing.docs[0]) {
    await payload.create({ collection: 'users', data: { email, password, role: 'admin', name: 'Admin' } });
    console.log(`Created admin: ${email}`);
  }

  // Globals
  await payload.updateGlobal({ slug: 'siteSettings', data: { siteName: 'Recraft' } });
  await payload.updateGlobal({
    slug: 'navigation',
    data: { menuItems: [{ label: 'Home', url: '/' }, { label: 'Blog', url: '/blog' }, { label: 'About', url: '/about' }] }
  });

  // Home page
  const home = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 });
  if (!home.docs[0]) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        status: 'published',
        blocks: [
          { blockType: 'hero', heading: 'Welcome to Recraft', subheading: 'Powered by Payload + Next.js' },
          { blockType: 'richText', content: [{ children: [{ text: 'Edit this in Admin → Pages.' }] }] }
        ]
      }
    });
  }

  // Sample author, tag, post
  const author = await payload.create({ collection: 'authors', data: { name: 'Team Recraft' } });
  const tag = await payload.create({ collection: 'tags', data: { label: 'General' } });
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Hello from Payload',
      slug: 'hello-from-payload',
      status: 'published',
      excerpt: 'Your fresh Payload site is running.',
      author: author.id,
      tags: [tag.id],
      body: [{ children: [{ text: 'This is a sample post. Replace me!' }] }],
      publishedAt: new Date().toISOString()
    }
  });

  console.log('Seed completed.');
  process.exit(0);
}
run().catch(err => { console.error(err); process.exit(1); });
TS

# --- README quickstart
cat > README.md <<'MD'
# Recraft — Payload Website Starter (Next.js App Router)

## Quickstart
```bash
pnpm i           # or npm i
cp .env.example .env
pnpm --filter @recraft/payload migrate
pnpm --filter @recraft/payload seed
pnpm --filter @recraft/payload dev
```

## Structure
- `/admin` — Payload admin panel
- `/*` — Next.js public site
- `collections/` — Content models
- `globals/` — Site-wide data
- `blocks/` — Reusable blocks
- `app/(site)/` — Public routes

## Collections
- Users (auth, RBAC)
- Authors, Tags, Media, Posts, Pages

## Globals
- Navigation (menus)
- SiteSettings (logo, socials)

## Next Steps
1. Fill out `.env` (PAYLOAD_SECRET, DATABASE_URL)
2. Run migration + seed
3. Start dev
4. Visit `/admin` to create content
5. Build blocks & pages as needed
MD

cat > .gitignore <<'IG'
node_modules
.next
.env
media
*.log
IG

echo ""
echo "✅ Payload workspace scaffolded at $APP_DIR"
echo ""
echo "Next steps:"
echo "  cd $APP_DIR"
echo "  pnpm i  # or npm i"
echo "  cp .env.example .env"
echo "  # Edit .env (PAYLOAD_SECRET, DATABASE_URL)"
echo "  pnpm migrate"
echo "  pnpm seed"
echo "  pnpm dev"
echo ""
echo "Admin: http://localhost:3000/admin"
echo "Site:  http://localhost:3000"
