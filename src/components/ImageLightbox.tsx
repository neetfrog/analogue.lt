import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { X } from 'lucide-react'

type ImageLightboxProps = {
  image: string
  alt: string
  zoomLevel: number
  reduceMotion?: boolean
  onClose: () => void
  onToggleZoom: () => void
  onSetZoomLevel: (level: number) => void
  onTouchEnd: (event: TouchEvent<HTMLImageElement>) => void
}

export function ImageLightbox({ image, alt, zoomLevel, reduceMotion, onClose, onToggleZoom, onSetZoomLevel, onTouchEnd }: ImageLightboxProps) {
  const isReducedMotion = reduceMotion ?? false
  const controls = useAnimationControls()
  const [pinchInitialDistance, setPinchInitialDistance] = useState<number | null>(null)
  const [pinchScale, setPinchScale] = useState(1)
  const [isPinching, setIsPinching] = useState(false)
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 })
  const scaleLevels = [1, 1.8, 2.8] as const
  const currentScale = scaleLevels[zoomLevel] ?? 1
  const imageWrapperRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const lastTapRef = useRef<number>(0)

  const getPinchDistance = (
    firstTouch: { clientX: number; clientY: number },
    secondTouch: { clientX: number; clientY: number }
  ) => {
    const dx = firstTouch.clientX - secondTouch.clientX
    const dy = firstTouch.clientY - secondTouch.clientY
    return Math.hypot(dx, dy)
  }

  useEffect(() => {
    const targetScale = isPinching ? pinchScale : currentScale
    const targetX = isPinching ? 0 : zoomOffset.x
    const targetY = isPinching ? 0 : zoomOffset.y

    controls.start({
      opacity: 1,
      scale: targetScale,
      x: targetX,
      y: targetY,
      transition: { duration: isReducedMotion ? 0.18 : 0.25 }
    })
  }, [controls, currentScale, image, isReducedMotion, isPinching, pinchScale, zoomOffset])

  useLayoutEffect(() => {
    const updateDragConstraints = () => {
      const wrapper = imageWrapperRef.current
      const imageEl = imageRef.current
      if (!wrapper || !imageEl) {
        setDragConstraints({ left: 0, right: 0, top: 0, bottom: 0 })
        return
      }

      const targetScale = isPinching ? pinchScale : currentScale
      const wrapperWidth = wrapper.clientWidth
      const wrapperHeight = wrapper.clientHeight
      const imageWidth = imageEl.clientWidth
      const imageHeight = imageEl.clientHeight
      const overflowX = Math.max(0, imageWidth * targetScale - wrapperWidth)
      const overflowY = Math.max(0, imageHeight * targetScale - wrapperHeight)

      setDragConstraints({
        left: -overflowX / 2,
        right: overflowX / 2,
        top: -overflowY / 2,
        bottom: overflowY / 2
      })
    }

    updateDragConstraints()
    window.addEventListener('resize', updateDragConstraints)
    return () => window.removeEventListener('resize', updateDragConstraints)
  }, [currentScale, isPinching, pinchScale, image])

  const handleTouchStart = (event: TouchEvent<HTMLImageElement>) => {
    if (event.touches.length === 2) {
      setIsPinching(true)
      setPinchInitialDistance(getPinchDistance(event.touches[0], event.touches[1]))
      setPinchScale(currentScale)
    }
  }

  const handleTouchMove = (event: TouchEvent<HTMLImageElement>) => {
    if (!isPinching || event.touches.length !== 2 || pinchInitialDistance === null) {
      return
    }

    event.preventDefault()
    const distance = getPinchDistance(event.touches[0], event.touches[1])
    const scale = Math.max(1, Math.min(currentScale * (distance / pinchInitialDistance), 3))
    setPinchScale(scale)
  }

  const getZoomOffset = (clientX: number, clientY: number, oldScale: number, newScale: number) => {
    const imageEl = imageRef.current
    if (!imageEl || oldScale === 0) {
      return { x: 0, y: 0 }
    }

    const rect = imageEl.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height))
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const factor = newScale / oldScale - 1

    return {
      x: -factor * (x - centerX),
      y: -factor * (y - centerY)
    }
  }

  const zoomAtPoint = (clientX: number, clientY: number) => {
    const nextZoomLevel = (zoomLevel + 1) % 3
    const nextScale = scaleLevels[nextZoomLevel] ?? 1
    const offset = nextZoomLevel === 0 ? { x: 0, y: 0 } : getZoomOffset(clientX, clientY, currentScale, nextScale)
    setZoomOffset(offset)
    onToggleZoom()
  }

  const handleTouchEnd = (event: TouchEvent<HTMLImageElement>) => {
    if (isPinching) {
      const finalScale = pinchScale
      const targetLevel = finalScale < 1.4 ? 0 : finalScale < 2.3 ? 1 : 2

      if (targetLevel !== zoomLevel) {
        onSetZoomLevel(targetLevel)
      }

      setIsPinching(false)
      setPinchInitialDistance(null)
      setPinchScale(1)
      setZoomOffset({ x: 0, y: 0 })
      controls.start({
        scale: scaleLevels[targetLevel],
        x: 0,
        y: 0,
        transition: { duration: isReducedMotion ? 0.18 : 0.25 }
      })
      return
    }

    const touch = event.changedTouches[0] || event.touches[0]
    if (touch) {
      const now = Date.now()
      if (now - lastTapRef.current < 300) {
        event.preventDefault()
        lastTapRef.current = 0
        zoomAtPoint(touch.clientX, touch.clientY)
        return
      }

      lastTapRef.current = now
    }

    onTouchEnd(event)
  }

  useEffect(() => {
    if (zoomLevel === 0) {
      setZoomOffset({ x: 0, y: 0 })
    }
  }, [zoomLevel])

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

      <div ref={imageWrapperRef} className="relative max-h-[90vh] max-w-full overflow-visible rounded-3xl bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            ref={imageRef}
            src={image}
            alt={alt}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
            animate={controls}
            exit={{ opacity: 0 }}
            drag={zoomLevel > 0}
            dragMomentum={false}
            dragElastic={0.3}
            dragConstraints={dragConstraints}
            className="relative z-10 max-h-[90vh] w-full rounded-3xl object-contain shadow-2xl bg-black"
            style={{ transformOrigin: 'center center', touchAction: 'none' }}
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={(event) => {
              event.stopPropagation()
              zoomAtPoint(event.clientX, event.clientY)
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
