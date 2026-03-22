import { Inter } from 'next/font/google'
import './globals.css'

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
