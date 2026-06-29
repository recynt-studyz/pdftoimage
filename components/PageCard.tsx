'use client'

export interface PageResult {
  pageNum: number
  dataUrl: string
  objectUrl: string
  sizeBytes: number
}

export default function PageCard({
  page,
  format,
  fileName,
}: {
  page: PageResult
  format: string
  fileName: string
}) {
  const ext = format === 'jpg' ? 'jpg' : format
  const baseName = fileName.replace(/\.pdf$/i, '')
  const downloadName = `${baseName}-page-${page.pageNum}.${ext}`

  const sizeLabel =
    page.sizeBytes >= 1024 * 1024
      ? `${(page.sizeBytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(page.sizeBytes / 1024)} KB`

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col">
      <div
        className="bg-gray-50 flex items-center justify-center p-2"
        style={{ aspectRatio: '3/4' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.dataUrl}
          alt={`Page ${page.pageNum}`}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">Page {page.pageNum}</span>
          <span className="text-xs text-gray-400">{sizeLabel}</span>
        </div>
        <a
          href={page.objectUrl}
          download={downloadName}
          className="block w-full text-center py-1.5 px-3 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition"
        >
          Download
        </a>
      </div>
    </div>
  )
}
