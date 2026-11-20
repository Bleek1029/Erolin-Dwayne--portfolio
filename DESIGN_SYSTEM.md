# Dwayne Portfolio - Modern Professional Design System

## Overview
A scroll-triggered storytelling portfolio for a full-stack developer, featuring motion-driven design with clean typography, pure black/white contrast, and subtle micro-interactions.

---

## Design Tokens

### Color System (CSS Custom Properties)

```css
:root {
  /* Core Colors - Pure Black/White Contrast */
  --color-primary: #18181B;           /* Near-black for primary surfaces */
  --color-on-primary: #FFFFFF;        /* Pure white on primary */
  --color-secondary: #27272A;         /* Elevated surface */
  --color-on-secondary: #FFFFFF;
  --color-accent: #F8FAFC;            /* Near-white accent (CTA) */
  --color-on-accent: #0F172A;         /* Dark on accent */
  
  /* Background & Foreground */
  --color-background: #000000;        /* Pure black */
  --color-foreground: #FAFAFA;        /* Near-white text */
  --color-card: #0C0C0C;              /* Card background */
  --color-card-foreground: #FAFAFA;
  
  /* Muted & Borders */
  --color-muted: #181818;
  --color-muted-foreground: #94A3B8;  /* Slate-400 */
  --color-border: #3F3F46;            /* Zinc-700 */
  --color-border-bright: #52525B;     /* Zinc-600 */
  
  /* Semantic */
  --color-destructive: #EF4444;       /* Red-500 */
  --color-on-destructive: #000000;
  --color-ring: #FFFFFF;              /* Focus ring */
  
  /* Light Mode Override */
  @media (prefers-color-scheme: light) {
    --color-background: #FAFAFA;
    --color-foreground: #09090B;
    --color-primary: #FFFFFF;
    --color-on-primary: #09090B;
    --color-secondary: #F4F4F5;
    --color-on-secondary: #09090B;
    --color-accent: #09090B;
    --color-on-accent: #FAFAFA;
    --color-card: #FFFFFF;
    --color-card-foreground: #09090B;
    --color-muted: #F4F4F5;
    --color-muted-foreground: #71717A;
    --color-border: #E4E4E7;
    --color-border-bright: #D4D4D8;
    --color-ring: #09090B;
  }
}
```

### Typography

**Font Pairing: Archivo (Display) + Space Grotesk (UI)**

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  --font-display: 'Archivo', system-ui, sans-serif;
  --font-ui: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Type Scale */
  --text-xs: 0.75rem;      /* 12px - Labels, captions */
  --text-sm: 0.875rem;     /* 14px - Body small */
  --text-base: 1rem;       /* 16px - Body */
  --text-lg: 1.125rem;     /* 18px - Body large */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px - H3 */
  --text-3xl: 1.875rem;    /* 30px - H2 */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px - H1 */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px - Display */
  --text-8xl: 6rem;        /* 96px */
  --text-9xl: 8rem;        /* 128px - Hero */
  
  /* Line Heights */
  --leading-tight: 1.05;
  --leading-snug: 1.15;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.03em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;
}
```

### Spacing Scale (4px Base)

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### Shadows & Elevation

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Colored glow shadows */
  --shadow-accent-sm: 0 0 0 1px var(--color-border), 0 0 20px rgba(248, 250, 252, 0.1);
  --shadow-accent-md: 0 0 0 1px var(--color-border), 0 0 30px rgba(248, 250, 252, 0.15);
  --shadow-accent-lg: 0 0 0 1px var(--color-border), 0 0 40px rgba(248, 250, 252, 0.2);
}
```

### Transitions & Motion

```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-expo-out: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-base: var(--duration-base) var(--ease-out);
  --transition-slow: var(--duration-slow) var(--ease-out);
}
```

### Z-Index Scale

```css
:root {
  --z-bg: 0;
  --z-content: 10;
  --z-sticky: 20;
  --z-nav: 50;
  --z-modal-backdrop: 80;
  --z-modal: 90;
  --z-toast: 100;
  --z-tooltip: 110;
}
```

---

## Component Specifications

### 1. Button System

#### Base Button
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-3) var(--space-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-foreground);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.btn:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

#### Primary Button
```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  border-color: var(--color-accent);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-foreground);
  border-color: var(--color-foreground);
  transform: translateY(-1px);
  box-shadow: var(--shadow-accent-md);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}
```

#### Secondary/Ghost Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-foreground);
  border-color: var(--color-border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-secondary);
  border-color: var(--color-border-bright);
  color: var(--color-foreground);
}
```

#### Outline Button
```css
.btn-outline {
  background: transparent;
  color: var(--color-muted-foreground);
  border-color: var(--color-border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-secondary);
  border-color: var(--color-foreground);
  color: var(--color-foreground);
}
```

### 2. Card System

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border-bright), transparent);
  opacity: 0.5;
}

.card-hover:hover {
  border-color: var(--color-border-bright);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

### 3. Input System

```css
.input {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-foreground);
  transition: all var(--transition-fast);
}

.input::placeholder {
  color: var(--color-muted-foreground);
}

.input:hover:not(:disabled) {
  border-color: var(--color-border-bright);
}

.input:focus {
  outline: none;
  border-color: var(--color-ring);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-error {
  border-color: var(--color-destructive);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.label {
  display: block;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-muted-foreground);
  margin-bottom: var(--space-2);
}

.error-message {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-destructive);
  margin-top: var(--space-1);
}
```

### 4. Tag/Badge System

```css
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-muted-foreground);
  transition: all var(--transition-fast);
}

.tag-primary {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(248, 250, 252, 0.1);
}

.tag-primary:hover {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.tag-success {
  border-color: #22C55E;
  color: #22C55E;
  background: rgba(34, 197, 94, 0.1);
}

.tag-warning {
  border-color: #F59E0B;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.1);
}
```

---

## Layout System

### Container
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1440px;
  }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 1024px) {
  .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 { grid-template-columns: 1fr; }
}
```

---

## Animation System (GSAP)

### Scroll Reveal (Subtle)
```javascript
// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Basic scroll reveal
gsap.from('[data-reveal]', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '[data-reveal]',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  }
});

// Staggered reveal for lists
gsap.from('[data-reveal-stagger] > *', {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.08,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '[data-reveal-stagger]',
    start: 'top 85%',
  }
});
```

### Page Transitions
```javascript
// Page transition with AnimatePresence (Framer Motion) or GSAP
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};
```

### Reduced Motion Support
```javascript
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
  // Or disable ScrollTrigger animations
  ScrollTrigger.getAll().forEach(st => st.disable());
}
```

---

## Page Structure

### 1. Home Page (Hero + Stats + Featured Work)
```
├── Hero Section
│   ├── Boot indicator (glyph strip)
│   ├── Name (Display font, large)
│   ├── Role rotator (TypedLine)
│   ├── Description
│   ├── CTA Buttons (Primary + Ghost)
│   └── Portrait Card (3D tilt on hover)
├── Stats Bento Grid (3 columns)
│   ├── Projects Shipped
│   ├── Years Experience
│   └── Modules Built
└── Bottom Glyph Strip
```

### 2. About Page
```
├── Header (Name + Tagline)
├── Two-Column Layout
│   ├── Left: Photo Card (Developer Unit)
│   └── Right: About Text + Stats Bento
├── Skills Grid (4 columns)
│   ├── Frontend (CPU icon)
│   ├── Backend (Server icon)
│   ├── Database (Database icon)
│   └── DevOps (Cloud icon)
```

### 3. Projects Page
```
├── Header (Registry Loaded)
├── Filter Tabs (Hardware switch style)
│   ├── All Modules
│   ├── Web App
│   └── Design
├── Glyph Progress Bar
├── Projects Grid (3 columns, responsive)
│   ├── Project Card
│   │   ├── Image (16:9, object-fit cover)
│   │   ├── Hover Overlay (Gradient + Tags)
│   │   └── Info (Tags, Title, Description, Type)
└── Empty State
```

### 4. Contact Page
```
├── Header (Channel Open)
├── Two-Column Layout
│   ├── Left: Contact Info Cards (Email, Phone, Location)
│   │   ├── Glyph Divider
│   │   └── Status Indicators (System Online, Port Open, Standby)
│   └── Right: Contact Form
│       ├── Name + Email (2-col)
│       ├── Subject
│       ├── Message
│       ├── Sending Progress (Glyph Strip)
│       └── Submit Button (State-aware)
```

---

## Accessibility Checklist

- [ ] All interactive elements have visible focus states (2px ring)
- [ ] Color contrast ≥ 4.5:1 for all text (AA)
- [ ] Semantic HTML structure (h1-h6 hierarchy)
- [ ] Alt text for all meaningful images
- [ ] ARIA labels for icon-only buttons
- [ ] Keyboard navigation works (Tab order matches visual)
- [ ] Reduced motion respected (prefers-reduced-motion)
- [ ] Form labels connected to inputs (for/id)
- [ ] Error messages linked via aria-describedby
- [ ] Skip to main content link
- [ ] Live regions for dynamic content (form status)

---

## Performance Guidelines

- [ ] Images: WebP/AVIF with fallbacks, lazy loading
- [ ] Fonts: font-display: swap, preload critical weights
- [ ] Code splitting: Route-level lazy loading
- [ ] Bundle size: Monitor chunk sizes (< 500KB gzipped)
- [ ] CLS: Reserve space for images/async content
- [ ] Caching: Proper cache headers for static assets

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1440px) { /* 2xl */ }
```

---

## Icon System

Use **Lucide React** or **Heroicons** (consistent stroke width 1.5-2px)

```jsx
import { 
  Mail, Phone, MapPin, Github, LinkedIn, 
  Cpu, Server, Database, Cloud,
  ChevronRight, ChevronLeft, X, Menu,
  ArrowUpRight, Check, Loader2
} from 'lucide-react';
```

---

## Implementation Notes

### Current Stack
- React 19 + Vite 8
- React Router 7
- Framer Motion 14 (animations)
- GSAP 3.15 + ScrollTrigger (scroll animations)
- Lenis (smooth scroll)
- Tailwind-like CSS custom properties

### Key Files to Update
1. `src/index.css` - Design tokens (already has good foundation)
2. `src/components/*` - Component library
3. `src/pages/*` - Page implementations
4. `src/App.jsx` - Routing
5. `vite.config.js` - Build config

### Migration Path
1. Update design tokens in `index.css` to match this system
2. Create reusable component library in `src/components/ui/`
3. Refactor pages to use new components
4. Add scroll animations with GSAP/Framer Motion
5. Implement reduced motion support
6. Test across breakpoints and accessibility

---

## Anti-Patterns to Avoid

- ❌ Emojis as icons (use SVG)
- ❌ Mixed border radii (use token scale)
- ❌ Arbitrary spacing (use 4px scale)
- ❌ Color-only meaning (add icons/text)
- ❌ Animating width/height (use transform)
- ❌ No focus states
- ❌ Placeholder-only labels
- ❌ Horizontal scroll on mobile
- ❌ Inconsistent icon styles
- ❌ Hardcoded hex colors in components