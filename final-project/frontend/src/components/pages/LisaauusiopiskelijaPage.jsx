import { useState } from 'react'
import { z } from 'zod'
import Footer from '../layout/Footer.jsx'
import TopButtonsNav from '../layout/TopButtonsNav.jsx'

const opiskelijaSchema = z.object({
  nimi: z.string().min(1, 'Valitse opiskelija'),
  muutatietoa: z.string().optional(),
  tyo: z.string().min(1, 'Valitse harjoittelupaikka'),
  ohjaaja: z.string().min(2, 'Ohjaajan nimi on pakollinen (väh. 2 merkkiä)'),
  ohjaajayhteystiedot: z
    .string()
    .min(5, 'Yhteystiedot ovat pakolliset (väh. 5 merkkiä)'),
  alkaa: z.string().min(1, 'Aloituspäivä on pakollinen'),
  loppuu: z.string().min(1, 'Lopetuspäivä on pakollinen'),
  ruokaraha: z.string(),
  status: z.string(),
}).refine((data) => data.alkaa < data.loppuu, {
  message: 'Lopetuspäivän on oltava aloituspäivän jälkeen',
  path: ['loppuu'],
})

export default function LisaauusiopiskelijaPage() {
  const [formData, setFormData] = useState({
    nimi: '',
    muutatietoa: '',
    tyo: '',
    ohjaaja: '',
    ohjaajayhteystiedot: '',
    alkaa: '',
    loppuu: '',
    ruokaraha: 'ei',
    status: 'ei viela paikka',
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

    const result = opiskelijaSchema.safeParse(formData)

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
          { href: '#/tyolista', label: 'Työpaikkalista' },
        ]}
      />

      <h2>Lisää uusi opiskelija</h2>

      <main>
        <form onSubmit={handleSubmit} noValidate>

          <fieldset>
            <legend>Omat tiedot</legend>

            <label htmlFor="nimi">Nimi (pakollinen):</label>
            <select
              name="nimi"
              id="nimi"
              value={formData.nimi}
              onChange={handleChange}
            >
              <option value="">-- Valitse opiskelija --</option>
              <option value="Alice">Alice</option>
              <option value="Mikko">Mikko</option>
            </select>
            {errors.nimi && <p className="varoitus">{errors.nimi}</p>}
            <p />

            <label htmlFor="muutatietoa">Muuta tietoa:</label>
            <input
              type="text"
              name="muutatietoa"
              id="muutatietoa"
              placeholder="Lisää tiedot"
              value={formData.muutatietoa}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>Työharjoittelupaikan tiedot</legend>

            <label htmlFor="tyo">Harjoittelupaikan nimi:</label>
            <select
              name="tyo"
              id="tyo"
              value={formData.tyo}
              onChange={handleChange}
            >
              <option value="">-- Valitse harjoittelupaikka --</option>
              <option value="Koulutus Oy">Koulutus Oy</option>
              <option value="IT Firma">IT Firma</option>
            </select>
            {errors.tyo && <p className="varoitus">{errors.tyo}</p>}
            <p />

            <label htmlFor="ohjaaja">Työpaikkaohjaja:</label>
            <input
              type="text"
              name="ohjaaja"
              id="ohjaaja"
              placeholder="Ohjaajan nimi"
              value={formData.ohjaaja}
              onChange={handleChange}
            />
            {errors.ohjaaja && <p className="varoitus">{errors.ohjaaja}</p>}
            <p />

            <label htmlFor="ohjaajayhteystiedot">
              Työpaikkaohjaja yhteystiedot:
            </label>
            <input
              type="text"
              name="ohjaajayhteystiedot"
              id="ohjaajayhteystiedot"
              placeholder="ohjaaja@tyopaikka.fi tai puhelin numero"
              value={formData.ohjaajayhteystiedot}
              onChange={handleChange}
            />
            {errors.ohjaajayhteystiedot && (
              <p className="varoitus">{errors.ohjaajayhteystiedot}</p>
            )}
            <p />

            <label htmlFor="alkaa">Harjoittelu alkaa:</label>
            <input
              type="date"
              name="alkaa"
              id="alkaa"
              value={formData.alkaa}
              onChange={handleChange}
            />
            {errors.alkaa && <p className="varoitus">{errors.alkaa}</p>}
            <p />

            <label htmlFor="loppuu">Harjoittelu loppuu:</label>
            <input
              type="date"
              name="loppuu"
              id="loppuu"
              value={formData.loppuu}
              onChange={handleChange}
            />
            {errors.loppuu && <p className="varoitus">{errors.loppuu}</p>}
          </fieldset>

          <fieldset>
            <legend>Muuta</legend>

            <label htmlFor="ruokaraha">Maksetaan ruokaraha:</label>
            <select
              name="ruokaraha"
              id="ruokaraha"
              value={formData.ruokaraha}
              onChange={handleChange}
            >
              <option value="ei">Ei</option>
              <option value="kyllä">Kyllä</option>
            </select>

            <label htmlFor="status" style={{ marginTop: '10px', display: 'block' }}>
              Status:
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ei viela paikka">Ei vielä paikkaa</option>
              <option value="hakee">Hakee</option>
              <option value="loytynyt">Paikka löytynyt</option>
            </select>
          </fieldset>

          <button type="submit" style={{ marginTop: '12px' }}>
            Lähetä
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
            ✅ Opiskelija <strong>{formData.nimi}</strong> lisätty onnistuneesti
            harjoittelupaikkaan <strong>{formData.tyo}</strong>!{' '}
            <a href="#/harjoitteluseuranta">Siirry etusivulle</a>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}