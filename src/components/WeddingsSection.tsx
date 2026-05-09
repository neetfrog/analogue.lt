import { ImageGallery } from './ImageGallery'
import { eventImages } from '../data/content'
import type { Variants } from 'framer-motion'
import type { PortfolioTranslations } from '../i18n'

type MotionVariants = Variants

type WeddingsSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  t: PortfolioTranslations
}

export function WeddingsSection({ fadeInUp, staggerContainer, reduceMotion, t }: WeddingsSectionProps) {
  return (
    <section className="w-full min-h-screen flex items-start px-4 md:px-6 lg:px-8 pt-16 pb-16 relative">
      <div className="max-w-none mx-auto w-full">
        <ImageGallery
          images={eventImages}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
          reduceMotion={reduceMotion}
          t={t}
        />
      </div>
    </section>
  )
}
