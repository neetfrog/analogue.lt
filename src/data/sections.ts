export const sectionIds = ['home', 'weddings', 'street', 'prints', 'articles', 'shop', 'contact'] as const

export type SectionId = (typeof sectionIds)[number]

export const sectionHashAliases: Record<string, SectionId> = {
  gear: 'shop'
}

export const sectionLabelKeys = {
  home: 'home',
  weddings: 'weddings',
  street: 'street',
  prints: 'prints',
  articles: 'articles',
  shop: 'gear',
  contact: 'contact'
} as const

export type SectionLabelKey = (typeof sectionLabelKeys)[keyof typeof sectionLabelKeys]
