import { useState, useRef, useEffect, type TouchEvent, type ReactNode, type CSSProperties } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ImageLightbox } from './ImageLightbox'
import { TypewriterText } from './TypewriterText'
import type { PortfolioTranslations } from '../i18n'

type MotionVariants = Variants

type ImageItem = {
  id: number
  title: string
  location: string
  image: string
}

type ImageGalleryProps = {
  images: ImageItem[]
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  t: PortfolioTranslations
}

type Orientation = 'portrait' | 'landscape' | 'square'

export function ImageGallery({ images, fadeInUp, staggerContainer, reduceMotion, t }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [descriptionComplete, setDescriptionComplete] = useState(false)
  const [imageOrientations, setImageOrientations] = useState<Record<number, Orientation>>({})
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


  const shuffleArray = <T,>(array: T[]): T[] => {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  const [shuffledImages] = useState(() => shuffleArray(images))
  const [imageAnimationStyles] = useState<Record<number, CSSProperties>>(() =>
    images.reduce((acc, item, index) => {
      acc[item.id] = {
        animationDelay: `${-Math.random() * 18}s`,
        '--ken-burns-duration': `${19 + Math.random() * 5}s`,
        '--ken-burns-offset': `${index % 3}`
      } as CSSProperties & { [key: string]: string }
      return acc
    }, {} as Record<number, CSSProperties>)
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

  const portraitLayouts = ['aspect-[4/5]', 'aspect-[3/4]']
  const landscapeLayouts = ['aspect-[5/4]', 'aspect-[5/3]', 'aspect-[4/3]']

  useEffect(() => {
    const imageElements: HTMLImageElement[] = []

    images.forEach((item) => {
      const img = new Image()
      img.src = item.image
      img.onload = () => {
        const orientation: Orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : img.naturalWidth < img.naturalHeight ? 'portrait' : 'square'
        setImageOrientations((prev) => {
          if (prev[item.id] === orientation) {
            return prev
          }
          return { ...prev, [item.id]: orientation }
        })
      }
      imageElements.push(img)
    })

    return () => {
      imageElements.forEach((img) => {
        img.onload = null
      })
    }
  }, [images])

  const getLayoutClass = (item: ImageItem, index: number) => {
    const orientation = imageOrientations[item.id]

    if (orientation === 'portrait') {
      return portraitLayouts[index % portraitLayouts.length]
    }

    if (orientation === 'square') {
      return 'aspect-square'
    }

    if (orientation === 'landscape') {
      return landscapeLayouts[index % landscapeLayouts.length]
    }

    return itemLayouts[index % itemLayouts.length]
  }

  useEffect(() => {
    if (isReducedMotion) {
      setDescriptionComplete(true)
      return
    }

    setDescriptionComplete(false)
  }, [t.description, isReducedMotion])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeImage) return

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
    <>
      <motion.div variants={reducedStagger} initial="hidden" animate="visible">
        <motion.div variants={reducedFadeIn} className="text-center mb-12">
          <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">{t.eyebrow}</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{t.title}</h2>
          <p className="text-stone-500 text-lg font-light mt-4 whitespace-pre-wrap">
            <TypewriterText
              text={t.description}
              reduceMotion={isReducedMotion}
              className="whitespace-pre-wrap"
              delay={120}
              speed={35}
              onComplete={() => setDescriptionComplete(true)}
            />
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: descriptionComplete ? 1 : 0 }}
          transition={{ duration: isReducedMotion ? 0.6 : 0.8, delay: descriptionComplete ? 0.1 : 0 }}
          className="columns-2 md:columns-3 lg:columns-4 space-y-1"
          style={{ columnGap: '0.6rem' }}
        >
            {shuffledImages.map((item, i) => (
              <motion.button
                type="button"
                key={item.id}
                onClick={() => handleImageOpen(item.image)}
                aria-label={t.openImage.replace('{title}', item.title)}
                initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: isReducedMotion ? 0.25 : 0.35 }}
                className={`group relative inline-block w-full overflow-hidden rounded-3xl bg-stone-200 ${getLayoutClass(item, i)} cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 break-inside-avoid`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  className="ken-burns absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                  style={imageAnimationStyles[item.id]}
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

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
    </>
  )
}
