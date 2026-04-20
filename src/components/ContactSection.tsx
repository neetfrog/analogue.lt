import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Calendar, Check, Camera as InstagramIcon, Mail, Heart } from 'lucide-react'

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
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 pt-24 py-12 relative overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Connect</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Let's Talk</h2>
          <p className="text-stone-500 text-base font-light max-w-2xl mx-auto">Follow along or say hello</p>
        </motion.div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setFormOpen((prev) => !prev)}
            className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
          >
            {formOpen ? 'Hide reservation form' : 'Show reservation form'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {formOpen && (
            <motion.form
              onSubmit={handleBookingSubmit}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-auto w-full max-w-2xl overflow-hidden bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-stone-100"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mx-auto mb-5">
                  <Calendar className="text-amber-600" size={28} />
                </div>
                <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium">Reserve Your Date</p>
                <h3 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Book a Session</h3>
                <p className="text-stone-500 font-light text-sm">Let's create something beautiful together.</p>
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
                  <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                  />
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
          )}
        </AnimatePresence>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
          <a
            href="https://instagram.com/nefas.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            <InstagramIcon size={20} />
            <span>@nefas.jpg</span>
          </a>

          <a
            href="mailto:hello@moments.com"
            className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Mail size={20} />
            <span>hello@moments.com</span>
          </a>

          <div className="flex items-center gap-2 text-stone-400 text-sm mt-4">
            <Heart size={16} />
            <span>Made with love & film</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
