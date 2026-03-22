'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({ error, reset }) {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-danger-400/10 border border-danger-400/20 flex items-center justify-center">
          <AlertTriangle size={28} className="text-danger-400" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-text-primary">
          Something went wrong
        </h2>
        <p className="text-sm text-text-secondary mb-8 leading-relaxed">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-surface-950 bg-gradient-to-r from-brand-400 to-cyan-500 hover:from-brand-500 hover:to-cyan-600 hover:shadow-glow transition-all duration-300 active:scale-[0.98]"
          id="error-reset-button"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try Again
        </button>
      </div>
    </div>
  )
}
