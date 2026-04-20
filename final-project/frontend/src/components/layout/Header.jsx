export default function Header() {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)',
        borderRadius: '16px',
        padding: '18px 24px',
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 24px rgba(14, 165, 233, 0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '28px' }}>🎓</span>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
            }}
          >
            Harjoittelupaikat
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 500,
            }}
          >
            Opiskelijan harjoitteluseuranta
          </p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '8px' }}>
        <a
          href="#/harjoitteluseuranta"
          style={{
            color: 'rgba(255,255,255,0.9)',
            textDecoration: 'none',
            padding: '8px 14px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) =>
            (e.target.style.background = 'rgba(255,255,255,0.22)')
          }
          onMouseOut={(e) =>
            (e.target.style.background = 'rgba(255,255,255,0.1)')
          }
        >
          Etusivu
        </a>
        <a
          href="#/kirjaudu"
          style={{
            color: '#1e40af',
            textDecoration: 'none',
            padding: '8px 14px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 700,
            background: '#ffffff',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.opacity = '0.85')}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
        >
          Kirjaudu
        </a>
      </nav>
    </header>
  )
}