import Upload from '@/components/features/Upload'
import { Brain, Zap, Shield, Stethoscope } from 'lucide-react'

export const metadata = {
  title: 'AI Skin Condition Analysis',
  description:
    'Upload a skin image for instant AI-powered classification. Smart Healthcare AI uses a ResNet-50 v2 model for accurate skin condition analysis.',
}

const highlights = [
  {
    icon: Brain,
    label: 'ResNet-50 v2',
    detail: 'Deep Learning',
  },
  {
    icon: Zap,
    label: 'Instant',
    detail: 'Real-time Analysis',
  },
  {
    icon: Shield,
    label: '5 Classes',
    detail: 'Skin Conditions',
  },
]

export default function HomePage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-400 text-xs font-medium mb-6">
            <Stethoscope size={14} aria-hidden="true" />
            <span>AI-Powered Diagnostics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-text-primary">Skin Condition</span>
            <br />
            <span className="text-gradient bg-gradient-to-r from-brand-400 via-cyan-400 to-brand-300">
              Analysis
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Upload a skin image and get instant AI-powered classification.
            Our ResNet-50 v2 model identifies conditions with high accuracy.
          </p>
        </section>

        {/* Highlight Pills */}
        <section className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up delay-200" aria-label="Key features">
          {highlights.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass hover:bg-bg-glass-hover transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-400/10 flex items-center justify-center group-hover:bg-brand-400/20 transition-colors">
                <Icon size={14} className="text-brand-400" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-text-primary leading-tight">{label}</span>
                <span className="text-xs text-text-tertiary leading-tight">{detail}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Upload Section — Primary CTA */}
        <section aria-label="Image upload and analysis">
          <Upload />
        </section>
      </div>
    </div>
  )
}
