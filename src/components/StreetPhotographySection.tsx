import { ImageGallery } from './ImageGallery'
import { motion } from 'framer-motion'
import { streetPhotographyImages } from '../data/content'
import type { Variants } from 'framer-motion'
import type { PortfolioTranslations } from '../i18n'

type MotionVariants = Variants

type StreetPhotographySectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  t: PortfolioTranslations
}

export function StreetPhotographySection({ fadeInUp, staggerContainer, reduceMotion, t }: StreetPhotographySectionProps) {
  return (
    <section className="w-full min-h-screen flex flex-col items-start px-4 md:px-6 lg:px-8 pt-16 pb-16 relative">
      <div className="max-w-none mx-auto w-full">
        <ImageGallery
          images={streetPhotographyImages}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
          reduceMotion={reduceMotion}
          t={t}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-10 w-full flex justify-center"
      >
        <a
          href="#prints"
          className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-6 py-3 text-sm font-semibold !text-stone-900 shadow-sm transition duration-200 hover:bg-amber-500"
        >
          Enjoying this? There's prints available!
        </a>
      </motion.div>
    </section>
  )
}
