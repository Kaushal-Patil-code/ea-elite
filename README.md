# E.A. Elite Trading Group — Corporate Website

A luxury, modern corporate website for **E.A. Elite Trading Group**, a diversified international trading conglomerate headquartered in Bangkok, Thailand. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and GSAP animations.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
  - [Layout Components](#layout-components)
  - [Home Page Sections](#home-page-sections)
  - [UI Components](#ui-components)
- [Context Providers](#context-providers)
- [Translations (i18n)](#translations-i18n)
- [Hooks](#hooks)
- [Styling & Design System](#styling--design-system)
- [Configuration Files](#configuration-files)

---

## Overview

E.A. Elite Trading Group operates across multiple sectors including agricultural trading, seafood, minerals, hospitality, and plantation agriculture. The website showcases:

- **5 Group Companies** across 4 countries (Thailand, Japan, Singapore, Myanmar)
- **6 Business Divisions**: Agricultural Trading, Seafood Trading, Minerals & Metals, Budget Hotels, Restaurant & F&B, Plantation Agriculture
- **Bilingual Support**: English and Japanese
- **Leadership**: Mr. Minn — Founder & Managing Director

### Group Companies

| Company | Role | Location |
|---------|------|----------|
| E.A. Elite Trading Co., Ltd | Parent Headquarters | Bangkok, Thailand |
| E.A. Elite Trading Co., Ltd | Japan Branch | Tokyo, Japan |
| EA Elite Trading Pte Ltd. | Singapore Branch | Singapore |
| Medi-Tech Biz (Thailand) Co., Ltd | Healthcare & Trading | Bangkok, Thailand |
| Minn's Fresh Farm (Myanmar) Co., Ltd | Plantation & Agriculture | Myanmar |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.12 | React framework with App Router |
| React | 19.1.0 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| GSAP | 3.14.2 | Animation engine (ScrollTrigger) |
| Three.js | 0.183.2 | 3D graphics (future use) |
| Google Fonts | — | Cormorant Garamond, DM Sans, Noto Sans JP |

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd EA-ELITE

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server with hot reload |
| `build` | `npm run build` | Create production build |
| `start` | `npm run start` | Serve production build |
| `lint` | `npm run lint` | Run ESLint checks |

---

## Project Structure

```
EA-ELITE/
├── public/                          # Static assets
│   ├── logo.svg                     # EA Elite logo (36x36px, navbar)
│   ├── file.svg                     # Default Next.js icon
│   ├── globe.svg                    # Default Next.js icon
│   ├── next.svg                     # Next.js logo
│   ├── vercel.svg                   # Vercel logo
│   └── window.svg                   # Default Next.js icon
│
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout (fonts, providers, navbar, footer)
│   │   ├── page.tsx                 # Home page (composition of 5 sections)
│   │   ├── globals.css              # Global styles, theme variables, utilities
│   │   ├── icon.svg                 # App favicon
│   │   ├── who-we-are/
│   │   │   ├── page.tsx             # About page metadata
│   │   │   └── content.tsx          # Leadership, values, vision, timeline
│   │   ├── group/
│   │   │   ├── page.tsx             # Group page metadata
│   │   │   └── content.tsx          # 5 group companies listing
│   │   ├── trading/
│   │   │   ├── page.tsx             # Trading page metadata
│   │   │   └── content.tsx          # Trading tabs (agriculture, seafood, minerals)
│   │   ├── hospitality/
│   │   │   ├── page.tsx             # Hospitality page metadata
│   │   │   └── content.tsx          # Hotels, coffee shop, restaurant
│   │   ├── plantation/
│   │   │   ├── page.tsx             # Plantation page metadata
│   │   │   └── content.tsx          # Farm products & journey animation
│   │   ├── japan/
│   │   │   ├── page.tsx             # Japan page metadata
│   │   │   └── content.tsx          # Japan expansion & enquiry form
│   │   └── contact/
│   │       ├── page.tsx             # Contact page metadata
│   │       └── content.tsx          # Contact form & office locations
│   │
│   ├── components/
│   │   ├── layout/                  # Layout-level components
│   │   │   ├── Navbar.tsx           # Fixed navigation bar with scroll effects
│   │   │   ├── FullscreenMenu.tsx   # Mobile hamburger menu overlay
│   │   │   ├── SectionTag.tsx       # Reusable section label (gold line + text)
│   │   │   ├── SectionDots.tsx      # Fixed sidebar navigation dots (desktop)
│   │   │   └── Footer.tsx           # Site footer with company info
│   │   ├── home/                    # Home page section components
│   │   │   ├── HeroSection.tsx      # Full-height hero with animated text
│   │   │   ├── MissionSection.tsx   # About/mission overview
│   │   │   ├── DivisionCarousel.tsx # 3D flip cards for 6 divisions
│   │   │   ├── StatsCounter.tsx     # Animated number counters
│   │   │   └── JapanCTA.tsx         # Japan expansion call-to-action
│   │   └── ui/                      # Reusable UI primitives
│   │       ├── Button.tsx           # Polymorphic button (primary/secondary)
│   │       └── GlassCard.tsx        # Frosted glass card wrapper
│   │
│   ├── context/                     # React Context providers
│   │   ├── LanguageContext.tsx       # EN/JA language state & translation function
│   │   └── NavigationContext.tsx     # Active section tracking
│   │
│   ├── data/
│   │   └── translations/
│   │       ├── en.json              # English translations (200+ keys)
│   │       └── ja.json              # Japanese translations (200+ keys)
│   │
│   ├── hooks/
│   │   └── useIntersectionObserver.ts  # Scroll-based section detection hook
│   │
│   ├── styles/                      # (Empty — all styles in globals.css)
│   └── lib/                         # (Empty — reserved for utilities)
│
├── banner.jpg                       # Banner image (77KB, OG/social)
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── postcss.config.mjs               # PostCSS/Tailwind plugin config
├── eslint.config.mjs                # ESLint rules (Next.js + TypeScript)
└── README.md                        # This file
```

---

## Pages & Routes

### Home Page (`/`) — `src/app/page.tsx`

The landing page composed of five sections rendered sequentially:

| Section | Component | Description |
|---------|-----------|-------------|
| Hero | `HeroSection` | Full-height intro with animated title, cycling divisions, stats, CTAs |
| Mission | `MissionSection` | Company overview with "Who We Are" CTA |
| Divisions | `DivisionCarousel` | 6 interactive 3D flip cards showing each business division |
| Stats | `StatsCounter` | 6 animated counters (years, staff, exports, imports, customers, countries) |
| Japan CTA | `JapanCTA` | Japan expansion teaser with objectives and product tags |

### Who We Are (`/who-we-are`) — `src/app/who-we-are/content.tsx`

The about/leadership page with four sections:

| Section | Description |
|---------|-------------|
| Core Values | 3 glass cards: Innovation, Trust, Growth — each with title and description |
| Leadership | Mr. Minn's profile card (avatar with "MN" initials, name, title, credential pills) paired with a 4-step career timeline (dotted vertical line with gold dots) |
| Vision & Mission | 2-column grid with Vision and Mission cards |
| Driving Forces | 3 glass cards: Market Knowledge, Risk Awareness, Operational Excellence |

**Founder credentials displayed as pills:**
- Medical Doctor
- MBA — Liverpool University UK
- 30+ Years Business Management

**Timeline milestones:**
1. Early Career — Local Manager in trading
2. Regional Leadership — Asia Pacific Manager
3. Entrepreneurship — Founded Medi-Tech Biz (Thailand) in 2008
4. Group MD — Managing Director for the entire E.A. Elite Trading Group

### Group (`/group`) — `src/app/group/content.tsx`

Displays the 5 group companies as color-coded glass cards:

| Company | Role | Color Code |
|---------|------|------------|
| E.A. Elite Trading Co., Ltd | Parent Headquarters | Gold `#C5A55A` |
| E.A. Elite Trading Co., Ltd | Japan Branch | Red `#FF6B6B` |
| EA Elite Trading Pte Ltd. | Singapore Branch | Teal `#4ECDC4` |
| Medi-Tech Biz (Thailand) Co., Ltd | Healthcare & Trading | Blue `#45B7D1` |
| Minn's Fresh Farm (Myanmar) Co., Ltd | Plantation & Agriculture | Green `#2ECC71` |

Each card has a colored left border, a glowing dot indicator, company name, role description, and location badge.

### Trading (`/trading`) — `src/app/trading/content.tsx`

Tabbed interface with 3 trading categories:

**Agriculture Tab:**
| Product | Description |
|---------|-------------|
| Yellow Maize | Premium quality from Southeast Asia, bulk export |
| Agricultural Commodities | Rice, pulses, oilseeds across multi-country networks |
| Bulk Goods | Large-volume raw material trading |

**Seafood Tab:**
| Product | Description |
|---------|-------------|
| Frozen Rohu Fish | From Myanmar's Ayeyarwady river system |
| Seafood Products | Frozen/processed products meeting international standards |
| Cold Chain Logistics | End-to-end freshness management |

**Minerals Tab:**
| Product | Description |
|---------|-------------|
| Minerals & Ores | High-demand minerals from verified mines |
| Copper Cathode | Grade-A copper for industrial buyers |
| Metal Trading | Ferrous and non-ferrous metals |

### Hospitality (`/hospitality`) — `src/app/hospitality/content.tsx`

Three service cards with emoji icons:

| Service | Icon | Description |
|---------|------|-------------|
| Budget Hotels | `🏨` | Affordable properties across Bangkok |
| The Coffee Ville | `☕` | Premium coffee shop brand |
| Shabu & Hotpot | `🍽️` | Restaurant partnerships with premium ingredients |

### Plantation (`/plantation`) — `src/app/plantation/content.tsx`

Minn's Fresh Farm (Myanmar) Co., Ltd showcase with three sections:

**Story Section:** Overview of the farm in the highlands of Myanmar.

**Products Section (6 cards):**

| Product | Icon | Description |
|---------|------|-------------|
| Fresh Strawberries | `🍓` | Hand-picked premium strawberries from Myanmar highlands |
| Yellow Maize | `🌽` | Premium yellow maize from Myanmar's fertile farmlands |
| Baby Corn | `🌿` | Tender baby corn harvested at peak quality |
| Lily Flowers | `🌸` | Cultivated for ornamental and commercial purposes |
| Artisanal Preserves | `🫙` | Small-batch strawberry preserves for export |
| Strawberry Wine | `🍷` | Artisanal wine from farm's finest produce |

**Journey Section:** Horizontal scroll animation (GSAP pinned ScrollTrigger) showing 5 stages:
`Field (🌱) → Harvest (🌾) → Processing (⚙️) → Packaging (📦) → Export (🚢)`

### Japan Expansion (`/japan`) — `src/app/japan/content.tsx`

Japan market entry page with:

| Section | Content |
|---------|---------|
| Objectives | 3 cards: Strategic Partners, Investors, B2B Opportunities |
| Product Tags | Yellow Maize, Frozen Rohu, Seafood, Minerals, Strawberries, Preserves |
| Enquiry Form | Name, Email, Company, Message — submits via mailto |

### Contact (`/contact`) — `src/app/contact/content.tsx`

Two-column layout:

| Column | Content |
|--------|---------|
| Left | Contact form: Name, Email, Subject, Message (mailto submission) |
| Right | 3 office cards with addresses and email contacts |

**Office Locations:**
- Bangkok HQ: 327/50, Kriz Town-4, Thairaman Road, Bangkok 10510
- Japan Office: 18-9-5 Chome, Nakakasai, Edogawa-ku, Tokyo
- Singapore Office: 10 Anson Road, #09-01 International Plaza, Singapore 079903

---

## Components

### Layout Components

#### `Navbar.tsx` — `src/components/layout/Navbar.tsx`

Fixed top navigation bar with scroll-responsive behavior.

| Feature | Description |
|---------|-------------|
| Scroll transformation | Transparent background → dark navy with backdrop blur on scroll |
| Logo | SVG logo with "E.A. ELITE" brand text |
| Navigation links | 8 links (Home, About, Group, Trading, Hospitality, Plantation, Japan, Contact) — desktop only |
| Active indicator | Gold pill that animates to the active nav link position using GSAP |
| Language toggle | EN/JA buttons switching the site language |
| Contact CTA | Gold button linking to contact page (desktop only) |
| Hamburger menu | Opens `FullscreenMenu` on mobile |

#### `FullscreenMenu.tsx` — `src/components/layout/FullscreenMenu.tsx`

Mobile fullscreen overlay menu (z-index 50).

| Feature | Description |
|---------|-------------|
| Background | Animated gradient with blur effect |
| Close button | Top-right X button |
| Menu items | 8 numbered links (01–08) with active dot indicator |
| Hover effects | Arrow icon appears on hover, smooth transitions |
| Entrance animation | GSAP stagger animation for all menu items |
| Footer | Copyright text and contact email |

#### `SectionTag.tsx` — `src/components/layout/SectionTag.tsx`

Reusable section label component. Renders a gold horizontal line followed by uppercase tracking-wide text. Accepts a `labelKey` prop for translation lookup.

#### `SectionDots.tsx` — `src/components/layout/SectionDots.tsx`

Fixed left-side navigation dots visible on extra-large screens (xl+).

| Feature | Description |
|---------|-------------|
| Position | Fixed, left side, vertically centered |
| Dots | One per section, gold when active, transparent otherwise |
| Labels | Appear on hover next to each dot |
| Context | Uses `NavigationContext` for active section tracking |

#### `Footer.tsx` — `src/components/layout/Footer.tsx`

Dark footer section with gold top border.

| Feature | Description |
|---------|-------------|
| Left column | Company name + tagline ("Bridging Together to Prosperity") |
| Right column | Country list: Thailand, Japan, Singapore, Myanmar |
| Bottom row | Copyright notice + contact emails |

### Home Page Sections

#### `HeroSection.tsx` — `src/components/home/HeroSection.tsx`

Full-height hero section with complex animations.

| Feature | Description |
|---------|-------------|
| Background | Dark gradient with subtle grid pattern overlay |
| Title animation | "E.A. Elite" characters animate in one-by-one with rotation |
| Subtitle | "Trading Group" fades in with gold color |
| Division cycling | Text cycles through divisions every 2.5 seconds |
| Stats grid | 4-column grid showing Years, Staff, Exported, Customers |
| CTA buttons | "Japan Expansion" (primary) + "Learn More" (secondary) |
| Scroll hint | Bouncing arrow at bottom with "SCROLL TO EXPLORE" text |

#### `MissionSection.tsx` — `src/components/home/MissionSection.tsx`

Company overview section with scroll-reveal animations. Contains a `SectionTag`, heading, body paragraph, and "Who We Are" CTA button.

#### `DivisionCarousel.tsx` — `src/components/home/DivisionCarousel.tsx`

Interactive 3D flip card grid displaying all 6 business divisions.

| Feature | Description |
|---------|-------------|
| Layout | Responsive grid: 1 column (mobile) → 2 columns (sm) → 3 columns (md+) |
| 3D effect | Mouse-tracking tilt with `perspective(800px)` on desktop |
| Flip animation | Cards flip 180° on hover (desktop) or click (touch devices) |
| Front face | Division number, emoji icon, name, "Tap to explore" hint, glare effect |
| Back face | Icon, colored division name, description, "Explore →" link |
| Shadows | Dynamic colored shadows based on each division's accent color |
| Colors | Each division has a unique accent: Gold, Coral, Blue, Purple, Teal, Green |

**6 Divisions:**
1. Agricultural Trading
2. Seafood Trading
3. Minerals & Metals
4. Budget Hotels
5. Restaurant & F&B
6. Plantation Agriculture

#### `StatsCounter.tsx` — `src/components/home/StatsCounter.tsx`

Animated number counter section.

| Stat | Value | Format |
|------|-------|--------|
| Years of Experience | 25+ | Number |
| Team Members | 160 | Number |
| Tons Exported | 100,000+ | "100K+" |
| Tons Imported | 15,000+ | "15K+" |
| Customers Served | 10,000+ | "10K+" |
| Countries | 5 | Number |

Animation: Numbers count up from 0 to target value on scroll using GSAP with ScrollTrigger.

#### `JapanCTA.tsx` — `src/components/home/JapanCTA.tsx`

Japan expansion teaser section with 3 objective cards (Strategic Partners, Investors, B2B), 6 product tags, and a CTA button linking to `/japan`.

### UI Components

#### `Button.tsx` — `src/components/ui/Button.tsx`

Polymorphic button component.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Button content |
| `href` | string (optional) | If provided, renders as Next.js `Link` |
| `variant` | `'primary'` \| `'secondary'` | Primary: gold bg, navy text. Secondary: border, gold text |
| `onClick` | function (optional) | Click handler (button mode) |
| `className` | string (optional) | Additional CSS classes |
| `type` | string (optional) | Button type attribute |

#### `GlassCard.tsx` — `src/components/ui/GlassCard.tsx`

Frosted glass effect card wrapper. Applies the `.glass-card` CSS class (3% white background, 10px blur, gold border). Accepts `children` and optional `className`.

---

## Context Providers

### `LanguageContext.tsx` — `src/context/LanguageContext.tsx`

Manages bilingual support (English/Japanese).

| Export | Type | Description |
|--------|------|-------------|
| `LanguageProvider` | Component | Wraps app with language state |
| `useLanguage()` | Hook | Access language utilities |
| `locale` | `'en'` \| `'ja'` | Current language |
| `setLocale(locale)` | Function | Switch language |
| `t(key)` | Function | Get translated string by key |

- Loads translations from `src/data/translations/en.json` and `ja.json`
- Syncs `lang-ja` class on `<body>` when Japanese is active
- Falls back to English if a Japanese translation key is missing

### `NavigationContext.tsx` — `src/context/NavigationContext.tsx`

Tracks the currently active section for sidebar dot navigation.

| Export | Type | Description |
|--------|------|-------------|
| `NavigationProvider` | Component | Wraps app with navigation state |
| `useNavigation()` | Hook | Access navigation utilities |
| `activeSection` | string | Currently active section ID (default: `'hero'`) |
| `setActiveSection(id)` | Function | Update active section |

---

## Translations (i18n)

Translation files are located in `src/data/translations/`:

| File | Language | Keys |
|------|----------|------|
| `en.json` | English | 200+ keys |
| `ja.json` | Japanese | 200+ keys |

### Key Namespaces

| Namespace | Example Key | Usage |
|-----------|-------------|-------|
| `nav.*` | `nav.home` | Navigation menu items |
| `hero.*` | `hero.title` | Hero section content |
| `about.*` | `about.heading` | About section |
| `divisions.*` | `divisions.1.name` | Division carousel cards |
| `numbers.*` | `numbers.years` | Stats counter labels |
| `japan.*` | `japan.heading` | Japan expansion page |
| `whoweare.*` | `whoweare.founder.name` | Who We Are page |
| `trading.*` | `trading.agri.maize.title` | Trading page products |
| `hospitality.*` | `hospitality.hotels.title` | Hospitality page |
| `plantation.*` | `plantation.strawberries.title` | Plantation page |
| `group.*` | `group.ea.th.name` | Group page companies |
| `contact.*` | `contact.form.name` | Contact page |
| `footer.*` | `footer.tagline` | Footer text |

---

## Hooks

### `useIntersectionObserver.ts` — `src/hooks/useIntersectionObserver.ts`

Custom hook for scroll-based section detection.

| Parameter | Type | Description |
|-----------|------|-------------|
| `sectionIds` | `string[]` | Array of section element IDs to observe |

Uses the Intersection Observer API with a 0.3 threshold to detect when sections enter the viewport and updates the active section via `NavigationContext`.

---

## Styling & Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-900` | `#0C1428` | Primary background |
| `navy-800` | `#132142` | Secondary background |
| `navy-700` | `#1C3264` | Elevated surfaces |
| `navy-600` | `#254585` | Borders, accents |
| `gold-500` | `#C5A55A` | Primary accent |
| `gold-400` | `#D4BA7A` | Secondary accent |
| `gold-300` | `#E8D5A0` | Light accent |
| `gold-100` | `#F5EDD8` | Subtle accent |
| `text-primary` | `#E8ECF2` | Main text color |
| `text-secondary` | `#9BAAB8` | Muted text |

### Typography

| Font | Variable | Usage |
|------|----------|-------|
| Cormorant Garamond | `--font-cormorant-garamond` | Headings, display text |
| DM Sans | `--font-dm-sans` | Body text, UI elements |
| Noto Sans JP | `--font-noto-sans-jp` | Japanese text support |

### CSS Utility Classes (defined in `globals.css`)

| Class | Description |
|-------|-------------|
| `.section-tag` | Gold horizontal line with uppercase label text |
| `.glass-card` | Frosted glass effect: 3% white bg, 10px blur, gold border |
| `.gold-glow` | Gold text shadow for emphasis |
| `.perspective-container` | 3D perspective container (800px) |

### Responsive Breakpoints

| Breakpoint | Width | Common Usage |
|------------|-------|--------------|
| (default) | 0px+ | Single column, compact spacing |
| `sm` | 640px+ | 2-column grids, increased padding |
| `md` | 768px+ | 3-column grids, medium spacing |
| `lg` | 1024px+ | 2-column layouts, desktop nav |
| `xl` | 1280px+ | Section dots visible, max-width containers |

### Animation Patterns

All animations use GSAP with the ScrollTrigger plugin:

| Pattern | Trigger | Description |
|---------|---------|-------------|
| `.reveal` class | Scroll (85% viewport) | Fade up from 30px below, 0.7s duration |
| Stagger reveal | Scroll | Sequential delay (0.1s between items) |
| Counter animation | Scroll | Numbers count from 0 to target |
| Card flip | Hover/Click | 180° Y-axis rotation with 3D perspective |
| Mouse tilt | Mouse move | Real-time 3D rotation following cursor |
| Horizontal scroll | Scroll (pinned) | Content scrolls horizontally as user scrolls vertically |
| Character entrance | Page load | Title characters animate in with rotation |

---

## Configuration Files

### `next.config.ts`

Minimal Next.js configuration using framework defaults.

### `tsconfig.json`

- Target: ES2017
- JSX: preserve (Next.js requirement)
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Bundler module resolution

### `postcss.config.mjs`

Tailwind CSS PostCSS plugin configuration.

### `eslint.config.mjs`

- Extends: Next.js core web vitals + TypeScript rules
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

---

## Deployment

The project can be deployed on any platform supporting Next.js:

```bash
# Build for production
npm run build

# Start production server
npm start
```

For Vercel deployment, connect the repository and deploy automatically.
