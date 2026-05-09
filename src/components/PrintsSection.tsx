import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { printsImages } from '../data/content'
import { TypewriterText } from './TypewriterText'
import type { PortfolioTranslations } from '../i18n'

type PrintsSectionProps = {
  t: PortfolioTranslations
  reduceMotion?: boolean
}

export function PrintsSection({ t, reduceMotion }: PrintsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [descriptionComplete, setDescriptionComplete] = useState(false)
  const isReducedMotion = reduceMotion ?? false
  const typewriterDelayMs = 150
  const typewriterSpeedMs = 35

  const [isMobile, setIsMobile] = useState(false)
  const [panOffset, setPanOffset] = useState(() => {
    const x = (Math.random() * 4 - 2).toFixed(2)
    const y = (Math.random() * 2.6 - 1.3).toFixed(2)
    return {
      xStart: '0%',
      yStart: '0%',
      xEnd: `${x}%`,
      yEnd: `${y}%`
    }
  })

  useEffect(() => {
    setDescriptionComplete(false)
  }, [t.description])

  const getRandomPan = () => {
    const x = (Math.random() * (isMobile ? 6 : 4) - (isMobile ? 3 : 2)).toFixed(2)
    const y = (Math.random() * (isMobile ? 4.2 : 2.6) - (isMobile ? 2.1 : 1.3)).toFixed(2)
    return {
      xEnd: `${x}%`,
      yEnd: `${y}%`
    }
  }

  const slideDurationSeconds = 6

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % printsImages.length)
    }, slideDurationSeconds * 1000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true)
      return
    }

    const handleLoad = () => setPageLoaded(true)
    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const query = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const nextSlide = printsImages[(currentSlide + 1) % printsImages.length]
    if (nextSlide) {
      const image = new Image()
      image.src = nextSlide.image
    }
  }, [currentSlide])

  useEffect(() => {
    setPanOffset((current) => ({
      xStart: current.xEnd,
      yStart: current.yEnd,
      ...getRandomPan()
    }))
  }, [currentSlide])

  return (
    <section className="w-full h-[calc(100svh-6rem)] md:h-[calc(100svh-7rem)] min-h-[calc(100svh-6rem)] md:min-h-[calc(100svh-7rem)] flex items-center justify-center px-6 relative overflow-hidden text-center bg-black" style={{ overscrollBehavior: 'none' }}>
      <div className="fixed inset-0 overflow-hidden bg-black">
        <AnimatePresence mode="sync">
          <motion.img
            key={printsImages[currentSlide].image}
            src={printsImages[currentSlide].image}
            alt={printsImages[currentSlide].title}
            loading={currentSlide === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{
              backgroundColor: '#000',
              filter: 'brightness(0.65)',
              willChange: 'opacity, transform',
              transformOrigin: 'center center',
              objectPosition: 'center'
            }}
            initial={{ opacity: 0, scale: 1.02, x: panOffset.xStart, y: panOffset.yStart }}
            animate={{ opacity: 1, scale: isMobile ? 1.08 : 1.06, x: panOffset.xEnd, y: panOffset.yEnd }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'linear' } }}
            transition={{
              opacity: { duration: 0.8, ease: 'linear' },
              scale: { duration: slideDurationSeconds, ease: 'linear' },
              x: { duration: slideDurationSeconds, ease: 'linear' },
              y: { duration: slideDurationSeconds, ease: 'linear' }
            }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-[min(92vw,72rem)] mx-auto h-full flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-amber-200 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            {t.eyebrow}
          </p>
        </div>

        <h1 className="text-[clamp(3.75rem,8vw,5.5rem)] md:text-[clamp(4.5rem,7vw,6.75rem)] lg:text-[clamp(5.25rem,6vw,8rem)] font-bold tracking-tight leading-none mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          {t.title}
        </h1>

        <div className="text-stone-100/80 max-w-[min(80vw,44rem)] mx-auto mb-12 leading-relaxed">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: isReducedMotion ? 0.6 : 0.8, delay: pageLoaded ? 0.15 : 0 }}
            className="inline-block text-base sm:text-lg md:text-xl font-medium tracking-tight"
          >
            <TypewriterText
              text={t.description}
              reduceMotion={isReducedMotion}
              className="whitespace-pre-wrap"
              delay={typewriterDelayMs}
              speed={typewriterSpeedMs}
              onComplete={() => setDescriptionComplete(true)}
            />
          </motion.span>
          <motion.div
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isReducedMotion ? 0.5 : 0.6, delay: isReducedMotion ? 0.2 : 1.8 }}
            className="mx-auto my-6 h-px w-16 rounded-full bg-white/20"
          />
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: descriptionComplete ? 1 : 0 }}
            transition={{ duration: isReducedMotion ? 0.6 : 0.8, delay: descriptionComplete ? 0.15 : 0 }}
            className="inline-block rounded-full border border-amber-400/60 px-5 py-2 text-amber-400/80 transition duration-200 hover:border-amber-400 hover:text-amber-400 hover:bg-amber-400/5"
          >
            {t.contactForPrints || 'Inquire'}
          </motion.a>
        </div>
      </div>

      <div
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
        style={{ bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {printsImages.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to print ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-8 bg-white/90'
                : 'w-2.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
