# Pinterest Business Blog - Layout Analysis & Implementation Plan

This document provides a comprehensive analysis of the Pinterest Business Blog design patterns and a detailed implementation plan for the reCraft Payload CMS blog.

---

## Pinterest Design Analysis

### Single Post Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Fixed, transparent → solid on scroll)              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              HERO IMAGE (16:9)                      │   │
│  │              Full-width, 60-70vh                    │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  CATEGORY TAGS        Published: Nov 25, 2024       │   │
│  │  [Insights] [Best practices]                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ARTICLE TITLE                                      │   │
│  │  (Large, bold, max-width: 800px)                    │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ARTICLE CONTENT                                    │   │
│  │  - Intro paragraph (larger text)                    │   │
│  │  - Subheadings (bold, clear hierarchy)              │   │
│  │  - Body paragraphs                                  │   │
│  │  - Inline images (full-width within content)        │   │
│  │  - Pull quotes (centered, large)                    │   │
│  │  - Statistics callouts (centered, emphasized)       │   │
│  │  - Bullet lists                                     │   │
│  │  max-width: 680px, centered                         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  CTA BUTTON                                         │   │
│  │  [Create campaign →]                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  RELATED POSTS                                      │   │
│  │  "Recent" heading                                   │   │
│  │  ┌──────────┐  ┌──────────┐                        │   │
│  │  │  Card 1  │  │  Card 2  │    [See all posts →]   │   │
│  │  └──────────┘  └──────────┘                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Blog Listing Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PAGE TITLE                                         │   │
│  │  "Pinterest Business Blog"                          │   │
│  │  Intro text (optional)                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FEATURED POSTS (3 cards, dark background)          │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐      │   │
│  │  │            │ │            │ │            │      │   │
│  │  │  FEATURED  │ │  FEATURED  │ │  FEATURED  │      │   │
│  │  │   CARD 1   │ │   CARD 2   │ │   CARD 3   │      │   │
│  │  │            │ │            │ │            │      │   │
│  │  │ Dark bg    │ │ Dark bg    │ │ Dark bg    │      │   │
│  │  │ Hover img  │ │ Hover img  │ │ Hover img  │      │   │
│  │  └────────────┘ └────────────┘ └────────────┘      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FILTER BAR                                         │   │
│  │  Filter by: [All] [Insights] [News] [Best practices]│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  POST GRID (3 columns)                              │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐                        │   │
│  │  │ Card │ │ Card │ │ Card │                        │   │
│  │  └──────┘ └──────┘ └──────┘                        │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐                        │   │
│  │  │ Card │ │ Card │ │ Card │                        │   │
│  │  └──────┘ └──────┘ └──────┘                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PAGINATION                                         │   │
│  │  ← Previous  [1] [2] [3] ... [10]  Next →          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Color Palette

```json
{
  "colors": {
    "background": {
      "primary": "#FFFFFF",
      "secondary": "#F7F7F7",
      "dark": "#000000",
      "card": "#FAFAFA"
    },
    "text": {
      "primary": "#111111",
      "secondary": "#555555",
      "muted": "#979797",
      "inverse": "#FFFFFF"
    },
    "accent": {
      "primary": "#E60023",
      "focus": "#FF4C30",
      "hover": "#AD081B"
    },
    "border": {
      "light": "#EFEFEF",
      "medium": "#E0E0E0"
    }
  }
}
```

### Typography Scale

```json
{
  "typography": {
    "hero-title": {
      "size": "clamp(2.5rem, 5vw, 4rem)",
      "weight": 700,
      "lineHeight": 1.1,
      "letterSpacing": "-0.02em"
    },
    "page-title": {
      "size": "clamp(2rem, 4vw, 3rem)",
      "weight": 700,
      "lineHeight": 1.2
    },
    "card-title": {
      "size": "clamp(1.125rem, 2vw, 1.375rem)",
      "weight": 600,
      "lineHeight": 1.3
    },
    "subheading": {
      "size": "clamp(1.25rem, 2.5vw, 1.75rem)",
      "weight": 600,
      "lineHeight": 1.3
    },
    "body-large": {
      "size": "1.25rem",
      "weight": 400,
      "lineHeight": 1.6
    },
    "body": {
      "size": "1.125rem",
      "weight": 400,
      "lineHeight": 1.7
    },
    "caption": {
      "size": "0.875rem",
      "weight": 400,
      "lineHeight": 1.5
    },
    "meta": {
      "size": "0.8125rem",
      "weight": 500,
      "lineHeight": 1.4,
      "textTransform": "uppercase",
      "letterSpacing": "0.05em"
    }
  }
}
```

### Spacing System

```json
{
  "spacing": {
    "section": {
      "sm": "3rem",
      "md": "4rem",
      "lg": "6rem",
      "xl": "8rem"
    },
    "content": {
      "xs": "0.5rem",
      "sm": "1rem",
      "md": "1.5rem",
      "lg": "2rem",
      "xl": "3rem"
    },
    "grid-gap": {
      "cards": "1.5rem",
      "cards-lg": "2rem"
    }
  }
}
```

### Image Specifications

```json
{
  "images": {
    "hero": {
      "aspectRatio": "16:9",
      "minHeight": "50vh",
      "maxHeight": "70vh",
      "objectFit": "cover"
    },
    "card-featured": {
      "aspectRatio": "16:9",
      "height": "280px"
    },
    "card-standard": {
      "aspectRatio": "16:9",
      "height": "200px"
    },
    "inline-content": {
      "aspectRatio": "3:2",
      "maxWidth": "100%",
      "borderRadius": "8px"
    }
  }
}
```

### Transitions & Animations

```json
{
  "transitions": {
    "default": {
      "duration": "300ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    "fast": {
      "duration": "150ms",
      "easing": "ease-out"
    },
    "slow": {
      "duration": "500ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    "spring": {
      "duration": "400ms",
      "easing": "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
  },
  "animations": {
    "card-hover": {
      "transform": "translateY(-8px)",
      "shadow": "0 20px 40px rgba(0, 0, 0, 0.12)"
    },
    "image-hover": {
      "transform": "scale(1.05)"
    },
    "fade-in": {
      "from": { "opacity": 0, "transform": "translateY(20px)" },
      "to": { "opacity": 1, "transform": "translateY(0)" }
    }
  }
}
```

---

## Component Specifications

### 1. Featured Card (Dark Style)

```
┌─────────────────────────────────────┐
│                                     │
│  [CATEGORY TAG]                     │  ← Uppercase, small, muted
│                                     │
│  Article Title That Can             │  ← Bold, 1.375rem, white
│  Span Multiple Lines                │
│                                     │
│  November 25, 2024                  │  ← Caption size, muted
│                                     │
│  ┌─────────────────────────────┐   │
│  │    IMAGE (appears on hover) │   │  ← Fade in from bottom
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘

Background: #000000
Text: #FFFFFF
Hover: Image slides up with overlay
Border-radius: 16px
Padding: 2rem
Min-height: 320px
```

### 2. Standard Post Card

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      POST IMAGE             │   │  ← 16:9 ratio, 200px height
│  │      (zoom on hover)        │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [CATEGORY] · Nov 25, 2024         │  ← Meta line
│                                     │
│  Article Title Here                 │  ← Bold, 1.25rem
│                                     │
│  Brief excerpt text that gives     │  ← Body text, 2-3 lines max
│  readers a preview of content...    │
│                                     │
└─────────────────────────────────────┘

Background: #FFFFFF
Border: 1px solid #EFEFEF
Border-radius: 12px
Hover: translateY(-8px), shadow
Image hover: scale(1.05)
Padding: 0 (image flush), 1.5rem (content)
```

### 3. Post Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                    HERO IMAGE                               │
│                    (full-width)                             │
│                    60-70vh height                           │
│                    16:9 aspect ratio                        │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       max-width: 800px                      │
│                                                             │
│  [Insights]  [Best practices]              Nov 25, 2024     │
│                                                             │
│  Q5 on Pinterest: Your                                      │
│  bonus marketing moment                                     │
│                                                             │
│  By Author Name                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Hero image: object-fit cover, no overlay
Meta section: Below image, centered
Title: Large, bold, tight line-height
Spacing: 3rem between hero and meta
```

### 4. Pull Quote Block

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     "                                       │
│     73% of consumers said the visual nature                 │
│     of Pinterest results makes it better                    │
│     than traditional search.                                │
│                     "                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Font-size: 1.75rem
Font-weight: 500
Font-style: italic
Text-align: center
Color: #111111
Max-width: 720px
Padding: 4rem 2rem
Border-top: 1px solid #E0E0E0
Border-bottom: 1px solid #E0E0E0
Margin: 4rem auto
```

### 5. Statistics Callout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          73%                                │
│                                                             │
│              of consumers prefer visual search              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Number: 4rem, weight 700
Description: 1.125rem, weight 400
Text-align: center
Padding: 3rem
Background: #F7F7F7
Border-radius: 12px
```

### 6. Category Filter Bar

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Filter by:  [All]  [Insights]  [News]  [Best practices]   │
│               ────                                          │
│              active                                         │
└─────────────────────────────────────────────────────────────┘

Container: border-bottom 1px solid #E0E0E0
Pills: padding 0.5rem 1rem
Active: border-bottom 2px solid #111
Hover: background #F7F7F7
Transition: all 200ms ease
```

---

## Implementation File Changes

### Files to Create/Modify

```
src/
├── app/(frontend)/
│   ├── posts/
│   │   ├── page.tsx                    # Update listing layout
│   │   ├── page.client.tsx             # Add filter functionality
│   │   └── [slug]/
│   │       └── page.tsx                # Update single post layout
│   ├── globals.css                     # Add new CSS variables
│   └── pinterest-blog.css              # NEW: Pinterest-style blog CSS
│
├── components/
│   ├── Card/
│   │   └── index.tsx                   # Update card styling
│   ├── FeaturedCard/
│   │   └── index.tsx                   # NEW: Dark featured card
│   ├── CategoryFilter/
│   │   └── index.tsx                   # NEW: Filter bar component
│   ├── PullQuote/
│   │   └── index.tsx                   # NEW: Pull quote block
│   └── StatCallout/
│       └── index.tsx                   # NEW: Statistics callout
│
├── heros/
│   └── PostHero/
│       └── index.tsx                   # Update hero layout
│
└── blocks/
    └── Banner/
        └── Component.tsx               # Update for pull quotes
```

---

## CSS Implementation

### New CSS Variables to Add

```css
:root {
  /* Pinterest Blog Colors */
  --blog-bg-primary: #ffffff;
  --blog-bg-secondary: #f7f7f7;
  --blog-bg-dark: #000000;
  --blog-text-primary: #111111;
  --blog-text-secondary: #555555;
  --blog-text-muted: #979797;
  --blog-text-inverse: #ffffff;
  --blog-border-light: #efefef;
  --blog-border-medium: #e0e0e0;
  --blog-accent: #e60023;

  /* Pinterest Blog Spacing */
  --blog-section-sm: 3rem;
  --blog-section-md: 4rem;
  --blog-section-lg: 6rem;
  --blog-content-width: 680px;
  --blog-wide-width: 1200px;
  --blog-title-width: 800px;

  /* Pinterest Blog Typography */
  --blog-font-display: 'Inter', -apple-system, sans-serif;
  --blog-hero-title: clamp(2.5rem, 5vw, 4rem);
  --blog-page-title: clamp(2rem, 4vw, 3rem);
  --blog-card-title: clamp(1.125rem, 2vw, 1.375rem);
  --blog-body-large: 1.25rem;
  --blog-body: 1.125rem;

  /* Pinterest Blog Transitions */
  --blog-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --blog-transition-fast: 150ms ease-out;
  --blog-transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base: Mobile (< 640px) */
.blog-grid { grid-template-columns: 1fr; }
.featured-grid { grid-template-columns: 1fr; }

/* Tablet (>= 640px) */
@media (min-width: 640px) {
  .blog-grid { grid-template-columns: repeat(2, 1fr); }
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .blog-grid { grid-template-columns: repeat(3, 1fr); }
  .featured-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Wide Desktop (>= 1280px) */
@media (min-width: 1280px) {
  .blog-container { max-width: 1200px; }
}
```

---

## Animation Keyframes

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Staggered card animations */
.blog-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.blog-card:nth-child(1) { animation-delay: 0ms; }
.blog-card:nth-child(2) { animation-delay: 100ms; }
.blog-card:nth-child(3) { animation-delay: 200ms; }
.blog-card:nth-child(4) { animation-delay: 300ms; }
.blog-card:nth-child(5) { animation-delay: 400ms; }
.blog-card:nth-child(6) { animation-delay: 500ms; }
```

---

## Summary of Key Pinterest Design Principles

1. **Clean, minimal aesthetic** - White backgrounds, ample whitespace
2. **Bold typography** - Strong hierarchy with large titles
3. **16:9 images** - Consistent aspect ratios throughout
4. **Dark featured cards** - High contrast for emphasis
5. **Smooth transitions** - 300ms cubic-bezier for all interactions
6. **Hover lift effect** - Cards elevate on hover with shadow
7. **Image zoom** - Subtle scale on image hover
8. **Centered content** - Max-width containers for readability
9. **Category pills** - Simple, understated filter UI
10. **Pull quotes** - Large, centered, bordered quotes
