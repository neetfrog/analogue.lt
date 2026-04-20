import { useState, useEffect, useRef, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections, instagramAccount } from './data/content'
import { HomeSection } from './components/HomeSection'
import { PortfolioSection } from './components/PortfolioSection'
import { GearSection } from './components/GearSection'
import { ContactSection, type BookingForm } from './components/ContactSection'
import { InstagramEmbed } from './components/InstagramEmbed'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [instagramActive, setInstagramActive] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
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
    const scriptSrc = 'https://www.instagram.com/embed.js'
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptSrc
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (activeSection === 3) {
      setInstagramActive(true)
    }
  }, [activeSection])

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
      } else if (currentScrollY <= 20) {
        setNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const start = touchStartRef.current
      if (!start) return

      const touch = e.changedTouches[0]
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      const isHorizontalSwipe = Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5

      if (isHorizontalSwipe) {
        if (dx < 0) {
          setActiveSection((prev) => Math.min(sections.length - 1, prev + 1))
        } else {
          setActiveSection((prev) => Math.max(0, prev - 1))
        }
      }

      touchStartRef.current = null
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [lastScrollY])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    if (activeSection === 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activeSection])

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
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
          {sections.map((section, i) => {
            const isActive = activeSection === i
            const textAccent = i === 0 ? 'text-amber-300' : 'text-sky-300'
            const underlineAccent = i === 0 ? 'bg-amber-300' : 'bg-sky-300'

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(i)}
                className={`relative transition-all duration-300 ${isActive ? `font-semibold ${textAccent}` : 'opacity-70 hover:opacity-100'}`}
              >
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${underlineAccent}`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <AnimatePresence>
        {showBlackOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] bg-black"
          />
        )}
      </AnimatePresence>

      <div className="w-full relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0">
          <InstagramEmbed account={instagramAccount} active={false} preload />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
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
                instagramActive={instagramActive}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}

export default App
