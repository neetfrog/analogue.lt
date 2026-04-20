import { useState, useEffect, useRef, useReducer, type FormEvent } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { sections, instagramAccount } from './data/content'
import { HomeSection } from './components/HomeSection'
import { PortfolioSection } from './components/PortfolioSection'
import { GearSection } from './components/GearSection'
import { ContactSection, type BookingForm } from './components/ContactSection'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const sectionIndexById = new Map(sections.map((section, index) => [section.id, index]))

const initialBookingForm: BookingForm = {
  name: '',
  email: '',
  date: '',
  location: '',
  message: ''
}

type BookingFormAction =
  | { type: 'field'; field: keyof BookingForm; value: string }
  | { type: 'reset' }

function bookingFormReducer(state: BookingForm, action: BookingFormAction): BookingForm {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value }
    case 'reset':
      return initialBookingForm
    default:
      return state
  }
}

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [instagramActive, setInstagramActive] = useState(false)
  const [initialGearId, setInitialGearId] = useState<string | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [bookingForm, dispatchBookingForm] = useReducer(bookingFormReducer, initialBookingForm)

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY <= 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setShowBlackOverlay(false), 50)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      const match = hash.match(/^item-(\d+)(?:-[a-z0-9-]+)?$/)

      if (match) {
        setActiveSection(sectionIndexById.get('gear') ?? 2)
        setInitialGearId(match[1])
        return
      }

      const sectionIndex = sectionIndexById.get(hash)
      if (typeof sectionIndex === 'number') {
        setActiveSection(sectionIndex)
      }
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
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
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

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
    const sectionId = sections[index]?.id
    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      dispatchBookingForm({ type: 'reset' })
    }, 3000)
  }

  const isHomeSection = activeSection === 0
  const navTextColor = isHomeSection ? 'text-white' : 'text-stone-900'
  const navBgClass = isHomeSection ? '' : 'bg-stone-50/95 backdrop-blur-sm'
  const underlineColor = isHomeSection ? 'bg-white' : 'bg-stone-900'

  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 antialiased">
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex flex-wrap items-center justify-center gap-6 ${navBgClass} transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className={`flex flex-wrap items-center justify-center gap-6 text-base md:text-lg font-medium tracking-wide ${navTextColor}`}>
          {sections.map((section, i) => {
            const isActive = activeSection === i

            return (
              <button
                key={section.id}
                type="button"
                aria-label={section.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => scrollToSection(i)}
                className={`relative transition-colors duration-300 ${isActive ? `font-semibold opacity-100 ${navTextColor}` : `opacity-70 hover:opacity-100 ${navTextColor}`}`}
              >
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${underlineColor}`}
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
            {activeSection === 2 && <GearSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} initialGearId={initialGearId} />}
            {activeSection === 3 && (
              <ContactSection
                fadeInUp={fadeInUp}
                bookingForm={bookingForm}
                onBookingFormChange={(field, value) => dispatchBookingForm({ type: 'field', field, value })}
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
