import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { X, Check, Clipboard } from 'lucide-react'
import { gearItems, type GearItem } from '../data/content'

type MotionVariants = Variants

type GearSectionProps = {
  fadeInUp: MotionVariants
  staggerContainer: MotionVariants
}

const categories = ['All', 'Cameras', 'Lenses', 'Accessories']

export function GearSection({ fadeInUp, staggerContainer }: GearSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    if (selectedGear) {
      setActiveImage(selectedGear.image)
      setCopiedLink(false)
    } else {
      setActiveImage(null)
      setCopiedLink(false)
    }
  }, [selectedGear])

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

  const filteredGearItems = selectedCategory === 'All'
    ? gearItems
    : gearItems.filter((item) => item.category === selectedCategory.toLowerCase())

  return (
    <section className="w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-24 py-16 pt-24 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-amber-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">For Sale</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">Camera Gear</h2>
            <p className="text-stone-500 text-lg font-light">Well-loved equipment looking for new homes</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedCategory === category
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGearItems.map((item) => (
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
                <div
                  className="aspect-square bg-stone-100 rounded-xl mb-4 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedGear(item)}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <p className={`font-bold text-2xl ${item.sold ? 'text-stone-400 line-through' : 'text-amber-600'}`}>
                    {item.price}
                  </p>
                  {item.sold && (
                    <span className="rounded-full bg-stone-900 px-2 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-white">
                      Sold
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mb-3 uppercase tracking-wider">{item.condition}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedGear(item)}
                  className="mt-4 w-full py-3 rounded-xl font-medium text-sm bg-stone-900 text-white hover:bg-stone-800 transition-all"
                >
                  Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedGear && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGear(null)}
          >
            <div className="flex min-h-full items-center justify-center py-6">
              <motion.div
                className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[calc(100vh-3rem)]"
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-6 py-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{selectedGear.name}</h3>
                    <p className="text-sm text-stone-500">{selectedGear.price} · {selectedGear.condition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const url = new URL(window.location.href)
                        url.hash = `item-${selectedGear.id}`
                        navigator.clipboard.writeText(url.toString())
                          .then(() => setCopiedLink(true))
                          .catch(() => setCopiedLink(false))
                      }}
                      className="rounded-full bg-stone-100 p-3 text-stone-700 hover:bg-stone-200 transition"
                      aria-label={copiedLink ? 'Link copied' : 'Copy link'}
                    >
                      {copiedLink ? <Check size={16} /> : <Clipboard size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGear(null)}
                      className="rounded-full bg-stone-100 p-3 text-stone-700 hover:bg-stone-200 transition"
                      aria-label="Close details"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_0.8fr] max-h-[calc(100vh-12rem)] overflow-auto">
                  <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-3xl bg-stone-100">
                      <img src={activeImage || selectedGear.image} alt={selectedGear.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {[selectedGear.image, ...selectedGear.moreImages].map((src, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImage(src)}
                          className={`w-20 h-20 min-w-[5rem] overflow-hidden rounded-3xl bg-stone-100 focus:outline-none ${activeImage === src ? 'ring-2 ring-amber-400' : ''}`}
                        >
                          <img src={src} alt={`${selectedGear.name} detail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">About this item</p>
                      <p className="text-stone-600 leading-relaxed">{selectedGear.details}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 mb-3">Tech Specs</p>
                      <ul className="space-y-2 text-sm text-stone-600">
                        {selectedGear.specs.map((spec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-900" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedGear.vintedUrl && !selectedGear.sold && (
                      <a
                        href={selectedGear.vintedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-400 transition"
                      >
                        Buy on Vinted
                      </a>
                    )}
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
