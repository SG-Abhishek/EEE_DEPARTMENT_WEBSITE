import Link from 'next/link';

export default async function SelectYearPage({ params }) {
  const { scheme, type } = await params;

  const years = [
    { label: '1st Year', value: 'year1' },
    { label: '2nd Year', value: 'year2' },
    { label: '3rd Year', value: 'year3' },
    { label: '4th Year', value: 'year4' },
  ];

  const typeTitle = type === 'pyq' ? 'PYQ' : 'NOTES';

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '2px', color: '#ffffff', textTransform: 'uppercase' }}>
          {scheme} SCHEME — {typeTitle}
        </h1>
        <p style={{ color: '#888888', marginTop: '8px', fontSize: '0.95rem' }}>
          Choose your academic year
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {years.map((year) => (
          <Link 
            key={year.value} 
            id={`link-${year.value}`} 
            className="integration-item" 
            href={`/study-materials/${scheme}/${type}/${year.value}`} 
            style={{ textDecoration: 'none' }}
          >
            <div className="integration-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div className="integration-name">{year.label.toUpperCase()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}