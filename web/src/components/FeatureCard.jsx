// Server Component — no directive needed
// Stateless feature card. No interactivity, no hooks, no browser APIs.

export default function FeatureCard({ title, features }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <ul className="text-gray-400 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  )
}
