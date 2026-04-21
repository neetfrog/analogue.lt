export type Locale = 'en' | 'lt'

export const localeOptions: Locale[] = ['en', 'lt']

export const languageLabels: Record<Locale, string> = {
  en: 'EN',
  lt: 'LT'
}

export type HomeTranslations = {
  tagline: string
  description: string
  location: string
  locationAlt: string
}

export type PortfolioTranslations = {
  eyebrow: string
  title: string
  description: string
  openImage: string
  enlargedAlt: string
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
  filterBy: string
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
    portfolio: string
    gear: string
    contact: string
  }
}

export type Translations = {
  nav: NavTranslations
  home: HomeTranslations
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
        portfolio: 'Portfolio',
        gear: 'Gear',
        contact: 'Contact'
      }
    },
    home: {
      tagline: 'Timeless. Authentic. Forever.',
      description: 'Preserving your most meaningful moments on film',
      location: 'Based in Vilnius, Lithuania',
      locationAlt: 'Vilnius'
    },
    portfolio: {
      eyebrow: 'Selected Work',
      title: 'Portfolio',
      description: 'A small selection of my recent work',
      openImage: 'Open {title}',
      enlargedAlt: 'Enlarged portfolio'
    },
    gear: {
      eyebrow: 'For Sale',
      title: 'Camera Gear',
      description: 'Well-loved equipment looking for new homes',
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
      filterBy: 'Filter by {manufacturer}',
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
      description: 'Use the form to inquire about availability or just say hello',
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
      instagram: 'My Instagram Feed',
      crafted: 'crafted with care by myself'
    }
  }),
  lt: buildTranslations({
    nav: {
      mainNavigation: 'Pagrindinis meniu',
      sections: {
        home: 'Pagrindinis',
        portfolio: 'Portfolio',
        gear: 'Įranga',
        contact: 'Kontaktai'
      }
    },
    home: {
      tagline: 'Autentiška. Amžina. Nepavaldu laikui.',
      description: 'Saugau brangiausias akimirkas ant juostos',
      location: 'Veikiu Vilniuje, Lietuvoje',
      locationAlt: 'Vilnius'
    },
    portfolio: {
      eyebrow: 'Atrinkti darbai',
      title: 'Portfolio',
      description: 'nedidelė mano kadrų ekspozicija',
      openImage: 'Atidaryti {title}',
      enlargedAlt: 'Padidintas portfolio'
    },
    gear: {
      eyebrow: 'Parduodama',
      title: 'Foto įranga',
      description: 'Mylima įranga ieško naujų namų',
      categories: {
        All: 'Visi',
        cameras: 'Fotoaparatai',
        lenses: 'Objektyvai',
        accessories: 'Priedai'
      },
      soldLabel: 'Parduota',
      detailsButton: 'Daugiau',
      openDetails: 'Atidaryti {name} informaciją',
      copyLink: 'Kopijuoti nuorodą į {name}',
      linkCopied: 'Nuoroda nukopijuota',
      close: 'Uždaryti',
      aboutItem: 'Apie šį daiktą',
      techSpecs: 'Techninės savybės',
      vinted: 'Atidaryti Vinted skelbimą',
      wiki: 'Atidaryti Wikipedia straipsnį',
      filterBy: 'Filtruoti pagal {manufacturer}',
      specs: {
        focalLength: 'Fokusavimo nuotolis',
        aperture: 'Diafragma',
        mount: 'Maitinimo jungtis',
        filmType: 'Filmo tipas',
        format: 'Formatas',
        focus: 'Fokusas',
        condition: 'Būsena',
        type: 'Tipas',
        opticalDesign: 'Optinė konstrukcija',
        optics: 'Optika',
        ultraWide: 'Tipas',
        classicOptics: 'Optika',
        lens: 'Objektyvas'
      }
    },
    contact: {
      eyebrow: 'Patinka, ką matote?',
      title: 'Rezervuok arba parašyk žinutę',
      description: 'Naudokite formą, kad paklaustumėte apie laisvą laiką ar tiesiog parašytumėte',
      fields: {
        name: { label: 'Jūsų vardas', placeholder: 'Jonė & Jonas' },
        email: { label: 'El. paštas', placeholder: 'hello@example.com' },
        date: { label: 'Pageidaujama data', optionalText: 'Palikite tuščią, jei pirmiausia norite tiesiog parašyti.' },
        location: { label: 'Vieta', placeholder: 'Vilnius, LT' },
        message: { label: 'Paprašykite apie savo viziją', placeholder: 'Jūsų istorija, stilius, viskas, ką norite, kad žinočiau...' }
      },
      optional: 'neprivaloma',
      sendInquiry: 'Siųsti užklausą',
      inquirySent: 'Užklausa išsiųsta!',
      instagram: 'Mano Instagram srautas',
      crafted: 'sukurta su meile'
    }
  })
}

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const savedLocale = localStorage.getItem('locale')
  if (savedLocale === 'en' || savedLocale === 'lt') {
    return savedLocale
  }

  const urlParams = new URLSearchParams(window.location.search)
  const queryLocale = urlParams.get('lang')
  if (queryLocale === 'lt') {
    return 'lt'
  }

  return 'en'
}
