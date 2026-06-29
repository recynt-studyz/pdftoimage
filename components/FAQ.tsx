const faqs = [
  {
    q: 'Does this upload my PDF to a server?',
    a: 'No. pdftoimage.app is a fully client-side tool. Your PDF is loaded directly into your browser using Mozilla\'s PDF.js library and rendered to images using the Canvas API. Nothing is transmitted to any server. You can disconnect from the internet after the page loads and the converter will still work.',
  },
  {
    q: 'How do I convert a PDF to JPG?',
    a: 'Drop your PDF onto the upload zone (or click to browse), select JPG as the output format, adjust quality if needed (85% is a great default), then click "Convert to Images". Each page is rendered individually. Download pages one at a time or grab all pages as a ZIP file.',
  },
  {
    q: 'Can I convert specific pages of a PDF?',
    a: 'Yes. After loading your PDF, switch the Pages selector to "Custom range" and enter your page numbers. Use commas for individual pages and hyphens for ranges — for example "1-3, 5, 7-9" converts pages 1, 2, 3, 5, 7, 8, and 9.',
  },
  {
    q: 'What image formats are supported?',
    a: 'You can export to JPG (best for photos, smaller file sizes), PNG (lossless, great for text-heavy PDFs), or WebP (modern format, excellent compression). JPG and WebP have a quality slider; PNG is always lossless.',
  },
  {
    q: 'What resolution will the images be?',
    a: 'You choose the render scale: 1× (72 DPI) for screen use, 2× (144 DPI, default) for general quality, or 3× (216 DPI) for archival or print-quality output. Higher scale means larger images and longer conversion time for big PDFs.',
  },
  {
    q: 'Can I convert a multi-page PDF?',
    a: 'Yes — there is no page limit. After loading your PDF, pdftoimage.app shows the total page count and converts every page (or your custom range) one by one. When 2 or more pages are ready, a "Download All as ZIP" button appears.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'The soft limit is 50MB per PDF. Very large PDFs (hundreds of pages) may be slow to convert at 3× scale because all rendering happens on your device using your CPU. For archival work, convert in batches using the custom page range feature.',
  },
  {
    q: 'Why is my PDF converting slowly?',
    a: 'Conversion speed depends on your device, the number of pages, and the render scale. At 3× scale each page takes longer because the canvas resolution is much higher. Try 2× scale for a good balance of quality and speed. Reducing the page range also helps.',
  },
  {
    q: 'Is pdftoimage.app completely free?',
    a: 'Yes, completely free. No signup, no account, no watermarks on output images, no file size cap beyond the 50MB soft limit. The tool is ad-supported to stay free for everyone.',
  },
  {
    q: 'How is this different from other PDF to image converters?',
    a: 'Most online PDF converters upload your file to their servers, which creates privacy and security risks. pdftoimage.app does everything locally in your browser using PDF.js — the same library that powers PDF viewing in Firefox. Your document never leaves your device, making it safe for sensitive files like contracts, medical records, or financial documents.',
  },
  {
    q: 'Can I verify my PDF is not being uploaded?',
    a: 'Yes, easily. Open your browser\'s DevTools (press F12), click the Network tab, then drop your PDF and click Convert. You will see zero outbound requests to any server during conversion. The only network activity is loading the page itself — after that, everything is local.',
  },
  {
    q: 'Can I convert PDF to JPG without uploading to a server?',
    a: 'Yes — pdftoimage.app converts PDF pages to images entirely in your browser using Mozilla\'s PDF.js library. Your PDF file is never transmitted to any server. Unlike most PDF to JPG converters that upload your document to process it remotely, pdftoimage.app processes everything locally on your device. You can verify this yourself by opening your browser DevTools, clicking the Network tab, and converting a PDF — you will see zero outbound file transfer requests during the entire conversion.',
  },
]

export default function FAQ() {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-xl border border-gray-100 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-gray-800 hover:text-[#2563EB] transition">
              {faq.q}
              <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
