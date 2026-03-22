import FeatureCard from '@/components/features/FeatureCard'
import {
  Brain,
  Scan,
  Zap,
  Shield,
  Smartphone,
  GripVertical,
  BarChart3,
  Lock,
} from 'lucide-react'

export const metadata = {
  title: 'Key Features',
  description:
    'Explore the key features of Smart Healthcare AI — AI-powered analysis, multi-condition detection, intuitive UX, and secure processing.',
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Deep learning model trained on thousands of dermatological images.',
    features: [
      'Advanced ResNet-50 v2 architecture',
      'Real-time processing via WebSocket',
      'High accuracy predictions',
    ],
  },
  {
    icon: Scan,
    title: 'Multi-Condition Detection',
    description: 'Identifies five distinct skin condition categories.',
    features: [
      'Burn Skin Detection',
      'Malignant Condition Analysis',
      'Healthy Skin Assessment',
    ],
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get classification results within seconds, not minutes.',
    features: [
      'Sub-second model inference',
      'Confidence score display',
      'Severity-based color coding',
    ],
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your medical data is handled with the highest security standards.',
    features: [
      'No image storage on servers',
      'Encrypted data transmission',
      'GDPR-compliant processing',
    ],
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Fully optimized for desktop, tablet, and mobile devices.',
    features: [
      'Mobile-first architecture',
      'Touch-optimized interactions',
      'Adaptive layout system',
    ],
  },
  {
    icon: GripVertical,
    title: 'Drag & Drop Upload',
    description: 'Intuitive file upload with drag-and-drop support.',
    features: [
      'Drag & drop or click to browse',
      'Image preview before analysis',
      'Supports PNG, JPG, WebP',
    ],
  },
  {
    icon: BarChart3,
    title: 'Detailed Reporting',
    description: 'Comprehensive analysis results with actionable insights.',
    features: [
      'Confidence percentage bar',
      'Condition severity indicators',
      'Medical disclaimers on concerning results',
    ],
  },
  {
    icon: Lock,
    title: 'Open Source',
    description: 'Fully transparent codebase for educational use and collaboration.',
    features: [
      'MIT licensed on GitHub',
      'Open model on Hugging Face',
      'Community contributions welcome',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Page Header */}
        <section className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-text-primary">Key </span>
            <span className="text-gradient bg-gradient-to-r from-brand-400 to-cyan-400">
              Features
            </span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Built with modern technologies and best practices to deliver
            accurate, fast, and secure skin condition analysis.
          </p>
        </section>

        {/* Features Grid */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          aria-label="Feature list"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              index={index}
            />
          ))}
        </section>
      </div>
    </div>
  )
}
