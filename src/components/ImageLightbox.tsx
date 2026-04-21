import type { TouchEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ImageLightboxProps = {
  image: string
  alt: string
  zoomed: boolean
  reduceMotion?: boolean
  onClose: () => void
  onToggleZoom: () => void
  onTouchEnd: (event: TouchEvent<HTMLImageElement>) => void
  onPrev: () => void
  onNext: () => void
}

export function ImageLightbox({ image, alt, zoomed, reduceMotion, onClose, onToggleZoom, onTouchEnd, onPrev, onNext }: ImageLightboxProps) {
  const isReducedMotion = reduceMotion ?? false
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isReducedMotion ? 0.18 : 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        aria-label="Close preview"
      >
        <X size={20} />
      </button>

      <div className="relative max-h-[90vh] max-w-full overflow-visible rounded-3xl bg-black">
        <button
          type="button"
          className="absolute left-[-3rem] top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
          onClick={(event) => {
            event.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
        >
          <span className="text-2xl">‹</span>
        </button>

        <button
          type="button"
          className="absolute right-[-3rem] top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
          onClick={(event) => {
            event.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
        >
          <span className="text-2xl">›</span>
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: zoomed ? 1.8 : 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.18 : 0.25 }}
            drag={zoomed}
            dragMomentum={false}
            dragElastic={0.3}
            dragConstraints={{ left: -220, right: 220, top: -220, bottom: 220 }}
            className="relative max-h-[90vh] w-full rounded-3xl object-contain shadow-2xl bg-black"
            style={{ transformOrigin: 'center center' }}
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={(event) => {
              event.stopPropagation()
              onToggleZoom()
            }}
            onTouchEnd={onTouchEnd}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
