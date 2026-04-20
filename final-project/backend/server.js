import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running ✅' })
})

// GET all tyopaikat (for the list page - needed for 2 points)
app.get('/api/tyopaikat', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tyopaikat ORDER BY luotu DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Query failed:', error)
    res.status(500).json({ error: 'Tietokantavirhe' })
  }
})

// POST new tyopaikka (form submission from TyopaikatPage)
app.post('/api/tyopaikat', async (req, res) => {
  try {
    const { tyo, email, puhelin, muutatietoa } = req.body

    if (!tyo || !email || !puhelin) {
      return res.status(400).json({ error: 'Pakolliset kentät puuttuvat' })
    }

    const result = await pool.query(
      'INSERT INTO tyopaikat (tyo, email, puhelin, muutatietoa) VALUES ($1, $2, $3, $4) RETURNING *',
      [tyo, email, puhelin, muutatietoa || null]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Insert failed:', error)
    res.status(500).json({ error: 'Tallennus epäonnistui' })
  }
})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})