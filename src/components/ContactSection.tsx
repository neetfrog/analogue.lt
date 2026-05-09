import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
import { InstagramEmbed } from './InstagramEmbed'
import { instagramAccount } from '../data/content'
import { TypewriterText } from './TypewriterText'
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
  const [descriptionComplete, setDescriptionComplete] = useState(false)
  const isReducedMotion = reduceMotion ?? false
  const reducedFadeIn: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : fadeInUp

  const mailtoHref = `mailto:ignasnefas@gmail.com?subject=${encodeURIComponent('Inquiry from analogue.lt')}`

  useEffect(() => {
    setDescriptionComplete(false)
  }, [t.description])

  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 pt-16 pb-16 relative">
      <div className="max-w-4xl mx-auto w-full space-y-1">
        <motion.div variants={reducedFadeIn} initial="hidden" animate="visible" className="text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-medium">{t.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t.title}</h2>
          <motion.p
            initial={isReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={isReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
            transition={isReducedMotion ? { duration: 0.8, delay: 0.15 } : { duration: 1.8, delay: 0.15 }}
            className="text-stone-500 text-lg font-light max-w-2xl mx-auto mb-0"
          >
            <TypewriterText
              text={t.description}
              reduceMotion={isReducedMotion}
              className="whitespace-pre-wrap"
              delay={120}
              speed={35}
              onComplete={() => setDescriptionComplete(true)}
            />
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: descriptionComplete ? 1 : 0 }}
          transition={{ duration: isReducedMotion ? 0.25 : 0.35, delay: descriptionComplete ? 0.1 : 0 }}
          className="mx-auto w-full max-w-xs text-center mb-8"
        >
          <a
            href={mailtoHref}
            aria-label={t.sendInquiry}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-700 transition hover:bg-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:bg-stone-900 dark:text-white dark:hover:bg-stone-700"
          >
            <Mail size={20} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: descriptionComplete ? 1 : 0 }}
          transition={{ duration: isReducedMotion ? 0.6 : 0.8, delay: descriptionComplete ? 0.15 : 0 }}
          className="mx-auto w-full max-w-4xl"
        >
          <div className="text-center mb-6">
            <p className="text-stone-500 text-sm uppercase tracking-[0.3em] mb-2">{t.instagram}</p>
          </div>
          <InstagramEmbed account={instagramAccount} active={instagramActive} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: descriptionComplete ? 1 : 0 }}
          transition={{ duration: isReducedMotion ? 0.6 : 0.8, delay: descriptionComplete ? 0.2 : 0 }}
          className="flex flex-col items-center gap-6"
        >
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
