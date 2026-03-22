# Tech Stack

Smart Healthcare AI uses a modern JavaScript frontend stack with no backend. The technology choices prioritise developer experience, performance, and accessibility for a client-side medical imaging tool.

## Core Stack

| Layer     | Technology             | Version   | Purpose                                                   |
|-----------|------------------------|-----------|-----------------------------------------------------------|
| Language  | JavaScript (JSX)       | ES2022+   | Primary application language                              |
| Language  | Python                 | 3.x       | Offline ML training scripts in `model/`                   |
| Runtime   | Node.js                | ≥ 18.17   | Development server and build tooling                      |
| Framework | Next.js                | 16.2.1    | App Router, file-system routing, SSG, SSR, SEO metadata   |
| UI        | React                  | 19.2.4    | Component model, Server Components, client interactivity  |
| Styling   | Tailwind CSS           | 4.x       | Utility-first CSS with `@theme inline` design tokens      |

## Frontend Stack

| Category         | Technology             | Version   | Purpose                                                   |
|------------------|------------------------|-----------|-----------------------------------------------------------|
| UI Framework     | React                  | 19.2.4    | Component rendering and state management                  |
| Styling          | Tailwind CSS v4        | 4.x       | CSS-first configuration via `@import "tailwindcss"`       |
| CSS Processing   | PostCSS                | —         | Processes Tailwind via `@tailwindcss/postcss` plugin      |
| Animation        | Framer Motion          | 12.38.0   | Animated active indicator in navigation                   |
| Animation (CSS)  | Custom keyframes       | —         | fade-in-up, scale-in, shimmer, spin — zero JS overhead   |
| Smooth Scrolling | Lenis                  | 1.3.19    | Smooth scroll interpolation via `ReactLenis`              |
| Icons            | Lucide React           | 0.577.0   | Tree-shakeable SVG icon library                           |
| Typography       | Inter (Google Fonts)   | —         | Loaded via `next/font/google` with `display: swap`        |
| AI Client        | @gradio/client         | 2.1.0     | WebSocket client for Hugging Face Spaces inference        |

## ML / Training Stack

| Category         | Technology             | Notes                                                     |
|------------------|------------------------|-----------------------------------------------------------|
| Framework        | TensorFlow 2.x         | Used for training the ResNet-50 v2 model                  |
| Image Processing | Pillow (PIL)           | Image validation and compression in `model/tools/`        |
| Inference Client | gradio_client (Python) | Used in `model/utils/preprocess.py` for inference testing |
| Model Host       | Hugging Face Spaces    | Hosts the deployed Gradio application                     |

## Developer Tooling

| Category  | Technology             | Version   | Purpose                                                   |
|-----------|------------------------|-----------|-----------------------------------------------------------|
| Build     | Next.js + Turbopack    | 16.2.1    | Development server with fast refresh                      |
| Lint      | ESLint                 | 9.x       | Code quality with `eslint-config-next/core-web-vitals`    |
| Format    | —                      | —         | No formatter configured                                   |
| CI/CD     | —                      | —         | No pipeline configured                                    |

## Infrastructure

| Category       | Technology    | Notes                                                       |
|----------------|---------------|-------------------------------------------------------------|
| Hosting        | Vercel        | Production deployment via Git integration                   |
| CDN            | Vercel Edge   | Automatic edge caching for static assets                    |
| Model Hosting  | Hugging Face  | Gradio Space at `theodinproject/skin_cancer_model_resnet50v2`|
| Container      | —             | No Docker configuration                                     |
| Cloud / IaC    | —             | No infrastructure-as-code tooling                           |

## Version Requirements

| Tool    | Minimum Version | Source                                   |
|---------|-----------------|------------------------------------------|
| Node.js | 18.17           | Required by Next.js 16                   |
| npm     | 9               | Included with Node.js 18+               |
| Python  | 3.8+            | Required for TensorFlow in `model/`     |
