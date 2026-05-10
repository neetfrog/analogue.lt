const normalizePath = (value: string) => value.replace(/\\/g, '/')
const getFilename = (path: string) => {
  try {
    return normalizePath(decodeURIComponent(path)).split('/').pop() ?? ''
  } catch {
    return normalizePath(path).split('/').pop() ?? ''
  }
}
const getBaseName = (filename: string) => filename.replace(/\.[^/.]+$/, '')
const getThumbName = (filename: string) => getBaseName(filename).replace(/-thumb$/, '')
const stripThumbSegment = (relativePath: string) =>
  normalizePath(relativePath)
    .split('/')
    .filter((segment) => segment !== 'thumbs')
    .join('/')

const buildThumbnailMap = (modules: Record<string, string>, rootDir: string) =>
  Object.entries(modules).reduce<Record<string, string>>((acc, [path, image]) => {
    const normalized = normalizePath(path)
    const relative = normalized.split(`${rootDir}/`).pop() ?? normalized
    const key = getThumbName(stripThumbSegment(relative))
    acc[key] = image
    return acc
  }, {})

const sortImageModules = (modules: Record<string, string>) =>
  Object.entries(modules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, image]) => image)

const loadImageCollection = (
  imageModules: Record<string, string>,
  thumbnailModules: Record<string, string> | null,
  rootDir: string,
  location: string,
  omitThumbs = true
) => {
  const thumbnailMap = thumbnailModules ? buildThumbnailMap(thumbnailModules, rootDir) : {}

  return Object.entries(imageModules)
    .filter(([path]) => !omitThumbs || !normalizePath(path).includes('/thumbs/'))
    .map(([path, image], index) => {
      const filename = getFilename(path)
      const title = getBaseName(filename).replace(/[-_]+/g, ' ').trim()
      const basename = getBaseName(stripThumbSegment(normalizePath(path).split(`${rootDir}/`).pop() ?? filename))
      return {
        id: index + 1,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        location,
        image,
        thumbnail: thumbnailMap[basename]
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }))
}

const eventImageModules = import.meta.glob('../../images/events/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const eventThumbnailModules = import.meta.glob('../../images/events/**/thumbs/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const eventImages = loadImageCollection(eventImageModules, eventThumbnailModules, 'images/events', 'Events')

const streetImageModules = import.meta.glob('../../images/street/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const streetThumbnailModules = import.meta.glob('../../images/street/**/thumbs/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const streetPhotographyImages = loadImageCollection(streetImageModules, streetThumbnailModules, 'images/street', 'Street')

const printsImageModules = import.meta.glob('../../images/prints/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const horizontImageModules = import.meta.glob('../../images/articles/horizont/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const snowboardingImageModules = import.meta.glob('../../images/articles/snowboarding/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const horizontImages = sortImageModules(horizontImageModules)

// Swap the Horizont article images 5 and 7 so they appear in the requested order.
if (horizontImages.length > 6) {
  const temp = horizontImages[4]
  horizontImages[4] = horizontImages[6]
  horizontImages[6] = temp
}

export const snowboardingImages = sortImageModules(snowboardingImageModules)

export const printsImages = Object.entries(printsImageModules)
  .map(([path, image], index) => {
    const filename = getFilename(path) || `print-${index + 1}`
    const title = getBaseName(filename).replace(/[-_]+/g, ' ').trim()
    return {
      id: index + 1,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      location: 'Prints',
      image
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }))

const slideshowImageModules = import.meta.glob('../../images/slideshow/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

export const homeSlides = Object.entries(slideshowImageModules).map(([, src], index) => ({ id: index + 1, src }))

const articleThumbnailModules = import.meta.glob('../../images/articles/**/thumbs/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const articleThumbnailMap = buildThumbnailMap(articleThumbnailModules, 'images/articles')

const getArticleRelativePath = (imageUrl: string) => {
  try {
    const pathname = normalizePath(new URL(imageUrl).pathname)
    const relative = pathname.split('/images/articles/').pop()
    return relative ? normalizePath(relative) : pathname
  } catch {
    return imageUrl
  }
}

export const getImageThumbnail = (imageUrl: string) => {
  try {
    const pathname = normalizePath(new URL(imageUrl).pathname)
    const filename = getFilename(pathname)
    const baseKey = getThumbName(filename)
    const relativeKey = getThumbName(getArticleRelativePath(imageUrl))
    return articleThumbnailMap[relativeKey] ?? articleThumbnailMap[baseKey]
  } catch {
    return undefined
  }
}
