import Link from 'next/link';

export default function SelectSchemePage() {
  const schemes = [
    { label: '2019 SCHEME', value: '2019' },
    { label: '2024 SCHEME', value: '2024' },
  ];

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '2px', color: '#ffffff', textTransform: 'uppercase' }}>
          STUDY MATERIALS — SELECT SCHEME
        </h1>
        <p style={{ color: '#888888', marginTop: '8px', fontSize: '0.95rem' }}>
          Choose your academic scheme
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
        {schemes.map((scheme) => (
          <Link 
            key={scheme.value} 
            className="integration-item" 
            href={`/study-materials/${scheme.value}`} 
            style={{ textDecoration: 'none' }}
          >
            <div className="integration-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div className="integration-name">{scheme.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}