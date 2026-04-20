import Footer from '../layout/Footer.jsx'

const DUMMY_ROWS = [
  {
    oppilas: 'Anna',
    paikka: 'Koulutus Oy',
    ohjaaja: 'Maija',
    yhteystiedot: 'maija@esimerkki.fi',
    aloitus: '2026-03-01',
    lopetus: '2026-06-01',
    status: 'ei viela paikka',
    ruokaraha: 'Ei',
    muuta: { id: 1 },
  },
  {
    oppilas: 'Mikko',
    paikka: 'IT Firma',
    ohjaaja: 'Jari',
    yhteystiedot: 'jari@it.fi',
    aloitus: '2026-04-01',
    lopetus: '2026-07-01',
    status: 'hakee',
    ruokaraha: 'Kyllä',
    muuta: { id: 2 },
  },
  {
    oppilas: 'Sari',
    paikka: 'Ohjelmointitalo',
    ohjaaja: 'Laura',
    yhteystiedot: 'laura@studio.fi',
    aloitus: '2026-05-01',
    lopetus: '2026-08-01',
    status: 'loytynyt',
    ruokaraha: 'Kyllä',
    muuta: { id: 3 },
  },
]

function statusToClass(status) {
  if (status === 'ei viela paikka') return 'status-ei'
  if (status === 'hakee') return 'status-hakee'
  if (status === 'loytynyt') return 'status-loytynyt'
  return ''
}

export default function HarjoitteluseurantaPage() {
  return (
    <>

      <ul>
        <li>
          <a href="#/tyopaikat">Harjoittelupaikat</a>
        </li>
        <li>
          <a href="#/kirjaudu">Kirjaudu sisään</a>
        </li>
        <li>
          <a href="#/lisaauusiopiskelija">Lisää uusi opiskelija</a>
        </li>
        <li>
          <a href="#/tyolista">Työpaikkalista</a>
        </li>
      </ul>
      <br />

      <main>
        <div className="table-container">
          <table id="myTable" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Oppilas</th>
                <th>Harjoittelupaikka</th>
                <th>Ohjaaja</th>
                <th>Yhteystiedot</th>
                <th>Aloitus</th>
                <th>Lopetus</th>
                <th>Status</th>
                <th>Ruokaraha</th>
                <th>Muuta</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_ROWS.map((row) => (
                <tr key={row.muuta.id}>
                  <td>{row.oppilas}</td>
                  <td>{row.paikka}</td>
                  <td>{row.ohjaaja}</td>
                  <td>{row.yhteystiedot}</td>
                  <td>{row.aloitus}</td>
                  <td>{row.lopetus}</td>
                  <td className={statusToClass(row.status)}>
                    {row.status}
                  </td>
                  <td>{row.ruokaraha}</td>
                  <td>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="hidden" name="id" value={row.muuta.id} />
                      <input type="submit" value="Muokkaa" />
                    </form>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        // Mirrors the original confirm dialog.
                        window.confirm(
                          'Haluatko varmasti poistaa tämän oppilaan?'
                        )
                      }}
                    >
                      <input type="hidden" name="id" value={row.muuta.id} />
                      <input type="submit" value="Poista" />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </>
  )
}

