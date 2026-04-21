import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { X, Check, Link2, Camera, Aperture, Grid, Package } from 'lucide-react'
import type { GearItem } from '../data/content'
import { slugify } from '../utils/slugify'
import type { GearTranslations } from '../i18n'

type MotionVariants = Variants

type GearSectionProps = {
  items: GearItem[]
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  initialGearId?: string | null
  t: GearTranslations
}

const manufacturerLogoMap: Record<string, { src: string; alt: string }> = {
  Agfa: { src: new URL('../../images/logos/manufacturers/agfa.png', import.meta.url).href, alt: 'Agfa' },
  Canon: { src: new URL('../../images/logos/manufacturers/canon.png', import.meta.url).href, alt: 'Canon' },
  Exakta: { src: new URL('../../images/logos/manufacturers/exakta.png', import.meta.url).href, alt: 'Exakta' },
  FED: { src: new URL('../../images/logos/manufacturers/fed.png', import.meta.url).href, alt: 'FED' },
  GOMZ: { src: new URL('../../images/logos/manufacturers/gomz.png', import.meta.url).href, alt: 'GOMZ' },
  KMZ: { src: new URL('../../images/logos/manufacturers/kmz.png', import.meta.url).href, alt: 'KMZ' },
  Lomo: { src: new URL('../../images/logos/manufacturers/lomo.png', import.meta.url).href, alt: 'Lomo' },
  Pentacon: { src: new URL('../../images/logos/manufacturers/pentacon.png', import.meta.url).href, alt: 'Pentacon' },
  Vivitar: { src: new URL('../../images/logos/manufacturers/vivitar.png', import.meta.url).href, alt: 'Vivitar' },
  Yashica: { src: new URL('../../images/logos/manufacturers/yashica.png', import.meta.url).href, alt: 'Yashica' },
  'Zeiss Ikon': { src: new URL('../../images/logos/manufacturers/zeissIkon.png', import.meta.url).href, alt: 'Zeiss Ikon' },
  'Zeiss Jena': { src: new URL('../../images/logos/manufacturers/zeissJena.png', import.meta.url).href, alt: 'Zeiss Jena' }
}

type SpecRule = {
  test: RegExp | ((value: string) => boolean)
  format: (value: string, specs: GearTranslations['specs']) => string
  weight: number
}

const specRules: SpecRule[] = [
  {
    test: /^\d+mm focal length$/i,
    format: (value, specs) => `${specs.focalLength}: ${value.replace(/ focal length$/i, '')}`,
    weight: 0
  },
  {
    test: /^f\/(\d|\d\.\d) maximum aperture$/i,
    format: (value, specs) => `${specs.aperture}: ${value.replace(/ maximum aperture$/i, '')}`,
    weight: 1
  },
  {
    test: /(mount|lens mount|screw mount|slr mount)$/i,
    format: (value, specs) => `${specs.mount}: ${value.replace(/ lens mount$/i, '').replace(/ screw mount$/i, '').replace(/ slr mount$/i, '').replace(/ mount$/i, '').trim()}`,
    weight: 2
  },
  {
    test: /^(35mm film|120 film)$/i,
    format: (value, specs) => `${specs.filmType}: ${value}`,
    weight: 0
  },
  {
    test: /^(6x\d+cm|medium format)$/i,
    format: (value, specs) => `${specs.format}: ${value}`,
    weight: 0
  },
  {
    test: /^manual focus$/i,
    format: (_, specs) => `${specs.focus}: Manual`,
    weight: 3
  },
  {
    test: /^fully working$/i,
    format: (_, specs) => `${specs.condition}: Fully working`,
    weight: 3
  },
  {
    test: /^(tlr|viewfinder \/ rangefinder)$/i,
    format: (value, specs) => `${specs.type}: ${value}`,
    weight: 3
  },
  {
    test: /optical design/i,
    format: (value, specs) => `${specs.opticalDesign}: ${value.replace(/ optical design/i, '').trim()}`,
    weight: 3
  },
  {
    test: /multicoated optics/i,
    format: (_, specs) => `${specs.optics}: Multicoated`,
    weight: 3
  },
  {
    test: /ultra-wide prime/i,
    format: (_, specs) => `${specs.ultraWide}`,
    weight: 3
  },
  {
    test: /classic east german optics/i,
    format: (_, specs) => `${specs.classicOptics}`,
    weight: 3
  },
  {
    test: /^solagon .* lens$/i,
    format: (value, specs) => `${specs.lens}: ${value}`,
    weight: 3
  }
]

const findSpecRule = (value: string) =>
  specRules.find((rule) =>
    typeof rule.test === 'function' ? rule.test(value) : rule.test.test(value)
  )

const formatSpec = (spec: string, specs: GearTranslations['specs']) => {
  const value = spec.trim()
  const rule = findSpecRule(value)
  return rule ? rule.format(value, specs) : value
}

const getSpecWeight = (spec: string) => {
  const value = spec.trim()
  const rule = findSpecRule(value)
  return rule ? rule.weight : 4
}

const sortSpecs = (specs: string[]) =>
  [...specs].sort((a, b) => {
    const weight = getSpecWeight(a) - getSpecWeight(b)
    return weight || a.localeCompare(b)
  })

export function GearSection({ items, fadeInUp, staggerContainer, reduceMotion, initialGearId, t }: GearSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [hasAppliedInitialGear, setHasAppliedInitialGear] = useState(false)
  const imageWrapperRef = useRef<HTMLDivElement | null>(null)
  const lastTapRef = useRef<number>(0)
  const isReducedMotion = reduceMotion ?? false
  const reducedFadeIn: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : fadeInUp
  const reducedStagger: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : staggerContainer

  useEffect(() => {
    if (selectedGear) {
      setActiveImage(selectedGear.image)
      setCopiedLink(false)
      setZoomed(false)
    } else {
      setActiveImage(null)
      setCopiedLink(false)
      setZoomed(false)
    }
  }, [selectedGear])

  useEffect(() => {
    if (selectedGear) {
      document.body.dataset.lightboxOpen = 'true'
    } else {
      delete document.body.dataset.lightboxOpen
    }

    return () => {
      delete document.body.dataset.lightboxOpen
    }
  }, [selectedGear])

  useEffect(() => {
    if (selectedGear) {
      const url = new URL(window.location.href)
      url.hash = slugify(selectedGear.name)
      window.history.replaceState(null, '', url.toString())
    } else {
      const url = new URL(window.location.href)
      const hash = url.hash.replace('#', '')
      const sectionIds = ['home', 'portfolio', 'gear', 'contact']

      if (hash && !sectionIds.includes(hash)) {
        url.hash = 'gear'
        window.history.replaceState(null, '', url.toString())
      }
    }
  }, [selectedGear])

  useEffect(() => {
    if (!selectedGear && initialGearId && !hasAppliedInitialGear) {
      const id = Number(initialGearId)
      const matchedGear = items.find((item) => item.id === id)
      if (matchedGear) {
        setSelectedGear(matchedGear)
        setHasAppliedInitialGear(true)
      }
    }
  }, [initialGearId, selectedGear, hasAppliedInitialGear, items])

  const handleMainImageDoubleClick = () => {
    setZoomed((prev) => !prev)
  }

  const handleMainImageTouchEnd = (event: TouchEvent<HTMLImageElement>) => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      event.preventDefault()
      setZoomed((prev) => !prev)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  const manufacturers = Array.from(
    new Set(
      items
        .map((item) => item.manufacturer)
        .filter((manufacturer): manufacturer is string =>
          Boolean(manufacturer) && manufacturer !== 'Generic' && manufacturer !== 'Various'
        )
    )
  ).sort((a, b) => a.localeCompare(b))

  const categories = [
    { value: 'All', label: t.categories.All, icon: Grid },
    { value: 'cameras', label: t.categories.cameras, icon: Camera },
    { value: 'lenses', label: t.categories.lenses, icon: Aperture },
    { value: 'accessories', label: t.categories.accessories, icon: Package }
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedGear) {
        setSelectedGear(null)
      }
    }

    if (selectedGear) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }

    return undefined
  }, [selectedGear])

  const categoryOrder = ['cameras', 'lenses', 'accessories']

  const filteredGearItems = items
    .filter((item) =>
      (selectedCategory === 'All' || item.category === selectedCategory.toLowerCase()) &&
      (!selectedManufacturer || item.manufacturer === selectedManufacturer)
    )
    .sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.category)
      const bIndex = categoryOrder.indexOf(b.category)

      if (aIndex !== bIndex) {
        return aIndex - bIndex
      }

      return a.name.localeCompare(b.name)
    })

  const selectedImages = selectedGear
    ? Array.from(new Set([selectedGear.image, ...(selectedGear.moreImages ?? [])]))
    : []

  return (
    <section className="w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={reducedStagger} initial="hidden" animate="visible">
          <motion.div variants={reducedFadeIn} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">{t.eyebrow}</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">{t.title}</h2>
            <motion.p
              initial={isReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
              animate={isReducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
              transition={isReducedMotion ? { duration: 0.8, delay: 0.15 } : { duration: 1.8, delay: 0.15 }}
              className="text-stone-500 text-lg font-light"
            >
              {t.description}
            </motion.p>
          </motion.div>

          <motion.div variants={reducedFadeIn} className="mb-8 flex flex-wrap items-center justify-center gap-4">
            {manufacturers.map((manufacturer) => (
              <button
                key={manufacturer}
                type="button"
                onClick={() => setSelectedManufacturer((current) => (current === manufacturer ? null : manufacturer))}
                className={`rounded-3xl border p-2 transition shadow-sm ${
                  selectedManufacturer === manufacturer
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-stone-200 bg-white hover:border-stone-900'
                }`}
                aria-pressed={selectedManufacturer === manufacturer}
                title={t.filterBy.replace('{manufacturer}', manufacturer)}
              >
                <img
                  src={manufacturerLogoMap[manufacturer]?.src}
                  alt={manufacturer}
                  className="h-8 w-auto object-contain"
                />
              </button>
            ))}
          </motion.div>

          <motion.div variants={reducedFadeIn} className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`rounded-full border px-4 py-2 text-sm transition flex items-center gap-2 ${
                    selectedCategory === category.value
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {category.label}
                </button>
              )
            })}
          </motion.div>

          <motion.div variants={reducedFadeIn} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGearItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: isReducedMotion ? 0.25 : 0.35 }}
                className={`group relative bg-white rounded-2xl p-6 border transition-all duration-300 ${
                  item.sold
                    ? 'border-stone-200 opacity-60'
                    : 'border-stone-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                  {item.manufacturer && manufacturerLogoMap[item.manufacturer] ? (
                  <div className="mb-4 flex items-center justify-center">
                    <img
                      src={manufacturerLogoMap[item.manufacturer].src}
                      alt={manufacturerLogoMap[item.manufacturer].alt}
                      className="h-10 w-auto object-contain opacity-90"
                    />
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => setSelectedGear(item)}
                  aria-label={t.openDetails.replace('{name}', item.name)}
                  className="aspect-square bg-stone-100 rounded-xl mb-4 overflow-hidden focus:outline-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <p className={`font-bold text-2xl ${item.sold ? 'text-stone-400 line-through' : 'text-amber-600'}`}>
                    {item.price}
                  </p>
                  {item.sold && (
                    <span className="rounded-full bg-stone-900 px-2 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-white">
                      {t.soldLabel}
                    </span>
                  )}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                {item.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-stone-600"
                      >
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => setSelectedGear(item)}
                  className="mt-4 w-full py-3 rounded-xl font-medium text-sm bg-stone-900 text-white hover:bg-stone-800 transition-all"
                >
                  {t.detailsButton}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedGear && (
          <motion.div
            className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-black/60 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGear(null)}
          >
            <div className="flex min-h-full items-center justify-center py-6">
              <motion.div
                className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[calc(100vh-3rem)] min-w-0"
                initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0, scale: 0.98 }}
                animate={isReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
                exit={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: isReducedMotion ? 0.18 : 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-6 py-4">
                  <div>
                    {selectedGear.manufacturer && manufacturerLogoMap[selectedGear.manufacturer] ? (
                      <div className="mb-3 flex items-center justify-start">
                        <img
                          src={manufacturerLogoMap[selectedGear.manufacturer].src}
                          alt={manufacturerLogoMap[selectedGear.manufacturer].alt}
                          className="h-8 w-auto object-contain opacity-90"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-2xl font-semibold">{selectedGear.name}</h3>
                    <p className="text-sm text-stone-500">{selectedGear.price} · {selectedGear.condition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const url = new URL(window.location.href)
                        url.hash = slugify(selectedGear.name)
                        navigator.clipboard.writeText(url.toString())
                          .then(() => setCopiedLink(true))
                          .catch(() => setCopiedLink(false))
                      }}
                      className="rounded-full bg-stone-100 p-3 text-stone-700 hover:bg-stone-200 transition"
                      aria-label={copiedLink ? `${t.linkCopied} ${selectedGear.name}` : t.copyLink.replace('{name}', selectedGear.name)}
                    >
                      {copiedLink ? <Check size={16} /> : <Link2 size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGear(null)}
                      className="rounded-full bg-stone-100 p-3 text-stone-700 hover:bg-stone-200 transition"
                      aria-label={t.close}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_0.8fr] max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden min-w-0">
                  <div className="space-y-4 min-w-0">
                    <div ref={imageWrapperRef} className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100">
                      <motion.img
                        key={zoomed ? 'zoomed' : 'default'}
                        src={activeImage || selectedGear.image}
                        alt={selectedGear.name}
                        initial={{ scale: 1, x: 0, y: 0 }}
                        animate={{ scale: zoomed ? 1.8 : 1, x: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                        drag={zoomed}
                        dragMomentum={false}
                        dragElastic={0.3}
                        dragConstraints={{ left: -220, right: 220, top: -220, bottom: 220 }}
                        className="w-full h-full object-cover"
                        style={{ transformOrigin: 'center center' }}
                        loading="lazy"
                        decoding="async"
                        onDoubleClick={handleMainImageDoubleClick}
                        onTouchEnd={handleMainImageTouchEnd}
                      />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {selectedImages.map((src, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImage(src)}
                          className={`w-20 h-20 min-w-[5rem] overflow-hidden rounded-3xl bg-stone-100 focus:outline-none ${activeImage === src ? 'ring-2 ring-amber-400' : ''}`}
                          aria-label={`${t.openDetails.replace('{name}', selectedGear.name)} image ${index + 1}`}
                        >
                          <img src={src} alt={`${selectedGear.name} detail ${index + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 min-w-0">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">{t.aboutItem}</p>
                      <p className="text-stone-600 leading-relaxed">{selectedGear.details}</p>
                      {selectedGear.tags?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedGear.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-stone-600"
                            >
                              {tag.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 mb-3">{t.techSpecs}</p>
                      <ul className="space-y-2 text-sm text-stone-600">
                        {sortSpecs(selectedGear.specs).map((spec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-900" />
                            {formatSpec(spec, t.specs)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      {selectedGear.vintedUrl && !selectedGear.sold && (
                        <a
                          href={selectedGear.vintedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-500 transition font-sans"
                          aria-label={t.vinted}
                          title={t.vinted}
                        >
                          <img
                            src={new URL('../../images/Vinted/Vinted_idaca39J_H_0.svg', import.meta.url).href}
                            alt="Vinted logo"
                            className="h-6 w-auto object-contain filter brightness-0 invert"
                          />
                        </a>
                      )}
                      {selectedGear.inquiryEmail && !selectedGear.sold && (
                        <a
                          href={`mailto:${selectedGear.inquiryEmail}?subject=${encodeURIComponent(`Inquiry about ${selectedGear.name}`)}`}
                          className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-white hover:bg-amber-500 transition font-sans"
                          aria-label={t.askAbout}
                          title={t.askAbout}
                        >
                          {t.askAbout}
                        </a>
                      )}
                      {selectedGear.wikiUrl && (
                        <a
                          href={selectedGear.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800 transition font-sans"
                          aria-label={t.wiki}
                          title={t.wiki}
                        >
                          {t.wiki}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
