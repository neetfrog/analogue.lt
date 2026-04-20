import type { TouchEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ImageLightboxProps = {
  image: string
  alt: string
  zoomed: boolean
  onClose: () => void
  onToggleZoom: () => void
  onTouchEnd: (event: TouchEvent<HTMLImageElement>) => void
}

export function ImageLightbox({ image, alt, zoomed, onClose, onToggleZoom, onTouchEnd }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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

        <div className="relative max-h-[90vh] max-w-full overflow-hidden rounded-3xl">
          <motion.img
            key={zoomed ? 'zoomed' : 'default'}
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{ scale: zoomed ? 1.8 : 1, x: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            drag={zoomed}
            dragMomentum={false}
            dragElastic={0.3}
            dragConstraints={{ left: -220, right: 220, top: -220, bottom: 220 }}
            className="max-h-[90vh] w-full rounded-3xl object-contain shadow-2xl"
            style={{ transformOrigin: 'center center' }}
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={(event) => {
              event.stopPropagation()
              onToggleZoom()
            }}
            onTouchEnd={onTouchEnd}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
