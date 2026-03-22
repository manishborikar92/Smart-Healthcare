# Smart Healthcare AI — UI Components

Every component in the redesigned UI, with props, usage examples, and accessibility notes.

---

## Layout Components

### Header (`src/components/layout/Header.jsx`)

Sticky glass-morphism navigation bar with logo, desktop navigation, and mobile hamburger drawer.

**Type:** Client Component (`'use client'` — uses `usePathname()` and `useState`)

| Prop | Type | Default | Description |
|---|---|---|---|
| *(none)* | — | — | Self-contained; reads the current route via `usePathname()` |

```jsx
// Used in root layout.js — no props needed
import Header from '@/components/layout/Header'
<Header />
```

**Navigation links:** Defined in the `navLinks` array. Each link has `href`, `label`, and `icon`.

**Accessibility:**
- `aria-label="Main navigation"` on `<nav>`
- `aria-current="page"` on the active link
- `aria-expanded` and `aria-controls` on the mobile menu toggle
- `aria-label` on the hamburger button ("Open menu" / "Close menu")
- Logo has `aria-label="Smart Healthcare AI — Home"`

**Responsive behaviour:**
- Desktop (md+): Horizontal pill-style nav links
- Mobile (<md): Hamburger button → slide-down glass drawer

---

### Footer (`src/components/layout/Footer.jsx`)

Server Component with 3-column info grid, tech badges, and medical disclaimer.

**Type:** Server Component (no directive needed)

| Prop | Type | Default | Description |
|---|---|---|---|
| *(none)* | — | — | Self-contained static content |

```jsx
import Footer from '@/components/layout/Footer'
<Footer />
```

**Sections:**
1. Platform info (brand name, description, GitHub + Hugging Face links)
2. Model Architecture (bullet list)
3. Developers (name, GitHub, email)
4. Bottom bar: "Made with ❤️" + tech badges
5. Medical disclaimer bar (⚠️ educational-only warning)

**Accessibility:**
- External links have `rel="noopener noreferrer"` and `target="_blank"`
- Decorative icons use `aria-hidden="true"`
- Heart icon has `aria-label="love"`

---

## Feature Components

### Upload (`src/components/Upload.jsx`)

The core interactive component. Handles file upload (drag-and-drop + click), model connection, prediction requests, and result display.

**Type:** Client Component (`'use client'`)

| Prop | Type | Default | Description |
|---|---|---|---|
| *(none)* | — | — | Self-contained; manages all state internally |

```jsx
import Upload from '@/components/Upload'
<Upload />
```

**States managed:**
- `model` — Gradio client instance
- `modelLoading` — Whether the model connection is in progress
- `selectedFile` — The selected image file
- `previewImage` — Object URL for image preview
- `result` — Prediction result `{ disease, accuracy }`
- `loading` — Whether prediction is in progress
- `error` — Error message string
- `dragActive` — Whether a file is being dragged over the zone

**Feedback states:**
- **Model loading:** Blue info banner with spinner: "Connecting to AI model…"
- **Empty (no image):** Upload prompt with icon, heading, and file type hint
- **Preview (image selected):** Image preview with Replace/Remove overlay buttons
- **Analyzing:** Button shows spinner + "Analyzing…", disabled state
- **Error:** Red alert with icon, message, and dismiss button
- **Results:** `<Results />` component rendered below

**Accessibility:**
- Drop zone has `role="button"`, `tabIndex={0}`, `aria-label`
- Keyboard: Enter/Space triggers file picker
- Hidden file input with `aria-label`
- Error messages have `role="alert"`, `aria-live="assertive"`, receive focus
- Analyze button has unique `id="analyze-button"` for testing

---

### Results (`src/components/Results.jsx`)

Displays prediction results with severity-aware colour coding and confidence bar.

**Type:** Server-compatible (no `'use client'`, rendered inside Upload which is a client component)

| Prop | Type | Default | Description |
|---|---|---|---|
| `result` | `{ disease: string, accuracy: string\|number }` | *required* | The prediction result |

```jsx
import Results from '@/components/Results'
<Results result={{ disease: 'Healthy_Skin', accuracy: '99.5%' }} />
```

**Condition mapping:** Each of the 5 conditions gets a unique configuration:

| Disease Key | Display Label | Severity | Colour |
|---|---|---|---|
| `Burn_Skin` | Burn Skin | warning | `warning-400` (amber) |
| `Healthy_Skin` | Healthy Skin | good | `success-400` (green) |
| `Malignant` | Malignant | danger | `danger-400` (red) |
| `Non_Cancerous` | Non-Cancerous | info | `info-400` (blue) |
| `Non_Skin` | Non-Skin | neutral | `surface-400` (gray) |

**Sub-components:**
- Condition card: Severity colour, icon, display label, description
- Confidence card: Large number, progress bar, confidence level label
- Conditional disclaimer: Shows medical warning for `danger` and `warning` severity

**Accessibility:**
- `role="region"` with `aria-label="Analysis results"`
- Confidence bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Result values have `id="result-condition"` and `id="result-confidence"` for testing

---

### FeatureCard (`src/components/FeatureCard.jsx`)

Reusable card for displaying a feature with icon, title, description, and bullet list.

**Type:** Server Component (no directive)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | *required* | Card heading |
| `description` | `string` | `undefined` | Optional prose description |
| `icon` | `React.ComponentType` | `undefined` | Lucide icon component |
| `features` | `string[]` | `undefined` | Bullet point list items |
| `index` | `number` | `0` | Controls staggered animation delay |

```jsx
import FeatureCard from '@/components/FeatureCard'
import { Brain } from 'lucide-react'

<FeatureCard
  icon={Brain}
  title="AI-Powered Analysis"
  description="Deep learning model trained on thousands of images."
  features={['ResNet-50 v2', 'Real-time processing', 'High accuracy']}
  index={0}
/>
```

**Variants:** The card supports three content modes:
1. Icon + title + description (no list)
2. Icon + title + features list
3. Icon + title + description + features list

**Animation:** Entrance uses `animate-fade-in-up` with delay based on `index * 100ms`.

---

## System Pages

### Loading (`src/app/loading.js`)

Root loading state with dual-ring spinner.

### Error (`src/app/error.js`)

Error boundary with AlertTriangle icon, error message, and "Try Again" button. Client Component (required by Next.js).

### Not Found (`src/app/not-found.js`)

404 page with gradient badge, message, and two CTAs: "Back to Home" (primary) and "View Features" (secondary/ghost).
