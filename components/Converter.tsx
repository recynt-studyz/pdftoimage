'use client'

import { useState, useRef, useEffect } from 'react'
import JSZip from 'jszip'
import PageCard from './PageCard'
import type { PageResult } from './PageCard'

type OutputFormat = 'jpg' | 'png' | 'webp'
type Scale = 1 | 2 | 3
type AppStatus = 'idle' | 'loading' | 'loaded' | 'converting' | 'done' | 'error'

export default function Converter() {
  const [status, setStatus] = useState<AppStatus>('idle')
  const [fileName, setFileName] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [format, setFormat] = useState<OutputFormat>('jpg')
  const [quality, setQuality] = useState(85)
  const [scale, setScale] = useState<Scale>(2)
  const [pageRange, setPageRange] = useState<'all' | 'custom'>('all')
  const [customRange, setCustomRange] = useState('')
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [pages, setPages] = useState<PageResult[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [dragging, setDragging] = useState(false)

  const pdfDocRef = useRef<any>(null)
  const objectUrlsRef = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function parsePageNumbers(rangeStr: string, total: number): number[] {
    const nums: number[] = []
    rangeStr.split(',').forEach((part) => {
      const t = part.trim()
      const dashIdx = t.indexOf('-')
      if (dashIdx > 0) {
        const start = parseInt(t.slice(0, dashIdx))
        const end = parseInt(t.slice(dashIdx + 1))
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(total, end); i++) {
            if (!nums.includes(i)) nums.push(i)
          }
        }
      } else {
        const n = parseInt(t)
        if (!isNaN(n) && n >= 1 && n <= total && !nums.includes(n)) nums.push(n)
      }
    })
    return nums.sort((a, b) => a - b)
  }

  async function loadFile(file: File) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please select a PDF file.')
      setStatus('error')
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('This file exceeds the 50MB limit. Please use a smaller PDF.')
      setStatus('error')
      return
    }

    setFileName(file.name)
    setStatus('loading')
    setErrorMsg('')
    setPages([])
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    objectUrlsRef.current = []

    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.mjs',
        import.meta.url
      ).toString()

      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      pdfDocRef.current = pdf
      setPageCount(pdf.numPages)
      setStatus('loaded')
    } catch (e) {
      console.error(e)
      setErrorMsg('Could not load this PDF. It may be corrupted or password-protected.')
      setStatus('error')
    }
  }

  async function convert() {
    if (!pdfDocRef.current) return
    const pdf = pdfDocRef.current

    const pagesToConvert =
      pageRange === 'all'
        ? Array.from({ length: pdf.numPages }, (_, i) => i + 1)
        : parsePageNumbers(customRange, pdf.numPages)

    if (pagesToConvert.length === 0) {
      setErrorMsg('No valid pages in the specified range.')
      setStatus('error')
      return
    }

    setStatus('converting')
    setProgress({ current: 0, total: pagesToConvert.length })
    setPages([])
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    objectUrlsRef.current = []

    const mimeType =
      format === 'jpg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp'
    const qualityRatio = format === 'png' ? undefined : quality / 100
    const results: PageResult[] = []

    try {
      for (let idx = 0; idx < pagesToConvert.length; idx++) {
        const pageNum = pagesToConvert[idx]
        setProgress({ current: idx + 1, total: pagesToConvert.length })

        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
            mimeType,
            qualityRatio
          )
        })

        const objectUrl = URL.createObjectURL(blob)
        objectUrlsRef.current.push(objectUrl)

        const dataUrl = canvas.toDataURL(mimeType, qualityRatio)

        results.push({ pageNum, dataUrl, objectUrl, sizeBytes: blob.size })
        setPages([...results])
      }

      setStatus('done')
    } catch (e) {
      console.error(e)
      setErrorMsg('Conversion failed. The PDF may be corrupted or password-protected.')
      setStatus('error')
    }
  }

  async function downloadAll() {
    if (!pages.length) return
    const zip = new JSZip()
    const ext = format === 'jpg' ? 'jpg' : format
    const baseName = fileName.replace(/\.pdf$/i, '')
    for (const page of pages) {
      const base64 = page.dataUrl.split(',')[1]
      zip.file(`${baseName}-page-${page.pageNum}.${ext}`, base64, { base64: true })
    }
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${baseName}-pages.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  function reset() {
    pdfDocRef.current = null
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    objectUrlsRef.current = []
    setStatus('idle')
    setPages([])
    setPageCount(0)
    setFileName('')
    setErrorMsg('')
    setProgress({ current: 0, total: 0 })
    setCustomRange('')
    setPageRange('all')
  }

  const converting = status === 'converting'
  const showOptions = status === 'loaded' || status === 'converting' || status === 'done'

  return (
    <div className="space-y-5">
      {/* Upload zone */}
      {status === 'idle' && (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const f = e.dataTransfer.files[0]
            if (f) loadFile(f)
          }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            dragging
              ? 'border-[#2563EB] bg-blue-50'
              : 'border-gray-200 hover:border-[#2563EB] hover:bg-blue-50/30'
          }`}
        >
          <div className="text-5xl mb-3">📄</div>
          <p className="font-semibold text-gray-700">Drop your PDF here</p>
          <p className="text-sm text-gray-400 mt-1">or click to browse · max 50MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                loadFile(f)
                e.target.value = ''
              }
            }}
          />
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-8 text-center">
          <div className="text-3xl mb-2 inline-block animate-spin">&#9881;</div>
          <p className="text-sm font-medium text-blue-700">Loading PDF…</p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 flex gap-3">
          <span className="text-xl shrink-0">&#9888;&#65039;</span>
          <div>
            <p className="text-sm font-medium text-red-800">{errorMsg}</p>
            <button
              onClick={reset}
              className="mt-1.5 text-xs text-[#2563EB] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Options panel */}
      {showOptions && (
        <div className="space-y-4">
          {/* File info */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[240px]">
                {fileName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {pageCount} page{pageCount !== 1 ? 's' : ''} detected
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-gray-600 transition shrink-0 ml-2"
            >
              &#10005; New file
            </button>
          </div>

          {/* Format */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Output Format
            </p>
            <div className="flex gap-2">
              {(['jpg', 'png', 'webp'] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  disabled={converting}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-1.5 text-sm rounded-lg border font-semibold transition ${
                    format === f
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] disabled:opacity-50'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          {format !== 'png' && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Quality — {quality}%
              </p>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                disabled={converting}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-[#2563EB] disabled:opacity-50"
              />
            </div>
          )}

          {/* Scale */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Resolution
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { s: 1 as Scale, label: '1\u00d7 (72 DPI)' },
                  { s: 2 as Scale, label: '2\u00d7 (144 DPI)' },
                  { s: 3 as Scale, label: '3\u00d7 (216 DPI)' },
                ] as const
              ).map(({ s, label }) => (
                <button
                  key={s}
                  disabled={converting}
                  onClick={() => setScale(s)}
                  className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition ${
                    scale === s
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] disabled:opacity-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Page range */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Pages
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <button
                disabled={converting}
                onClick={() => setPageRange('all')}
                className={`px-4 py-1.5 text-sm rounded-lg border font-medium transition ${
                  pageRange === 'all'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] disabled:opacity-50'
                }`}
              >
                All pages
              </button>
              <button
                disabled={converting}
                onClick={() => setPageRange('custom')}
                className={`px-4 py-1.5 text-sm rounded-lg border font-medium transition ${
                  pageRange === 'custom'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] disabled:opacity-50'
                }`}
              >
                Custom range
              </button>
              {pageRange === 'custom' && (
                <input
                  type="text"
                  placeholder="e.g. 1-3, 5, 7-9"
                  value={customRange}
                  disabled={converting}
                  onChange={(e) => setCustomRange(e.target.value)}
                  className="flex-1 min-w-[160px] px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#2563EB] disabled:opacity-50"
                />
              )}
            </div>
          </div>

          {/* Convert button */}
          <button
            onClick={convert}
            disabled={converting || (pageRange === 'custom' && !customRange.trim())}
            className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'done' ? 'Reconvert with New Settings' : 'Convert to Images'}
          </button>
        </div>
      )}

      {/* Progress bar */}
      {status === 'converting' && progress.total > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-center text-blue-700 font-medium">
            Converting page {progress.current} of {progress.total}&hellip;
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Download all ZIP */}
      {pages.length >= 2 && (
        <button
          onClick={downloadAll}
          className="w-full py-2.5 rounded-xl border-2 border-[#2563EB] text-[#2563EB] font-semibold text-sm hover:bg-blue-50 transition"
        >
          &#8681; Download All as ZIP ({pages.length} images)
        </button>
      )}

      {/* Page cards */}
      {pages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {pages.map((page) => (
            <PageCard key={page.pageNum} page={page} format={format} fileName={fileName} />
          ))}
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-2 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-500 leading-relaxed">
        <span className="font-semibold text-gray-700">
          &#128274; Your PDF never leaves your device.
        </span>{' '}
        Your PDF is rendered locally using Mozilla&apos;s PDF.js library. No data is transmitted.
        You can verify this by opening DevTools &rarr; Network tab &mdash; zero outbound requests
        during conversion.
      </div>
    </div>
  )
}
