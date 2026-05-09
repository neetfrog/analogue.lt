import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = path.resolve('images', 'articles')
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

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

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.webp') {
    return
  }

  const parsed = path.parse(filePath)
  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`)
  try {
    await sharp(filePath)
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath)
    await fs.unlink(filePath)
    console.log(`Converted ${filePath} -> ${outputPath}`)
  } catch (error) {
    console.error(`Failed to convert ${filePath}:`, error.message)
  }
}

async function main() {
  try {
    const exists = await fs.stat(rootDir).then(() => true).catch(() => false)
    if (!exists) {
      throw new Error(`Directory not found: ${rootDir}`)
    }

    const files = await walk(rootDir)
    const imageFiles = files.filter((file) => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png'))
    if (!imageFiles.length) {
      console.log('No article JPG/PNG images found to convert.')
      return
    }

    for (const file of imageFiles) {
      await convertImage(file)
    }

    console.log(`Converted ${imageFiles.length} article image${imageFiles.length === 1 ? '' : 's'} to WebP.`)
  } catch (error) {
    console.error('Error converting images:', error.message)
    process.exit(1)
  }
}

main()
