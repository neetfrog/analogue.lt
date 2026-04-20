import { motion, type Variants } from 'framer-motion'
import { Film } from 'lucide-react'
import { weddingImages } from '../data/content'

type MotionVariants = Variants

type PortfolioSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
}

export function PortfolioSection({ fadeInUp, staggerContainer }: PortfolioSectionProps) {
  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">Selected Work</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Portfolio</h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid gap-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weddingImages.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-3xl bg-stone-200 aspect-[4/5]"
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm opacity-80">{item.location}</p>
                  </div>
                  <Film className="absolute top-4 right-4 text-white/80" size={18} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
