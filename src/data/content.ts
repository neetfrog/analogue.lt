export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'gear', label: 'Shop' },
  { id: 'contact', label: 'Contact' }
]

export const eventImages = [
  {
    id: 1,
    title: 'Sunset Portrait',
    location: 'Analog story',
    image: new URL('../../images/portfolio/1.jpg', import.meta.url).href
  },
  {
    id: 2,
    title: 'Golden Moment',
    location: 'Film memories',
    image: new URL('../../images/portfolio/2.jpg', import.meta.url).href
  },
  {
    id: 3,
    title: 'Quiet Details',
    location: 'Captured light',
    image: new URL('../../images/portfolio/3.jpg', import.meta.url).href
  },
  {
    id: 4,
    title: 'Vintage Frame',
    location: 'Storytelling',
    image: new URL('../../images/portfolio/4.jpg', import.meta.url).href
  }
]

export const homeSlides = [
  {
    src: new URL('../../images/slideshow/1.jpg', import.meta.url).href,
    alt: 'Couple walking through a sunlit meadow'
  },
  {
    src: new URL('../../images/slideshow/2.jpg', import.meta.url).href,
    alt: 'Portrait on a moody city street'
  },
  {
    src: new URL('../../images/slideshow/3.jpg', import.meta.url).href,
    alt: 'Two people sharing a quiet moment'
  }
]

export const instagramAccount = 'nefas.jpg'

export const gearItems = [
  {
    id: 5,
    name: 'Jupiter-11 135mm f/4',
    price: '€80',
    condition: 'Good',
    category: 'lenses',
    manufacturer: 'KMZ',
    description: 'Classic Soviet telephoto lens in Leica M39 mount.',
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
    description: 'Classic wide-angle Jupiter lens in Kiev Contax mount.',
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
    description: 'Soviet Sonnar-style portrait telephoto in Kiev/Contax mount.',
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
    description: 'SLR version of the Jupiter-11 in M39 mount for Zenit cameras.',
    sold: false,
    image: new URL('../../images/gear/jupiter-11-slr/jupiter-11-slr-1.webp', import.meta.url).href,
    details: 'This Jupiter-11 is the SLR M39 mount version designed for early Zenit bodies. It has a 135mm focal length, f/4 maximum aperture, clean glass, smooth focusing, and is based on the classic Zeiss Sonnar optical layout.',
    specs: ['135mm focal length', 'f/4 maximum aperture', 'M39 SLR mount', 'Sonnar-derived optical design'],
    tags: ['m39-slr','telephoto','prime','slr'],
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
    description: 'Contax/Kiev mount Jupiter-11 telephoto lens with clean glass and smooth focus.',
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
    description: 'M42-mount normal lens with smooth bokeh and strong contrast.',
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
    description: 'Ultra-wide Vivitar prime for Olympus OM cameras, compact and lightweight.',
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
    description: 'Cult classic East German M42 normal lens with versatile optics.',
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
    description: 'Classic 1967 Exakta VX1000 35mm SLR body in silver finish.',
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
    description: 'Historic 1951 Zorki-3 rangefinder body in silver and black.',
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
    description: 'Classic 1954 Carl Zeiss Jena Werra rangefinder/viewfinder camera.',
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
    price: '€80',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Zeiss Ikon',
    description: 'Medium format folding camera from Zeiss Ikon, made for 120 roll film.',
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
    description: 'Historic FED NKVD type 1d/4 Soviet rangefinder camera.',
    sold: false,
    image: new URL('../../images/gear/fed-nkvd-1935/fed-nkvd-1935-1.webp', import.meta.url).href,
    details: 'The FED NKVD is a rare early Soviet FED camera made between 1939 and 1941. This type 1d/4 example is fully working and historically significant, featuring a solid Soviet-era build and unique provenance tied to the NKVD lineage.',
    specs: ['35mm film', 'M39 lens mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
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
    price: '€15',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'FED',
    description: 'Classic Soviet FED 3 rangefinder camera from 1961.',
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
    description: 'Historic FED 1g rangefinder camera from 1949.',
    sold: false,
    image: new URL('../../images/gear/fed-1g-1949/fed-1g-1949-1.webp', import.meta.url).href,
    details: 'The FED 1g is an early Soviet Leica II(D) copy with a rare calibration hole in the backplate. This fully working 1949 example is a historic FED 1g (type 1g / type 6) and includes the original Soviet-era engraving and classic Leica thread mount compatibility.',
    specs: ['35mm film', 'M39 lens mount', 'Manual focus', 'Fully working'],
    tags: ['rangefinder','35mm'],
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
    price: '€130',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Yashica',
    description: '1959 Yashica YE 35mm rangefinder camera with Leica screw mount.',
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
    price: '€45',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'GOMZ',
    description: 'Lubitel medium format twin-lens reflex camera from 1949.',
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
    price: '€95',
    condition: 'Very Good',
    category: 'cameras',
    manufacturer: 'Zeiss Ikon',
    description: 'Contax F body with Carl Zeiss Tessar 50mm f/2.8 lens.',
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
    price: '€100',
    condition: 'Very Good',
    category: 'cameras',
    manufacturer: 'Canon',
    description: 'Canon FX body with 135mm f/2.5 FL lens.',
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
    price: '€80',
    condition: 'Good',
    category: 'cameras',
    manufacturer: 'Agfa',
    description: '1950s Agfa Karat 36 with Solagon 50mm f/2.',
    sold: false,
    image: new URL('../../images/gear/agfa-karat-36-50mm-f2-1948/agfa-karat-36-50mm-f2-1948-1.webp', import.meta.url).href,
    details: 'The Agfa Karat 36 is an uncommon medium-format camera paired with a Solagon 50mm f/2 lens by Rodenstock. This fully working 1948 example features classic German optics in a compact design.',
    specs: ['120 film', '6x6cm medium format', 'Solagon 50mm f/2 lens', 'Manual focus', 'Fully working'],
    tags: ['medium-format','standard','120film'],
    vintedUrl: 'https://www.vinted.lt/items/6960669161-agfa-karat-36-50mm-f2-1948',
    wikiUrl: 'https://camera-wiki.org/wiki/Karat#Karat_36',
    moreImages: [
      new URL('../../images/gear/agfa-karat-36-50mm-f2-1948/agfa-karat-36-50mm-f2-1948-2.webp', import.meta.url).href
    ]
  }
]

export type GearItem = typeof gearItems[number]


