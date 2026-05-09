import { useEffect, useState } from 'react'
import type { TouchEvent } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
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

export function ImageLightbox({ image, alt, zoomed, reduceMotion, onClose, onToggleZoom, onTouchEnd }: ImageLightboxProps) {
  const isReducedMotion = reduceMotion ?? false
  const controls = useAnimationControls()
  const [pinchInitialDistance, setPinchInitialDistance] = useState<number | null>(null)
  const [pinchScale, setPinchScale] = useState(1)
  const [isPinching, setIsPinching] = useState(false)

  const getPinchDistance = (
    firstTouch: { clientX: number; clientY: number },
    secondTouch: { clientX: number; clientY: number }
  ) => {
    const dx = firstTouch.clientX - secondTouch.clientX
    const dy = firstTouch.clientY - secondTouch.clientY
    return Math.hypot(dx, dy)
  }

  useEffect(() => {
    const targetScale = isPinching ? pinchScale : zoomed ? 1.8 : 1
    controls.start({
      opacity: 1,
      scale: targetScale,
      x: 0,
      y: 0,
      transition: { duration: isReducedMotion ? 0.18 : 0.25 }
    })
  }, [controls, image, zoomed, isReducedMotion, isPinching, pinchScale])

  const handleTouchStart = (event: TouchEvent<HTMLImageElement>) => {
    if (event.touches.length === 2) {
      setIsPinching(true)
      setPinchInitialDistance(getPinchDistance(event.touches[0], event.touches[1]))
      setPinchScale(zoomed ? 1.8 : 1)
    }
  }

  const handleTouchMove = (event: TouchEvent<HTMLImageElement>) => {
    if (!isPinching || event.touches.length !== 2 || pinchInitialDistance === null) {
      return
    }

    event.preventDefault()
    const distance = getPinchDistance(event.touches[0], event.touches[1])
    const scale = Math.max(1, Math.min((zoomed ? 1.8 : 1) * (distance / pinchInitialDistance), 3))
    setPinchScale(scale)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLImageElement>) => {
    if (isPinching) {
      const finalScale = pinchScale
      const shouldZoom = finalScale > 1.2

      if (shouldZoom !== zoomed) {
        onToggleZoom()
      }

      setIsPinching(false)
      setPinchInitialDistance(null)
      setPinchScale(1)
      controls.start({
        scale: shouldZoom ? 1.8 : 1,
        x: 0,
        y: 0,
        transition: { duration: isReducedMotion ? 0.18 : 0.25 }
      })
      return
    }

    onTouchEnd(event)
  }

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
        className="absolute top-6 right-6 z-20 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        aria-label="Close preview"
      >
        <X size={20} />
      </button>

      <div className="relative max-h-[90vh] max-w-full overflow-visible rounded-3xl bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            src={image}
            alt={alt}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
            animate={controls}
            exit={{ opacity: 0 }}
            drag={zoomed}
            dragMomentum={false}
            dragElastic={0.3}
            dragConstraints={{ left: -220, right: 220, top: -220, bottom: 220 }}
            className="relative z-10 max-h-[90vh] w-full rounded-3xl object-contain shadow-2xl bg-black"
            style={{ transformOrigin: 'center center', touchAction: 'none' }}
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={(event) => {
              event.stopPropagation()
              onToggleZoom()
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
