# UI Components

Component API reference for every component in the Smart Healthcare AI interface, with props, usage examples, and accessibility notes.

## Layout Components

### Header

**Location:** `src/components/layout/Header.jsx`

Sticky glass-morphism navigation bar with logo, desktop navigation, mobile hamburger drawer, and scroll-aware visual state.

**Type:** Client Component (`'use client'` — uses `usePathname()`, `useState`, `useEffect`, `framer-motion`)

| Prop   | Type | Default | Description                                          |
|--------|------|---------|------------------------------------------------------|
| *(none)* | —  | —       | Self-contained; reads current route via `usePathname()` |

```jsx
import Header from '@/components/layout/Header'

<Header />
```

**Navigation links:** Defined in the `navLinks` array inside the component. Each link has `href`, `label`, and `icon` (Lucide icon component).

| Link       | Route       | Icon      |
|------------|-------------|-----------|
| Analyze    | `/`         | Activity  |
| About      | `/about`    | Info      |
| Features   | `/features` | Sparkles  |

**Behaviour:**

- Scroll detection: Header gains `backdrop-blur-xl` and reduced height after 20px scroll
- Active link: Animated indicator using `framer-motion` `layoutId`
- Desktop (md+): Horizontal pill-style nav links
- Mobile (<md): Hamburger button → slide-down glass drawer

**Accessibility:**

- `aria-label="Main navigation"` on `<nav>`
- `aria-current="page"` on the active link
- `aria-expanded` and `aria-controls="mobile-nav"` on the mobile menu toggle
- `aria-label` on the hamburger button ("Open menu" / "Close menu")
- Logo has `aria-label="Smart Healthcare AI — Home"`

### Footer

**Location:** `src/components/layout/Footer.jsx`

Three-column info grid with platform info, model architecture details, developer credits, tech badges, and medical disclaimer.

**Type:** Server Component (no `'use client'` directive)

| Prop   | Type | Default | Description               |
|--------|------|---------|---------------------------|
| *(none)* | —  | —       | Self-contained static content |

```jsx
import Footer from '@/components/layout/Footer'

<Footer />
```

**Sections:**

1. Platform info — brand name, description, GitHub and Hugging Face links
2. Model Architecture — bullet list (ResNet-50 v2, TensorFlow 2.0, Pre-trained Weights, 5-Class Classification)
3. Developers — name, GitHub profile, email for each team member
4. Bottom bar — "Made with ❤️ for Medical Innovation" + tech badges (Hugging Face, Gradio, React 19)
5. Medical disclaimer — ⚠️ educational-purposes-only warning

**Accessibility:**

- External links have `rel="noopener noreferrer"` and `target="_blank"`
- Decorative icons and images use `aria-hidden="true"` with empty `alt=""`
- Heart icon has `aria-label="love"`

### SmoothScroll

**Location:** `src/components/layout/SmoothScroll.jsx`

Wraps child elements in `ReactLenis` for smooth scroll interpolation.

**Type:** Client Component (`'use client'`)

| Prop       | Type        | Default | Description           |
|------------|-------------|---------|-----------------------|
| `children` | `ReactNode` | —       | Content to wrap       |

```jsx
import SmoothScroll from '@/components/layout/SmoothScroll'

<SmoothScroll>
  {children}
</SmoothScroll>
```

**Configuration:**

| Option         | Value   | Purpose                                    |
|----------------|---------|--------------------------------------------|
| `lerp`         | `0.08`  | Smooth interpolation factor                |
| `duration`     | `1.2`   | Scroll animation duration                  |
| `smoothTouch`  | `false` | Disabled to avoid breaking mobile scroll   |
| `syncTouch`    | `true`  | Native touch drives smooth scroll          |

## Feature Components

### Upload

**Location:** `src/components/features/Upload.jsx`

Core interactive component handling the complete prediction lifecycle: Gradio client connection, drag-and-drop file upload, image preview, prediction request, error handling, and result rendering.

**Type:** Client Component (`'use client'`)

| Prop   | Type | Default | Description                                  |
|--------|------|---------|----------------------------------------------|
| *(none)* | —  | —       | Self-contained; manages all state internally |

```jsx
import Upload from '@/components/features/Upload'

<Upload />
```

**Internal state:**

| State          | Type     | Purpose                                         |
|----------------|----------|-------------------------------------------------|
| `model`        | `Client` | Gradio client instance                          |
| `modelLoading` | boolean  | Whether the model connection is in progress     |
| `selectedFile` | `File`   | The selected image file                         |
| `previewImage` | string   | Object URL for image preview                    |
| `result`       | object   | Prediction result `{ disease, accuracy }`       |
| `loading`      | boolean  | Whether prediction is in progress               |
| `error`        | string   | Error message                                   |
| `dragActive`   | boolean  | Whether a file is being dragged over the zone   |

**Visual states:**

- **Model loading:** Blue info banner with spinner — "Connecting to AI model…"
- **Empty (no image):** Upload prompt with icon, heading, file type hint
- **Preview (image selected):** Image preview with Replace and Remove overlay buttons, file name, file size, and "Analyze Image" button
- **Analyzing:** Button shows spinner + "Analyzing…" in disabled state
- **Error:** Red alert with icon, message text, and dismiss button
- **Results:** `Results` component rendered below the upload zone

**Accessibility:**

- Drop zone has `role="button"`, `tabIndex={0}`, `aria-label="Upload image for analysis"`
- Keyboard: Enter and Space trigger the file picker
- Hidden file input has `aria-label="Choose image file"` and `id="file-upload"`
- Error messages have `role="alert"`, `aria-live="assertive"`, and receive focus
- Analyze button has `id="analyze-button"`

### Results

**Location:** `src/components/features/Results.jsx`

Displays classification results with severity-aware colour coding and confidence bar.

**Type:** Server-compatible (no `'use client'` directive; rendered inside Upload which is a client component, so it inherits client behavior at runtime)

| Prop     | Type                                           | Default    | Description                |
|----------|-------------------------------------------------|------------|----------------------------|
| `result` | `{ disease: string, accuracy: string\|number }` | *required* | The prediction result      |

```jsx
import Results from '@/components/features/Results'

<Results result={{ disease: 'Healthy_Skin', accuracy: '99.5%' }} />
```

**Condition mapping:**

| Disease Key      | Display Label   | Severity | Colour          |
|------------------|-----------------|----------|-----------------|
| `Burn_Skin`      | Burn Skin       | warning  | `warning-400` (amber) |
| `Healthy_Skin`   | Healthy Skin    | good     | `success-400` (green) |
| `Malignant`      | Malignant       | danger   | `danger-400` (red)    |
| `Non_Cancerous`  | Non-Cancerous   | info     | `info-400` (blue)     |
| `Non_Skin`       | Non-Skin        | neutral  | `surface-400` (gray)  |

**Sub-components rendered:**

- Condition card: Severity-coloured icon, display label, description text
- Confidence card: Large percentage number, animated progress bar, confidence level label ("High confidence" / "Moderate confidence" / "Low confidence")
- Medical disclaimer: Shown only for `danger` and `warning` severity results

**Accessibility:**

- `role="region"` with `aria-label="Analysis results"`
- Confidence bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`
- Result values have `id="result-condition"` and `id="result-confidence"`

### FeatureCard

**Location:** `src/components/features/FeatureCard.jsx`

Reusable card for displaying a feature with icon, title, description, and bullet list.

**Type:** Server Component (no directive)

| Prop          | Type                  | Default     | Description                           |
|---------------|-----------------------|-------------|---------------------------------------|
| `title`       | `string`              | *required*  | Card heading                          |
| `description` | `string`              | `undefined` | Optional prose description            |
| `icon`        | `React.ComponentType` | `undefined` | Lucide icon component                 |
| `features`    | `string[]`            | `undefined` | Bullet point list items               |
| `index`       | `number`              | `0`         | Controls staggered animation delay    |

```jsx
import FeatureCard from '@/components/features/FeatureCard'
import { Brain } from 'lucide-react'

<FeatureCard
  icon={Brain}
  title="AI-Powered Analysis"
  description="Deep learning model trained on thousands of images."
  features={['ResNet-50 v2', 'Real-time processing', 'High accuracy']}
  index={0}
/>
```

**Content modes:** The card supports three configurations:

1. Icon + title + description (no feature list)
2. Icon + title + feature list (no description)
3. Icon + title + description + feature list

**Animation:** Entrance uses `animate-fade-in-up` with delay based on `index * 100ms`.

## System Pages

### Loading (`src/app/loading.js`)

Root loading state with dual-ring spinner. Server Component. Displays a centered spinner animation with "Loading…" text.

### Error (`src/app/error.js`)

Error boundary with AlertTriangle icon, error message display, and "Try Again" button that calls the `reset()` function. Client Component (required by Next.js convention). Has `id="error-reset-button"` for testing.

### Not Found (`src/app/not-found.js`)

404 page with gradient "404" badge, descriptive message, and two CTAs: "Back to Home" (primary gradient button) and "View Features" (secondary ghost button). Server Component with `robots: { index: false, follow: false }` metadata.
