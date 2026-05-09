import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import chokidar from 'chokidar'

const defaultDirs = [
  path.resolve('images', 'events'),
  path.resolve('images', 'street'),
  path.resolve('images', 'articles')
]
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const thumbDirName = 'thumbs'
const thumbExt = '.webp'
const maxSize = 900
const quality = 80
const effort = 6

function isSourceImage(filePath) {
  const parsed = path.parse(filePath)
  const ext = path.extname(filePath).toLowerCase()

  if (!allowedExtensions.has(ext)) return false
  if (filePath.includes(`${path.sep}${thumbDirName}${path.sep}`)) return false
  if (parsed.name.endsWith('-thumb')) return false
  return true
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === thumbDirName) {
        continue
      }
      files.push(...(await walk(fullPath)))
    } else if (entry.isFile() && isSourceImage(fullPath)) {
      files.push(fullPath)
    }
  }

  return files
}

async function createThumbnail(filePath, { skipIfExists = false } = {}) {
  const parsed = path.parse(filePath)
  const outputDir = path.join(parsed.dir, thumbDirName)
  const outputPath = path.join(outputDir, `${parsed.name}-thumb${thumbExt}`)

  try {
    await fs.mkdir(outputDir, { recursive: true })
    if (skipIfExists) {
      try {
        await fs.access(outputPath)
        return { outputPath, skipped: true }
      } catch {
        // Thumbnail does not exist yet
      }
    }

    await sharp(filePath)
      .resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort })
      .toFile(outputPath)
    return { outputPath, skipped: false }
  } catch (error) {
    console.error(`Failed to create thumbnail for ${filePath}:`, error)
    return null
  }
}

async function processFile(filePath, skipIfExists = false) {
  if (!isSourceImage(filePath)) return null
  return createThumbnail(filePath, { skipIfExists })
}

async function watchDirs(targetDirs) {
  const patterns = targetDirs.map((dir) => path.join(dir, '**/*.{jpg,jpeg,png,webp}'))
  const watcher = chokidar.watch(patterns, {
    ignoreInitial: false,
    ignored: (filePath) => filePath.includes(`${path.sep}${thumbDirName}${path.sep}`),
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 }
  })

  watcher.on('add', async (filePath) => {
    console.log(`New image detected: ${filePath}`)
    const result = await processFile(filePath)
    if (result && !result.skipped) console.log(`Created thumbnail: ${result.outputPath}`)
  })

  watcher.on('change', async (filePath) => {
    console.log(`Image changed: ${filePath}`)
    const result = await processFile(filePath, false)
    if (result && !result.skipped) console.log(`Updated thumbnail: ${result.outputPath}`)
  })

  watcher.on('ready', () => {
    console.log(`Watching for new or changed images in ${targetDirs.join(', ')}...`)
  })

  watcher.on('error', (error) => {
    console.error('Watcher error:', error)
  })

  process.on('SIGINT', async () => {
    console.log('Stopping thumbnail watcher...')
    await watcher.close()
    process.exit(0)
  })
}

async function main() {
  const args = process.argv.slice(2)
  const watch = args.includes('--watch') || args.includes('watch')
  const targets = args.filter((arg) => arg !== '--watch' && arg !== 'watch').length
    ? args.filter((arg) => arg !== '--watch' && arg !== 'watch').map((dir) => path.resolve(dir))
    : defaultDirs

  for (const targetDir of targets) {
    try {
      const stats = await fs.stat(targetDir)
      if (!stats.isDirectory()) {
        console.error(`Target is not a directory: ${targetDir}`)
        continue
      }
    } catch {
      console.error(`Directory not found: ${targetDir}`)
      continue
    }
  }

  if (watch) {
    await watchDirs(targets)
    return
  }

  for (const targetDir of targets) {
    const files = await walk(targetDir)

    if (!files.length) {
      console.log(`No source images found in ${targetDir}.`)
      continue
    }

    const created = []
    for (const file of files) {
      const result = await processFile(file, true)
      if (result) {
        if (result.skipped) {
          console.log(`Skipped existing thumbnail: ${result.outputPath}`)
        } else {
          created.push(result.outputPath)
          console.log(`Created thumbnail: ${result.outputPath}`)
        }
      }
    }

    console.log(`Processed ${files.length} source image${files.length === 1 ? '' : 's'} in ${targetDir}.`)
  }
}

main().catch((error) => {
  console.error('Error creating thumbnails:', error)
  process.exit(1)
})
