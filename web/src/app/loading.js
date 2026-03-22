export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center animate-fade-in">
        <div className="relative w-12 h-12 mx-auto mb-4">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-400/20" />
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-400 animate-spin-slow" />
        </div>
        <p className="text-sm text-text-secondary">Loading…</p>
      </div>
    </div>
  )
}
