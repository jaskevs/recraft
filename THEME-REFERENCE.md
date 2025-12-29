# Theme Structure & Styling Reference

This document summarizes the theme architecture, styling approach, and key customization points for the reCraft project.

---

## Quick Reference

| Aspect | Technology | Primary File |
|--------|------------|--------------|
| **CSS Framework** | TailwindCSS 3.4.3 | `tailwind.config.mjs` |
| **Color System** | CSS Variables (HSL) | `src/app/(frontend)/globals.css` |
| **Design System** | Custom Minimalist CSS | `src/app/(frontend)/minimalist.css` |
| **UI Components** | shadcn/ui | `src/components/ui/` |
| **Theme Switching** | React Context + localStorage | `src/providers/Theme/` |

---

## Theme Configuration Schema

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
  }
}
```

---

## Styling Architecture

### CSS Processing Pipeline

```
globals.css (TailwindCSS + CSS Variables)
    ↓
minimalist.css (Custom Design System)
    ↓
typography.css (Typography Overrides)
    ↓
tailwind.config.mjs (Tailwind Extensions)
    ↓
postcss.config.js (Autoprefixer)
    ↓
Final Compiled CSS
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `globals.css` | Base CSS variables, TailwindCSS imports, theme colors |
| `minimalist.css` | Component styles, layout classes, animations (~1090 lines) |
| `typography.css` | Typography overrides and rich text styling |
| `tailwind.config.mjs` | Tailwind extensions, custom colors, plugins |
| `cssVariables.js` | Breakpoint definitions for JS/CSS sync |

---

## Key Customization Points

### 1. Colors

**File:** `src/app/(frontend)/globals.css`

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... other colors ... */
}

[data-theme='dark'] {
  --background: 0 0% 0%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... other colors ... */
}
```

### 2. Typography

**Font Loading:** `src/app/(frontend)/layout.tsx`
```typescript
const FONT_STYLESHEET_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&...'
```

**Font Variables:** `globals.css`
```css
:root {
  --font-sans-stack: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif-stack: 'Crimson Text', Georgia, serif;
  --font-mono-stack: 'JetBrains Mono', 'Courier New', monospace;
}
```

### 3. Spacing & Layout

**File:** `minimalist.css`
```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 8rem;

  --max-width-content: 680px;
  --max-width-wide: 1200px;
  --header-height: 72px;
}
```

### 4. Breakpoints

**File:** `src/cssVariables.js`
```javascript
module.exports = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
  }
}
```

### 5. Border Radius

**File:** `tailwind.config.mjs`
```javascript
borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
}
```

### 6. Shadows & Transitions

**File:** `minimalist.css`
```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}
```

---

## Theme Provider System

### Architecture

```
InitTheme (inline script, prevents FOUC)
    ↓
ThemeProvider (React context)
    ↓
ThemeSelector (UI dropdown)
```

### Key Files

| File | Purpose |
|------|---------|
| `src/providers/Theme/index.tsx` | Main theme context provider |
| `src/providers/Theme/InitTheme/index.tsx` | Inline script for early theme detection |
| `src/providers/Theme/ThemeSelector/index.tsx` | Dropdown component (Auto/Light/Dark) |
| `src/providers/Theme/shared.ts` | Theme utilities and defaults |
| `src/providers/Theme/types.ts` | TypeScript type definitions |

### Usage

```tsx
import { useTheme } from '@/providers/Theme'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

---

## Minimalist Design System Components

The `minimalist.css` file provides pre-built component classes:

| Class | Purpose |
|-------|---------|
| `.container`, `.container-narrow` | Layout wrappers |
| `.minimal-grid` | Responsive grid system |
| `.minimal-header` | Fixed header with blur effect |
| `.minimal-nav` | Navigation with underline animations |
| `.minimal-hero` | Hero sections with gradient |
| `.minimal-blog-grid` | Post card grid layout |
| `.minimal-post-card` | Interactive post cards |
| `.minimal-article` | Article typography |
| `.minimal-footer` | Footer styling |
| `.minimal-mobile-menu` | Full-screen mobile menu |

---

## Tailwind Configuration

**File:** `tailwind.config.mjs`

### Key Extensions

```javascript
{
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: 'hsl(var(--card))',
        destructive: 'hsl(var(--destructive))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      }
    }
  },
  plugins: [
    'tailwindcss-animate',
    '@tailwindcss/typography'
  ]
}
```

---

## shadcn/ui Integration

**Config:** `components.json`

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/(frontend)/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/utilities/ui"
  }
}
```

### Available UI Components

Located in `src/components/ui/`:
- `button.tsx`
- `card.tsx`
- `checkbox.tsx`
- `input.tsx`
- `label.tsx`
- `pagination.tsx`
- `select.tsx`
- `textarea.tsx`

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.3 | CSS framework |
| `@tailwindcss/typography` | ^0.5.13 | Prose typography |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |
| `tailwind-merge` | ^2.3.0 | Class merging |
| `clsx` | ^2.1.1 | Conditional classes |
| `class-variance-authority` | ^0.7.0 | Variant management |
| `lucide-react` | ^0.378.0 | Icons |

---

## Common Customization Tasks

### Change Primary Brand Color

1. Edit `globals.css`:
```css
:root {
  --primary: 220 90% 50%;  /* Your new HSL value */
}
[data-theme='dark'] {
  --primary: 220 90% 70%;  /* Lighter for dark mode */
}
```

### Add New Font

1. Update `layout.tsx` with Google Fonts URL
2. Add CSS variable in `globals.css`:
```css
:root {
  --font-display: 'Your Font', sans-serif;
}
```

### Adjust Content Width

Edit `minimalist.css`:
```css
:root {
  --max-width-content: 720px;  /* Increase from 680px */
  --max-width-wide: 1400px;    /* Increase from 1200px */
}
```

### Modify Header Height

Edit `minimalist.css`:
```css
:root {
  --header-height: 80px;  /* Increase from 72px */
}
```

---

## File Index

| Path | Description |
|------|-------------|
| `src/app/(frontend)/globals.css` | Theme colors, CSS variables, Tailwind base |
| `src/app/(frontend)/minimalist.css` | Design system components (~1090 lines) |
| `src/app/(frontend)/typography.css` | Typography overrides |
| `src/app/(frontend)/layout.tsx` | Root layout, font loading |
| `tailwind.config.mjs` | Tailwind configuration |
| `components.json` | shadcn/ui configuration |
| `src/cssVariables.js` | Breakpoint definitions |
| `src/providers/Theme/` | Theme provider system |
| `src/components/ui/` | shadcn/ui components |
