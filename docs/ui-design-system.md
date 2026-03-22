# Smart Healthcare AI — UI Design System

This document defines every design token used across the Smart Healthcare AI interface. All tokens are defined in `web/src/app/globals.css` using Tailwind CSS v4's `@theme inline` configuration.

## Colour System

### Brand Scale (Teal)

The primary brand colour is teal, derived from the original project's teal-400 to cyan-500 gradient. This gradient represents healthcare + technology.

| Token | Value | Usage |
|---|---|---|
| `brand-50` | `#f0fdfa` | Lightest tint — almost never used in dark theme |
| `brand-100` | `#ccfbf1` | Very light tint |
| `brand-200` | `#99f6e4` | Light accent backgrounds |
| `brand-300` | `#5eead4` | Lighter accent text |
| `brand-400` | `#2dd4bf` | **Primary accent** — CTAs, active states, icons |
| `brand-500` | `#14b8a6` | Hover states on brand elements |
| `brand-600` | `#0d9488` | Active/pressed states |
| `brand-700` | `#0f766e` | Dark brand accent |
| `brand-800` | `#115e59` | Very dark brand |
| `brand-900` | `#134e4a` | Near-black brand |
| `brand-950` | `#042f2e` | Deepest brand |

### Neutral Scale (Slate-tinted)

Slate-tinted neutrals provide warmth to the dark UI, avoiding the coldness of pure gray.

| Token | Value | Usage |
|---|---|---|
| `surface-0` | `#ffffff` | Pure white |
| `surface-50` | `#f8fafc` | Lightest surface |
| `surface-100` | `#f1f5f9` | Light surface |
| `surface-200` | `#e2e8f0` | Borders in light context |
| `surface-300` | `#cbd5e1` | Medium borders |
| `surface-400` | `#94a3b8` | Secondary text, icons |
| `surface-500` | `#64748b` | Tertiary text |
| `surface-600` | `#475569` | Scrollbar thumb |
| `surface-700` | `#334155` | Disabled states |
| `surface-800` | `#1e293b` | Elevated surfaces |
| `surface-900` | `#0f172a` | Primary dark surface |
| `surface-950` | `#020617` | Darkest — button text on brand bg |

### Semantic Colours

| Category | Token | Value | Contrast Ratio vs dark bg | WCAG |
|---|---|---|---|---|
| Success | `success-400` | `#4ade80` | 8.2:1 | AAA |
| Warning | `warning-400` | `#facc15` | 11.3:1 | AAA |
| Danger | `danger-400` | `#f87171` | 5.3:1 | AA |
| Info | `info-400` | `#60a5fa` | 5.9:1 | AA |

### Semantic Surface Tokens

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0b1120` | Main page background |
| `bg-secondary` | `#111827` | Footer, secondary sections |
| `bg-tertiary` | `#1a2332` | Slightly elevated areas |
| `bg-elevated` | `#1e293b` | Cards and panels |
| `bg-glass` | `rgba(255,255,255,0.04)` | Glass-morphism base |
| `bg-glass-hover` | `rgba(255,255,255,0.08)` | Glass-morphism hover |
| `text-primary` | `#f1f5f9` | Headings, primary text |
| `text-secondary` | `#94a3b8` | Body text, descriptions |
| `text-tertiary` | `#64748b` | Labels, metadata, captions |
| `border-default` | `rgba(255,255,255,0.08)` | Card borders, dividers |
| `border-strong` | `rgba(255,255,255,0.15)` | Hover borders |
| `border-brand` | `rgba(45,212,191,0.25)` | Brand-accented borders |

---

## Typography

### Font Family

| Role | Stack |
|---|---|
| Sans (primary) | Inter, system-ui, -apple-system, sans-serif |
| Mono (code) | JetBrains Mono, ui-monospace, monospace |

Inter is loaded via `next/font/google` with `display: swap` to prevent layout shift.

### Type Scale Usage

| Role | Size | Weight | Line Height | Colour |
|---|---|---|---|---|
| Page title (h1) | `text-3xl` to `text-5xl` | 800 (extrabold) | tight | `text-primary` or gradient |
| Section heading (h2) | `text-xl` to `text-2xl` | 700 (bold) | tight | `text-primary` |
| Card heading (h3) | `text-base` to `text-lg` | 600 (semibold) | snug | `text-primary` |
| Body text | `text-sm` to `text-base` | 400 (normal) | relaxed | `text-secondary` |
| Labels / captions | `text-xs` to `text-sm` | 500 (medium) | normal | `text-tertiary` |
| Badge text | `text-xs` | 500 (medium) | normal | Varies by semantic |

---

## Spacing Conventions

| Context | Token | Value | Rationale |
|---|---|---|---|
| Page outer padding | `px-4 sm:px-6` | 16/24px | Comfortable reading margin |
| Page max-width | `max-w-3xl` / `max-w-5xl` | 768/1024px | Optimal for single-column content |
| Section vertical gap | `py-8 sm:py-12` | 32/48px | Clear section separation |
| Card padding | `p-5 sm:p-6` | 20/24px | Comfortable breathing room |
| Grid gap | `gap-3` to `gap-4` | 12/16px | Consistent card spacing |
| Feature list item spacing | `space-y-2` | 8px | Readable without crowding |
| Inline element gap | `gap-2` | 8px | Icon + label pairs |

---

## Shadows

| Token | Usage |
|---|---|
| `shadow-sm` | Subtle card elevation |
| `shadow-md` | Interactive elements |
| `shadow-lg` | Elevated panels |
| `shadow-xl` | Modals (not currently used) |
| `shadow-glow` | Brand element hover glow (20px, 15% brand opacity) |
| `shadow-glow-lg` | Emphasized brand glow (40px, 20% brand opacity) |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 0.375rem (6px) | Small elements, focus rings |
| `radius-md` | 0.5rem (8px) | Buttons, inputs |
| `radius-lg` | 0.75rem (12px) | Cards, panels |
| `radius-xl` | 1rem (16px) | Large cards, nav items |
| `radius-2xl` | 1.25rem (20px) | Hero elements, drop zones |
| `radius-full` | 9999px | Pills, badges, avatars |

---

## Animations

All animations are CSS-only (no `framer-motion`). Total animation JS cost: **0 KB**.

| Class | Animation | Duration | Usage |
|---|---|---|---|
| `animate-fade-in-up` | Translate Y 12px + opacity | 500ms | Page sections entrance |
| `animate-fade-in` | Opacity only | 400ms | Subtle element entrance |
| `animate-scale-in` | Scale 0.95→1 + opacity | 300ms | Results, alerts |
| `animate-shimmer` | Background position shift | 1500ms infinite | Skeleton loading |
| `animate-pulse-ring` | Scale 0.95→1 pulsing | 2000ms infinite | Decorative accents |
| `animate-spin-slow` | 360° rotation | 1000ms infinite | Loading spinners |
| `animate-gradient` | Background position shift | 3000ms infinite | Gradient decoration |

Stagger delays: `.delay-100` through `.delay-500` in 100ms increments.

---

## Utility Classes

| Class | Description |
|---|---|
| `.text-gradient` | Applies `background-clip: text` for gradient text |
| `.glass` | Glass-morphism: 4% white bg + 12px blur + default border |
| `.glass-hover:hover` | Enhanced glass on hover: 8% white bg + strong border |
| `.glow` | Brand glow box-shadow |
| `.glow-lg` | Large brand glow box-shadow |
| `.bg-grid` | Subtle grid pattern overlay |
| `.bg-dots` | Subtle dot pattern overlay |
