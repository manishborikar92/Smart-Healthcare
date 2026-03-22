import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md animate-scale-in">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-400/20 to-cyan-500/20 border border-brand-400/20 flex items-center justify-center">
            <span className="text-3xl font-extrabold text-gradient bg-gradient-to-r from-brand-400 to-cyan-400">
              404
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-text-primary">
          Page Not Found
        </h1>
        <p className="text-sm text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-surface-950 bg-gradient-to-r from-brand-400 to-cyan-500 hover:from-brand-500 hover:to-cyan-600 hover:shadow-glow transition-all duration-300 active:scale-[0.98]"
          >
            <Home size={16} aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-text-secondary hover:text-text-primary glass hover:bg-bg-glass-hover transition-all duration-300"
          >
            <Search size={16} aria-hidden="true" />
            View Features
          </Link>
        </div>
      </div>
    </div>
  )
}
