import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT || 4000

if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not configured. Set ADMIN_PASSWORD and JWT_SECRET in .env for production.')
}

const dbFile = path.resolve(__dirname, 'db.json')
const adapter = new JSONFile(dbFile)
const db = new Low(adapter)

await db.read()
db.data ||= { items: [] }
await db.write()

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '5mb' }))

const authenticate = (req, res, next) => {
  const token = req.cookies?.analogue_token
  if (!token || !JWT_SECRET) {
    return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    return next()
  } catch (error) {
    return res.status(401).json({ authenticated: false, message: 'Invalid token' })
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body || {}
  if (!ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ message: 'Admin auth is not configured' })
  }

  if (typeof password !== 'string' || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' })
  res.cookie('analogue_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
  })
  res.json({ authenticated: true })
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('analogue_token', { path: '/' })
  res.json({ authenticated: false })
})

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies?.analogue_token
  if (!token || !JWT_SECRET) {
    return res.json({ authenticated: false })
  }

  try {
    jwt.verify(token, JWT_SECRET)
    return res.json({ authenticated: true })
  } catch {
    return res.json({ authenticated: false })
  }
})

app.get('/api/items', async (req, res) => {
  await db.read()
  res.json(db.data.items || [])
})

app.put('/api/items', authenticate, async (req, res) => {
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
