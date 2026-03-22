import { Heart, Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const techBadges = [
  {
    label: 'Hugging Face',
    icon: '/huggingface.svg',
    color: 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20',
  },
  {
    label: 'Gradio',
    icon: '/gradio.svg',
    color: 'text-purple-400 bg-purple-400/10 hover:bg-purple-400/20',
  },
  {
    label: 'React 19',
    icon: '/react.svg',
    color: 'text-sky-400 bg-sky-400/10 hover:bg-sky-400/20',
  },
]

const developers = [
  {
    name: 'Manish Borikar',
    github: 'https://github.com/manishborikar92',
    email: 'manishborikar@proton.me',
  },
  {
    name: 'Prankita Potbhare',
    github: 'https://github.com/prankitapotbhare',
    email: 'prankitapotbhare@proton.me',
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-default bg-bg-secondary/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Platform Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gradient bg-gradient-to-r from-brand-400 to-cyan-400">
              Smart Healthcare AI
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              AI-powered skin condition analysis using ResNet-50 v2 for better healthcare decisions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/manishborikar92/Smart-Healthcare-React"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-surface-400 hover:text-text-primary hover:bg-bg-glass-hover transition-all duration-200 group"
              >
                <Image
                  src="/github-mark-white.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <span>Source Code</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
              </a>
              <a
                href="https://huggingface.co/spaces/theodinproject/skin_cancer_model_resnet50v2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-surface-400 hover:text-text-primary hover:bg-bg-glass-hover transition-all duration-200 group"
              >
                <Image
                  src="/huggingface.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <span>Model</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Model Architecture */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text-primary">Model Architecture</h4>
            <ul className="space-y-2">
              {['ResNet-50 v2', 'TensorFlow 2.0', 'Pre-trained Weights', '5-Class Classification'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400/60" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text-primary">Developers</h4>
            <ul className="space-y-3">
              {developers.map((dev) => (
                <li key={dev.name} className="space-y-1">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-surface-400 hover:text-brand-400 transition-colors group"
                  >
                    <Github size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    <span>{dev.name}</span>
                  </a>
                  <a
                    href={`mailto:${dev.email}`}
                    className="block text-xs text-text-tertiary hover:text-brand-400 transition-colors pl-[22px]"
                  >
                    {dev.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-default">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <span>Made with</span>
              <Heart
                size={14}
                className="text-danger-400 fill-danger-400/30"
                aria-label="love"
              />
              <span>for Medical Innovation</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {techBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${badge.color}`}
                >
                  <Image
                    src={badge.icon}
                    alt=""
                    width={14}
                    height={14}
                    aria-hidden="true"
                  />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer — required for trust (Phase 1: medical data handling) */}
      <div className="border-t border-border-default bg-bg-primary/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4">
          <p className="text-xs text-text-tertiary text-center leading-relaxed">
            <strong className="text-warning-400">⚠️ Disclaimer:</strong> This tool is for{' '}
            <strong>educational purposes only</strong>. It should not be used as a substitute
            for professional medical advice, diagnosis, or treatment. Always consult a
            certified healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
