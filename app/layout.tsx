import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PDF to Image Converter — Free, No Upload Required',
  description:
    'Convert PDF pages to JPG, PNG or WebP images instantly in your browser. No upload, no signup, completely free. Your PDF never leaves your device.',
  keywords: [
    'pdf to image',
    'pdf to jpg',
    'pdf to png',
    'pdf to jpeg',
    'convert pdf to image',
    'pdf to jpg no upload',
    'pdf to image converter free',
    'pdf pages to images',
  ],
  metadataBase: new URL('https://pdftoimage.app'),
  alternates: {
    canonical: 'https://pdftoimage.app',
  },
  openGraph: {
    title: 'PDF to Image Converter — Free, No Upload Required',
    description:
      'Convert PDF pages to JPG, PNG or WebP images instantly in your browser. No upload, no signup, completely free.',
    url: 'https://pdftoimage.app',
    siteName: 'pdftoimage.app',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'PDF to Image Converter — Free, No Upload Required',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Image Converter — Free, No Upload Required',
    description:
      'Convert PDF pages to JPG, PNG or WebP instantly in your browser. No upload required.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        <link rel="preload" as="image" href="/herobg.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
