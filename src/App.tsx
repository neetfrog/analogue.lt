import { lazy, Suspense, useState, useEffect, useRef, useMemo, type ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { gearItems, type GearItem } from './data/content'
import { HomeSection } from './components/HomeSection'
import { WeddingsSection } from './components/WeddingsSection'
const StreetPhotographySection = lazy(() => import('./components/StreetPhotographySection').then((module) => ({ default: module.StreetPhotographySection })))
const PrintsSection = lazy(() => import('./components/PrintsSection').then((module) => ({ default: module.PrintsSection })))
const ArticlesSection = lazy(() => import('./components/ArticlesSection').then((module) => ({ default: module.ArticlesSection })))
const GearSection = lazy(() => import('./components/GearSection').then((module) => ({ default: module.GearSection })))
const ContactSection = lazy(() => import('./components/ContactSection').then((module) => ({ default: module.ContactSection })))
import { slugify } from './utils/slugify'
import { translations, type Locale, localeOptions, languageLabels, getInitialLocale } from './i18n'

const HOME_LOGO_SRC = new URL('../images/logos/newlogo.png', import.meta.url).href

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

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [instagramActive, setInstagramActive] = useState(false)
  const [initialGearId, setInitialGearId] = useState<string | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [gearItemsState, setGearItemsState] = useState<GearItem[]>(gearItems)

  const t = translations[locale]

  const sectionFallback = (
    <div className="w-full min-h-screen pt-24" />
  )

  const sectionItems = useMemo<SectionItem[]>(() => [
    { id: 'home', label: t.nav.sections.home, render: () => <HomeSection t={t.home} /> },
    {
      id: 'weddings',
      label: t.nav.sections.weddings,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <WeddingsSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} t={t.weddings} />
        </Suspense>
      )
    },
    {
      id: 'street',
      label: t.nav.sections.street,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <StreetPhotographySection fadeInUp={fadeInUp} staggerContainer={staggerContainer} t={t.street} />
        </Suspense>
      )
    },
    {
      id: 'prints',
      label: t.nav.sections.prints,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <PrintsSection t={t.prints} />
        </Suspense>
      )
    },
    {
      id: 'articles',
      label: t.nav.sections.articles,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <ArticlesSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} t={t.articles} />
        </Suspense>
      )
    },
    {
      id: 'shop',
      label: t.nav.sections.gear,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <GearSection
            items={gearItemsState}
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
            initialGearId={initialGearId}
            t={t.gear}
            onAskAbout={(itemName) => {
              const contactIndex = sectionIndexById.get('contact')
              if (typeof contactIndex === 'number') {
                setActiveSection(contactIndex)
              }
            }}
          />
        </Suspense>
      )
    },
    {
      id: 'contact',
      label: t.nav.sections.contact,
      render: () => (
        <Suspense fallback={sectionFallback}>
          <ContactSection
            fadeInUp={fadeInUp}
            instagramActive={instagramActive}
            t={t.contact}
          />
        </Suspense>
      )
    }
  ], [t, gearItemsState, initialGearId, instagramActive])

  const sectionIndexById = useMemo(() => new Map(sectionItems.map((section, index) => [section.id, index])), [sectionItems])

  const navSectionItems = sectionItems

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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

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
    const contactIndex = sectionIndexById.get('contact')
    if (typeof contactIndex === 'number' && activeSection === contactIndex) {
      setInstagramActive(true)
    }
  }, [activeSection, sectionIndexById])

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
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior

    if (activeSection === 0) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.documentElement.style.overscrollBehavior = 'none'
    } else {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
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
  const isPrintsSection = sectionItems[activeSection]?.id === 'prints'
  const isDarkTheme = theme === 'dark'
  const isDarkModeNav = isHomeSection || isDarkTheme || isPrintsSection
  const navTextColor = isDarkModeNav ? 'text-white' : 'text-stone-900'
  const underlineStyle = {
    backgroundColor: isDarkModeNav ? '#ffffff' : '#111827'
  }

  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 antialiased">
      <motion.nav
        aria-label={t.nav.mainNavigation}
        initial={false}
        animate={{ backgroundColor: 'transparent', opacity: navVisible ? 1 : 0, y: navVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4"
      >
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-3 pt-14 md:pt-16 md:flex-row md:justify-center md:items-center">
          {!isHomeSection && (
            <button
              type="button"
              onClick={() => scrollToSection(0)}
              aria-label="Go to home"
              className="absolute left-1/2 top-4 -translate-x-1/2 p-0"
            >
              <img
                src={HOME_LOGO_SRC}
                alt="analogue.lt"
                className="h-8 w-auto object-contain"
                style={isDarkModeNav ? { filter: 'brightness(0) invert(1)' } : undefined}
              />
            </button>
          )}

          <div className={`flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wide ${navTextColor}`}>
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
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={underlineStyle}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className={`flex flex-wrap justify-center gap-2 text-xs md:text-sm font-medium ${navTextColor} md:absolute md:right-20 md:top-1/2 md:-translate-y-1/2`}>
            {activeSection === 0 && localeOptions.map((language) => (
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

          {!isHomeSection && !isPrintsSection && (
            <button
              type="button"
              onClick={toggleTheme}
              className="absolute right-6 top-4 rounded-full border p-2 transition duration-200 border-stone-300 text-stone-900"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full ${isHomeSection ? '' : 'pt-24 md:pt-28'}`}
          >
            {sectionItems[activeSection]?.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
