import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://smart-healthcare-ai.vercel.app'),
  title: {
    template: '%s | Smart Healthcare AI',
    default: 'AI Skin Condition Analysis | Smart Healthcare AI',
  },
  description:
    'Advanced AI-powered skin condition analysis using ResNet-50 v2. Upload an image for instant classification of skin conditions including burns, malignancy, and more.',
  appleWebApp: {
    title: 'Smart Healthcare AI',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Smart Healthcare AI',
    title: 'Smart Healthcare AI — AI Skin Condition Analysis',
    description:
      'Upload a skin image for instant AI-powered classification. Built with ResNet-50 v2 deep learning model.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Healthcare AI',
    description: 'AI-powered skin condition analysis for better healthcare decisions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="flex flex-col relative bg-bg-primary text-text-primary">
        {/* Skip Navigation — Accessibility: allows keyboard users to skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                     focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-400 focus:text-surface-950
                     focus:rounded-lg focus:font-semibold focus:shadow-lg focus:text-sm"
        >
          Skip to main content
        </a>

        {/* Background decoration — grid pattern */}
        <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" aria-hidden="true" />

        {/* Gradient orbs for depth */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-info-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
