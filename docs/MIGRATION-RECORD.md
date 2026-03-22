# Migration Record

This document is the authoritative record of the migration of Smart Healthcare AI from a React + Vite Single Page Application (SPA) to Next.js 16 with the App Router.

## Context

The original application was a single-page React app bundled with Vite. It used a tab-based navigation system (`useState` toggling components) rather than a real router, meaning URLs did not change, pages could not be linked to directly, and SEO was impossible. The migration to Next.js 16 was undertaken to provide indexable routes, optimise performance via Server Components, upgrade to Tailwind v4, and establish a robust foundation for future features, while maintaining the existing polyglot structure (Python ML tools at the repository root).

## Technology Changes

| Original               | New                     | Reason for Change                                        |
|------------------------|-------------------------|----------------------------------------------------------|
| React 18 / Vite 6      | React 19 / Next.js 16   | App Router, Server Components, file-system routing       |
| Tab-based `useState` nav | Next.js App Router    | Real URLs (`/`, `/about`, `/features`), direct linking, SEO |
| Tailwind CSS v3        | Tailwind CSS v4          | CSS-first configuration (`@import "tailwindcss"`, `@theme`) |
| Standard `<img>` tags  | `next/image`             | Automatic optimisation, lazy loading, LCP priority       |
| System font stack      | `next/font/google`       | Zero layout shift, preloaded Inter font                  |
| `<ErrorBoundary>` (Class) | `error.js`            | Built-in Next.js App Router error handling convention    |
| Hardcoded `<title>`    | Metadata API             | Route-specific titles and Open Graph data                |
| Unused dependencies    | Removed                  | MUI, Emotion, Radix UI, and Axios were installed but never imported |

## Route Mapping

The single-page tab system was expanded into three distinct routes:

| Original                      | Next.js File Path              | Render Strategy  | Notes                                                    |
|-------------------------------|--------------------------------|------------------|----------------------------------------------------------|
| `activeTab === 'upload'`      | `web/src/app/page.js`          | Client-rendered  | Gradio client + prediction are 100% client-side. Page shell is server-rendered, Upload component requires `'use client'`. |
| `activeTab === 'about'`       | `web/src/app/about/page.js`    | Static (SSG)     | Pure static content — no data fetching, no interactivity.|
| `activeTab === 'features'`    | `web/src/app/features/page.js` | Static (SSG)     | Pure static content — static feature cards.              |

## Environment Variables

The original project had zero environment variables. The HuggingFace Space URL (`theodinproject/skin_cancer_model_resnet50v2`) was hardcoded in `App.jsx` and remains hardcoded in `Upload.jsx` because it is a public API endpoint.

| Original Variable | New Variable           | Scope  | Justification                                                |
|-------------------|------------------------|--------|--------------------------------------------------------------|
| *(none)*          | `NEXT_PUBLIC_APP_URL`  | Public | Needed for `metadataBase` in layout metadata for absolute OG URLs. |

## Data Fetching Changes

There were no server-side data fetching patterns in the original app.

| Original Pattern                  | Next.js Equivalent                | Justification                                                |
|-----------------------------------|-----------------------------------|--------------------------------------------------------------|
| `Client.connect()` in `App.jsx` `useEffect` | Moved to `Upload.jsx` `useEffect` | `@gradio/client` operates via WebSockets in the browser. Cannot run in Server Components. Moved closer to usage. |
| `model.predict()` on button click | Remains client-side in `Upload.jsx` | User-initiated file upload requires browser APIs (`File`, `FormData`) and the initialised Gradio client. |

## Component Changes

- **Header** — Converted to client component using `next/link`, `usePathname()`, and `framer-motion` for active navigation indicators.
- **About, Features, FeatureCard** — Repurposed as pure Server Components. No logic changes, only Tailwind class adjustments.
- **Navigation** — Absorbed into Header. Uses `usePathname()` for real routing and active state detection.
- **Upload** — Became the primary interactive Client Component, absorbing the Gradio model connection `useEffect` that previously lived in `App.jsx`. Added comprehensive accessibility attributes (ARIA roles, keyboard handlers).
- **Footer** — Migrated to `next/image` for all SVG logos. Server Component — no `'use client'` directive needed.
- **ErrorBoundary.jsx** — Deleted. Replaced entirely by Next.js `error.js` convention.

## Non-JavaScript Asset Decisions

| Asset / Directory | Current Role                | Decision             | Justification                                                |
|-------------------|-----------------------------|----------------------|--------------------------------------------------------------|
| `model/`          | Python ML training & utils  | Stays at repo root   | Next.js does not run Python. Independent tooling.            |
| `images/`         | README screenshots          | Stays at repo root   | Referenced by root `README.md` for documentation.            |
| `src/assets/*.svg` | Logo SVGs                  | Moved to `web/public/` | Served statically rather than bundled via JS imports.       |

## Breaking Changes

- **Routing** — Navigating the app now changes the URL. Users can bookmark specific pages (e.g., `/features`), which was previously impossible.
- **Build Output** — The build produces a Next.js `.next` folder instead of a Vite `dist` folder.

## Performance Improvements

- **Bundle Size** — Removed over 5 unused heavy dependencies (MUI, Emotion, etc.). Replaced SVG JS imports with static public URLs.
- **Font Loading** — Migrated from a blocking system font stack to `next/font/google` (Inter) with `display: swap`, eliminating layout shift.
- **Image Optimisation** — Migrated raw `<img>` tags to `next/image` for WebP generation and proper sizing.

## SEO Improvements

- **Real URLs** — Established indexable URLs for all three routes.
- **Metadata API** — Implemented comprehensive metadata including Title Templates, Open Graph data, and Twitter Cards across all pages.
- **Sitemap and Robots.txt** — Implemented `sitemap.js` and `robots.js` exposing the three public routes to search engines.
- **Semantic HTML** — Added `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>` elements with ARIA attributes.
