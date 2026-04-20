import { motion, type Variants } from 'framer-motion'
import { Film } from 'lucide-react'
import { weddingImages } from '../data/content'

type MotionVariants = Variants

type WeddingsSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
}

export function WeddingsSection({ fadeInUp, staggerContainer }: WeddingsSectionProps) {
  return (
    <section className="w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeInUp}>
              <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">Speciality</p>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8">
              Shot exclusively<br />
              <span className="text-amber-600">on film</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
              <p>
                There's something magical about film — the way it captures light, the organic grain, the colors that feel like a memory rather than a digital file.
              </p>
              <p>
                Every shot is intentional. No instant review, no endless takes. Just presence, intuition, and trust in the process.
              </p>
              <p className="text-stone-900 font-medium">Your love deserves to be remembered forever.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">35mm & Medium Format</div>
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">Natural Light Only</div>
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">Limited Availability</div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="order-1 lg:order-2 grid grid-cols-2 gap-3">
            {weddingImages.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative overflow-hidden rounded-2xl bg-stone-200 ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`}
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm opacity-80">{item.location}</p>
                </div>
                <Film className="absolute top-4 right-4 text-white/70" size={20} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
