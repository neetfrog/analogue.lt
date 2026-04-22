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

  const shuffleArray = <T,>(array: T[]) => {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  const [shuffledImages] = useState(() => shuffleArray(eventImages))

  const animationVariants = [
    'portfolio-image-animate-1',
    'portfolio-image-animate-2',
    'portfolio-image-animate-3',
    'portfolio-image-animate-4',
    'portfolio-image-animate-5',
    'portfolio-image-animate-6'
  ]

  const [imageAnimationClasses] = useState(() =>
    shuffledImages.map(() => animationVariants[Math.floor(Math.random() * animationVariants.length)])
  )

  const [imageAnimationDelays] = useState(() =>
    shuffledImages.map(() => -Math.random() * 18)
  )

  const activeIndex = activeImage ? shuffledImages.findIndex((item) => item.image === activeImage) : -1

  const goToPreviousImage = () => {
    if (activeIndex > 0) {
      setActiveImage(shuffledImages[activeIndex - 1].image)
      setZoomed(false)
    }
  }

  const goToNextImage = () => {
    if (activeIndex >= 0 && activeIndex < shuffledImages.length - 1) {
      setActiveImage(shuffledImages[activeIndex + 1].image)
      setZoomed(false)
    }
  }

  const itemLayouts = [
    'aspect-[4/5]',
    'aspect-square',
    'aspect-[5/4]',
    'aspect-[5/3]',
    'aspect-[3/4]',
    'aspect-[4/3]'
  ]

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
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior

    if (activeImage) {
      document.body.dataset.lightboxOpen = 'true'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.documentElement.style.overscrollBehavior = 'none'
    } else {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }

    return () => {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }
  }, [activeImage])

  return (
    <section className="w-full min-h-screen flex items-center px-4 md:px-6 lg:px-8 py-16 pt-24 relative">
      <div className="max-w-none mx-auto w-full">
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

          <motion.div variants={fadeInUp} className="grid gap-4 auto-rows-min">
            <div className="columns-2 md:columns-3 lg:columns-4 space-y-1" style={{ columnGap: '0.6rem' }}>
              {shuffledImages.map((item, i) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => handleImageOpen(item.image)}
                  aria-label={t.openImage.replace('{title}', item.title)}
                  initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: isReducedMotion ? 0.25 : 0.35 }}
                  className={`group relative inline-block w-full overflow-hidden rounded-3xl bg-stone-200 ${itemLayouts[i % itemLayouts.length]} cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 break-inside-avoid`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{ animationDelay: `${imageAnimationDelays[i]}s` }}
                    className={`absolute inset-0 w-full h-full object-cover portfolio-image-animate ${imageAnimationClasses[i]} transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1`}
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
