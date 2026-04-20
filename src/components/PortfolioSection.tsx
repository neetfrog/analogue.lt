import { useState, useRef, useEffect, type TouchEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { weddingImages } from '../data/content'
import { ImageLightbox } from './ImageLightbox'

type MotionVariants = Variants

type PortfolioSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
}

export function PortfolioSection({ fadeInUp, staggerContainer }: PortfolioSectionProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const lastTapRef = useRef<number>(0)

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeImage) {
        setActiveImage(null)
      }
    }

    if (!activeImage) {
      return
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">Selected Work</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Portfolio</h2>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.8, delay: 0.15 }}
              className="text-stone-500 text-lg font-light mt-4"
            >
              A short edit of recent wedding work
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weddingImages.map((item, i) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => handleImageOpen(item.image)}
                  aria-label={`Open ${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-stone-200 aspect-[4/5] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm opacity-80">{item.location}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {activeImage && (
        <ImageLightbox
          image={activeImage}
          alt="Enlarged portfolio"
          zoomed={zoomed}
          onClose={() => setActiveImage(null)}
          onToggleZoom={handleImageDoubleClick}
          onTouchEnd={handleImageTouchEnd}
        />
      )}
    </section>
  )
}
