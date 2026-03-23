'use client'

import { ReactLenis } from 'lenis/react'

// ✅ Hoisted — stable reference, never recreated on re-render
const easeExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/**
 * SmoothScrollProvider — Butter-smooth scroll normalization via Lenis.
 *
 * ✅ duration/easing model   — time-based, ends cleanly (no silent lerp conflict)
 * ✅ smoothTouch: false      — native compositor scroll on mobile (no JS jank)
 * ✅ syncTouch: false        — zero JS interception on touch events
 * ✅ overscroll: false       — prevents rubber-band conflicts with browser
 * ✅ easeExpo hoisted        — stable fn reference, no GC pressure
 * ✅ orientation omitted     — vertical is the default, no noise
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration:        1.2,        // ✅ Time-based model — predictable, clean stop
        easing:          easeExpo,   // ✅ Expo out — fast start, feather-soft stop
        smoothWheel:     true,       // ✅ Smooth on desktop mouse/trackpad
        smoothTouch:     false,      // ✅ Native scroll on mobile — fastest possible
        syncTouch:       false,      // ✅ No JS touch interception whatsoever
        wheelMultiplier: 1.0,        // ✅ Natural wheel speed, no over/under-scroll
        overscroll:      false,      // ✅ No rubber-band conflict with browser
      }}
    >
      {children}
    </ReactLenis>
  )
}