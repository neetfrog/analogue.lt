import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 4000

const dbFile = path.resolve(__dirname, 'db.json')
const adapter = new JSONFile(dbFile)
const db = new Low(adapter, { items: [] })

await db.read()
db.data ||= { items: [] }
await db.write()

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '5mb' }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/items', async (req, res) => {
  await db.read()
  res.json(db.data.items || [])
})

app.put('/api/items', async (req, res) => {
  const items = req.body?.items
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Items must be an array' })
  }

  db.data.items = items
  await db.write()
  res.json({ items })
})

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`)
})
