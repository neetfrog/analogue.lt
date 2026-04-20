import { type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Calendar, Check, Heart } from 'lucide-react'
import { InstagramEmbed } from './InstagramEmbed'
import { instagramAccount } from '../data/content'

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
  setBookingForm: Dispatch<SetStateAction<BookingForm>>
  handleBookingSubmit: (e: FormEvent) => void
  formSubmitted: boolean
}

export function ContactSection({
  fadeInUp,
  bookingForm,
  setBookingForm,
  handleBookingSubmit,
  formSubmitted,
}: ContactSectionProps) {
  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 pt-24 py-12 relative">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Connect</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Let's Talk</h2>
        </motion.div>

        <motion.form
          onSubmit={handleBookingSubmit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto w-full max-w-2xl overflow-hidden bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-stone-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mx-auto mb-5">
              <Calendar className="text-amber-600" size={28} />
            </div>
            <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium">Contact</p>
            <h3 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Book or send a message</h3>
            <p className="text-stone-500 font-light text-sm">Use the form to inquire about availability or just say hello.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Your Name</label>
              <input
                type="text"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                placeholder="Jane & John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Date <span className="text-stone-400 text-xs">(optional)</span></label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
              />
              <p className="text-stone-400 text-xs mt-2">Leave blank if you just want to message first.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Location</label>
              <input
                type="text"
                value={bookingForm.location}
                onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                placeholder="New York, NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Tell me about your vision</label>
              <textarea
                rows={4}
                value={bookingForm.message}
                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                placeholder="Your story, your style, anything you'd like me to know..."
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              {formSubmitted ? (
                <>
                  <Check size={18} />
                  Inquiry Sent!
                </>
              ) : (
                'Send Inquiry'
              )}
            </button>
          </div>
        </motion.form>

        <motion.div variants={fadeInUp} className="mx-auto w-full max-w-4xl">
          <InstagramEmbed account={instagramAccount} />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-stone-400 text-sm mt-4">
            <Heart size={16} />
            <span>Made with love & film</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
