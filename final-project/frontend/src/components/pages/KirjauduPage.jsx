import { useState } from 'react'
import { z } from 'zod'
import Footer from '../layout/Footer.jsx'
import TopButtonsNav from '../layout/TopButtonsNav.jsx'

const kirjauduSchema = z.object({
  tunnus: z.string().min(1, 'Tunnus on pakollinen'),
  salasana: z.string().min(1, 'Salasana on pakollinen'),
  role: z.string(),
})

export default function KirjauduPage() {
  const [formData, setFormData] = useState({
    tunnus: '',
    salasana: '',
    role: 'oppilas',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)

    const result = kirjauduSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSuccess(true)
  }

  return (
    <>
      <TopButtonsNav
        items={[
         
          { href: '#/register', label: 'Rekisteroidy' },
        ]}
      />

      <h2>Kirjaudu sisään</h2>

      <main>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Kirjaudu</legend>

            <label htmlFor="tunnus">Tunnus (pakollinen):</label>
            <input
              type="text"
              name="tunnus"
              id="tunnus"
              placeholder="tunnus"
              value={formData.tunnus}
              onChange={handleChange}
            />
            {errors.tunnus && <p className="varoitus">{errors.tunnus}</p>}

            <label htmlFor="salasana" style={{ marginTop: '10px', display: 'block' }}>
              Salasana (pakollinen):
            </label>
            <input
              type="password"
              name="salasana"
              id="salasana"
              placeholder="salasana"
              value={formData.salasana}
              onChange={handleChange}
            />
            {errors.salasana && <p className="varoitus">{errors.salasana}</p>}

            <div style={{ marginTop: '10px' }}>
              <label htmlFor="role">Rooli:</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="oppilas">Oppilas</option>
                <option value="opettaja">Opettaja</option>
              </select>
            </div>
          </fieldset>

          <button type="submit" style={{ marginTop: '12px' }}>
            Kirjaudu
          </button>
        </form>

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
            ✅ Kirjautuminen onnistui! Tervetuloa, {formData.tunnus}!{' '}
            <a href="#/harjoitteluseuranta">Siirry etusivulle</a>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}