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