'use client'

import dynamic from 'next/dynamic'

const Converter = dynamic(() => import('./Converter'), {
  ssr: false,
  loading: () => (
    <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
      Loading converter...
    </div>
  ),
})

export default function ConverterWrapper() {
  return <Converter />
}
