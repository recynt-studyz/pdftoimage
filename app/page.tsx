import type { Metadata } from 'next'
import AdBanner from '@/components/AdBanner'
import ConverterWrapper from '@/components/ConverterWrapper'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'PDF to Image Converter — Free, No Upload Required',
  description:
    'Convert PDF pages to JPG, PNG or WebP images instantly in your browser. No upload, no signup, completely free. Your PDF never leaves your device.',
  alternates: {
    canonical: 'https://pdftoimage.app',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does this upload my PDF to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. pdftoimage.app is a fully client-side tool. Your PDF is loaded directly into your browser using Mozilla\'s PDF.js library and rendered to images using the Canvas API. Nothing is transmitted to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a PDF to JPG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drop your PDF onto the upload zone, select JPG as the output format, adjust quality if needed, then click Convert to Images. Each page is rendered individually. Download pages one at a time or grab all pages as a ZIP file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert specific pages of a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. After loading your PDF, switch the Pages selector to Custom range and enter your page numbers. Use commas for individual pages and hyphens for ranges — for example "1-3, 5, 7-9" converts pages 1, 2, 3, 5, 7, 8, and 9.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can export to JPG (best for photos, smaller file sizes), PNG (lossless, great for text-heavy PDFs), or WebP (modern format, excellent compression). JPG and WebP have a quality slider; PNG is always lossless.',
      },
    },
    {
      '@type': 'Question',
      name: 'What resolution will the images be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You choose the render scale: 1x (72 DPI) for screen use, 2x (144 DPI, default) for general quality, or 3x (216 DPI) for archival or print-quality output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert a multi-page PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — there is no page limit. After loading your PDF, pdftoimage.app shows the total page count and converts every page or your custom range. When 2 or more pages are ready, a Download All as ZIP button appears.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a file size limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The soft limit is 50MB per PDF. Very large PDFs may be slow to convert at 3x scale because all rendering happens on your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my PDF converting slowly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Conversion speed depends on your device, the number of pages, and the render scale. At 3x scale each page takes longer. Try 2x scale for a good balance of quality and speed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is pdftoimage.app completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No signup, no account, no watermarks on output images. The tool is ad-supported to stay free for everyone.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from other PDF to image converters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most online PDF converters upload your file to their servers, creating privacy and security risks. pdftoimage.app does everything locally in your browser using PDF.js — the same library that powers PDF viewing in Firefox. Your document never leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I verify my PDF is not being uploaded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Open DevTools (F12), click the Network tab, then drop your PDF and click Convert. You will see zero outbound requests to any server during conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert PDF to JPG without uploading to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — pdftoimage.app converts PDF pages to images entirely in your browser using Mozilla's PDF.js library. Your PDF file is never transmitted to any server. Unlike most PDF to JPG converters that upload your document to process it remotely, pdftoimage.app processes everything locally on your device. You can verify this yourself by opening your browser DevTools, clicking the Network tab, and converting a PDF — you will see zero outbound file transfer requests during the entire conversion.",
      },
    },
  ],
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF to Image Converter',
  url: 'https://pdftoimage.app',
  description:
    'Free online PDF to image converter. Convert PDF pages to JPG, PNG or WebP instantly in your browser. No upload required.',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert PDF to Images',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Drop your PDF',
      text: 'Drag and drop your PDF file onto the upload zone, or click to browse. No account needed.',
    },
    {
      '@type': 'HowToStep',
      name: 'Choose format and quality',
      text: 'Select JPG, PNG or WebP output. Adjust quality (for JPG/WebP) and render scale. Optionally specify a custom page range.',
    },
    {
      '@type': 'HowToStep',
      name: 'Download your images',
      text: 'Click Convert to Images. Download each page individually or use Download All as ZIP when multiple pages are ready.',
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 hero-section" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        {/* Logo */}
        <span
          className="absolute top-5 left-5 z-20 font-mono font-semibold tracking-tight text-white text-lg sm:text-xl"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
        >
          pdftoimage.app
        </span>

        {/* Hero text */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-14 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-xs text-white mb-5 shadow-sm">
            <span>&#128274;</span>
            <span>Your PDF never leaves your device</span>
          </div>

          <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              PDF to Image{' '}
              <span className="text-blue-200">Converter</span>
              <br className="hidden sm:block" />
              <span className="text-3xl sm:text-4xl font-bold"> — Free, No Upload</span>
            </h1>
            <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
              Convert PDF to JPG, PNG or WebP instantly in your browser. Every page, no upload
              required, and your PDF never leaves your device.
            </p>
            <p className="mt-2 text-sm text-white/60 max-w-xl mx-auto">
              Convert PDF to JPG without uploading — everything stays on your device.
            </p>
          </div>

          <div className="mt-5">
            <AdBanner slot="1234567890" />
          </div>
        </div>

        {/* Converter card */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 pt-4 pb-6">
            <ConverterWrapper />
          </div>
        </div>
      </section>

      {/* Below converter */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 pt-10 pb-4 min-h-[120px]">
          <AdBanner slot="0987654321" />
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How to Convert PDF to Images
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Drop your PDF',
                desc: 'Drag and drop any PDF file onto the upload zone or click to browse. No account or signup needed.',
              },
              {
                step: '2',
                title: 'Choose format and quality',
                desc: 'Select JPG, PNG or WebP output. Set quality, render scale (1\u00d7 to 3\u00d7), and optionally a custom page range.',
              },
              {
                step: '3',
                title: 'Download your images',
                desc: 'Download pages individually or grab everything as a ZIP. Your pdf to jpg conversion stays entirely on your device.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-sm">
                  {s.step}
                </div>
                <p className="font-semibold text-gray-800 mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="max-w-3xl mx-auto px-4 pt-2 pb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Free, Private &amp; No Upload Required
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: '&#128274;', label: 'No Upload', sub: 'PDF never leaves your device' },
              { icon: '&#9889;', label: 'Instant', sub: 'Browser-native speed' },
              { icon: '&#128196;', label: 'All Pages', sub: 'No page limit' },
              { icon: '&#10003;', label: 'Free', sub: 'No signup needed' },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <span
                  className="text-2xl mb-1"
                  dangerouslySetInnerHTML={{ __html: t.icon }}
                />
                <span className="text-sm font-semibold text-gray-800">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy callout */}
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 px-6 py-5">
            <h2 className="text-base font-bold text-blue-900 mb-2">
              &#128274; Why &ldquo;no upload&rdquo; actually matters
            </h2>
            <p className="text-sm text-blue-800 leading-relaxed">
              Most pdf to image converters send your file to a remote server. That means your
              contracts, medical records, and financial documents pass through someone else&apos;s
              infrastructure. pdftoimage.app is different: your PDF is rendered locally using
              Mozilla&apos;s PDF.js library &mdash; the same engine built into Firefox. No data is
              transmitted. You can verify this by opening DevTools &rarr; Network tab &mdash; zero
              outbound requests during conversion.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <FAQ />
        </div>

        {/* Ad below FAQ */}
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <AdBanner slot="1122334455" />
        </div>
      </section>

      <Footer />
    </>
  )
}
