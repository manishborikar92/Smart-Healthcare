export default function FeatureCard({ title, description, icon: Icon, features, index = 0 }) {
  return (
    <div
      className={`
        glass rounded-2xl p-5 sm:p-6 group
        hover:bg-bg-glass-hover hover:border-brand-400/20
        transition-all duration-300 hover:shadow-lg
        animate-fade-in-up
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/15 to-cyan-500/15 flex items-center justify-center mb-4 group-hover:from-brand-400/25 group-hover:to-cyan-500/25 transition-colors duration-300">
          <Icon
            size={20}
            className="text-brand-400"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-base font-semibold text-text-primary mb-2">
        {title}
      </h3>

      {/* Description (optional prose text) */}
      {description && (
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {description}
        </p>
      )}

      {/* Feature List */}
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand-400/60 flex-shrink-0 mt-1.5"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
