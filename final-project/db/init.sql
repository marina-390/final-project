-- Harjoittelupaikat database initialization

CREATE TABLE IF NOT EXISTS tyopaikat (
    id SERIAL PRIMARY KEY,
    tyo TEXT NOT NULL,
    email TEXT NOT NULL,
    puhelin TEXT NOT NULL,
    muutatietoa TEXT,
    luotu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: a few sample rows to verify the setup
INSERT INTO tyopaikat (tyo, email, puhelin, muutatietoa)
VALUES
    ('Koulutus Oy', 'info@koulutusoy.fi', '010 123 456', 'Harjoittelu kevät 2026'),
    ('IT Firma', 'hr@itfirma.fi', '020 987 654', 'Mahdollisuus projektiin')
ON CONFLICT DO NOTHING;
