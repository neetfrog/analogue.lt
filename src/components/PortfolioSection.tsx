import { useState, useRef, type TouchEvent } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Film, X } from 'lucide-react'
import { weddingImages } from '../data/content'

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

  const handleImageTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      event.preventDefault()
      setZoomed((prev) => !prev)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

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
              A short edit of recent wedding work.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weddingImages.map((item, i) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => handleImageOpen(item.image)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-stone-200 aspect-[4/5] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm opacity-80">{item.location}</p>
                  </div>
                  <Film className="absolute top-4 right-4 text-white/80" size={18} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveImage(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                setActiveImage(null)
              }}
            >
              <X size={20} />
            </button>
            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Enlarged portfolio"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: zoomed ? 2 : 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              drag={zoomed}
              dragMomentum={false}
              dragElastic={0.1}
              className="max-h-[90vh] max-w-full rounded-3xl object-contain shadow-2xl"
              style={{ transformOrigin: 'center center' }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleImageDoubleClick}
              onTouchEnd={handleImageTouchEnd}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
