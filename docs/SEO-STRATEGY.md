# SEO Strategy

This document outlines the Search Engine Optimization implementation in the Smart Healthcare AI Next.js 16 application.

## Metadata Strategy

The application uses the Next.js Metadata API to inject static metadata into `<head>` per route. Subpages inherit the `title.template` from the root layout, producing consistent title patterns across all pages.

```javascript
// Root Layout — web/src/app/layout.js
metadataBase: new URL('https://smart-healthcare-ai.vercel.app'),
title: {
  template: '%s | Smart Healthcare AI',
  default: 'AI Skin Condition Analysis | Smart Healthcare AI',
}
```

## Per-Page Metadata

| Route        | Title                           | Description                                              | Robots          |
|--------------|---------------------------------|----------------------------------------------------------|-----------------|
| `/`          | AI Skin Condition Analysis      | Upload a skin image for instant AI-powered classification. Smart Healthcare AI uses a ResNet-50 v2 model for accurate skin condition analysis. | index, follow |
| `/about`     | About                           | Learn about Smart Healthcare AI — an advanced medical imaging platform that uses ResNet-50 v2 to assist in skin condition diagnosis. | index, follow |
| `/features`  | Key Features                    | Explore the key features of Smart Healthcare AI — AI-powered analysis, multi-condition detection, intuitive UX, and secure processing. | index, follow |
| 404          | Page Not Found                  | —                                                        | noindex, nofollow |

## Open Graph

Open Graph metadata is defined in the root layout (`web/src/app/layout.js`). The `metadataBase` property resolves relative OG paths correctly across indexing engines.

```javascript
openGraph: {
  type: 'website',
  locale: 'en_US',
  siteName: 'Smart Healthcare AI',
  title: 'Smart Healthcare AI — AI Skin Condition Analysis',
  description: 'Upload a skin image for instant AI-powered classification. Built with ResNet-50 v2 deep learning model.',
}
```

There is no default Open Graph image configured. The project does not include a dedicated social share graphic.

## Twitter Card

```javascript
twitter: {
  card: 'summary_large_image',
  title: 'Smart Healthcare AI',
  description: 'AI-powered skin condition analysis for better healthcare decisions.',
}
```

## Canonical URLs

Canonical paths are derived by crawlers relative to the `metadataBase` value (`https://smart-healthcare-ai.vercel.app`). No explicit `canonical` metadata is set per route.

## Sitemap

Defined in `web/src/app/sitemap.js`. The sitemap exports the three public routes with `monthly` change frequency:

| URL                                            | Priority | Change Frequency |
|------------------------------------------------|----------|------------------|
| `https://smart-healthcare-ai.vercel.app`       | 1.0      | monthly          |
| `https://smart-healthcare-ai.vercel.app/about` | 0.8      | monthly          |
| `https://smart-healthcare-ai.vercel.app/features` | 0.8   | monthly          |

The `lastModified` field is set to the current date at build time.

## Robots.txt

Defined in `web/src/app/robots.js`. Permits all user agents to crawl all routes:

```
User-agent: *
Allow: /
Sitemap: https://smart-healthcare-ai.vercel.app/sitemap.xml
```

The `not-found.js` page sets `robots: { index: false, follow: false }` to prevent indexing of 404 pages.

## Semantic HTML

The application uses semantic HTML elements for SEO structure:

- `<html lang="en">` on the root element
- `<header>` wrapping the navigation
- `<nav>` with `aria-label="Main navigation"`
- `<main id="main-content">` wrapping page content
- `<footer>` wrapping the site footer
- `<section>` with `aria-label` attributes for content regions
- Skip navigation link (`<a href="#main-content">`) for accessibility

No `application/ld+json` structured data is implemented. Semantic HTML was prioritized over JSON-LD schema.

## Progressive Web App

A `manifest.json` file in `web/src/app/manifest.json` enables PWA installation:

| Property           | Value                                          |
|--------------------|------------------------------------------------|
| `name`             | Smart Healthcare AI — AI Skin Condition Analysis |
| `short_name`       | Smart Healthcare AI                            |
| `theme_color`      | `#0B1120`                                      |
| `background_color` | `#0B1120`                                      |
| `display`          | `standalone`                                   |
| Icons              | 192x192 and 512x512 PNG with `maskable` purpose|

## Core Web Vitals Optimizations

- **`next/image`** — SVG assets in `/public/` are served as optimized static files, eliminating JavaScript runtime payload from bundled imports.
- **`next/font`** — Inter font loaded with `display: swap` and CSS variable binding, preventing layout shift and render-blocking requests.
- **Server Components** — Static pages (`/about`, `/features`) are fully server-rendered and streamed from cache, avoiding client-side hydration overhead.
- **Turbopack** — Development server uses Turbopack for faster rebuilds.
