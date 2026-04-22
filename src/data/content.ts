export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'gear', label: 'Shop' },
  { id: 'contact', label: 'Contact' }
]

export type GearItem = {
  id: number
  name: string
  price: string | number
  condition: string
  category: string
  manufacturer: string
  description?: string
  sold: boolean
  image: string
  details: string
  specs: string[]
  tags?: string[]
  moreImages?: string[]
  vintedUrl?: string
  wikiUrl?: string
  inquiryEmail?: string
}

type EventImage = {
  id: number
  title: string
  location: string
  image: string
}

const portfolioImageModules = import.meta.glob('../../images/portfolio/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const eventImages: EventImage[] = Object.entries(portfolioImageModules)
  .map(([path, image], index) => {
    const filename = path.split('/').pop() ?? `portfolio-${index + 1}`
    const title = filename.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim()
    return {
      id: index + 1,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      location: 'Portfolio',
      image
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }))

const slideshowImageModules = import.meta.glob('../../images/slideshow/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const homeSlides = Object.entries(slideshowImageModules)
  .map(([path, src]) => {
    const filename = path.split('/').pop() ?? 'slideshow'
    const label = filename.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim()
    const alt = label
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\s+/g, ' ')
    return { src, alt }
  })
  .sort((a, b) => a.alt.localeCompare(b.alt, undefined, { numeric: true, sensitivity: 'base' }))

export const instagramAccount = 'nefas.jpg'

export const gearItems = [
  {
    id: 5,
    name: 'Jupiter-11 135mm f/4',
    price: '€80',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/jupiter-11/jupiter-11-1.webp', import.meta.url).href,
    details: 'This Jupiter-11 lens is derived from the Zeiss Sonnar design with four elements in three groups. It offers a 135mm focal length and f/4 maximum aperture, making it a compact telephoto prime for portrait and detail work.',
    specs: ['135mm focal length', 'f/4 maximum aperture', 'M39 Leica mount', 'Sonnar-derived optical design'],
    tags: ['m39','telephoto','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980375412-jupiter-11-135mm-f4-m39-leica-mount',
    wikiUrl: 'https://en.wikipedia.org/wiki/Jupiter_(lenses)#Jupiter-11',
    moreImages: [
      new URL('../../images/gear/jupiter-11/jupiter-11-2.webp', import.meta.url).href
    ]
  },
  {
    id: 9,
    name: 'Jupiter-12 35mm f/2.8',
    price: '€55',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/jupiter-12/jupiter-12-1.webp', import.meta.url).href,
    details: 'This Jupiter-12 lens is derived from the Soviet Biogon design and features six elements in four groups. It has a 35mm focal length and f/2.8 maximum aperture, with clean glass and smooth focusing.',
    specs: ['35mm focal length', 'f/2.8 maximum aperture', 'Kiev Contax mount', 'Biogon-derived optical design'],
    tags: ['kiev-contax','wide','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980403296-jupiter-12-35mm-f28-kiev-contax',
    wikiUrl: 'https://en.wikipedia.org/wiki/Jupiter_(lenses)#Jupiter-12',
    moreImages: [
      new URL('../../images/gear/jupiter-12/jupiter-12-2.webp', import.meta.url).href
    ]
  },
  {
    id: 10,
    name: 'Jupiter-9 85mm f/2',
    price: '€110',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/jupiter-9/jupiter-9-1.webp', import.meta.url).href,
    details: 'The Jupiter-9 is an 85mm f/2 Soviet telephoto lens based on the Zeiss Sonnar design. This example is clean, focuses smoothly, and comes in Kiev Contax mount, making it ideal for vintage portrait and street work.',
    specs: ['85mm focal length', 'f/2 maximum aperture', 'Kiev Contax mount', 'Sonnar-derived optical design'],
    tags: ['kiev-contax','telephoto','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980327785',
    wikiUrl: 'https://camera-wiki.org/wiki/Jupiter-9',
    moreImages: [
      new URL('../../images/gear/jupiter-9/jupiter-9-2.webp', import.meta.url).href
    ]
  },
  {
    id: 11,
    name: 'Jupiter-11 135mm f/4',
    price: '€90',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/jupiter-11-slr/jupiter-11-slr-1.webp', import.meta.url).href,
    details: 'This Jupiter-11 is the SLR M39 mount version designed for early Zenit bodies. It has a 135mm focal length, f/4 maximum aperture, clean glass, smooth focusing, and is based on the classic Zeiss Sonnar optical layout.',
    specs: ['135mm focal length', 'f/4 maximum aperture', 'M39 SLR mount', 'Sonnar-derived optical design'],
    tags: ['m39-slr','telephoto','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980390883-jupiter-11-135mm-f4-m39-slr-mount',
    wikiUrl: 'https://en.wikipedia.org/wiki/Jupiter_(lenses)#Jupiter-11',
    moreImages: [
      new URL('../../images/gear/jupiter-11-slr/jupiter-11-slr-2.webp', import.meta.url).href
    ]
  },
  {
    id: 12,
    name: 'Jupiter-11 135mm f/4',
    price: '€80',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/jupiter-11-kiev-contax/jupiter-11-kiev-contax-1.webp', import.meta.url).href,
    details: 'This Jupiter-11 is a Kiev Contax mount version of the classic 135mm f/4 Sonnar-derived lens. It has clean glass, smooth focusing, and comes in a silver finish, making it ideal for vintage telephoto work.',
    specs: ['135mm focal length', 'f/4 maximum aperture', 'Kiev Contax mount', 'Sonnar-derived optical design'],
    tags: ['kiev-contax','telephoto','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980351035-jupiter-11-135mm-f4-kiev-contax',
    wikiUrl: 'https://en.wikipedia.org/wiki/Jupiter_(lenses)#Jupiter-11',
    moreImages: [
      new URL('../../images/gear/jupiter-11-kiev-contax/jupiter-11-kiev-contax-2.webp', import.meta.url).href
    ]
  },
  {
    id: 13,
    name: 'Zenitar-M 50mm f/1.7',
    price: '€90',
    condition: 'Very Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/zenitar-m-50mm-f17-m42/zenitar-m-50mm-f17-m42-1.webp', import.meta.url).href,
    details: 'The Zenitar-M 50mm f/1.7 is a classic M42 standard lens from KMZ with multicoating and attractive bokeh. This example has clean glass, smooth focusing, and works well on adapters for modern mirrorless and SLR cameras.',
    specs: ['50mm focal length', 'f/1.7 maximum aperture', 'M42 screw mount', 'Multicoated optics'],
    tags: ['m42','standard','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980558231-zenitar-m-50mm-f17-m42',
    wikiUrl: 'https://www.dpreview.com/forums/thread/3981603',
    moreImages: [
      new URL('../../images/gear/zenitar-m-50mm-f17-m42/zenitar-m-50mm-f17-m42-2.webp', import.meta.url).href
    ]
  },
  {
    id: 14,
    name: 'Vivitar 21mm f/3.8',
    price: '€90',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'Vivitar',
    sold: false,
    image: new URL('../../images/gear/vivitar-21mm-f38-om/vivitar-21mm-f38-om-1.webp', import.meta.url).href,
    details: 'The Vivitar 21mm f/3.8 OM is an ultra-wide, lightweight full-frame Olympus mount lens. It delivers clean glass, smooth focus, and a wide field of view that works well for landscape, architecture, and creative wide-angle shots.',
    specs: ['21mm focal length', 'f/3.8 maximum aperture', 'Olympus OM mount', 'Ultra-wide prime'],
    tags: ['olympus-om','wide','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980520302-vivitar-21mm-f38-om',
    wikiUrl: 'https://allphotolenses.com/lenses/item/c_3935.html',
    moreImages: [
      new URL('../../images/gear/vivitar-21mm-f38-om/vivitar-21mm-f38-om-2.webp', import.meta.url).href
    ]
  },
  {
    id: 15,
    name: 'Pentacon 50mm f/1.8',
    price: '€40',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'Pentacon',
    sold: false,
    image: new URL('../../images/gear/pentacon-50mm-f18-m42/pentacon-50mm-f18-m42-1.webp', import.meta.url).href,
    details: 'The Pentacon 50mm f/1.8 is a classic East German normal lens produced for M42 screw mount cameras. It has clean glass, smooth focus, and offers a compact package with a sharp, characterful rendering.',
    specs: ['50mm focal length', 'f/1.8 maximum aperture', 'M42 screw mount', 'Classic East German optics'],
    tags: ['m42','standard','prime'],
    vintedUrl: 'https://www.vinted.lt/items/6980419014-pentacon-50mm-f18-m42',
    wikiUrl: 'https://www.stenersenoutdoors.com/blog/pentacon-an-imperfect-jewel-according-to-my-taste-anyway',
    moreImages: [
      new URL('../../images/gear/pentacon-50mm-f18-m42/pentacon-50mm-f18-m42-2.webp', import.meta.url).href
    ]
  },
  {
    id: 16,
    name: 'Exakta VX1000',
    price: '€55',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Exakta',
    sold: false,
    image: new URL('../../images/gear/exakta-vx1000/exakta-vx1000-1.webp', import.meta.url).href,
    details: 'The Exakta VX1000 from 1967 is a historic German 35mm SLR known for its left-handed layout and robust build. This fully working example offers a unique shooting experience and is a great collectible for film photographers.',
    specs: ['35mm film', 'Exakta VX lens mount', 'Manual focus', 'Fully working'],
    tags: ['slr','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6960814027-exakta-vx1000-1967',
    wikiUrl: 'https://alysvintagecameraalley.com/2020/11/04/the-exakta-vx1000-a-left-handers-dream/',
    moreImages: [
      new URL('../../images/gear/exakta-vx1000/exakta-vx1000-2.webp', import.meta.url).href,
      new URL('../../images/gear/exakta-vx1000/exakta-vx1000-3.webp', import.meta.url).href
    ]
  },
  {
    id: 17,
    name: 'Zorki-3',
    price: '€130',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/zorki-3-1951/zorki-3-1951-1.webp', import.meta.url).href,
    details: 'The Zorki-3 from 1951 is a classic Soviet rangefinder camera with a combined viewfinder/rangefinder and advanced shutter speeds for its era. This fully working example is a rare collectible that combines reliability with vintage Soviet design.',
    specs: ['35mm film', 'M39 lens mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6961166859',
    wikiUrl: 'https://camera-wiki.org/wiki/Zorki_3',
    moreImages: [
      new URL('../../images/gear/zorki-3-1951/zorki-3-1951-2.webp', import.meta.url).href
    ]
  },
  {
    id: 18,
    name: 'Carl Zeiss Jena Werra',
    price: '€80',
    condition: 'Very Good',
    category: 'cameras',
    manufacturer: 'Zeiss Jena',
    sold: false,
    image: new URL('../../images/gear/carl-zeiss-werra-1954/carl-zeiss-werra-1954-1.webp', import.meta.url).href,
    details: 'The Carl Zeiss Jena Werra from 1954 is a design-focused German 35mm camera known for its streamlined controls and elegant styling. This fully working example emphasizes simplicity, with many functions integrated in the lens barrel and a distinct rangefinder/viewfinder layout.',
    specs: ['35mm film', 'Viewfinder / rangefinder', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6961116704-carl-zeiss-jena-werra-1954',
    wikiUrl: 'https://camera-wiki.org/wiki/werra',
    moreImages: [
      new URL('../../images/gear/carl-zeiss-werra-1954/carl-zeiss-werra-1954-2.webp', import.meta.url).href
    ]
  },
  {
    id: 19,
    name: 'Carl Zeiss Ikon Ikonta 521',
    price: '€120',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Zeiss Ikon',
    sold: false,
    image: new URL('../../images/gear/carl-zeiss-ikon-ikonta-521/carl-zeiss-ikon-ikonta-521-1.webp', import.meta.url).href,
    details: 'The Zeiss Ikon Ikonta 521 is a 120 roll-film folding camera producing 6x9cm negatives. This fully working example is a classic mid-century German medium-format camera with elegant styling and rugged build quality.',
    specs: ['120 film', '6x9cm medium format', 'Manual focus', 'Fully working'],
    tags: ['medium-format','120film'],
    vintedUrl: 'https://www.vinted.lt/items/6961094420-carl-zeiss-ikon-ikonta-1938-1952-medium-format',
    wikiUrl: 'https://thenoisyshutter.com/2022/06/23/classic-camera-review-zeiss-ikon-ikonta-521/',
    moreImages: [
      new URL('../../images/gear/carl-zeiss-ikon-ikonta-521/carl-zeiss-ikon-ikonta-521-2.webp', import.meta.url).href
    ]
  },
  {
    id: 20,
    name: 'FED NKVD',
    price: '€180',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'FED',
    sold: false,
    image: new URL('../../images/gear/fed-nkvd-1935/fed-nkvd-1935-1.webp', import.meta.url).href,
    details: 'The FED NKVD is a rare early Soviet FED camera made between 1939 and 1941. This type 1d/4 example is fully working and historically significant, featuring a solid Soviet-era build and unique provenance tied to the NKVD lineage.',
    specs: ['35mm film', 'M39 lens mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm', 'rare'],
    vintedUrl: 'https://www.vinted.lt/items/6960847627-fed-nkvd-1935',
    wikiUrl: 'https://camerapedia.fandom.com/wiki/FED_(Original)_(FED_NKVD,_FED-S,_FED-1)',
    moreImages: [
      new URL('../../images/gear/fed-nkvd-1935/fed-nkvd-1935-2.webp', import.meta.url).href,
      new URL('../../images/gear/fed-nkvd-1935/fed-nkvd-1935-3.webp', import.meta.url).href
    ]
  },
  {
    id: 21,
    name: 'FED 3',
    price: '€20',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'FED',
    sold: false,
    image: new URL('../../images/gear/fed-3-1961/fed-3-1961-1.webp', import.meta.url).href,
    details: 'The FED 3 is a mid-century Soviet rangefinder inspired by Leica II(D) cameras. This fully working 1961 example offers a compact 35mm format, smooth focus, and a complete set of shutter speeds for classic film photography.',
    specs: ['35mm film', 'M39 lens mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6960902366-fed-3-1961',
    wikiUrl: 'https://camerapedia.fandom.com/wiki/FED_3',
    moreImages: [
      new URL('../../images/gear/fed-3-1961/fed-3-1961-2.webp', import.meta.url).href
    ]
  },
  {
    id: 22,
    name: 'FED 1g',
    price: '€180',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'FED',
    sold: false,
    image: new URL('../../images/gear/fed-1g-1949/fed-1g-1949-1.webp', import.meta.url).href,
    details: 'The FED 1g is an early Soviet Leica II(D) copy with a rare calibration hole in the backplate. This fully working 1949 example is a historic FED 1g (type 1g / type 6) and includes the original Soviet-era engraving and classic Leica thread mount compatibility.',
    specs: ['35mm film', 'M39', 'rare'],
    tags: ['rangefinder','35mm','rare'],
    vintedUrl: 'https://www.vinted.lt/items/6960888603-fed-1g-1949',
    wikiUrl: 'https://fedka.com/fs/product/fed-1g-chrome/',
    moreImages: [
      new URL('../../images/gear/fed-1g-1949/fed-1g-1949-2.webp', import.meta.url).href,
      new URL('../../images/gear/fed-1g-1949/fed-1g-1949-3.webp', import.meta.url).href
    ]
  },
  {
    id: 23,
    name: 'Yashica YE',
    price: '€150',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Yashica',
    sold: false,
    image: new URL('../../images/gear/yashica-ye-1959/yashica-ye-1959-1.webp', import.meta.url).href,
    details: 'The Yashica YE is a 1959 35mm rangefinder camera featuring Leica screw mount compatibility and separate focus/viewing eyepieces. This fully working example carries classic mid-century Japanese design and reliable film handling.',
    specs: ['35mm film', 'Leica screw mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6961026635-yashica-ye-1959',
    wikiUrl: 'https://camera-wiki.org/wiki/Yashica_YE',
    moreImages: [
      new URL('../../images/gear/yashica-ye-1959/yashica-ye-1959-2.webp', import.meta.url).href
    ]
  },
  {
    id: 24,
    name: 'Lubitel 1',
    price: '€60',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'GOMZ',
    sold: false,
    image: new URL('../../images/gear/lubitel-1949/lubitel-1949-1.webp', import.meta.url).href,
    details: 'The Lubitel 1949 is a Russian medium format TLR built by LOMO for 120 film. This fully working example features a Cooke triplet lens, simple controls, and classic Soviet-era medium format charm.',
    specs: ['120 film', '6x6cm medium format', 'TLR', 'Fully working'],
    tags: ['medium-format','tlr','120film'],
    vintedUrl: 'https://www.vinted.lt/items/6960989450-lubitel-1949-medium-format',
    wikiUrl: 'https://en.wikipedia.org/wiki/Lubitel',
    moreImages: [
      new URL('../../images/gear/lubitel-1949/lubitel-1949-2.webp', import.meta.url).href
    ]
  },
  {
    id: 25,
    name: 'Contax F + Carl Zeiss Tessar 50mm f/2.8',
    price: '€130',
    condition: 'Very Good',
    category: 'cameras',
    manufacturer: 'Zeiss Ikon',
    sold: false,
    image: new URL('../../images/gear/contax-f-1956/contax-f-1956-1.webp', import.meta.url).href,
    details: 'The Contax F from 1956 is an early Contax camera with an automatic diaphragm release and larger mirror design. This set includes the Carl Zeiss Tessar 50mm f/2.8 lens, and it is fully working with clean glass and smooth focus.',
    specs: ['35mm film', 'Contax F mount', 'Manual focus', 'Fully working'],
    tags: ['slr','35mm'],
    vintedUrl: 'https://www.vinted.lt/items/6960741934-contax-f-1956-carl-zeiss-tessar-50mm-f28',
    wikiUrl: 'https://camera-wiki.org/wiki/Contax_S#Contax_F.2C_FM.2C_FB_and_FBM',
    moreImages: [
      new URL('../../images/gear/contax-f-1956/contax-f-1956-2.webp', import.meta.url).href,
      new URL('../../images/gear/contax-f-1956/contax-f-1956-3.webp', import.meta.url).href,
      new URL('../../images/gear/contax-f-1956/contax-f-1956-4.webp', import.meta.url).href
    ]
  },
  {
    id: 26,
    name: 'Canon FX + Canon 135mm f/2.5 FL',
    price: '€160',
    condition: 'Very Good',
    category: 'cameras',
    manufacturer: 'Canon',
    sold: false,
    image: new URL('../../images/gear/canon-fx-1964/canon-fx-1964-1.webp', import.meta.url).href,
    details: 'The Canon FX from 1964 is an early FL-mount 35mm SLR with built-in CdS metering and a rare Canon 135mm f/2.5 FL lens. This set is fully working, with smooth focus and clean glass, making it a solid example of classic Canon SLR engineering.',
    specs: ['35mm film', 'Canon FL mount', 'Manual focus', 'Fully working'],
    tags: ['slr','35mm','telephoto'],
    vintedUrl: 'https://www.vinted.lt/items/6960716767-canon-fx-1964-canon-135mm-f25-fl',
    wikiUrl: 'https://camera-wiki.org/wiki/Canon_FX',
    moreImages: [
      new URL('../../images/gear/canon-fx-1964/canon-fx-1964-2.webp', import.meta.url).href
    ]
  },
  {
    id: 27,
    name: 'Agfa Karat 36',
    price: '€130',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Agfa',
    sold: false,
    image: new URL('../../images/gear/agfa-karat-36-50mm-f2-1948/agfa-karat-36-50mm-f2-1948-1.webp', import.meta.url).href,
    details: 'The Agfa Karat 36 is an uncommon camera paired with a Solagon 50mm f/2 lens by Rodenstock. This fully working 1948 example features classic German optics in a compact design.',
    specs: ['120 film', '6x6cm medium format', 'Solagon 50mm f/2 lens', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','standard','135film'],
    vintedUrl: 'https://www.vinted.lt/items/6960669161-agfa-karat-36-50mm-f2-1948',
    wikiUrl: 'https://camera-wiki.org/wiki/Karat#Karat_36',
    moreImages: [
      new URL('../../images/gear/agfa-karat-36-50mm-f2-1948/agfa-karat-36-50mm-f2-1948-2.webp', import.meta.url).href
    ]
  },
  {
    id: 28,
    name: 'Mini Tripod-clamp FED 3/8"',
    price: '€30',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'FED',
    sold: false,
    image: new URL('../../images/gear/mini-tripod-clamp-fed-3-8/mini-tripod-clamp-fed-3-8-1.jpg', import.meta.url).href,
    details: 'A compact FED accessory clamp made for 3/8" tripod screws and lightweight vintage camera setups. It secures small heads and adapters with a rugged aluminum alloy body while keeping the package easy to carry for film shooting on the move.',
    specs: ['3/8" tripod thread', 'Compact clamp design', 'Compatible with small tripod heads', 'Aluminum alloy body', 'FED accessory'],
    tags: ['tripod','clamp','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Tripod',
    moreImages: [
      new URL('../../images/gear/mini-tripod-clamp-fed-3-8/mini-tripod-clamp-fed-3-8-2.jpg', import.meta.url).href,
      new URL('../../images/gear/mini-tripod-clamp-fed-3-8/mini-tripod-clamp-fed-3-8-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 29,
    name: 'Exakta Waist-level Finder',
    price: '€30',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'Exakta',
    sold: false,
    image: new URL('../../images/gear/exakta-waist-level-finder/exakta-waist-level-finder-1.jpg', import.meta.url).href,
    details: 'This Exakta waist-level finder attaches to the camera body and provides a bright ground glass view for composing from waist height. It is especially useful for low-angle street photography, precise focusing, and a classic shooting style compatible with many Exakta SLR bodies.',
    specs: ['Waist-level finder', 'Exakta SLR attachment', 'Low-angle shooting', 'Ground glass focusing', 'Vintage accessory'],
    tags: ['finder','waist-level','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Waist-level_viewfinder',
    moreImages: [
      new URL('../../images/gear/exakta-waist-level-finder/exakta-waist-level-finder-2.jpg', import.meta.url).href,
      new URL('../../images/gear/exakta-waist-level-finder/exakta-waist-level-finder-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 30,
    name: 'M39 + M42 Extension Tubes Set',
    price: '€30',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/m39-m42-extension-tubes/m39-m42-extension-tubes-1.jpg', import.meta.url).href,
    details: 'This KMZ extension tube set includes both M39 and M42 adapters that let vintage lenses focus much closer for macro still life, flower, and product photography. It is a no-optics solution that preserves the character of classic lenses while enabling more extreme close-up work on film cameras.',
    specs: ['M39 extension tube', 'M42 extension tube', 'Macro photography', 'Close-focusing kit', 'No optical elements'],
    tags: ['extension','tube','macro'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Extension_tube_(photography)',
    moreImages: [
      new URL('../../images/gear/m39-m42-extension-tubes/m39-m42-extension-tubes-2.jpg', import.meta.url).href,
      new URL('../../images/gear/m39-m42-extension-tubes/m39-m42-extension-tubes-3.jpg', import.meta.url).href,
      new URL('../../images/gear/m39-m42-extension-tubes/m39-m42-extension-tubes-4.jpg', import.meta.url).href
    ]
  },
  {
    id: 31,
    name: 'M42 Vorsatz Soviet Macro Close-up Bellows',
    price: '€35',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'Generic',
    sold: false,
    image: new URL('../../images/gear/m42-vorsatz-soviet-macro-bellows/m42-vorsatz-soviet-macro-bellows-1.jpg', import.meta.url).href,
    details: 'This Soviet-style M42 bellows unit is designed for macro and close-up work, letting photographers extend the lens-to-film distance with precision focusing. It works with M42 screw-mount lenses and is perfect for detailed film still-life, product, and botanical photography.',
    specs: ['M42 screw mount', 'Macro bellows', 'Close-up photography', 'Adjustable focusing rail', 'No additional optics'],
    tags: ['macro','bellows','accessory'],
    vintedUrl: 'https://www.vinted.lt/items/8718424490-m42-vorsatz-macro-close-up-bellows',
    wikiUrl: 'https://camera-wiki.org/wiki/Bellows',
    moreImages: [
      new URL('../../images/gear/m42-vorsatz-soviet-macro-bellows/m42-vorsatz-soviet-macro-bellows-2.jpg', import.meta.url).href,
      new URL('../../images/gear/m42-vorsatz-soviet-macro-bellows/m42-vorsatz-soviet-macro-bellows-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 32,
    name: 'KMZ L-5 5x Loupe Magnifying Glass Film Viewer',
    price: '€40',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/kmz-l-5-loupe-viewer/kmz-l-5-loupe-viewer-1.jpg', import.meta.url).href,
    details: 'This KMZ L-5 magnifying loupe is designed for fast evaluation of 35mm film negatives and slides with a bright 5x optical magnification. It is a handy tool for film photographers who need to check focus and frame details before scanning or printing.',
    specs: ['5x magnification', '35mm film viewer', 'KMZ optical loupe', 'Compact handheld design', 'Glass optics'],
    tags: ['loupe','film viewer','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Loupe',
    moreImages: [
      new URL('../../images/gear/kmz-l-5-loupe-viewer/kmz-l-5-loupe-viewer-2.jpg', import.meta.url).href,
      new URL('../../images/gear/kmz-l-5-loupe-viewer/kmz-l-5-loupe-viewer-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 33,
    name: 'KMZ Pocket Magnifying Glass 4x',
    price: '€40',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/kmz-pocket-loupe-4x/kmz-pocket-loupe-4x-1.jpg', import.meta.url).href,
    details: 'This KMZ pocket loupe delivers 4x magnification in a compact folding design, making it ideal for quick 35mm film inspection and detail checks. The optical quality is reminiscent of classic precision loupe designs, with crisp glass optics and a sturdy USSR-era metal frame.',
    specs: ['4x magnification', '35mm film viewer', 'Pocket folding loupe', 'Glass optics', 'USSR-made'],
    tags: ['loupe','film viewer','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Loupe',
    moreImages: [
      new URL('../../images/gear/kmz-pocket-loupe-4x/kmz-pocket-loupe-4x-2.jpg', import.meta.url).href,
      new URL('../../images/gear/kmz-pocket-loupe-4x/kmz-pocket-loupe-4x-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 34,
    name: 'Various chrome & silver lens caps from Soviet lenses',
    price: '€10–€50',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'KMZ',
    sold: false,
    image: new URL('../../images/gear/soviet-lens-caps/soviet-lens-caps-1.jpg', import.meta.url).href,
    inquiryEmail: 'ignasnefas@gmail.com',
    details: 'A selection of Soviet-era chrome and silver lens caps for vintage lenses. Prices vary by size, type and condition, so please inquire for exact availability and pricing.',
    specs: ['Chrome finish', 'Silver finish', 'Vintage Soviet accessory', 'Varied sizes', 'Mixed condition'],
    tags: ['lens cap','soviet','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Lens_cap',
    moreImages: []
  },
  {
    id: 35,
    name: 'Various Non-Soviet Lens Caps',
    price: '€5–€50',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'Various',
    sold: false,
    image: new URL('../../images/gear/non-soviet-lens-caps/non-soviet-lens-caps-1.jpg', import.meta.url).href,
    inquiryEmail: 'ignasnefas@gmail.com',
    details: 'A selection of non-Soviet lens caps for vintage and modern cameras. Prices vary by size, type and condition, so please inquire for availability and exact pricing.',
    specs: ['Non-Soviet models', 'Varied sizes', 'Mixed condition'],
    tags: ['lens cap','non-soviet','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Lens_cap',
    moreImages: []
  },
  {
    id: 36,
    name: 'Various Adapters for Kiev / Pentacon / Exakta / Contax-Yashica / Canon EF',
    price: '€10–€100',
    condition: 'Good',
    category: 'accessories',
    manufacturer: 'Various',
    sold: false,
    image: new URL('../../images/gear/various-adapters-ky-canon-exakta-pentacon/various-adapters-1.jpg', import.meta.url).href,
    inquiryEmail: 'ignasnefas@gmail.com',
    details: 'Various mount adapters for Kiev, Pentacon, Exakta, Contax-Yashica and Canon EF systems. Prices range from €10 to €100 depending on the specific adapter and condition, so please inquire for availability and exact pricing.',
    specs: ['Kiev mount', 'Pentacon mount', 'Exakta mount', 'Contax-Yashica mount', 'Canon EF mount'],
    tags: ['adapter','mount','accessory'],
    wikiUrl: 'https://en.wikipedia.org/wiki/Lens_mount_adapter',
    moreImages: [
      new URL('../../images/gear/various-adapters-ky-canon-exakta-pentacon/various-adapters-2.jpg', import.meta.url).href
    ]
  },
  {
    id: 37,
    name: 'Mir-1 37mm f/2.8 Brussels Grand Prix',
    price: '€250',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'ZOMZ',
    sold: false,
    image: new URL('../../images/gear/mir-1-37mm-f28-brussels-grand-prix/mir-1-37mm-f28-brussels-grand-prix-1.jpg', import.meta.url).href,
    details: 'This special Brussels Grand Prix edition of the KMZ Mir-1 is a 37mm f/2.8 wide-angle lens in M39 SLR mount. It offers compact handling, pleasing retro colors and contrast, and can be adapted to M42 with a simple adapter for use on a wider range of vintage and modern bodies.',
    specs: ['37mm focal length', 'f/2.8 maximum aperture', 'M39 SLR mount', 'Adaptable to M42', 'KMZ Mir-1 optical design'],
    tags: ['wide-angle','prime','rare'],
    vintedUrl: 'https://www.vinted.lt/items/8718400913-mir-1-37mm-f28-grand-prix-brussels-1958',
    wikiUrl: 'https://en.wikipedia.org/wiki/Mir_(lens)',
    moreImages: [
      new URL('../../images/gear/mir-1-37mm-f28-brussels-grand-prix/mir-1-37mm-f28-brussels-grand-prix-2.jpg', import.meta.url).href,
      new URL('../../images/gear/mir-1-37mm-f28-brussels-grand-prix/mir-1-37mm-f28-brussels-grand-prix-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 38,
    name: 'Zeiss Ikon Contaflex',
    price: '€130',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Zeiss Ikon',
    sold: false,
    image: new URL('../../images/gear/zeiss-ikon-contaflex-1953/zeiss-ikon-contaflex-1953-1.jpg', import.meta.url).href,
    details: 'A 1953 Zeiss Ikon Contaflex SLR in good working condition, offering a compact camera design and solid German engineering. This early Contaflex is a great collectible for vintage 35mm photography enthusiasts and includes the original folding lens mount style body. ',
    specs: ['35mm film', 'Contaflex reflex system', 'Manual focus', 'Good working condition', 'Classic 1950s design'],
    tags: ['contaflex','35mm','vintage'],
    vintedUrl: 'https://www.vinted.lt/items/8718353347-zeiss-ikon-contaflex',
    wikiUrl: 'https://en.wikipedia.org/wiki/Contaflex',
    moreImages: [
      new URL('../../images/gear/zeiss-ikon-contaflex-1953/zeiss-ikon-contaflex-1953-2.jpg', import.meta.url).href,
      new URL('../../images/gear/zeiss-ikon-contaflex-1953/zeiss-ikon-contaflex-1953-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 39,
    name: 'Lomo LC-A',
    price: '€120',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Lomo',
    sold: false,
    image: new URL('../../images/gear/lomo-lc-a/lomo-lc-a-1.jpg', import.meta.url).href,
    details: 'The Lomo LC-A is a compact 35mm camera cherished for its “happy” color rendering, vignetting, and ease of use. This example is in good condition and retains the iconic small-format rangefinder-style body, making it a strong choice for film photography lovers and street shooters.',
    specs: ['35mm film', 'Compact build', 'Automatic exposure', 'Zone focus', 'Vivid color rendering'],
    tags: ['lomo','35mm','film'],
    vintedUrl: 'https://www.vinted.lt/items/8718378636-lomo-lc-a',
    wikiUrl: 'https://en.wikipedia.org/wiki/LC-A',
    moreImages: [
      new URL('../../images/gear/lomo-lc-a/lomo-lc-a-2.jpg', import.meta.url).href,
      new URL('../../images/gear/lomo-lc-a/lomo-lc-a-3.jpg', import.meta.url).href
    ]
  },
  {
    id: 40,
    name: 'Kiev II + Jupiter-3 50mm f/1.5',
    price: '€450',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Arsenal',
    sold: false,
    image: new URL('../../images/gear/kiev-ii-jupiter-3-50mm-f15/kiev-ii-jupiter-3-50mm-f15-1.jpg', import.meta.url).href,
    details: 'A rare and historic Kiev II with Jupiter-3 50mm f/1.5 lens, produced by Arsenal in 1955. The Kiev II is a true Contax II copy and was built from 1950–1956, with early examples featuring Cyrillic-only engraving and a stabilizing foot on the bottom plate. This example is an early-style 1955 production and is increasingly hard to find, especially among collectors of early Soviet cameras.',
    specs: ['1955 Kiev II', 'Jupiter-3 50mm f/1.5', 'Contax mount', 'Arsenal production', 'Rare collector item'],
    tags: ['rangefinder','rare'],
    vintedUrl: 'https://www.vinted.lt/items/8718562344-kiev-ii-jupiter-3-50mm-f15',
    wikiUrl: 'https://en.wikipedia.org/wiki/Kiev_II',
    moreImages: [
      new URL('../../images/gear/kiev-ii-jupiter-3-50mm-f15/kiev-ii-jupiter-3-50mm-f15-2.jpg', import.meta.url).href,
      new URL('../../images/gear/kiev-ii-jupiter-3-50mm-f15/kiev-ii-jupiter-3-50mm-f15-3.jpg', import.meta.url).href,
      new URL('../../images/gear/kiev-ii-jupiter-3-50mm-f15/kiev-ii-jupiter-3-50mm-f15-4.jpg', import.meta.url).href
    ]
  }
]



