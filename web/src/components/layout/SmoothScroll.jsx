'use client'

import { ReactLenis } from 'lenis/react'

// ✅ Hoisted — stable reference, never recreated on re-render
const easeExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/**
 * SmoothScroll — Butter-smooth scroll normalization via Lenis.
 *
 * ✅ duration/easing model   — time-based, ends cleanly (no lerp conflict)
 * ✅ smoothTouch: false      — native compositor scroll on mobile
 * ✅ syncTouch: false        — zero JS interception on touch events
 * ✅ overscroll: false       — no rubber-band conflict with browser
 * ✅ easeExpo hoisted        — stable fn reference, no GC pressure
 * ✅ 'use client' directive  — SSR safe, ReactLenis handles hydration internally
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration:        1.2,
        easing:          easeExpo,
        smoothWheel:     true,
        smoothTouch:     false,
        syncTouch:       false,
        wheelMultiplier: 1.0,
        overscroll:      false,
      }}
    >
      {children}
    </ReactLenis>
  )
}