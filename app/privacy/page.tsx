import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — pdftoimage.app',
  description: 'Privacy policy for pdftoimage.app. Your PDF is never uploaded or stored.',
  alternates: {
    canonical: 'https://pdftoimage.app/privacy',
  },
}

export default function Privacy() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-14 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>
            <strong>Last updated: June 2025</strong>
          </p>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Client-Side Processing — No PDF Uploads
            </h2>
            <p>
              pdftoimage.app processes all PDF files entirely within your browser using Mozilla&apos;s
              PDF.js library and the Canvas API. Your PDF files are never transmitted to any server,
              never stored, and never seen by anyone other than you. You can disconnect from the
              internet after the page loads and the converter will continue to work perfectly.
            </p>
            <p className="mt-2">
              You can verify this yourself: open your browser&apos;s DevTools (press F12), navigate
              to the Network tab, then drop your PDF and click Convert. You will observe zero
              outbound requests to any server during conversion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Data We Do Not Collect</h2>
            <p>We do not collect, store, or transmit:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your PDF files or their contents</li>
              <li>The images generated from your PDF</li>
              <li>Your name, email address, or any personal identifiers</li>
              <li>File names or metadata from your documents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Google AdSense</h2>
            <p>
              This site displays advertisements served by Google AdSense (Publisher ID:
              ca-pub-8792838105001561). Google may use cookies and similar technologies to serve
              personalized ads based on your browsing activity across websites. These cookies are
              set by Google, not by pdftoimage.app.
            </p>
            <p className="mt-2">
              You can opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Ad Settings
              </a>
              . For more information on how Google uses data from sites that use its services, see
              Google&apos;s Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Analytics</h2>
            <p>
              We may use anonymized analytics (e.g. page view counts) to understand traffic
              patterns. No personally identifiable information is collected.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. Changes will be reflected by the updated date
              at the top of this page.
            </p>
          </section>

          <p>
            <a href="/" className="text-[#2563EB] hover:underline">
              &larr; Back to the converter
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
