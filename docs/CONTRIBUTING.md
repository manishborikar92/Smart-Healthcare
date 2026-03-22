# Contributing

Contributions are welcome via pull requests and issues on GitHub.

## Development Setup

Follow [GETTING-STARTED.md](./GETTING-STARTED.md) to set up the development environment.

## Workflow

1. Fork the repository
2. Create a feature branch from `main`
3. Make changes in the `web/` directory for frontend work or `model/` for ML work
4. Ensure the linter passes:

```bash
cd web
npm run lint
```

5. Verify the build succeeds:

```bash
npm run build
```

6. Open a pull request against `main`

## Code Style

This project uses ESLint with the `eslint-config-next/core-web-vitals` configuration for code quality. No separate code formatter (Prettier, etc.) is configured.

Run the linter:

```bash
cd web
npm run lint
```

Key conventions observed in the codebase:

- **Component files** — `.jsx` extension for components, `.js` for pages and configuration
- **Component organisation** — Components are grouped by concern under `src/components/`:
  - `layout/` — Header, Footer, SmoothScroll
  - `features/` — Upload, Results, FeatureCard
  - `ui/` — Reserved for generic UI primitives (currently empty)
- **Client components** — Only use `'use client'` when the component requires browser APIs, hooks, or event handlers
- **Imports** — Use the `@/` path alias (resolves to `./src/`) for all internal imports
- **Accessibility** — All interactive elements include ARIA attributes, keyboard handlers, and `aria-hidden="true"` on decorative icons
- **Tailwind CSS** — Use design system tokens from `globals.css` rather than arbitrary values. See [UI-DESIGN-SYSTEM.md](./UI-DESIGN-SYSTEM.md) for the full token reference
- **Semantic HTML** — Use appropriate HTML5 elements (`<section>`, `<nav>`, `<main>`, `<footer>`) with `aria-label` where applicable

## Project Structure

```
web/src/
├── app/                   # Next.js App Router (pages, layout, metadata)
│   ├── layout.js          # Root layout with global metadata and shell
│   ├── page.js            # Home page (/)
│   ├── about/page.js      # About page (/about)
│   ├── features/page.js   # Features page (/features)
│   ├── globals.css        # Design system tokens and utility classes
│   ├── error.js           # Error boundary
│   ├── loading.js         # Loading state
│   ├── not-found.js       # 404 page
│   ├── robots.js          # robots.txt generation
│   └── sitemap.js         # sitemap.xml generation
└── components/
    ├── features/          # Feature-specific components
    │   ├── Upload.jsx     # Image upload and prediction
    │   ├── Results.jsx    # Classification results display
    │   └── FeatureCard.jsx # Feature showcase card
    └── layout/            # Layout components
        ├── Header.jsx     # Navigation header
        ├── Footer.jsx     # Site footer
        └── SmoothScroll.jsx # Smooth scroll wrapper
```

## Reporting Issues

Report bugs and feature requests via [GitHub Issues](https://github.com/manishborikar92/Smart-Healthcare/issues). Include:

- Steps to reproduce the issue
- Expected behaviour
- Actual behaviour
- Browser and Node.js version
- Screenshots if applicable
