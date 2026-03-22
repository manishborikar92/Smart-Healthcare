// "use client" required: this component uses usePathname() for active link
// detection and Link for client-side navigation between routes.
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function TabLink({ href, label }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navigation() {
  return (
    <nav className="flex justify-center space-x-4 mb-8" aria-label="Main navigation">
      <TabLink href="/" label="Analyze" />
      <TabLink href="/about" label="About" />
      <TabLink href="/features" label="Features" />
    </nav>
  )
}
