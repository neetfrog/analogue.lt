import { motion, type Variants } from 'framer-motion'
import { Heart } from 'lucide-react'
import { InstagramEmbed } from './InstagramEmbed'
import { instagramAccount } from '../data/content'
import type { ContactTranslations } from '../i18n'

type MotionVariants = Variants

type ContactSectionProps = {
  fadeInUp: MotionVariants
  reduceMotion?: boolean
  instagramActive: boolean
  t: ContactTranslations
}

export function ContactSection({
  fadeInUp,
  reduceMotion,
  instagramActive,
  t,
}: ContactSectionProps) {
  const isReducedMotion = reduceMotion ?? false
  const reducedFadeIn: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : fadeInUp

  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 pt-24 py-12 relative">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <motion.div variants={reducedFadeIn} initial="hidden" animate="visible" className="text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-medium">{t.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.title}</h2>
          <motion.p
            initial={isReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={isReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
            transition={isReducedMotion ? { duration: 0.8, delay: 0.15 } : { duration: 1.8, delay: 0.15 }}
            className="text-stone-500 text-lg font-light max-w-2xl mx-auto"
          >
            {t.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isReducedMotion ? 0.25 : 0.35 }}
          className="mx-auto w-full max-w-2xl overflow-hidden bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-stone-100 text-center"
        >
          <p className="text-stone-500 text-base mb-6">Send me a message directly via email.</p>
          <a
            href="mailto:ignasnefas@gmail.com?subject=Inquiry from analogue.lt"
            className="inline-flex w-full items-center justify-center rounded-xl bg-stone-900 px-5 py-4 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            {t.sendInquiry}
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mx-auto w-full max-w-4xl">
          <div className="text-center mb-6">
            <p className="text-stone-500 text-sm uppercase tracking-[0.3em] mb-2">{t.instagram}</p>
          </div>
          <InstagramEmbed account={instagramAccount} active={instagramActive} />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-stone-400 text-sm mt-4">
            <Heart size={16} />
            <a
              href="https://nefas.tv"
              target="_blank"
              rel="noreferrer"
              className="transition text-stone-400 hover:text-stone-900"
            >
              {t.crafted}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
