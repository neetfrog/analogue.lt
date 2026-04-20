import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Heart, 
  Mail, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Film,
  Calendar,
  Check,
  Camera as InstagramIcon
} from 'lucide-react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'gear', label: 'Gear' },
  { id: 'contact', label: 'Contact' }
]

const weddingImages = [
  {
    id: 1,
    title: 'Emma & James',
    location: 'Tuscany, Italy',
    image: 'https://loremflickr.com/1200/900/wedding?lock=101'
  },
  {
    id: 2,
    title: 'Sarah & Michael',
    location: 'Big Sur, California',
    image: 'https://loremflickr.com/1200/900/wedding?lock=102'
  },
  {
    id: 3,
    title: 'Olivia & Thomas',
    location: 'Paris, France',
    image: 'https://loremflickr.com/1200/900/wedding?lock=103'
  },
  {
    id: 4,
    title: 'Grace & William',
    location: 'Kyoto, Japan',
    image: 'https://loremflickr.com/1200/900/wedding?lock=104'
  },
]

const homeSlides = [
  new URL('../images/1.jpg', import.meta.url).href,
  new URL('../images/2.jpg', import.meta.url).href,
  new URL('../images/3.jpg', import.meta.url).href,
]

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%23e7e5e4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23938b86' font-family='Inter, sans-serif' font-size='56'%3EPlaceholder%20Image%3C/text%3E%3C/svg%3E"

const gearItems = [
  { 
    id: 1, 
    name: 'Leica M6', 
    price: '$2,800', 
    condition: 'Excellent',
    description: 'Classic rangefinder, fully working condition',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=1'
  },
  { 
    id: 2, 
    name: 'Canon AE-1', 
    price: '$350', 
    condition: 'Mint',
    description: 'Perfect for beginners, includes 50mm f/1.8',
    sold: true,
    image: 'https://loremflickr.com/600/600/camera?lock=2'
  },
  { 
    id: 3, 
    name: 'Contax T2', 
    price: '$1,200', 
    condition: 'Good',
    description: 'Legendary point and shoot, minor scratches',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=3'
  },
  { 
    id: 4, 
    name: 'Nikon F3', 
    price: '$450', 
    condition: 'Excellent',
    description: 'Professional SLR, body only',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=4'
  },
]

const instagramProfileUrl = 'https://instagram.com/nefas.jpg'

const instagramAccount = 'nefas.jpg'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      const newIndex = Math.max(0, Math.min(sections.length - 1, activeSection + direction))
      setActiveSection(newIndex)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveSection(prev => Math.min(sections.length - 1, prev + 1))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveSection(prev => Math.max(0, prev - 1))
      } else if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSection])

  const scrollToSection = (index: number) => {
    setActiveSection(index)
    setMenuOpen(false)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
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
    <div className="w-full h-screen overflow-hidden bg-stone-50 text-stone-900 font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold tracking-tight"
        >
          analogue.lt
        </motion.div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(i)}
              className={`relative transition-all duration-300 ${activeSection === i ? 'font-semibold' : 'opacity-60 hover:opacity-100'}`}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-stone-900 text-white flex flex-col items-center justify-center gap-8"
          >
            {sections.map((section, i) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(i)}
                className="text-3xl font-light"
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections */}
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full"
          >
            {activeSection === 0 && <HomeSection fadeInUp={fadeInUp} />}
            {activeSection === 1 && <WeddingsSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />}
            {activeSection === 2 && <PortfolioSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />}
            {activeSection === 3 && <GearSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />}
            {activeSection === 4 && (
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

      {/* Section Indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === i ? 'w-6 h-1.5 bg-stone-900' : 'bg-stone-300 hover:bg-stone-500'}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      {activeSection < sections.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-stone-400"
        >
          <ChevronDown size={24} />
        </motion.div>
      )}
    </div>
  )
}

function HomeSection({ fadeInUp }: any) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlides.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="w-full h-full flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={homeSlides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Fine Art Photography
          </p>
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6"
        >
          analogue.lt
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-stone-500 max-w-lg mx-auto mb-12 font-light leading-relaxed"
        >
          Capturing love stories on film — timeless, authentic, forever.
        </motion.p>

        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-stone-400">
            <Film size={18} />
            <span className="text-sm">Film Only</span>
          </div>
          <div className="w-px h-4 bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400">
            <Heart size={18} />
            <span className="text-sm">Based in NYC</span>
          </div>
          <div className="w-px h-4 bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400">
            <Sparkles size={18} />
            <span className="text-sm">Worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function WeddingsSection({ fadeInUp, staggerContainer }: any) {
  return (
    <section className="w-full h-full flex items-center px-6 md:px-12 lg:px-24 py-20 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeInUp}>
              <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
                Speciality
              </p>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
            >
              Shot exclusively<br />
              <span className="text-amber-600">on film</span>
            </motion.h2>

            <motion.div 
              variants={fadeInUp}
              className="space-y-6 text-stone-600 font-light leading-relaxed text-lg"
            >
              <p>
                There's something magical about film — the way it captures light, the organic grain, 
                the colors that feel like a memory rather than a digital file.
              </p>
              <p>
                Every shot is intentional. No instant review, no endless takes. Just presence, 
                intuition, and trust in the process.
              </p>
              <p className="text-stone-900 font-medium">
                Your love deserves to be remembered forever.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">
                35mm & Medium Format
              </div>
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">
                Natural Light Only
              </div>
              <div className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600">
                Limited Availability
              </div>
            </motion.div>
          </div>

          {/* Image Grid */}
          <motion.div 
            variants={fadeInUp}
            className="order-1 lg:order-2 grid grid-cols-2 gap-3"
          >
            {weddingImages.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative overflow-hidden rounded-2xl bg-stone-200 ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm opacity-80">{item.location}</p>
                </div>
                <Film className="absolute top-4 right-4 text-white/70" size={20} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function PortfolioSection({ fadeInUp, staggerContainer }: any) {
  return (
    <section className="w-full h-full flex items-center px-6 md:px-12 lg:px-24 py-20 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              Selected Work
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Portfolio
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8">
            <InstagramEmbed account={instagramAccount} />
            <p className="text-center text-sm text-stone-500 mt-6">
              Live Instagram feed from @{instagramAccount}. Refresh the page if it takes a moment to load.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function GearSection({ fadeInUp, staggerContainer }: any) {
  return (
    <section className="w-full h-full flex items-center px-6 md:px-12 lg:px-24 py-20 relative overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              For Sale
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              Camera Gear
            </h2>
            <p className="text-stone-500 text-lg font-light">
              Well-loved equipment looking for new homes
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {gearItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id * 0.1 }}
                className={`group relative bg-white rounded-2xl p-6 border transition-all duration-300 ${
                  item.sold 
                    ? 'border-stone-200 opacity-60' 
                    : 'border-stone-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                {item.sold && (
                  <div className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Sold
                  </div>
                )}
                <div className="aspect-square bg-stone-100 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-amber-600 font-bold text-2xl mb-2">{item.price}</p>
                <p className="text-xs text-stone-500 mb-3 uppercase tracking-wider">{item.condition}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                <button
                  disabled={item.sold}
                  className={`mt-4 w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    item.sold
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {item.sold ? 'Unavailable' : 'Inquire'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


function ContactSection({ fadeInUp, bookingForm, setBookingForm, handleBookingSubmit, formSubmitted }: any) {
  return (
    <section className="w-full min-h-full flex flex-col items-center px-6 py-12 relative overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            Connect
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Let's Talk
          </h2>
          <p className="text-stone-500 text-base font-light max-w-2xl mx-auto">
            Follow along or say hello
          </p>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleBookingSubmit}
          className="mx-auto w-full max-w-2xl bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-stone-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mx-auto mb-5">
              <Calendar className="text-amber-600" size={28} />
            </div>
            <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium">
              Reserve Your Date
            </p>
            <h3 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">
              Book a Session
            </h3>
            <p className="text-stone-500 font-light text-sm">
              Let's create something beautiful together.
            </p>
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

        <motion.div 
          variants={fadeInUp}
          className="flex flex-col items-center gap-6"
        >
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

function InstagramEmbed({ account }: { account: string }) {
  useEffect(() => {
    const scriptSrc = 'https://www.instagram.com/embed.js'
    const handleProcess = () => {
      const instgrm = (window as any).instgrm
      if (instgrm && instgrm.Embeds && typeof instgrm.Embeds.process === 'function') {
        instgrm.Embeds.process()
      }
    }

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (!existingScript) {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptSrc
      script.onload = () => {
        handleProcess()
      }
      document.body.appendChild(script)
    } else {
      handleProcess()
    }

    const retry = window.setTimeout(handleProcess, 1200)
    return () => window.clearTimeout(retry)
  }, [account])

  return (
    <div className="mb-12 flex flex-col items-center">
      <blockquote
        key={account}
        className="instagram-media rounded-3xl overflow-hidden bg-white shadow-sm"
        data-instgrm-permalink={`https://www.instagram.com/${account}/`}
        data-instgrm-version="14"
        style={{ margin: '0 auto', maxWidth: 540, minWidth: 326, width: '100%' }}
      >
        <a
          href={`https://www.instagram.com/${account}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#125688', fontWeight: 'bold' }}
        >
          View on Instagram
        </a>
      </blockquote>
    </div>
  )
}

export default App