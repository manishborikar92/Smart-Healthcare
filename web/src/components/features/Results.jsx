import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react'

// Map disease names to severity levels and display properties
const conditionConfig = {
  'Burn_Skin': {
    severity: 'warning',
    label: 'Burn Skin',
    description: 'Signs of burn damage detected on the skin.',
    icon: AlertTriangle,
    color: 'text-warning-400',
    bgColor: 'bg-warning-400/10',
    borderColor: 'border-warning-400/20',
    badgeColor: 'bg-warning-400/15 text-warning-400',
  },
  'Healthy_Skin': {
    severity: 'good',
    label: 'Healthy Skin',
    description: 'No concerning skin conditions detected.',
    icon: ShieldCheck,
    color: 'text-success-400',
    bgColor: 'bg-success-400/10',
    borderColor: 'border-success-400/20',
    badgeColor: 'bg-success-400/15 text-success-400',
  },
  'Malignant': {
    severity: 'danger',
    label: 'Malignant',
    description: 'Potentially malignant condition detected. Please consult a dermatologist immediately.',
    icon: AlertTriangle,
    color: 'text-danger-400',
    bgColor: 'bg-danger-400/10',
    borderColor: 'border-danger-400/20',
    badgeColor: 'bg-danger-400/15 text-danger-400',
  },
  'Non_Cancerous': {
    severity: 'info',
    label: 'Non-Cancerous',
    description: 'Benign skin condition detected. Monitor for any changes.',
    icon: ShieldCheck,
    color: 'text-info-400',
    bgColor: 'bg-info-400/10',
    borderColor: 'border-info-400/20',
    badgeColor: 'bg-info-400/15 text-info-400',
  },
  'Non_Skin': {
    severity: 'neutral',
    label: 'Non-Skin',
    description: 'The uploaded image does not appear to be a skin image.',
    icon: AlertTriangle,
    color: 'text-surface-400',
    bgColor: 'bg-surface-400/10',
    borderColor: 'border-surface-400/20',
    badgeColor: 'bg-surface-400/15 text-surface-400',
  },
}

function getConfig(disease) {
  // Try exact match first, then fuzzy match
  if (conditionConfig[disease]) return conditionConfig[disease]

  // Normalize: attempt to match by replacing spaces with underscores
  const normalized = disease.replace(/\s+/g, '_')
  if (conditionConfig[normalized]) return conditionConfig[normalized]

  // Default fallback
  return {
    severity: 'neutral',
    label: disease,
    description: 'Analysis complete.',
    icon: ShieldCheck,
    color: 'text-brand-400',
    bgColor: 'bg-brand-400/10',
    borderColor: 'border-brand-400/20',
    badgeColor: 'bg-brand-400/15 text-brand-400',
  }
}

function parseAccuracy(accuracy) {
  if (typeof accuracy === 'number') return accuracy
  // Handle string like "99.99%" or "0.9999"
  const str = String(accuracy).replace('%', '').trim()
  const num = parseFloat(str)
  if (isNaN(num)) return 0
  return num > 1 ? num : num * 100
}

export default function Results({ result }) {
  const config = getConfig(result.disease)
  const Icon = config.icon
  const accuracy = parseAccuracy(result.accuracy)

  return (
    <div
      className={`rounded-2xl ${config.bgColor} border ${config.borderColor} overflow-hidden animate-scale-in`}
      role="region"
      aria-label="Analysis results"
    >
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
            <Icon size={16} className={config.color} aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">
            Analysis Results
          </h3>
        </div>

        {/* Result Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Condition Card */}
          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
              Condition
            </p>
            <p className={`text-lg font-bold ${config.color}`} id="result-condition">
              {config.label}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Confidence Card */}
          <div className="glass rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
              Confidence
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-text-primary" id="result-confidence">
                {accuracy.toFixed(1)}
              </p>
              <span className="text-sm text-text-secondary">%</span>
            </div>

            {/* Confidence Bar */}
            <div className="w-full h-1.5 rounded-full bg-surface-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  accuracy >= 80
                    ? 'bg-gradient-to-r from-brand-400 to-cyan-400'
                    : accuracy >= 50
                      ? 'bg-warning-400'
                      : 'bg-danger-400'
                }`}
                style={{ width: `${Math.min(accuracy, 100)}%` }}
                role="progressbar"
                aria-valuenow={accuracy}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Confidence: ${accuracy.toFixed(1)}%`}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-text-tertiary">
              <TrendingUp size={10} aria-hidden="true" />
              <span>
                {accuracy >= 90
                  ? 'High confidence'
                  : accuracy >= 70
                    ? 'Moderate confidence'
                    : 'Low confidence'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer for concerning results */}
      {(config.severity === 'danger' || config.severity === 'warning') && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-950/50 border border-border-default">
            <AlertTriangle size={14} className="text-warning-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong className="text-warning-400">Important:</strong> This is an AI-generated
              assessment for educational purposes. Please consult a qualified healthcare
              professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
