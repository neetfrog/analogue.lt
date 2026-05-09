import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const defaultDirs = [path.resolve('images', 'events'), path.resolve('images', 'street')]
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const thumbDirName = 'thumbs'
const thumbExt = '.webp'
const maxSize = 900
const quality = 80
const effort = 6

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
    } else if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }

  return files
}

async function createThumbnail(filePath) {
  const parsed = path.parse(filePath)
  const outputDir = path.join(parsed.dir, thumbDirName)
  const outputPath = path.join(outputDir, `${parsed.name}${thumbExt}`)

  try {
    await fs.mkdir(outputDir, { recursive: true })
    await sharp(filePath)
      .resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort })
      .toFile(outputPath)
    return outputPath
  } catch (error) {
    console.error(`Failed to create thumbnail for ${filePath}:`, error)
    return null
  }
}

async function main() {
  const targets = process.argv.slice(2).length ? process.argv.slice(2).map((dir) => path.resolve(dir)) : defaultDirs

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

    const files = await walk(targetDir)
    const sourceFiles = files.filter((file) => {
      const parsed = path.parse(file)
      return !file.includes(`${path.sep}${thumbDirName}${path.sep}`) && !parsed.name.endsWith('-thumb')
    })

    if (!sourceFiles.length) {
      console.log(`No source images found in ${targetDir}.`)
      continue
    }

    const created = []
    for (const file of sourceFiles) {
      const output = await createThumbnail(file)
      if (output) {
        created.push(output)
        console.log(`Created thumbnail: ${output}`)
      }
    }

    console.log(`Processed ${sourceFiles.length} source image${sourceFiles.length === 1 ? '' : 's'} in ${targetDir}.`)
  }
}

main().catch((error) => {
  console.error('Error creating thumbnails:', error)
  process.exit(1)
})
