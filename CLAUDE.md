# reCraft Blog - Claude AI Project Documentation

## Project Overview
reCraft is a modern tech blog platform built with a headless CMS architecture. It combines Directus for content management with a Remix frontend for a performant, developer-friendly blogging solution.

## Tech Stack

### Backend
- **CMS**: Directus v10.0.0 (Headless CMS)
- **Database**: MySQL 8.0
- **Container**: Docker & Docker Compose
- **API**: RESTful API with CORS enabled
- **Storage**: Local file storage for uploads

### Frontend
- **Framework**: Remix v2.0.0 (React-based)
- **Styling**: TailwindCSS v3.3.0 with custom design system
- **Typography**: @tailwindcss/typography plugin
- **Fonts**: Josefin Sans (sans), Domine (serif)
- **SDK**: @directus/sdk v18.0.3 for API communication
- **Language**: TypeScript v5.0.0

## Project Structure

```
blog/
├── backend/                    # Directus CMS backend
│   ├── docker/                # Docker configuration files
│   │   └── mysql/            # MySQL initialization scripts
│   ├── extensions/           # Directus extensions (empty folders for customization)
│   │   ├── displays/
│   │   ├── endpoints/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── layouts/
│   │   ├── modules/
│   │   ├── operations/
│   │   └── panels/
│   ├── snapshots/            # Database snapshots
│   ├── uploads/              # Media uploads directory
│   ├── .env.example          # Environment variables template
│   ├── docker-compose.yml    # Docker services configuration
│   └── README.md
│
├── frontend/                   # Remix frontend application
│   ├── app/
│   │   ├── components/       # React components
│   │   │   ├── blog/        # Blog-specific components
│   │   │   │   └── PostCard.tsx
│   │   │   ├── home/        # Homepage components
│   │   │   │   └── HeroSection.tsx
│   │   │   ├── layout/      # Layout components
│   │   │   │   └── Navigation.tsx
│   │   │   └── ui/          # UI components
│   │   │       └── Typography.tsx
│   │   ├── lib/             # Library integrations
│   │   │   └── directus.ts  # Directus SDK configuration
│   │   ├── routes/          # Remix routes
│   │   │   ├── _index.tsx   # Homepage
│   │   │   ├── about.tsx    # About page
│   │   │   ├── blog._index.tsx  # Blog listing
│   │   │   ├── blog.$slug.tsx   # Individual blog post
│   │   │   └── contact.tsx  # Contact page
│   │   ├── styles/          # CSS styles
│   │   │   └── tailwind.css
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── css.d.ts
│   │   ├── utils/           # Utility functions
│   │   │   └── env.server.ts    # Server environment variables
│   │   └── root.tsx         # Root layout component
│   ├── build/               # Production build output
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.ts   # Tailwind configuration
│   ├── postcss.config.ts    # PostCSS configuration
│   └── tsconfig.json        # TypeScript configuration
│
├── template/                   # Template files (if any)
├── package.json               # Root monorepo configuration
├── package-lock.json
├── LICENSE                    # MIT License
├── README.md                  # Project documentation
└── .gitignore                # Git ignore rules
```

## Key Features

### Content Management
- **Directus CMS**: Provides a powerful admin interface for content management
- **Post Schema**: 
  - id, title, slug, content, excerpt
  - featured_image, status (draft/published)
  - date_created, date_updated
- **API Access**: RESTful API at http://localhost:8055

### Frontend Features
- **Dynamic Routing**: Blog posts accessible via `/blog/[slug]`
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **SEO Optimized**: Meta tags, structured data support
- **Performance**: Server-side rendering with Remix
- **Typography**: Professional typography system for blog content

### Design System
- **Colors**:
  - Primary: Grayscale palette for text and UI
  - Accent: Warm gold/bronze (#C19B6A) for highlights
  - Surface: Light backgrounds (#FEFEFE to #F5F5F5)
- **Fonts**:
  - Headers: Josefin Sans
  - Body: Josefin Sans
  - Code: Monaco/Consolas
- **Components**: Modular component architecture
- **Animations**: Subtle fade-in, slide-up, and scale-in effects

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- Docker & Docker Compose
- npm or yarn

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start backend (Directus + MySQL)
npm run start:backend

# Start frontend development server
npm run start:frontend

# Or start both
npm start

# Build for production
npm run build

# Clean all generated files and containers
npm run clean
```

### Environment Variables

Backend (.env):
```
KEY=change-me-to-a-unique-key
SECRET=change-me-to-a-unique-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=General@7
DB_CLIENT=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=directus
CORS_ENABLED=true
CORS_ORIGIN=*
```

Frontend (env.server.ts):
- `DIRECTUS_URL`: Default http://localhost:8055

## Docker Services

### Directus Container
- **Name**: recraft-space-directus
- **Port**: 8055
- **Volumes**: uploads, extensions, snapshots

### MySQL Container
- **Name**: recraft-space-mysql
- **Port**: 3306
- **Database**: directus
- **Persistent Volume**: mysql_data

## API Integration

The frontend uses `@directus/sdk` to communicate with the backend:

### Key Functions (frontend/app/lib/directus.ts)
- `getPosts()`: Fetch all published posts
- `getPost(slug)`: Fetch single post by slug
- `getAssetUrl(assetId)`: Generate asset URLs

### Data Flow
1. Content created in Directus Admin (http://localhost:8055/admin)
2. Stored in MySQL database
3. Accessed via Directus REST API
4. Consumed by Remix frontend using SDK
5. Server-side rendered and sent to browser

## Routes

### Public Routes
- `/` - Homepage with hero section
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post
- `/about` - About page
- `/contact` - Contact page

### Admin Routes
- `http://localhost:8055/admin` - Directus admin panel

## Current Status
- **Branch**: settingup
- **Main Branch**: main
- **Recent Changes**: Initial structure setup, Remix integration

## Development Tips

1. **Adding New Content Types**: Create collections in Directus admin
2. **Customizing Frontend**: Modify components in `frontend/app/components`
3. **Styling Changes**: Update `tailwind.config.ts` for design system changes
4. **API Changes**: Update types in `frontend/app/lib/directus.ts`
5. **Environment**: Use `.env.example` as template for local `.env`

## Common Tasks

### Creating a New Blog Post
1. Access Directus admin at http://localhost:8055/admin
2. Navigate to Posts collection
3. Create new post with title, slug, content
4. Set status to "published"
5. Post appears on frontend at `/blog/[slug]`

### Modifying Styles
- Global styles: `frontend/app/styles/tailwind.css`
- Component styles: Use Tailwind utility classes
- Theme customization: `frontend/tailwind.config.ts`

### Adding New Routes
1. Create new file in `frontend/app/routes/`
2. Export default component
3. Route automatically available at corresponding URL

## Troubleshooting

### Backend Issues
- Check Docker containers: `docker ps`
- View logs: `docker-compose logs directus`
- Reset database: `docker-compose down -v && docker-compose up`

### Frontend Issues
- Clear cache: `rm -rf frontend/.cache frontend/build`
- Reinstall deps: `cd frontend && npm install`
- Check env vars in `frontend/app/utils/env.server.ts`

## Future Enhancements
- Add authentication for protected routes
- Implement comment system
- Add search functionality
- Set up CI/CD pipeline
- Add analytics integration
- Implement RSS feed
- Add sitemap generation

## Resources
- [Directus Documentation](https://docs.directus.io)
- [Remix Documentation](https://remix.run/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)