import { type FormEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Check, Heart } from 'lucide-react'
import { InstagramEmbed } from './InstagramEmbed'
import { instagramAccount } from '../data/content'
import type { ContactTranslations } from '../i18n'

export type BookingForm = {
  name: string
  email: string
  date: string
  location: string
  message: string
}

type MotionVariants = Variants

type ContactSectionProps = {
  fadeInUp: MotionVariants
  bookingForm: BookingForm
  onBookingFormChange: (field: keyof BookingForm, value: string) => void
  handleBookingSubmit: (e: FormEvent) => void
  formSubmitted: boolean
  instagramActive: boolean
  t: ContactTranslations
}

type BookingField = {
  name: keyof BookingForm
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  optional?: boolean
  helpText?: string
  textarea?: boolean
}

const sharedInputClassName =
  'w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all'

export function ContactSection({
  fadeInUp,
  bookingForm,
  onBookingFormChange,
  handleBookingSubmit,
  formSubmitted,
  instagramActive,
  t,
}: ContactSectionProps) {
  const bookingFields: BookingField[] = [
    { name: 'name', label: t.fields.name.label, type: 'text', placeholder: t.fields.name.placeholder, required: true },
    { name: 'email', label: t.fields.email.label, type: 'email', placeholder: t.fields.email.placeholder, required: true },
    {
      name: 'date',
      label: t.fields.date.label,
      type: 'date',
      optional: true,
      helpText: t.fields.date.optionalText
    },
    { name: 'location', label: t.fields.location.label, type: 'text', placeholder: t.fields.location.placeholder },
    {
      name: 'message',
      label: t.fields.message.label,
      textarea: true,
      placeholder: t.fields.message.placeholder
    }
  ]

  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 pt-24 py-12 relative">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-medium">{t.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.title}</h2>
          <motion.p
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.8, delay: 0.15 }}
            className="text-stone-500 text-lg font-light max-w-2xl mx-auto"
          >
            {t.description}
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleBookingSubmit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto w-full max-w-2xl overflow-hidden bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-stone-100"
        >
          <div className="space-y-5">
            {bookingFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {field.label}
                  {field.optional ? <span className="text-stone-400 text-xs"> ({t.optional})</span> : null}
                </label>
                {field.textarea ? (
                  <textarea
                    rows={4}
                    value={bookingForm[field.name]}
                    onChange={(e) => onBookingFormChange(field.name, e.target.value)}
                    className={`${sharedInputClassName} resize-none`}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type ?? 'text'}
                    required={field.required}
                    value={bookingForm[field.name]}
                    onChange={(e) => onBookingFormChange(field.name, e.target.value)}
                    className={sharedInputClassName}
                    placeholder={field.placeholder}
                  />
                )}
                {field.helpText ? <p className="text-stone-400 text-xs mt-2">{field.helpText}</p> : null}
              </div>
            ))}

            <button
              type="submit"
              disabled={formSubmitted}
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              {formSubmitted ? (
                <>
                  <Check size={18} />
                  {t.inquirySent}
                </>
              ) : (
                t.sendInquiry
              )}
            </button>
          </div>
        </motion.form>

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
