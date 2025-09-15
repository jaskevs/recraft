# reCraft Blog - Project & Deployment Guide

## Overview
reCraft is a modern tech blog platform with headless CMS architecture, combining Directus for content management with a Remix frontend.

## Tech Stack

### Backend
- **CMS**: Directus v10.13.1
- **Database**: MySQL 8.0
- **Runtime**: Docker containers
- **API**: RESTful with CORS

### Frontend
- **Framework**: Remix v2.0.0
- **Runtime**: Node.js >= 18.0.0
- **Build Tool**: Vite v5.4.19
- **Styling**: TailwindCSS v3.3.0
- **Server Port**: 4444

## Project Structure

```
blog/
├── backend/
│   ├── docker/
│   │   └── mysql/             # MySQL initialization scripts
│   ├── extensions/            # Directus extensions (empty)
│   ├── snapshots/             # Database snapshots
│   ├── uploads/               # Media uploads
│   ├── .dockerignore          # Docker build optimization
│   ├── .env.example           # Environment template
│   ├── docker-compose.yml     # Local development setup
│   └── Dockerfile             # Dokploy deployment
│
├── frontend/
│   ├── app/
│   │   ├── components/        # React components
│   │   ├── lib/              # Directus SDK integration
│   │   ├── routes/           # Remix routes
│   │   ├── styles/           # CSS/Tailwind
│   │   ├── types/            # TypeScript definitions
│   │   ├── utils/            # Utilities
│   │   └── root.tsx          # Root layout
│   ├── build/                # Production output
│   ├── public/               # Static assets
│   ├── .dockerignore         # Docker build optimization
│   ├── Dockerfile            # Dokploy deployment
│   ├── package.json          # Dependencies
│   ├── remix.config.js       # Remix config
│   ├── tailwind.config.ts    # Tailwind config
│   ├── tsconfig.json         # TypeScript config
│   └── vite.config.ts        # Vite config
│
├── scripts/                  # Build scripts
├── package.json             # Monorepo root
├── LICENSE                  # MIT License
└── README.md               # Documentation
```

## Development Setup

### Commands
```bash
# Install dependencies
npm install

# Start backend (Docker Compose)
npm run start:backend

# Start frontend dev server
npm run start:frontend

# Build production
npm run build

# Clean everything
npm run clean
```

### Local Development Configuration

**Backend** (`backend/docker-compose.yml`):
- Uses named volumes for Windows compatibility
- MySQL with health checks
- Directus v10.13.1 image
- Ports: 8055 (Directus), 3306 (MySQL)

**Frontend Environment**:
```javascript
// frontend/app/utils/env.server.ts
DIRECTUS_URL: process.env.DIRECTUS_URL || 'http://localhost:8055'
```

## Dokploy Deployment

### Configuration Files

**Backend Dockerfile**:
- Base: directus/directus:10.13.1
- Port: 8055
- User: node (non-root)
- Volumes: uploads, extensions, snapshots

**Frontend Dockerfile**:
- Base: node:18-alpine
- Multi-stage build
- Port: 4444
- User: remix (non-root)

### Environment Variables

**Backend (Dokploy)**:
```env
# Security
KEY=your-32-char-production-key
SECRET=your-32-char-production-secret

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-password

# Database (Dokploy MySQL)
DB_CLIENT=mysql
DB_HOST=recraft-mysql-bmrzp1
DB_PORT=3306
DB_DATABASE=recraft-directus-db
DB_USER=recraft-directus-user
DB_PASSWORD=General@7

# CORS
CORS_ENABLED=true
CORS_ORIGIN=https://your-frontend-domain.com

# Storage
STORAGE_LOCATIONS=local
STORAGE_LOCAL_PUBLIC_URL=/uploads
```

**Frontend (Dokploy)**:
```env
DIRECTUS_URL=https://your-backend-domain.com
NODE_ENV=production
```

### Deployment Steps

1. **Backend Service**:
   - Create application in Dokploy
   - Set build context: `/backend`
   - Configure environment variables
   - Deploy on port 8055

2. **Frontend Service**:
   - Create second application
   - Set build context: `/frontend`
   - Configure DIRECTUS_URL
   - Deploy on port 4444

## API Integration

**Directus SDK** (`frontend/app/lib/directus.ts`):
- `getPosts()`: Fetch published posts
- `getPost(slug)`: Fetch single post
- `getAssetUrl(assetId)`: Generate asset URLs

## Routes

**Public**:
- `/` - Homepage
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/about` - About page
- `/contact` - Contact page
- `/search` - Search

**Admin**:
- `http://localhost:8055/admin` - Directus panel

## Health Monitoring

- **Backend**: `/server/health`
- **Frontend**: Root endpoint (`/`)
- **Docker**: Built-in health checks with 30s intervals

## Notes

- Local development uses Docker Compose with named volumes
- Dokploy deployment uses separate Dockerfiles
- Both setups coexist without conflict
- Frontend builds with Vite, serves with remix-serve
- All containers run as non-root users for security