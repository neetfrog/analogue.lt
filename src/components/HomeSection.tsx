import { useState, useEffect } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Film, Heart, Sparkles } from 'lucide-react'
import { homeSlides } from '../data/content'

type MotionVariants = Variants

type HomeSectionProps = {
  fadeInUp: MotionVariants
}

export function HomeSection({ fadeInUp }: HomeSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlides.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={homeSlides[currentSlide]}
            src={homeSlides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35" />
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

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Fine Art Photography
          </p>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6"
        >
          analogue.lt
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-stone-500 max-w-lg mx-auto mb-12 font-light leading-relaxed"
        >
          Capturing love stories on film — timeless, authentic, forever.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-stone-400">
            <Film size={18} />
            <span className="text-sm">Film Only</span>
          </div>
          <div className="w-px h-4 bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400">
            <Heart size={18} />
            <span className="text-sm">Based in NYC</span>
          </div>
          <div className="w-px h-4 bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400">
            <Sparkles size={18} />
            <span className="text-sm">Worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
