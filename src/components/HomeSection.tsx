import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { homeSlides } from '../data/content'
import type { HomeTranslations } from '../i18n'

type HomeSectionProps = {
  t: HomeTranslations
}

export function HomeSection({ t }: HomeSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlides.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="w-full h-[100svh] min-h-screen max-h-[100svh] flex items-center justify-center px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={homeSlides[currentSlide].src}
            src={homeSlides[currentSlide].src}
            alt={homeSlides[currentSlide].alt}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.6 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-amber-200 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            {t.tagline}
          </p>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          analogue.lt
        </h1>

        <div className="text-lg md:text-xl text-stone-100/80 max-w-lg mx-auto mb-12 font-light leading-relaxed">
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 2, delay: 0.15 }}
            className="inline-block overflow-hidden align-middle"
          >
            {t.description}
          </motion.span>
          <span className="sr-only">
            Juostinė fotografija, juostine fotografija, analoginė fotografija, vestuvių fotografija, Vilnius
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.3 }}
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
    </section>
  )
}
