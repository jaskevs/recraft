# Typology Theme - Project Status & Integration Guide

## Current Project Status

### Theme Overview
This is a modernized version of the Typology WordPress theme that has been converted to a static HTML/CSS/JS implementation with a clean, minimal design inspired by fantasy.co.

### Key Features Implemented
- **Light/White Theme**: Clean, modern design with white content areas
- **Glassmorphism Header**: Translucent header with backdrop blur effects
- **Full-Screen Mobile Menu**: Fantasy.co-inspired mobile menu with smooth animations
- **Smooth Page Transitions**: Custom transition overlay between page navigations
- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, and 1024px
- **Header Collapse on Scroll**: Menu collapses when scrolling past 20px, shows hamburger menu
- **Typography-First Design**: Large decorative letters, clean font hierarchy using Inter and Source Sans 3

### File Structure
```
typology/
├── assets/
│   ├── css/
│   │   ├── normalize.css
│   │   ├── font-awesome.css
│   │   └── fantasy-inspired.css (main theme styles)
│   ├── js/
│   │   └── modern-theme.js (all interactions)
│   └── img/
│       ├── recraft_icon.svg (logo icon)
│       └── recraft_text.svg (logo text)
├── index.html (homepage)
├── posts.html (blog listing)
├── post.html (single post)
├── contact.html (contact page)
└── search.html (search page)
```

### Design System

#### Color Palette
```css
--primary-bg: #f8f8f8;
--content-bg: #ffffff;
--text-primary: #000000;
--text-secondary: #666666;
--accent: #000000;
--border-light: #e5e5e5;
```

#### Typography
```css
--font-primary: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: 'Poppins', sans-serif;
--font-title: 'Inter', 'TT Norms Web', Arial, sans-serif;
```

#### Spacing System
```css
--gap-xs: 0.5rem;
--gap-sm: 1rem;
--gap-md: 2rem;
--gap-lg: 3rem;
--gap-xl: 5rem;
```

## Converting to Remix/React

### 1. Component Structure
Break down the HTML into React components:

```typescript
// Suggested component structure
components/
├── Layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MobileMenu.tsx
│   └── PageTransition.tsx
├── Blog/
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── SinglePost.tsx
│   └── PostLetter.tsx (decorative letter)
├── UI/
│   ├── Button.tsx
│   ├── SearchForm.tsx
│   └── ContactForm.tsx
└── SEO/
    └── Meta.tsx
```

### 2. Key React Components to Create

#### Header Component
```tsx
// Header.tsx
export function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 1024) {
        setIsCollapsed(window.pageYOffset > 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`typology-header ${isCollapsed ? 'header-collapsed' : ''}`}>
      {/* Header content */}
    </header>
  );
}
```

#### Mobile Menu Component
```tsx
// MobileMenu.tsx
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      <div className={`typology-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`typology-sidebar ${isOpen ? 'active' : ''}`}>
        {/* Menu content */}
      </div>
    </>
  );
}
```

### 3. Directus Integration

#### Content Models
Create these collections in Directus:

```typescript
// Post Collection
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Author;
  date_created: string;
  date_updated: string;
  status: 'published' | 'draft';
  featured_letter?: string; // For the decorative letter
  category?: Category;
  tags?: Tag[];
}

// Author Collection
interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
}

// Category Collection
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// Site Settings (Singleton)
interface SiteSettings {
  site_title: string;
  site_description: string;
  logo_icon: string;
  logo_text: string;
  social_links: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}
```

#### API Integration in Remix

```typescript
// app/models/post.server.ts
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

const client = createDirectus(process.env.DIRECTUS_URL).with(rest());

export async function getPosts() {
  return await client.request(
    readItems('posts', {
      fields: ['*', 'author.*', 'category.*'],
      filter: { status: { _eq: 'published' } },
      sort: ['-date_created'],
    })
  );
}

export async function getPost(slug: string) {
  return await client.request(
    readItems('posts', {
      filter: { slug: { _eq: slug } },
      fields: ['*', 'author.*', 'category.*', 'tags.*'],
      limit: 1,
    })
  );
}
```

### 4. Remix Routes Structure

```
app/
├── routes/
│   ├── _index.tsx (homepage)
│   ├── blog._index.tsx (blog listing)
│   ├── blog.$slug.tsx (single post)
│   ├── contact.tsx
│   ├── search.tsx
│   └── api.search.tsx (search API endpoint)
├── root.tsx
└── entry.client.tsx
```

### 5. CSS Migration Strategy

#### Option 1: Direct Import
```tsx
// app/root.tsx
import fantasyStyles from "~/styles/fantasy-inspired.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fantasyStyles },
];
```

#### Option 2: CSS Modules
Convert to CSS modules for component-scoped styles:
```tsx
// Header.module.css
.header {
  /* styles */
}

// Header.tsx
import styles from './Header.module.css';
```

#### Option 3: Tailwind CSS
Convert to Tailwind utility classes (requires more refactoring):
```tsx
<header className="fixed top-0 left-0 right-0 bg-transparent z-1000">
```

### 6. JavaScript Functionality Migration

Convert `modern-theme.js` functions to React hooks:

```typescript
// hooks/usePageTransition.ts
export function usePageTransition() {
  const navigate = useNavigate();
  
  const transitionTo = (url: string) => {
    document.querySelector('.page-transition-overlay')?.classList.add('active');
    setTimeout(() => navigate(url), 300);
  };
  
  return { transitionTo };
}

// hooks/useScrollToTop.ts
export function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return { isVisible, scrollToTop };
}
```

### 7. Environment Variables

```env
# .env
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_TOKEN=your-static-token-or-use-auth
```

### 8. Package Dependencies

```json
{
  "dependencies": {
    "@directus/sdk": "^latest",
    "@remix-run/node": "^latest",
    "@remix-run/react": "^latest",
    "@remix-run/serve": "^latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 9. Data Fetching Example

```typescript
// app/routes/blog._index.tsx
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { PostCard } from "~/components/Blog/PostCard";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json({ posts });
};

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  
  return (
    <div className="typology-fake-bg">
      <div className="typology-section">
        <div className="section-content section-content-a">
          <div className="typology-posts">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 10. Search Implementation

```typescript
// app/routes/api.search.tsx
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { searchPosts } from "~/models/post.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  
  if (!query) {
    return json({ posts: [] });
  }
  
  const posts = await searchPosts(query);
  return json({ posts });
};
```

## Testing Checklist

- [ ] All page transitions work smoothly
- [ ] Mobile menu opens/closes properly
- [ ] Header collapse on scroll functions
- [ ] Search functionality works
- [ ] Contact form submission
- [ ] Responsive design on all breakpoints
- [ ] Images load from Directus
- [ ] SEO meta tags are properly set
- [ ] Performance optimization (lazy loading, code splitting)

## Deployment Considerations

1. **Static Assets**: Move all images to Directus or a CDN
2. **Font Loading**: Use font-display: swap for better performance
3. **Image Optimization**: Use Directus image transformations
4. **Caching**: Implement proper cache headers for static assets
5. **Error Boundaries**: Add error boundaries for better error handling

## Commands for Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Notes for Future Development

1. **Animation Library**: Consider using Framer Motion for React animations
2. **State Management**: Use Remix's built-in state management or add Zustand if needed
3. **Forms**: Use Remix's Form component for better progressive enhancement
4. **Accessibility**: Add ARIA labels and keyboard navigation support
5. **PWA**: Consider adding PWA capabilities with service workers
6. **Analytics**: Integrate analytics (Google Analytics, Plausible, etc.)
7. **Comments**: Add commenting system (Disqus, Giscus, or custom with Directus)

## Current Known Issues

- Mobile menu button only appears when header is collapsed on desktop
- Search functionality is currently static (needs Directus integration)
- Contact form doesn't actually submit (needs backend integration)
- Pagination is decorative (needs implementation)

## Resources

- [Remix Documentation](https://remix.run/docs)
- [Directus SDK Documentation](https://docs.directus.io/reference/sdk.html)
- [React Documentation](https://react.dev)
- [Original Theme CSS](./assets/css/fantasy-inspired.css)
- [Original Theme JS](./assets/js/modern-theme.js)