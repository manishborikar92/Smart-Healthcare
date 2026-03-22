'use client'

import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08,             // Very buttery smooth interpolation
        duration: 1.2,          // Sensible duration
        smoothTouch: false,     // Disabled on touch to prevent breaking mobile
        syncTouch: true         // Let native touch scroll drive it smoothly
      }}
    >
      {children}
    </ReactLenis>
  )
}
