export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'weddings', label: 'Weddings' },
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
  new URL('../images/1.jpg', import.meta.url).href,
  new URL('../images/2.jpg', import.meta.url).href,
  new URL('../images/3.jpg', import.meta.url).href,
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
    moreImages: [
      'https://loremflickr.com/600/600/camera?lock=11',
      'https://loremflickr.com/600/600/camera?lock=12',
      'https://loremflickr.com/600/600/camera?lock=31',
      'https://loremflickr.com/600/600/camera?lock=32'
    ]
  },
  {
    id: 5,
    name: 'Leica 50mm f/2 Summicron',
    price: '$950',
    condition: 'Excellent',
    category: 'lenses',
    description: 'Sharp Leica prime lens for portraits and low light.',
    sold: false,
    image: 'https://loremflickr.com/600/600/lens?lock=13',
    details: 'A beautiful 50mm summicron prime with crisp rendering and smooth bokeh. Works perfectly on Leica M bodies and adapted rangefinders.',
    specs: ['Leica M mount', '50mm focal length', 'f/2 max aperture', 'Manual focus'],
    moreImages: [
      'https://loremflickr.com/600/600/lens?lock=14',
      'https://loremflickr.com/600/600/lens?lock=15',
      'https://loremflickr.com/600/600/lens?lock=25',
      'https://loremflickr.com/600/600/lens?lock=26'
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
    moreImages: [
      'https://loremflickr.com/600/600/tripod?lock=23',
      'https://loremflickr.com/600/600/tripod?lock=24',
      'https://loremflickr.com/600/600/tripod?lock=25',
      'https://loremflickr.com/600/600/tripod?lock=26'
    ]
  }
]

export type GearItem = typeof gearItems[number]
