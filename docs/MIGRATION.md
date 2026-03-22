# Smart Healthcare AI — Migration Record

This document is the authoritative record of the migration of the Smart Healthcare AI project from a React + Vite Single Page Application (SPA) to Next.js 16 with the App Router.

## 1. Context

The original application was a single-page React app bundled with Vite. It used a tab-based navigation system (`useState` toggling components) rather than a real router, meaning URLs did not change, pages could not be linked to directly, and SEO was impossible. The migration to Next.js 16 was undertaken to provide indexable routes, optimize performance via Server Components, upgrade to Tailwind v4, and establish a robust foundation for future full-stack features, while maintaining the existing polyglot structure (Python ML tools at the repo root).

## 2. Technology Changes

| Original | New | Reason for Change |
|---|---|---|
| React 18 / Vite 6 | React 19 / Next.js 16 | App Router, Server Components, file-system routing |
| Tab-based `useState` nav | Next.js App Router | Real URLs (`/`, `/about`, `/features`), direct linking, SEO |
| Tailwind CSS v3 | Tailwind CSS v4 | CSS-first configuration (`@import "tailwindcss"`, `@theme`) |
| Standard `<img>` tags | `next/image` | Automatic optimization, lazy loading, LCP priority |
| System font stack | `next/font/google` | Zero layout shift, preloaded Inter font |
| `<ErrorBoundary>` (Class) | `error.js` | Built-in Next.js App Router error handling convention |
| Hardcoded `<title>` | Metadata API | Route-specific titles and Open Graph data |
| Unused dependencies | *Removed* | The original repo had MUI, Emotion, Radix UI, and Axios installed but never imported. These were removed to reduce bloat. |

## 3. Route Mapping Table

The single-page tab system was expanded into three distinct routes:

| Original Path | Original Component | Next.js File Path | Render Strategy | Notes |
|---|---|---|---|---|
| `activeTab === 'upload'` | `<Upload>` | `web/src/app/page.js` | Client-rendered | The Gradio client connection and prediction are 100% client-side. The page shell is server-rendered, but the `Upload` component requires `"use client"`. |
| `activeTab === 'about'` | `<About>` | `web/src/app/about/page.js` | Static (SSG) | Pure static content — no data fetching, no interactivity. |
| `activeTab === 'features'` | `<Features>` | `web/src/app/features/page.js` | Static (SSG) | Pure static content — static feature cards. |

## 4. Environment Variable Rename Table

The original project had **zero** environment variables. The HuggingFace space URL (`theodinproject/skin_cancer_model_resnet50v2`) was hardcoded in `App.jsx` and remains hardcoded in `Upload.jsx` because it is a public API endpoint.

| Original Variable | New Variable | Scope | Justification |
|---|---|---|---|
| *(none)* | `NEXT_PUBLIC_APP_URL` | Public | New variable needed for `metadataBase` in the layout metadata config to enable absolute Open Graph URLs. |

## 5. Data Fetching Changes

There were no server-side data fetching patterns in the original app.

| Original Pattern | Next.js Equivalent | Justification |
|---|---|---|
| `Client.connect()` in `App.jsx` `useEffect` | Moved to `Upload.jsx` `useEffect` | The `@gradio/client` operates via WebSockets/fetch in the browser. It cannot run in Server Components. It was moved into the `Upload` component closer to where it is used. |
| `model.predict()` on button click | Remains client-side in `Upload.jsx` | User-initiated file upload and prediction requires accessing browser APIs (`File`, `FormData`) and the initialized Gradio client. |

## 6. Component Changes

- **Header, About, Features, FeatureCard**: Repurposed as pure Server Components. No changes to logic, just standard Next.js `className` adjustments.
- **Navigation**: Converted to use `next/link` and `usePathname` for real routing and active state detection, requiring the `"use client"` directive.
- **Upload**: Became the primary interactive Client Component, absorbing the Gradio model connection `useEffect` that previously lived in `App.jsx`. Added comprehensive accessibility attributes (ARIA roles, keyboard handlers).
- **Footer**: Migrated to `next/image` for all SVG logos. Retained `framer-motion` and `lucide-react`, requiring the `"use client"` directive.
- **ErrorBoundary.jsx**: Deleted. Replaced entirely by Next.js `error.js` convention.

## 7. Non-JavaScript Asset Decisions

The repository is a polyglot monorepo containing Python machine learning code.

| Asset / Directory | Current Role | Decision | Justification |
|---|---|---|---|
| `model/` | Python ML training & utilities | Stays at repo root | Next.js does not run Python. Independent tooling for model training. |
| `images/` | README screenshots | Stays at repo root | Referenced by root `README.md` for documentation. |
| `src/assets/*.svg` | Logo SVGs | Moved to `web/public/` | Served statically in Next.js rather than bundled via JS imports, significantly reducing JS bundle size. |

## 8. Breaking Changes

- **Routing:** Navigating the app now changes the URL. Users can now bookmark specific pages (e.g., `/features`), which was previously impossible.
- **Build Output:** The build now produces a Next.js `.next` folder instead of a static Vite `dist` folder.

## 9. Performance Improvements

- **Bundle Size:** Removed over 5 unused heavy dependencies (MUI, Emotion, etc.). Replaced SVG JS imports with static public URLs.
- **Font Loading:** Migrated from a blocking system font stack to `next/font/google` (Inter) with `display: swap`, eliminating layout shift and render-blocking requests.
- **Image Optimization:** Migrated raw `<img>` tags to `next/image` for WebP generation and proper sizing.

## 10. SEO Improvements

- **Real URLs:** Established indexable URLs.
- **Metadata API:** Implemented comprehensive metadata including Title Templates, Open Graph data, and Twitter Cards across all pages.
- **Sitemap & Robots.txt:** Implemented `sitemap.js` and `robots.js` exposing the three public routes to search engines.
- **Structured Data:** Added semantic HTML and ARIA attributes (e.g., on the custom drag-and-drop Upload area).
