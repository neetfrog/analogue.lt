export const sectionIds = ['home', 'events', 'street', 'prints', 'articles', 'shop', 'contact'] as const

export type SectionId = (typeof sectionIds)[number]

export const sectionHashAliases: Record<string, SectionId> = {
  gear: 'shop',
  weddings: 'events'
}

export const sectionLabelKeys = {
  home: 'home',
  events: 'weddings',
  street: 'street',
  prints: 'prints',
  articles: 'articles',
  shop: 'gear',
  contact: 'contact'
} as const

export type SectionLabelKey = (typeof sectionLabelKeys)[keyof typeof sectionLabelKeys]
