export type Locale = 'en'

export type HomeTranslations = {
  tagline: string
  description: string
  location: string
  locationAlt: string
  aboutTitle: string
  aboutDescription: string
}

export type PortfolioTranslations = {
  eyebrow: string
  title: string
  description: string
  openImage?: string
  enlargedAlt?: string
  contactForPrints?: string
}

export type ArticleTranslations = {
  eyebrow: string
  title: string
  description: string
  readMore: string
  openImage?: string
  enlargedAlt?: string
}

export type GearTranslations = {
  eyebrow: string
  title: string
  description: string
  categories: {
    All: string
    cameras: string
    lenses: string
    accessories: string
  }
  soldLabel: string
  detailsButton: string
  openDetails: string
  copyLink: string
  linkCopied: string
  close: string
  aboutItem: string
  techSpecs: string
  vinted: string
  wiki: string
  askAbout: string
  filterBy: string
  sortByLabel: string
  sortOrderLabel: string
  sortFields: {
    name: string
    price: string
  }
  sortOrders: {
    asc: string
    desc: string
  }
  specs: {
    focalLength: string
    aperture: string
    mount: string
    filmType: string
    format: string
    focus: string
    condition: string
    type: string
    opticalDesign: string
    optics: string
    ultraWide: string
    classicOptics: string
    lens: string
  }
}

export type ContactTranslations = {
  eyebrow: string
  title: string
  description: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    date: { label: string; optionalText: string }
    location: { label: string; placeholder: string }
    message: { label: string; placeholder: string }
  }
  optional: string
  sendInquiry: string
  inquirySent: string
  instagram: string
  crafted: string
}

export type NavTranslations = {
  mainNavigation: string
  sections: {
    home: string
    weddings: string
    street: string
    prints: string
    articles: string
    portfolio: string
    gear: string
    contact: string
  }
}

export type Translations = {
  nav: NavTranslations
  home: HomeTranslations
  weddings: PortfolioTranslations
  street: PortfolioTranslations
  prints: PortfolioTranslations
  articles: ArticleTranslations
  portfolio: PortfolioTranslations
  gear: GearTranslations
  contact: ContactTranslations
}

const buildTranslations = (values: Translations): Translations => values

export const translations: Record<Locale, Translations> = {
  en: buildTranslations({
    nav: {
      mainNavigation: 'Main navigation',
      sections: {
        home: 'Home',
        weddings: 'Events',
        street: 'Streets',
        prints: 'Prints',
        articles: 'Texts',
        portfolio: 'Portfolio',
        gear: 'Shop',
        contact: 'Contact'
      }
    },
    home: {
      tagline: 'Timeless. Authentic. Forever.',
      description: 'Your memories deserve something more than a digital filter',
      location: 'Based in Vilnius, Lithuania',
      locationAlt: 'Vilnius',
      aboutTitle: 'About analogue.lt',
      aboutDescription: 'I preserve life stories on film, creating images that feel like flipping through your grandparents\' photo album — timeless, warm, and deeply yours.'
    },
    weddings: {
      eyebrow: 'Special Moments',
      title: 'Weddings & Events',
      description: 'Capturing once in a lifetime moments that will never happen again',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged wedding photo'
    },
    street: {
      eyebrow: 'Urban Stories',
      title: 'Street Photography',
      description: 'Life as it unfolds when you leave your house',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged street photograph'
    },
    prints: {
      eyebrow: 'grab the real thing',
      title: 'Prints',
      description: 'Paper is just more fun than screen',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged print',
      contactForPrints: 'Inquire About Prints'
    },
    articles: {
      eyebrow: 'Enjoy reading?',
      title: 'Texts',
      description: 'my own analogue substack',
      readMore: 'Read More',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged article image'
    },
    portfolio: {
      eyebrow: 'Selected Work',
      title: 'Portfolio',
      description: 'A collection of my previous work',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged portfolio'
    },
    gear: {
      eyebrow: 'Need a new camera?',
      title: 'Shop',
      description: 'Beloved equipment looking for a new home',
      categories: {
        All: 'All',
        cameras: 'Cameras',
        lenses: 'Lenses',
        accessories: 'Accessories'
      },
      soldLabel: 'Sold',
      detailsButton: 'Details',
      openDetails: 'Open details for {name}',
      copyLink: 'Copy link to {name}',
      linkCopied: 'Link copied',
      close: 'Close details',
      aboutItem: 'About this item',
      techSpecs: 'Tech Specs',
      vinted: 'Open Vinted listing',
      wiki: 'Wikipedia',
      askAbout: 'Ask about this item',
      filterBy: 'Filter by {manufacturer}',
      sortByLabel: 'Sort by',
      sortOrderLabel: 'Order',
      sortFields: {
        name: 'Name',
        price: 'Price'
      },
      sortOrders: {
        asc: 'Ascending',
        desc: 'Descending'
      },
      specs: {
        focalLength: 'Focal length',
        aperture: 'Aperture',
        mount: 'Mount',
        filmType: 'Film type',
        format: 'Format',
        focus: 'Focus',
        condition: 'Condition',
        type: 'Type',
        opticalDesign: 'Optical design',
        optics: 'Optics',
        ultraWide: 'Type',
        classicOptics: 'Optics',
        lens: 'Lens'
      }
    },
    contact: {
      eyebrow: 'Vibing with what you see?',
      title: 'Book or send a message',
      description: 'Send an email to inquire about availability or just say hello',
      fields: {
        name: { label: 'Your Name', placeholder: 'Jane & John' },
        email: { label: 'Email', placeholder: 'hello@example.com' },
        date: { label: 'Preferred Date', optionalText: 'Leave blank if you just want to message first.' },
        location: { label: 'Location', placeholder: 'Vilnius, Lithuania' },
        message: { label: 'Tell me about your vision', placeholder: "Your story, your style, anything you'd like me to know..." }
      },
      optional: 'optional',
      sendInquiry: 'Send Inquiry',
      inquirySent: 'Inquiry Sent!',
      instagram: 'Or message me on Instagram',
      crafted: 'crafted with care by myself'
    }
  })
}

