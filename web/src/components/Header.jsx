// Server Component — no directive needed
// Pure presentational: emoji, gradient text title, subtitle. No interactivity, no hooks, no browser APIs.

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <span className="text-2xl sm:text-4xl md:text-6xl mr-4">🩺</span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
          Smart Healthcare AI
        </h1>
      </div>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
        Advanced AI-powered skin condition analysis for better healthcare decisions
      </p>
    </header>
  )
}
