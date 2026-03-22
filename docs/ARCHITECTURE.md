# Smart Healthcare AI — Architecture

This document describes the design principles and architecture of the Smart Healthcare AI Next.js application, derived from the migration of a React+Vite Single Page Application.

## Architecture Overview

**Smart Healthcare AI** is built on a simple Client-Server architecture, but notably lacks a traditional backend or database. The front-end leverages the **Next.js 16 App Router** to serve dynamic and static content. The "backend" logic heavily relies on retrieving predictive data dynamically from an external **HuggingFace** Model API directly from client-side code.

### Repository Layout

The repository is structured logically to distinguish between web resources and Machine Learning artifacts.

*   `model/`
    *   Serves entirely independently of the Next.js application.
    *   Contains Python ML utility scripts (training, model conversions, PIL image handlers).
    *   *Decision constraints:* Next.js cannot execute Python code; thus, these tools must remain purely for developer infrastructure and offline use.
*   `web/`
    *   Holds the complete Next.js 16 structure replacing the legacy root React application.
    *   Contains routing (`app/`), user interfaces (`components/`), styles (`styles/`), and static assets (`public/`).
*   `images/`
    *   Preserves static markdown documentation screenshots at the root folder so repository-level documents remain intact.

### Component Map

Components within `web/src/components/` adhere strictly to Next.js Client/Server boundary logic natively introduced by React Server Components (RSC):

*   **Server Components** (No `"use client"`):
    *   `FeatureCard.jsx`: Statutorily presentation-only card element. No browser dependencies.
    *   `Header.jsx`: Pure UI gradient typography. No interactions needed.
    *   `Results.jsx`: Nested under a client component; evaluates implicitly as cross-compatible static component but inherits JS client behavior natively based on its `Upload` wrapper.

*   **Client Components** (`"use client"` prefix used proactively):
    *   `Footer.jsx`: Features complex `framer-motion` variant animations and custom JavaScript hooks directly tied to interaction tracking (i.e., Framer logic requires client runtime).
    *   `Navigation.jsx`: Subscribes contextually to the browser-side Window API implicitly through `usePathname()` native to specific navigation boundaries.
    *   `Upload.jsx`: The core engine of this application. Includes form handling event hooks (`onChange`, `onDrop`), local file preview APIs (`URL.createObjectURL()`), complex `useState` mapping, and integrates directly with `@gradio/client` websockets to stream image binary data.

### External API Connection (Gradio)

There are no backend REST or GraphQL layers configured in Next.js (i.e., no route handlers in `web/src/app/api`). The external connection operates exclusively inside the users browser runtime:

1.  **Mount connection**: The `Upload.jsx` runs an effect loop configuring a continuous runtime `Client.connect("theodinproject/skin_cancer_model_resnet50v2")` connection to HuggingFace.
2.  **Submit binary**: Upload dispatches image data specifically triggering `/predict` API paths over secure connections managed entirely by Gradio context.
3.  **Result Render**: `predictionResult.data[0]` yields accuracy/disease categories immediately assigned backward up to stateful UI parameters.
