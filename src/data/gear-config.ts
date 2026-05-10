import { Camera, Aperture, Grid, Package } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export type CategoryOption = {
  value: 'All' | 'cameras' | 'lenses' | 'accessories'
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const categories: CategoryOption[] = [
  { value: 'All', icon: Grid },
  { value: 'cameras', icon: Camera },
  { value: 'lenses', icon: Aperture },
  { value: 'accessories', icon: Package }
]

export const manufacturerLogoMap: Record<string, { src: string; alt: string }> = {
  Agfa: { src: new URL('../../images/logos/manufacturers/agfa.png', import.meta.url).href, alt: 'Agfa' },
  Canon: { src: new URL('../../images/logos/manufacturers/canon.png', import.meta.url).href, alt: 'Canon' },
  Exakta: { src: new URL('../../images/logos/manufacturers/exakta.png', import.meta.url).href, alt: 'Exakta' },
  FED: { src: new URL('../../images/logos/manufacturers/fed.png', import.meta.url).href, alt: 'FED' },
  GOMZ: { src: new URL('../../images/logos/manufacturers/gomz.png', import.meta.url).href, alt: 'GOMZ' },
  KMZ: { src: new URL('../../images/logos/manufacturers/kmz.png', import.meta.url).href, alt: 'KMZ' },
  Aires: { src: new URL('../../images/logos/manufacturers/aires.png', import.meta.url).href, alt: 'Aires' },
  Lomo: { src: new URL('../../images/logos/manufacturers/lomo.png', import.meta.url).href, alt: 'Lomo' },
  Arsenal: { src: new URL('../../images/logos/manufacturers/arsenal.png', import.meta.url).href, alt: 'Arsenal' },
  ZOMZ: { src: new URL('../../images/logos/manufacturers/zomz.png', import.meta.url).href, alt: 'ZOMZ' },
  Pentacon: { src: new URL('../../images/logos/manufacturers/pentacon.png', import.meta.url).href, alt: 'Pentacon' },
  Vivitar: { src: new URL('../../images/logos/manufacturers/vivitar.png', import.meta.url).href, alt: 'Vivitar' },
  Yashica: { src: new URL('../../images/logos/manufacturers/yashica.png', import.meta.url).href, alt: 'Yashica' },
  'Zeiss Ikon': { src: new URL('../../images/logos/manufacturers/zeissIkon.png', import.meta.url).href, alt: 'Zeiss Ikon' },
  'Zeiss Jena': { src: new URL('../../images/logos/manufacturers/zeissJena.png', import.meta.url).href, alt: 'Zeiss Jena' }
}
