import { useState } from 'react'
import { z } from 'zod'
import Footer from '../layout/Footer.jsx'
import TopButtonsNav from '../layout/TopButtonsNav.jsx'

const registerSchema = z
  .object({
    email: z.string().email('Syötä kelvollinen sähköpostiosoite'),
    password: z
      .string()
      .min(8, 'Salasanan on oltava väh. 8 merkkiä')
      .regex(/[A-Z]/, 'Salasanassa on oltava väh. yksi iso kirjain')
      .regex(/[a-z]/, 'Salasanassa on oltava väh. yksi pieni kirjain')
      .regex(/[0-9]/, 'Salasanassa on oltava väh. yksi numero'),
    password2: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Salasanat eivät täsmää',
    path: ['password2'],
  })

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
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

    const result = registerSchema.safeParse(formData)

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
        items={[{ href: '#/kirjaudu', label: 'Kirjaudu' }]}
      />

      <h2>Rekisteroidy</h2>

      <main>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <div>
              <label htmlFor="email">Sähköposti *</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="nimi@esimerkki.fi"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="varoitus">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password">Salasana *</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Väh. 8 merkkiä, iso+pieni kirjain, numero"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="varoitus">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="password2">Salasana uudelleen *</label>
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Toista salasana"
                required
                value={formData.password2}
                onChange={handleChange}
              />
              {errors.password2 && (
                <p className="varoitus">{errors.password2}</p>
              )}
            </div>

            <div style={{ marginTop: '8px' }}>
              <label htmlFor="role">Rooli</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="oppilas">Oppilas</option>
                <option value="opettaja">Opettaja (admin)</option>
              </select>
            </div>
          </fieldset>

          <input type="submit" value="Rekisteroidy" />
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
            ✅ Rekisteröityminen onnistui! Voit nyt{' '}
            <a href="#/kirjaudu">kirjautua sisään</a>.
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}