import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #b91c1c, #dc2626)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}>
          {/* PDF page */}
          <div style={{
            width: 14,
            height: 18,
            borderRadius: 2,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 7,
              fontWeight: 900,
              color: '#dc2626',
            }}>PDF</span>
          </div>
          {/* Arrow */}
          <span style={{
            fontSize: 10,
            color: 'white',
            fontWeight: 900,
          }}>→</span>
          {/* Image page */}
          <div style={{
            width: 14,
            height: 18,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 10,
            }}>🖼</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
