export default function MuokkaPage() {
  return (
    <>
      <main>
        <fieldset>
          <legend>Muokkaus</legend>

          <form action="paivita.php" method="POST" onSubmit={(e) => e.preventDefault()}>
            <input type="hidden" name="id" value="1" />

            Nimi:{' '}
            <input type="text" name="nimi" defaultValue="Esimerkki Nimi" required />
            <br />

            Harjoittelupaikka:{' '}
            <select name="tyo" required defaultValue="Koulutus Oy">
              <option value="Koulutus Oy">Koulutus Oy</option>
              <option value="IT Firma">IT Firma</option>
            </select>
            <br />

            Ohjaaja:{' '}
            <input type="text" name="ohjaaja" defaultValue="Ohjaaja Nimi" />
            <br />

            Ohjaajayhteystiedot:{' '}
            <input
              type="text"
              name="ohjaajayhteystiedot"
              defaultValue="ohjaja@tyopaikka.fi"
            />
            <br />

            alkaa:{' '}
            <input type="date" name="alkaa" defaultValue="2026-03-01" required />
            <br />

            loppuu:{' '}
            <input type="date" name="loppuu" defaultValue="2026-06-01" required />
            <br />

            Status:{' '}
            <select name="status" required defaultValue="ei paikka">
              <option value="ei paikka">Ei vielä paikka</option>
              <option value="etsin">Etsin paikka</option>
              <option value="loytynyt">Paikka löytynyt</option>
            </select>
            <br />

            Ruokaraha:{' '}
            <select name="ruokaraha" required defaultValue="kyllä">
              <option value="ei">Ei</option>
              <option value="kyllä">Kyllä</option>
            </select>
            <br />

            Muuta tietoa:{' '}
            <input type="text" name="muutatietoa" defaultValue="Lisää..." />
            <br />

            <input type="submit" value="Tallenna muutokset" />
          </form>
        </fieldset>
      </main>
    </>
  )
}

