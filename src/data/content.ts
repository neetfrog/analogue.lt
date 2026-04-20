export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'gear', label: 'Gear' },
  { id: 'contact', label: 'Contact' }
]

export const weddingImages = [
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
  }
]

export const homeSlides = [
  {
    src: new URL('../../images/slideshow/1.jpg', import.meta.url).href,
    alt: 'Couple walking through a sunlit meadow'
  },
  {
    src: new URL('../../images/slideshow/2.jpg', import.meta.url).href,
    alt: 'Wedding portrait on a moody city street'
  },
  {
    src: new URL('../../images/slideshow/3.jpg', import.meta.url).href,
    alt: 'Bride and groom sharing a quiet moment'
  }
]

export const instagramAccount = 'nefas.jpg'

export const gearItems = [
  {
    id: 1,
    name: 'Leica M6',
    price: '$2,800',
    condition: 'Excellent',
    category: 'cameras',
    description: 'Classic rangefinder, fully working condition',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=1',
    details: 'This Leica M6 is a beautifully maintained 35mm film rangefinder with a crisp optical viewfinder and dependable mechanical shutter.',
    specs: ['35mm film', 'Leica M-mount', 'Manual focus', 'Battery powered light meter'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/camera?lock=5',
      'https://loremflickr.com/600/600/camera?lock=6',
      'https://loremflickr.com/600/600/camera?lock=25',
      'https://loremflickr.com/600/600/camera?lock=26'
    ]
  },
  {
    id: 2,
    name: 'Canon AE-1',
    price: '$350',
    condition: 'Mint',
    category: 'cameras',
    description: 'Perfect for beginners, includes 50mm f/1.8',
    sold: true,
    image: 'https://loremflickr.com/600/600/camera?lock=2',
    details: 'A legendary beginner SLR with classic Canon styling and a smooth shutter. Great for film students and first-time shooters.',
    specs: ['FD mount', '1.8 50mm lens included', 'Shutter speeds 1-1/1000s', 'Built-in meter'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/camera?lock=7',
      'https://loremflickr.com/600/600/camera?lock=8',
      'https://loremflickr.com/600/600/camera?lock=27',
      'https://loremflickr.com/600/600/camera?lock=28'
    ]
  },
  {
    id: 3,
    name: 'Contax T2',
    price: '$1,200',
    condition: 'Good',
    category: 'cameras',
    description: 'Legendary point and shoot, minor scratches',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=3',
    details: 'A cult favorite compact with Zeiss optics, titanium body, and reliable autofocus. Ideal for street and travel photography.',
    specs: ['Carl Zeiss 38mm f/2.8', 'Autofocus', 'Point-and-shoot', 'Titanium body'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/camera?lock=9',
      'https://loremflickr.com/600/600/camera?lock=10',
      'https://loremflickr.com/600/600/camera?lock=29',
      'https://loremflickr.com/600/600/camera?lock=30'
    ]
  },
  {
    id: 4,
    name: 'Nikon F3',
    price: '$450',
    condition: 'Excellent',
    category: 'cameras',
    description: 'Professional SLR, body only',
    sold: false,
    image: 'https://loremflickr.com/600/600/camera?lock=4',
    details: 'A rugged pro-grade Nikon with full manual control. This body is a classic workhorse for film photographers.',
    specs: ['Nikon F mount', 'Mechanical shutter', 'Full manual', 'Built to last'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/camera?lock=11',
      'https://loremflickr.com/600/600/camera?lock=12',
      'https://loremflickr.com/600/600/camera?lock=31',
      'https://loremflickr.com/600/600/camera?lock=32'
    ]
  },
  {
    id: 5,
    name: 'Jupiter-11 135mm f/4',
    price: '€80',
    condition: 'Good',
    category: 'lenses',
    description: 'Classic Soviet telephoto lens in Leica M39 mount.',
    sold: false,
    image: new URL('../../images/gear/jupiter-11/1.webp', import.meta.url).href,
    details: 'This Jupiter-11 lens is derived from the Zeiss Sonnar design with four elements in three groups. It offers a 135mm focal length and f/4 maximum aperture, making it a compact telephoto prime for portrait and detail work.',
    specs: ['135mm focal length', 'f/4 maximum aperture', 'M39 Leica mount', 'Sonnar-derived optical design'],
    vintedUrl: 'https://www.vinted.lt/items/6980375412-jupiter-11-135mm-f4-m39-leica-mount',
    moreImages: [
      new URL('../../images/gear/jupiter-11/2.webp', import.meta.url).href
    ]
  },
  {
    id: 6,
    name: 'Nikon 85mm f/1.8',
    price: '$420',
    condition: 'Very Good',
    category: 'lenses',
    description: 'Fast short telephoto lens with sharp optics.',
    sold: false,
    image: 'https://loremflickr.com/600/600/lens?lock=16',
    details: 'A versatile portrait lens with excellent sharpness and subject separation. Includes Nikon F mount and clean glass.',
    specs: ['Nikon F mount', '85mm focal length', 'f/1.8 max aperture', 'Autofocus'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/lens?lock=17',
      'https://loremflickr.com/600/600/lens?lock=18',
      'https://loremflickr.com/600/600/lens?lock=27',
      'https://loremflickr.com/600/600/lens?lock=28'
    ]
  },
  {
    id: 7,
    name: 'Profoto B10 Plus',
    price: '$1,100',
    condition: 'Good',
    category: 'accessories',
    description: 'Portable studio light with excellent color quality.',
    sold: false,
    image: 'https://loremflickr.com/600/600/lighting?lock=19',
    details: 'A compact battery-powered flash head ideal for on-location shoots. Includes mount and fresh battery for immediate use.',
    specs: ['Battery powered', 'High output', 'TTL compatible', 'Portable lighting'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/lighting?lock=20',
      'https://loremflickr.com/600/600/lighting?lock=21',
      'https://loremflickr.com/600/600/lighting?lock=25',
      'https://loremflickr.com/600/600/lighting?lock=26'
    ]
  },
  {
    id: 8,
    name: 'Peak Design Travel Tripod',
    price: '$350',
    condition: 'Excellent',
    category: 'accessories',
    description: 'Compact travel tripod with fast setup.',
    sold: false,
    image: 'https://loremflickr.com/600/600/tripod?lock=22',
    details: 'A lightweight, sturdy travel tripod designed for mirrorless and DSLR cameras. Packs down small and holds reliable weight.',
    specs: ['Carbon fiber', 'Quick release', 'Compact fold', 'Load capacity 20lb'],
    vintedUrl: 'https://www.vinted.lt/items/6980305592-jupiter-21m-200mm-f4-m42',
    moreImages: [
      'https://loremflickr.com/600/600/tripod?lock=23',
      'https://loremflickr.com/600/600/tripod?lock=24',
      'https://loremflickr.com/600/600/tripod?lock=25',
      'https://loremflickr.com/600/600/tripod?lock=26'
    ]
  }
]

export type GearItem = typeof gearItems[number]
