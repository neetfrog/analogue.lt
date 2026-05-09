import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { articles } from '../data/content'
import { ImageLightbox } from './ImageLightbox'
import { TypewriterText } from './TypewriterText'
import type { ArticleTranslations } from '../i18n'

type ArticleItem = (typeof articles)[number]

type MotionVariants = Variants

type ArticlesSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
  reduceMotion?: boolean
  t: ArticleTranslations
}

export function ArticlesSection({ fadeInUp, staggerContainer, reduceMotion, t }: ArticlesSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [descriptionComplete, setDescriptionComplete] = useState(false)
  const isReducedMotion = reduceMotion ?? false
  const lastTapRef = useRef<number>(0)

  const articleImages = selectedArticle ? [selectedArticle.image, ...(selectedArticle.moreImages ?? [])] : []
  const activeImageIndex = activeImage && selectedArticle ? articleImages.findIndex((src) => src === activeImage) : -1
  const isHorizontArticle = selectedArticle?.id === 1

  const getHorizontWrapperClass = (src: string) => {
    if (!isHorizontArticle) return ''
    const normalized = src.replace(/%20/g, ' ')
    if (/horizont \((6|7)\)\.(jpg|jpeg|png|webp)$/i.test(normalized)) {
      return 'w-full aspect-[3/4]'
    }
    return 'w-full aspect-[16/9]'
  }

  const getHorizontImageClass = (src: string) => {
    if (!isHorizontArticle) return 'w-full h-full object-cover'
    const normalized = src.replace(/%20/g, ' ')
    if (/horizont \((6|7)\)\.(jpg|jpeg|png|webp)$/i.test(normalized)) {
      return 'w-full h-full object-cover'
    }
    return 'w-full h-full object-cover'
  }

  const openImageFullscreen = (image: string) => {
    setActiveImage(image)
    setZoomed(false)
  }

  const closeImageFullscreen = () => {
    setActiveImage(null)
    setZoomed(false)
  }

  const toggleImageZoom = () => {
    setZoomed((prev) => !prev)
  }

  const handleImageTouchEnd = (event: TouchEvent<HTMLImageElement>) => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      event.preventDefault()
      setZoomed((prev) => !prev)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  const goToPreviousImage = () => {
    if (activeImageIndex > 0) {
      setActiveImage(articleImages[activeImageIndex - 1])
      setZoomed(false)
    }
  }

  const goToNextImage = () => {
    if (activeImageIndex >= 0 && activeImageIndex < articleImages.length - 1) {
      setActiveImage(articleImages[activeImageIndex + 1])
      setZoomed(false)
    }
  }

  const reducedFadeIn: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : fadeInUp
  const reducedStagger: MotionVariants = isReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : staggerContainer

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior

    if (selectedArticle) {
      document.body.dataset.lightboxOpen = 'true'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.documentElement.style.overscrollBehavior = 'none'
    } else {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }

    return () => {
      delete document.body.dataset.lightboxOpen
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior
    }
  }, [selectedArticle])

  useEffect(() => {
    if (!selectedArticle) {
      setActiveImage(null)
      setZoomed(false)
      return undefined
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImage) {
        if (e.key === 'Escape') {
          setActiveImage(null)
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPreviousImage()
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNextImage()
        }

        return
      }

      if (e.key === 'Escape') {
        setSelectedArticle(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedArticle, activeImage, activeImageIndex, articleImages])

  useEffect(() => {
    setDescriptionComplete(false)
  }, [t.description])

  return (
    <section className="w-full min-h-screen flex items-start px-4 md:px-6 lg:px-8 pt-16 pb-16 relative">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div variants={reducedStagger} initial="hidden" animate="visible">
          <motion.div variants={reducedFadeIn} className="text-center mb-16">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">{t.eyebrow}</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{t.title}</h2>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.8, delay: 0.15 }}
              className="text-stone-500 text-lg font-light mt-4"
            >
              <TypewriterText
                text={t.description}
                reduceMotion={isReducedMotion}
                className="whitespace-pre-wrap"
                delay={120}
                speed={35}
                onComplete={() => setDescriptionComplete(true)}
              />
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: isReducedMotion ? 0.25 : 0.35 }}
                className="group relative overflow-hidden rounded-3xl bg-stone-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Article Card */}
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  aria-label={t.openImage?.replace('{title}', article.title) ?? `Open ${article.title}`}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200 focus:outline-none"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    onClick={() => setSelectedArticle(article)}
                    className="cursor-pointer ken-burns absolute inset-0 h-full w-full object-cover transition-transform duration-500"
                    style={{
                      '--ken-burns-duration': `${18 + (i % 3) * 2}s`,
                      '--ken-burns-offset': `${i % 3}`
                    } as React.CSSProperties}
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                </button>

                {/* Article content */}
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-stone-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-stone-600 font-light leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors group/btn"
                  >
                    <span>{t.readMore}</span>
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            key={`article-modal-${selectedArticle.id}`}
            className="fixed inset-0 z-50 overflow-hidden bg-black/60 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
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
                    <h3 className="text-2xl font-semibold">{selectedArticle.title}</h3>
                    <p className="text-sm text-stone-500">
                      {formatDate(selectedArticle.date)} · {selectedArticle.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="rounded-full bg-stone-100 p-3 text-stone-700 hover:bg-stone-200 transition"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6 px-6 py-6 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden min-w-0">
                  <div className="space-y-4">
                    <button
                    type="button"
                    onClick={() => openImageFullscreen(selectedArticle.image)}
                    aria-label={t.openImage?.replace('{title}', selectedArticle.title) ?? `Open ${selectedArticle.title}`}
                    className={`relative overflow-hidden rounded-3xl bg-stone-100 focus:outline-none ${getHorizontWrapperClass(selectedArticle.image) || 'w-full aspect-[5/4]'}`}
                  >
                    <img
                      src={selectedArticle.image}
                      alt={t.enlargedAlt ?? selectedArticle.title}
                      className={`cursor-zoom-in transition-transform duration-300 hover:scale-105 ${getHorizontImageClass(selectedArticle.image)}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  </div>

                  <article className="space-y-8 text-stone-600 leading-relaxed">
                    <div className="max-w-3xl space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
                        <span>{formatDate(selectedArticle.date)}</span>
                        <span>·</span>
                        <span>{selectedArticle.category}</span>
                      </div>
                      <p className="text-lg md:text-xl leading-relaxed">
                        {selectedArticle.excerpt}
                      </p>
                    </div>

                    <div className="max-w-3xl space-y-8">
                      {selectedArticle.body.map((paragraph, index) => (
                        <div key={index} className="space-y-6">
                          <p>{paragraph}</p>
                          {selectedArticle.moreImages?.[index] ? (
                            <button
                              type="button"
                              onClick={() => openImageFullscreen(selectedArticle.moreImages[index])}
                              aria-label={t.openImage?.replace('{title}', selectedArticle.title) ?? `Open ${selectedArticle.title}`}
                              className={`relative overflow-hidden rounded-3xl bg-stone-100 text-left focus:outline-none ${getHorizontWrapperClass(selectedArticle.moreImages[index]) || 'w-full aspect-[5/4]'}`}
                            >
                              <img
                                src={selectedArticle.moreImages[index]}
                                alt={`${selectedArticle.title} image ${index + 1}`}
                                className={`cursor-zoom-in transition-transform duration-300 hover:scale-105 ${getHorizontImageClass(selectedArticle.moreImages[index])}`}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          ) : null}
                        </div>
                      ))}

                      {selectedArticle.moreImages && selectedArticle.moreImages.length > selectedArticle.body.length ? (
                        <div className="grid gap-4 md:grid-cols-2">
                          {selectedArticle.moreImages.slice(selectedArticle.body.length).map((src, index) => (
                            <button
                              type="button"
                              key={index}
                              onClick={() => openImageFullscreen(src)}
                              aria-label={t.openImage?.replace('{title}', selectedArticle.title) ?? `Open ${selectedArticle.title}`}
                              className={`relative overflow-hidden rounded-3xl bg-stone-100 text-left focus:outline-none ${getHorizontWrapperClass(src) || 'w-full aspect-[5/4]'}`}
                            >
                              <img
                                src={src}
                                alt={`${selectedArticle.title} extra image ${selectedArticle.body.length + index + 1}`}
                                className={`cursor-zoom-in transition-transform duration-300 hover:scale-105 ${getHorizontImageClass(src)}`}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        {activeImage && (
          <ImageLightbox
            image={activeImage}
            alt={t.enlargedAlt ?? selectedArticle?.title ?? ''}
            zoomed={zoomed}
            reduceMotion={isReducedMotion}
            onClose={closeImageFullscreen}
            onToggleZoom={toggleImageZoom}
            onTouchEnd={handleImageTouchEnd}
            onPrev={goToPreviousImage}
            onNext={goToNextImage}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
