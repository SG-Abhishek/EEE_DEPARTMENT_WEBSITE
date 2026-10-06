import Link from 'next/link';

export default async function SelectMaterialTypePage({ params }) {
  const { scheme } = await params;

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '2px', color: '#ffffff', textTransform: 'uppercase' }}>
          {scheme} SCHEME — STUDY MATERIALS
        </h1>
        <p style={{ color: '#888888', marginTop: '8px', fontSize: '0.95rem' }}>
          Select material type
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
        {/* Notes Card */}
        <Link id="linkNotes" className="integration-item" href={`/study-materials/${scheme}/notes`} style={{ textDecoration: 'none' }}>
          <div className="integration-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="integration-name">NOTES</div>
        </Link>

        {/* PYQ Card */}
        <Link id="linkPYQ" className="integration-item" href={`/study-materials/${scheme}/pyq`} style={{ textDecoration: 'none' }}>
          <div className="integration-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <circle cx="12" cy="14" r="2"></circle>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <div className="integration-name">PREVIOUS YEAR QUESTIONS (PYQ)</div>
        </Link>
      </div>
    </div>
  );
}