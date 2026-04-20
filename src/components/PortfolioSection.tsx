import { motion, type Variants } from 'framer-motion'
import { InstagramEmbed } from './InstagramEmbed'
import { instagramAccount } from '../data/content'

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

          <motion.div variants={fadeInUp} className="mt-8">
            <InstagramEmbed account={instagramAccount} />
            <p className="text-center text-sm text-stone-500 mt-6">
              Live Instagram feed from @{instagramAccount}. Refresh the page if it takes a moment to load.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
