import { useState } from 'react'
import { z } from 'zod'
import Footer from '../layout/Footer.jsx'

const tyopaikkaSchema = z.object({
  tyo: z.string().min(2, 'Harjoittelupaikan nimi on liian lyhyt (väh. 2 merkkiä)'),
  email: z.string().email('Syötä kelvollinen sähköpostiosoite'),
  puhelin: z
    .string()
    .regex(/^[\d\s+()-]{6,}$/, 'Syötä kelvollinen puhelinnumero (väh. 6 merkkiä)'),
  muutatietoa: z.string().optional(),
})

export default function TyopaikatPage() {
  const [formData, setFormData] = useState({
    tyo: '',
    email: '',
    puhelin: '',
    muutatietoa: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)
    setSubmitError('')

    const result = tyopaikkaSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const response = await fetch('/api/tyopaikat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Palvelinvirhe')
      }

      setSuccess(true)
      setFormData({ tyo: '', email: '', puhelin: '', muutatietoa: '' })
    } catch (err) {
      setSubmitError(`Lähetys epäonnistui: ${err.message} ❌`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Lisää harjoittelupaikka</h2>

      <main>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Työharjoittelupaikan tiedot</legend>

            <label htmlFor="tyo">Harjoittelupaikan nimi: *</label>
            <input
              type="text"
              name="tyo"
              id="tyo"
              placeholder="esim. Koulutus Oy"
              value={formData.tyo}
              onChange={handleChange}
            />
            {errors.tyo && <p className="varoitus">{errors.tyo}</p>}
            <p />

            <label htmlFor="email">Sähköposti: *</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ohjaaja@tyopaikka.fi"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="varoitus">{errors.email}</p>}
            <p />

            <label htmlFor="puhelin">Puhelinnumero: *</label>
            <input
              type="tel"
              name="puhelin"
              id="puhelin"
              placeholder="040 123 4567"
              value={formData.puhelin}
              onChange={handleChange}
            />
            {errors.puhelin && <p className="varoitus">{errors.puhelin}</p>}
            <p />

            <label htmlFor="muutatietoa">Muuta tietoa:</label>
            <input
              type="text"
              name="muutatietoa"
              id="muutatietoa"
              placeholder="Lisätietoja paikasta"
              value={formData.muutatietoa}
              onChange={handleChange}
            />
          </fieldset>

          <input
            type="submit"
            value={loading ? 'Lähetetään...' : 'Lähetä'}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          />
        </form>

        {submitError && (
          <p className="varoitus" style={{ marginTop: '12px' }}>
            {submitError}
          </p>
        )}

        {success && (
          <div
            style={{
              marginTop: '16px',
              padding: '14px 16px',
              borderRadius: '12px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#15803d',
              fontWeight: 700,
            }}
          >
            ✅ Harjoittelupaikka <strong>{formData.tyo || 'tallennettu'}</strong> 
            onnistuneesti tietokantaan!{' '}
            <a href="#/tyolista">Katso lista</a>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}