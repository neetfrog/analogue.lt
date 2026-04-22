import { useState, useRef, useEffect, type TouchEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { eventImages } from '../data/content'
import { ImageLightbox } from './ImageLightbox'
import type { PortfolioTranslations } from '../i18n'

type MotionVariants = Variants

type PortfolioSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  t: PortfolioTranslations
}

export function PortfolioSection({ fadeInUp, staggerContainer, reduceMotion, t }: PortfolioSectionProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const lastTapRef = useRef<number>(0)
  const isReducedMotion = reduceMotion ?? false
  const reducedFadeIn: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : fadeInUp
  const reducedStagger: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : staggerContainer

  const handleImageOpen = (image: string) => {
    setActiveImage(image)
    setZoomed(false)
  }

  const handleImageDoubleClick = () => {
    setZoomed((prev) => !prev)
  }

  const handleImageTouchEnd = (event: TouchEvent<HTMLImageElement>) => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      event.preventDefault()
      setZoomed((prev) => !prev)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  const activeIndex = activeImage ? eventImages.findIndex((item) => item.image === activeImage) : -1

  const goToPreviousImage = () => {
    if (activeIndex > 0) {
      setActiveImage(eventImages[activeIndex - 1].image)
      setZoomed(false)
    }
  }

  const goToNextImage = () => {
    if (activeIndex >= 0 && activeIndex < eventImages.length - 1) {
      setActiveImage(eventImages[activeIndex + 1].image)
      setZoomed(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeImage) {
        return
      }

      if (event.key === 'Escape') {
        setActiveImage(null)
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        goToPreviousImage()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        goToNextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage, activeIndex])

  useEffect(() => {
    if (activeImage) {
      document.body.dataset.lightboxOpen = 'true'
    } else {
      delete document.body.dataset.lightboxOpen
    }

    return () => {
      delete document.body.dataset.lightboxOpen
    }
  }, [activeImage])

  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={reducedStagger} initial="hidden" animate="visible">
          <motion.div variants={reducedFadeIn} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">{t.eyebrow}</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{t.title}</h2>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.8, delay: 0.15 }}
              className="text-stone-500 text-lg font-light mt-4"
            >
              {t.description}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {eventImages.map((item, i) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => handleImageOpen(item.image)}
                  aria-label={t.openImage.replace('{title}', item.title)}
                  initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: isReducedMotion ? 0.25 : 0.35 }}
                  className="group relative overflow-hidden rounded-3xl bg-stone-200 aspect-[4/5] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover portfolio-image-animate portfolio-image-animate-${(i % 4) + 1} transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1`}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {activeImage && (
        <ImageLightbox
          image={activeImage}
          alt={t.enlargedAlt}
          zoomed={zoomed}
          reduceMotion={isReducedMotion}
          onClose={() => setActiveImage(null)}
          onToggleZoom={handleImageDoubleClick}
          onTouchEnd={handleImageTouchEnd}
          onPrev={goToPreviousImage}
          onNext={goToNextImage}
        />
      )}
    </section>
  )
}
