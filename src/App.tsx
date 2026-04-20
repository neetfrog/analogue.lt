import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections } from './data/content'
import { HomeSection } from './components/HomeSection'
import { PortfolioSection } from './components/PortfolioSection'
import { GearSection } from './components/GearSection'
import { ContactSection, type BookingForm } from './components/ContactSection'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    date: '',
    location: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowBlackOverlay(false), 50)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveSection((prev) => Math.min(sections.length - 1, prev + 1))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveSection((prev) => Math.max(0, prev - 1))
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY + 10 && currentScrollY > 80) {
        setNavVisible(false)
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY <= 80) {
        setNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const scrollToSection = (index: number) => {
    setActiveSection(index)
  }

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setBookingForm({ name: '', email: '', date: '', location: '', message: '' })
    }, 3000)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 antialiased">
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex flex-wrap items-center justify-center gap-6 mix-blend-difference text-white transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-wrap items-center justify-center gap-6 text-base md:text-lg font-medium tracking-wide">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(i)}
              className={`relative transition-all duration-300 ${activeSection === i ? 'font-semibold' : 'opacity-70 hover:opacity-100'}`}
            >
              {section.label}
              {activeSection === i && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {showBlackOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[200] bg-black"
          />
        )}
      </AnimatePresence>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            {activeSection === 0 && <HomeSection />}
            {activeSection === 1 && <PortfolioSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />}
            {activeSection === 2 && <GearSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />}
            {activeSection === 3 && (
              <ContactSection
                fadeInUp={fadeInUp}
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
                handleBookingSubmit={handleBookingSubmit}
                formSubmitted={formSubmitted}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}

export default App
