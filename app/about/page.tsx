import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — pdftoimage.app',
  description:
    'pdftoimage.app is a free, browser-based PDF to image converter with no upload required.',
  alternates: {
    canonical: 'https://pdftoimage.app/about',
  },
}

export default function About() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-14 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About pdftoimage.app</h1>
        <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
          <p>
            pdftoimage.app is a free, privacy-first PDF to image converter built for anyone who
            needs to extract pages from a PDF without sending their files to a remote server. It
            converts every PDF page to JPG, PNG, or WebP — instantly, in your browser.
          </p>
          <p>
            Unlike most online pdf to jpg converters, pdftoimage.app does all rendering locally
            using Mozilla&apos;s PDF.js library — the same engine that powers PDF viewing in Firefox.
            Your PDF never leaves your device. There&apos;s no server involved, no account required,
            and no cost.
          </p>
          <p>
            The tool supports multi-page PDFs with no page limit, custom page range selection
            (e.g. &ldquo;1-3, 5, 7-9&rdquo;), adjustable render scale (72 DPI up to 216 DPI for archival
            quality), and batch download as a ZIP file. All output images are generated from the
            original vector PDF data — not screenshots.
          </p>
          <p>
            The site is ad-supported to stay free. If you find it useful, sharing it with others
            is the best way to support continued development.
          </p>
          <p>
            <Link href="/" className="text-[#2563EB] hover:underline">
              &larr; Back to the converter
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
