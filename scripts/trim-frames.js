import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = path.resolve('images', 'articles')
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const cropPixels = 8

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function trimImage(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath)
    const image = sharp(fileBuffer)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      console.log(`Skipped ${filePath} (missing dimensions)`)
      return
    }

    const left = Math.min(cropPixels, Math.floor(metadata.width / 10))
    const top = Math.min(cropPixels, Math.floor(metadata.height / 10))
    const right = metadata.width - left
    const bottom = metadata.height - top

    const width = right - left
    const height = bottom - top

    if (width <= 0 || height <= 0) {
      console.log(`Skipped ${filePath} (image too small)`)
      return
    }

    const buffer = await image.extract({ left, top, width, height }).toBuffer()
    await fs.writeFile(filePath, buffer)
    console.log(`Cropped ${filePath} by ${left}px/${top}px`)
  } catch (error) {
    console.error(`Failed to crop ${filePath}:`, error.message)
  }
}

async function main() {
  try {
    const exists = await fs.stat(rootDir).then(() => true).catch(() => false)
    if (!exists) {
      throw new Error(`Directory not found: ${rootDir}`)
    }

    const files = await walk(rootDir)
    if (!files.length) {
      console.log('No article images found to trim.')
      return
    }

    for (const file of files) {
      await trimImage(file)
    }

    console.log(`Finished cropping ${files.length} article image${files.length === 1 ? '' : 's'}.`)
  } catch (error) {
    console.error('Error trimming frames:', error.message)
    process.exit(1)
  }
}

main()
