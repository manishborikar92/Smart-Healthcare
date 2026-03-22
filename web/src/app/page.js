import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Upload from '@/components/Upload'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'AI Skin Condition Analysis',
  description:
    'Upload a skin image for instant AI-powered classification. Smart Healthcare AI uses a ResNet-50 v2 model for accurate skin condition analysis.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation />

        <main className="max-w-4xl mx-auto">
          <Upload />
        </main>

        <Footer />
      </div>
    </div>
  )
}
