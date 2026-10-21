import { type ReactNode } from 'react'
import { type IconName } from '../shared/types'

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/>',
    camera: '<path d="M4 7h3l1.4-2h7.2L17 7h3v12H4Z"/><circle cx="12" cy="13" r="3.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c2-5 6-8 12-11"/>',
    spark: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/>',
    sensor: '<path d="M12 3v6M8.5 5a8 8 0 1 0 7 0"/><path d="M9 14a3 3 0 0 0 6 0"/>',
    voice: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    mask: '<path d="M3 8c3-2 15-2 18 0l-1 8c-.3 2-2 3-4 3h-1.5L12 15l-2.5 4H8c-2 0-3.7-1-4-3L3 8Z"/><path d="M4 9h7v5H5M20 9h-7v5h6"/>',
    waves: '<path d="M3 8c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 13c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 18c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
    archive: '<path d="M4 7h16v13H4ZM3 4h18v3H3Z"/><path d="M9 11h6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
  }
  return `<svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">${paths[name]}</svg>`
}

interface ProductPhotoProps {
  compact?: boolean
}

export function ProductPhoto({ compact = false }: ProductPhotoProps) {
  return (
    <div className={`product-photo ${compact ? 'product-photo-compact' : 'product-photo-main'}`}>
      <img
        src="/images/bluesight-mask-ar.png"
        alt="Óculos inteligentes de mergulho BlueSight com câmera e lente de realidade aumentada"
      />
    </div>
  )
}