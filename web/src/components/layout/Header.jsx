'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Info, Sparkles, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Analyze', icon: Activity },
  { href: '/about', label: 'About', icon: Info },
  { href: '/features', label: 'Features', icon: Sparkles },
]

function NavLink({ href, label, icon: Icon, onClick, layoutId }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
        transition-colors duration-200 z-10 group
        ${
          isActive
            ? 'text-brand-400'
            : 'text-surface-400 hover:text-text-primary hover:bg-surface-800/30'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-brand-400/10 rounded-xl -z-10"
          initial={false}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <Icon 
        size={16} 
        strokeWidth={isActive ? 2.5 : 2} 
        aria-hidden="true" 
        className={isActive ? 'text-brand-400' : 'text-surface-400 group-hover:text-text-primary transition-colors duration-300'} 
      />
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
    
    // Don't check on mount to avoid hydration mismatch
    // Initial state is false, scroll listener will update it
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 relative">
      {/* Unified Glass nav container */}
      <div 
        className={`transition-colors duration-300 border-b ${
          scrolled || mobileMenuOpen
            ? 'backdrop-blur-xl bg-bg-primary/95 shadow-md' 
            : 'bg-bg-primary/0 border-transparent'
        } ${mobileMenuOpen ? 'border-transparent' : 'border-border-default'}`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo + Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Smart Healthcare AI — Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-[1.04] transition-transform duration-300 ease-out">
                <Image 
                  src="/sha-icon-final.svg" 
                  alt="" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-contain" 
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
                <NavLink key={link.href} {...link} layoutId="desktop-active" />
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-surface-400 hover:text-text-primary hover:bg-bg-glass-hover transition-colors outline-none focus:outline-none"
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

      {/* Overlay Mobile Navigation Drawer */}
      <div
        id="mobile-nav"
        className={`absolute top-full left-0 w-full md:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-xl bg-bg-primary/95 border-b border-border-default shadow-lg ${
          mobileMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mx-auto max-w-5xl px-4 flex flex-col gap-1.5 py-4 border-t border-border-default/50">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              layoutId="mobile-active"
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
