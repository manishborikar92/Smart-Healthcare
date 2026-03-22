'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Activity, Info, Sparkles, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Analyze', icon: Activity },
  { href: '/about', label: 'About', icon: Info },
  { href: '/features', label: 'Features', icon: Sparkles },
]

function NavLink({ href, label, icon: Icon, onClick }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        transition-all duration-300
        ${
          isActive
            ? 'bg-brand-400/15 text-brand-400 shadow-sm'
            : 'text-surface-400 hover:text-text-primary hover:bg-bg-glass-hover'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={16} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Glass nav bar */}
      <div 
        className={`transition-all duration-300 border-b ${
          scrolled 
            ? 'backdrop-blur-md bg-bg-primary/80 border-border-default shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo + Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Smart Healthcare AI — Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/logo.svg" 
                  alt="" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(45,212,191,0.25)] group-hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.5)] transition-all duration-300" 
                  priority 
                  aria-hidden="true" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-text-primary leading-none">
                  Smart Healthcare
                </span>
                <span className="text-xs text-brand-400 font-medium leading-none mt-0.5">
                  AI Diagnostics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-surface-400 hover:text-text-primary hover:bg-bg-glass-hover transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden glass border-b border-border-default animate-fade-in"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto max-w-5xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
