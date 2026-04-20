import { useEffect, useState } from 'react'
import Footer from '../layout/Footer.jsx'

export default function TyolistaPage() {
  const [paikat, setPaikat] = useState([])
  const [haku, setHaku] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPaikat() {
      try {
        const res = await fetch('/api/tyopaikat')
        if (!res.ok) throw new Error('Haku epäonnistui')
        const data = await res.json()
        setPaikat(data)
      } catch (err) {
        setError('Tietojen haku epäonnistui: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPaikat()
  }, [])

  const filtered = paikat.filter((p) =>
    p.tyo.toLowerCase().startsWith(haku.trim().toLowerCase())
  )

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ marginBottom: '12px' }}
      >
        Hae paikkaa{' '}
        <input
          type="text"
          name="haku"
          value={haku}
          onChange={(e) => setHaku(e.target.value)}
        />
        <button type="submit">Hae</button>
        <button type="button" onClick={() => setHaku('')}>
          Näytä kaikki
        </button>
      </form>

      {loading && <p>Ladataan...</p>}
      {error && <p className="varoitus">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p>Ei tietoja löytynyt.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nimi</th>
                <th>Sähköposti</th>
                <th>Puhelin</th>
                <th>Muuta</th>
                <th>Lisätty</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.tyo}</td>
                  <td>{p.email}</td>
                  <td>{p.puhelin}</td>
                  <td>{p.muutatietoa || '—'}</td>
                  <td>{new Date(p.luotu).toLocaleDateString('fi-FI')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </>
  )
}