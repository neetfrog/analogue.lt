import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { homeSlides } from '../data/content'
import type { HomeTranslations } from '../i18n'

type HomeSectionProps = {
  t: HomeTranslations
  reduceMotion?: boolean
}

export function HomeSection({ t, reduceMotion }: HomeSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pageLoaded, setPageLoaded] = useState(false)
  const isReducedMotion = reduceMotion ?? false
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

  const getRandomPan = () => {
    const x = (Math.random() * (isMobile ? 6 : 4) - (isMobile ? 3 : 2)).toFixed(2)
    const y = (Math.random() * (isMobile ? 4.2 : 2.6) - (isMobile ? 2.1 : 1.3)).toFixed(2)
    return {
      xEnd: `${x}%`,
      yEnd: `${y}%`
    }
  }

  const slideDurationSeconds = 5

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlides.length)
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
    homeSlides.forEach((slide) => {
      const image = new Image()
      image.src = slide.src
    })
  }, [])

  useEffect(() => {
    setPanOffset((current) => ({
      xStart: current.xEnd,
      yStart: current.yEnd,
      ...getRandomPan()
    }))
  }, [currentSlide])

  const textRevealVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0 0)' }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden text-center bg-black" style={{ overscrollBehavior: 'none', minHeight: '100svh' }}>
      <div className="absolute inset-0 overflow-hidden bg-black">
        <AnimatePresence mode="sync">
          <motion.img
            key={homeSlides[currentSlide].src}
            src={homeSlides[currentSlide].src}
            alt={homeSlides[currentSlide].alt}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            style={{
              backgroundColor: '#000',
              filter: 'brightness(0.72)',
              willChange: 'opacity, transform',
              transformOrigin: 'center center',
              ...(currentSlide === 2 ? { objectPosition: '70% center' } : { objectPosition: 'center' }),
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
            {t.tagline}
          </p>
        </div>

        <h1 className="text-[clamp(3.75rem,8vw,5.5rem)] md:text-[clamp(4.5rem,7vw,6.75rem)] lg:text-[clamp(5.25rem,6vw,8rem)] font-bold tracking-tight leading-none mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <img
            src={new URL('../../images/logos/newlogo.png', import.meta.url).href}
            alt="analogue.lt"
            className="mx-auto h-24 max-w-[min(80vw,28rem)] object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </h1>

        <div className="text-base sm:text-lg md:text-xl text-stone-100/80 max-w-[min(80vw,44rem)] mx-auto mb-12 font-light leading-relaxed">
          <motion.span
            initial="hidden"
            animate={isReducedMotion ? 'visible' : pageLoaded ? 'visible' : 'hidden'}
            variants={textRevealVariants}
            transition={{ duration: isReducedMotion ? 1.2 : 2, delay: pageLoaded ? 0.15 : 0 }}
            className="inline-block overflow-hidden align-middle"
          >
            {t.description}
          </motion.span>
          <span className="sr-only">
            Juostinė fotografija, juostine fotografija, analoginė fotografija, vestuvių fotografija, Vilnius
          </span>
        </div>

        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isReducedMotion ? 0.5 : 0.6, delay: 2.3 }}
          className="flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-stone-400">
            <span className="text-sm">{t.location}</span>
            <img
              src={new URL('../../images/logos/vilnius.png', import.meta.url).href}
              alt={t.locationAlt}
              className="h-5 w-5 object-contain"
            />
          </div>
        </motion.div>
      </div>

      <div
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
        style={{ bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {homeSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
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
