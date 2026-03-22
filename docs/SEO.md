# Smart Healthcare AI — SEO Strategy

This document outlines the Search Engine Optimization strategy implemented during the Next.js migration.

## 1. Metadata Strategy Overview

The application utilizes Next.js's Metadata API to inject static logic into `<head>` per route, omitting the manual, client-side overrides present in the legacy React SPA. Subpages inherit the `title.template` from the Root Layout.

```javascript
// Root Layout Metadata Base
metadataBase: new URL('https://smart-healthcare-ai.vercel.app'),
title: {
  template: '%s | Smart Healthcare AI',
  default: 'AI Skin Condition Analysis | Smart Healthcare AI',
}
```

## 2. Per-Page Metadata Table

| Page / Route Group | Metadata Type | Title Pattern | Robots | Structured / Custom Data |
|---|---|---|---|---|
| **Root layout** | Static template | `%s \| Smart Healthcare AI` | — | Open Graph Default SiteName |
| **`/` (home)** | Static | `AI Skin Condition Analysis` | index, follow | Webpage description |
| **`/about`** | Static | `About` | index, follow | Mission statement description |
| **`/features`** | Static | `Key Features` | index, follow | Tooling description |
| **`404`** | Static | `Page Not Found` | noindex | — |

## 3. Open Graph Setup and Default Image

Open Graph (OG) elements are mapped inside `web/src/app/layout.js`. A `metadataBase` property resolves the relative OG paths correctly across indexing engines.

```javascript
openGraph: {
  type: 'website',
  locale: 'en_US',
  siteName: 'Smart Healthcare AI',
  title: 'Smart Healthcare AI — AI Skin Condition Analysis',
  description: 'Upload a skin image for instant AI-powered classification. Built with ResNet-50 v2 deep learning model.',
}
```

*(Note: There is no default OG image specified as the legacy repository lacked distinct social share graphics beyond UI screenshots.)*

## 4. Canonical URL Strategy

Canonical paths are inherently derived by crawlers relative to the specified `metadataBase: new URL('https://smart-healthcare-ai.vercel.app')` inside `layout.js`.

## 5. `sitemap.xml`

Next.js natively builds the sitemap dynamically out of `sitemap.js`, exporting the defined array of all three principal routes `/`, `/about`, and `/features`. Since this application does not use dynamic routing slugs like `/blog/[slug]`, the mapping is entirely static and set to a `monthly` change frequency priority.

## 6. `robots.txt`

Outputted programmatically via `robots.js`. It universally permits indexing of all standard public routes because the tool does not rely on private, paginated, or authenticated states. It targets `sitemap.xml` at `https://smart-healthcare-ai.vercel.app/sitemap.xml`. The `not-found.js` file handles explicit `noindex` directives for unrecognized locations.

## 7. Structured Data

Because the original app was a pure visual implementation without heavy text payloads or distinct entity relationships, semantic HTML additions took priority over manual `application/ld+json` schema drops. Elements have been structured using explicit `<main>`, `<header>`, `<nav>`, and `<article>` tags corresponding natively to SEO indexing structures.

## 8. Core Web Vitals Improvements

*   **`next/image`:** SVGs previously sourced as active React bundles via Vite build plugins have been shifted physically to `/public/` and are rendered using optimized HTML `src` calls, dropping significant JavaScript runtime payload.
*   **`next/font`:** Replaced the layout-shifting device system font stack with deterministic API loading (via variable CSS font mappings of `Inter`).
*   **Server Component Caching:** Unchanging text layouts like `/features` and `/about` are streamed from static server cache rather than executing component hydrates over user devices.
