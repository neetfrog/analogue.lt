import { useState, useEffect, useRef, useReducer, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { gearItems, type GearItem } from './data/content'
import { HomeSection } from './components/HomeSection'
import { PortfolioSection } from './components/PortfolioSection'
import { GearSection } from './components/GearSection'
import { AdminSection } from './components/AdminSection'
import { ContactSection, type BookingForm } from './components/ContactSection'
import { useReducedMotionMobile } from './hooks/useReducedMotionMobile'
import { slugify } from './utils/slugify'
import { translations, type Locale, localeOptions, languageLabels, getInitialLocale } from './i18n'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_ROUTE ?? ''

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

type SectionItem = {
  id: string
  label: string
  render: () => ReactNode
}

const findGearIdBySlug = (slug: string, items: GearItem[]) => {
  const normalized = slug.toLowerCase()
  const match = items.find((item) => slugify(item.name) === normalized)
  return match?.id ?? null
}

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
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false)
  const [adminPasswordInput, setAdminPasswordInput] = useState('')
  const [adminError, setAdminError] = useState<string | null>(null)
  const [gearItemsState, setGearItemsState] = useState<GearItem[]>(gearItems)
  const [hasLoadedItems, setHasLoadedItems] = useState(false)

  const t = translations[locale]
  const reduceMotion = useReducedMotionMobile()
  const adminEnabled = Boolean(ADMIN_ROUTE)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    fetch('/api/auth/me', {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.authenticated) {
          setAdminUnlocked(true)
        }
      })
      .catch(() => {
        setAdminUnlocked(false)
      })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    fetch('/api/items', {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setGearItemsState(items)
        }
      })
      .catch(() => {
        // Keep the static fallback if backend is not available
      })
      .finally(() => setHasLoadedItems(true))
  }, [])

  const unlockAdmin = async () => {
    if (!adminEnabled) {
      setAdminError('Admin access is not configured')
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: adminPasswordInput })
      })

      if (!response.ok) {
        const data = await response.json()
        setAdminError(data?.message ?? 'Login failed')
        return
      }

      setAdminUnlocked(true)
      setAdminError(null)
      setAdminPasswordInput('')
      const adminIndex = sectionIndexById.get(ADMIN_ROUTE)
      if (typeof adminIndex === 'number') {
        setActiveSection(adminIndex)
      }
    } catch {
      setAdminError('Unable to reach authentication server')
    }
  }

  const lockAdmin = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setAdminUnlocked(false)
  }

  const saveItems = async (items: GearItem[]) => {
    const response = await fetch('/api/items', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data?.message || 'Failed to save items')
    }

    const data = await response.json()
    setGearItemsState(Array.isArray(data.items) ? data.items : gearItems)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      dispatchBookingForm({ type: 'reset' })
    }, 3000)
  }

  const sectionItems: SectionItem[] = [
    { id: 'home', label: t.nav.sections.home, render: () => <HomeSection t={t.home} reduceMotion={reduceMotion} /> },
    {
      id: 'portfolio',
      label: t.nav.sections.portfolio,
      render: () => <PortfolioSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} reduceMotion={reduceMotion} t={t.portfolio} />
    },
    {
      id: 'shop',
      label: t.nav.sections.gear,
      render: () => <GearSection items={gearItemsState} fadeInUp={fadeInUp} staggerContainer={staggerContainer} initialGearId={initialGearId} reduceMotion={reduceMotion} t={t.gear} />
    },
    {
      id: 'contact',
      label: t.nav.sections.contact,
      render: () => (
        <ContactSection
          fadeInUp={fadeInUp}
          reduceMotion={reduceMotion}
          bookingForm={bookingForm}
          onBookingFormChange={(field, value) => dispatchBookingForm({ type: 'field', field, value })}
          handleBookingSubmit={handleBookingSubmit}
          formSubmitted={formSubmitted}
          instagramActive={instagramActive}
          t={t.contact}
        />
      )
    },
    ...(adminEnabled
      ? [
          {
            id: ADMIN_ROUTE,
            label: 'Admin',
            render: () =>
              adminUnlocked ? (
                <div className="w-full min-h-screen px-6 md:px-12 lg:px-24 py-16 pt-24">
                  <div className="mb-6 flex items-center justify-between gap-4 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                    <div>
                      <h2 className="text-3xl font-semibold">Admin dashboard</h2>
                      <p className="text-sm text-stone-500">Manage items securely.</p>
                    </div>
                    <button
                      type="button"
                      onClick={lockAdmin}
                      className="rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                    >
                      Log out
                    </button>
                  </div>
                  <AdminSection items={gearItemsState} onSaveItems={saveItems} />
                </div>
              ) : (
                <section className="w-full min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-16 pt-24">
                  <div className="mx-auto w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4">Admin login</h2>
                    <p className="text-sm text-stone-500 mb-6">Enter your admin password to access the dashboard.</p>
                    <label className="block mb-4 text-sm font-medium text-stone-700">
                      Password
                      <input
                        type="password"
                        value={adminPasswordInput}
                        onChange={(event) => setAdminPasswordInput(event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                      />
                    </label>
                    {adminError ? <p className="mb-4 text-sm text-red-600">{adminError}</p> : null}
                    <button
                      type="button"
                      onClick={unlockAdmin}
                      className="w-full rounded-3xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
                    >
                      Unlock admin
                    </button>
                  </div>
                </section>
              )
          }
        ]
      : []),
  ]

  const sectionIndexById = new Map(sectionItems.map((section, index) => [section.id, index]))
  const navSectionItems = sectionItems.filter((section) => section.id !== ADMIN_ROUTE)

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
      const normalizedHash = hash === 'gear' ? 'shop' : hash
      const sectionIndex = sectionIndexById.get(normalizedHash)
      if (typeof sectionIndex === 'number') {
        setActiveSection(sectionIndex)
        return
      }

      const gearId = findGearIdBySlug(hash, gearItemsState)
      if (gearId) {
        setActiveSection(sectionIndexById.get('shop') ?? 2)
        setInitialGearId(String(gearId))
        return
      }

      const legacyMatch = hash.match(/^item-(\d+)(?:-[a-z0-9-]+)?$/)
      if (legacyMatch) {
        setActiveSection(sectionIndexById.get('shop') ?? 2)
        setInitialGearId(legacyMatch[1])
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
      if (document.body.dataset.lightboxOpen === 'true') {
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveSection((prev) => Math.min(sectionItems.length - 1, prev + 1))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveSection((prev) => Math.max(0, prev - 1))
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (document.body.dataset.lightboxOpen === 'true') {
        return
      }

      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (document.body.dataset.lightboxOpen === 'true') {
        return
      }

      const start = touchStartRef.current
      if (!start) return

      const touch = e.changedTouches[0]
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      const isHorizontalSwipe = Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5

      if (isHorizontalSwipe) {
        if (dx < 0) {
          setActiveSection((prev) => Math.min(sectionItems.length - 1, prev + 1))
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
      document.body.style.overflowY = 'scroll'
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activeSection])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeSection])

  const scrollToSection = (index: number) => {
    setActiveSection(index)
    const sectionId = sectionItems[index]?.id
    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  const isHomeSection = activeSection === 0
  const navTextColor = isHomeSection ? 'text-white' : 'text-stone-900'
  const underlineColor = isHomeSection ? 'bg-white' : 'bg-stone-900'

  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 antialiased">
      <motion.nav
        aria-label={t.nav.mainNavigation}
        animate={{ backgroundColor: 'transparent' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
          <div className={`flex flex-wrap items-center justify-center gap-6 text-base md:text-lg font-medium tracking-wide ${navTextColor}`}>
            {navSectionItems.map((section) => {
              const sectionIndex = sectionIndexById.get(section.id) ?? 0
              const isActive = activeSection === sectionIndex

              return (
                <button
                  key={section.id}
                  type="button"
                  aria-label={section.label}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => scrollToSection(sectionIndex)}
                  className={`relative transition-colors duration-300 ${isActive ? `font-semibold opacity-100 ${navTextColor}` : `opacity-70 hover:opacity-100 ${navTextColor}`}`}
                >
                  {section.label}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${underlineColor}`}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {activeSection === 0 && (
            <div className={`flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-medium md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 ${navTextColor}`}>
              {localeOptions.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setLocale(language)}
                  className={`rounded-full border px-2.5 py-1.5 transition duration-200 ${language === locale ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-stone-300/70 text-stone-100/80 hover:border-stone-100/80 hover:text-stone-100'}`}
                  aria-label={languageLabels[language]}
                >
                  {languageLabels[language]}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.nav>

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
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
            transition={{ duration: reduceMotion ? 0.25 : 0.4 }}
            className="w-full"
          >
            {sectionItems[activeSection]?.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
