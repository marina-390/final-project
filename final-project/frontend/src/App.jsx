import { useEffect, useState } from 'react'
import HarjoitteluseurantaPage from './components/pages/HarjoitteluseurantaPage.jsx'
import KirjauduPage from './components/pages/KirjauduPage.jsx'
import RegisterPage from './components/pages/RegisterPage.jsx'
import TyolistaPage from './components/pages/TyolistaPage.jsx'
import TyopaikatPage from './components/pages/TyopaikatPage.jsx'
import LisaauusiopiskelijaPage from './components/pages/LisaauusiopiskelijaPage.jsx'
import MuokkaPage from './components/pages/MuokkaPage.jsx'
import Header from './components/layout/Header.jsx'

function normalizeHash() {
  const hash = window.location.hash || '#/harjoitteluseuranta'
  const cleaned = hash.replace(/^#\/?/, '/')
  return cleaned.replace(/\/+$/, '') || '/harjoitteluseuranta'
}

export default function App() {
  const [route, setRoute] = useState(() => normalizeHash())

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash())
    window.addEventListener('hashchange', onHashChange)

    if (!window.location.hash) window.location.hash = '#/harjoitteluseuranta'

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const Page =
    {
      '/harjoitteluseuranta': HarjoitteluseurantaPage,
      '/kirjaudu': KirjauduPage,
      '/register': RegisterPage,
      '/tyolista': TyolistaPage,
      '/tyopaikat': TyopaikatPage,
      '/lisaauusiopiskelija': LisaauusiopiskelijaPage,
      '/muokka': MuokkaPage,
    }[route] ?? HarjoitteluseurantaPage

  return (
    <div className="page">
      <Header />
      <Page />
    </div>
  )
}