import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import FeatureCard from '@/components/FeatureCard'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Key Features',
  description:
    'Explore the key features of Smart Healthcare AI — AI-powered analysis, multi-condition detection, intuitive UX, and secure processing.',
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation />

        <main className="max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="AI-Powered Analysis"
                features={[
                  'Advanced ResNet-50 v2 model',
                  'Real-time processing',
                  'High accuracy predictions',
                ]}
              />
              <FeatureCard
                title="Multiple Conditions"
                features={[
                  'Burn Skin Detection',
                  'Malignant Condition Analysis',
                  'Healthy Skin Assessment',
                ]}
              />
              <FeatureCard
                title="User Experience"
                features={[
                  'Intuitive interface',
                  'Drag & drop functionality',
                  'Instant results',
                ]}
              />
              <FeatureCard
                title="Privacy & Security"
                features={[
                  'End-to-end encryption',
                  'Secure cloud processing',
                  'No personal data storage',
                ]}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
