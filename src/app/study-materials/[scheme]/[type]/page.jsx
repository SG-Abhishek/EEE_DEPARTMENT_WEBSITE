import Link from 'next/link';

export default async function SelectSemesterPage({ params }) {
  const { scheme, type } = await params;

  const semesters = [
    { label: 'Semester 1', value: 's1', short: 'S1' },
    { label: 'Semester 2', value: 's2', short: 'S2' },
    { label: 'Semester 3', value: 's3', short: 'S3' },
    { label: 'Semester 4', value: 's4', short: 'S4' },
    { label: 'Semester 5', value: 's5', short: 'S5' },
    { label: 'Semester 6', value: 's6', short: 'S6' },
    { label: 'Semester 7', value: 's7', short: 'S7' },
    { label: 'Semester 8', value: 's8', short: 'S8' },
  ];

  const typeTitle = type === 'pyq' ? 'PREVIOUS YEAR QUESTIONS' : 'NOTES';

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '2px', color: '#ffffff', textTransform: 'uppercase' }}>
          {scheme} SCHEME — {typeTitle}
        </h1>
        <p style={{ color: '#888888', marginTop: '8px', fontSize: '0.95rem' }}>
          Select Semester
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {semesters.map((sem) => (
          <Link 
            key={sem.value} 
            id={`link-${sem.value}`} 
            className="integration-item" 
            href={`/study-materials/${scheme}/${type}/${sem.value}`} 
            style={{ textDecoration: 'none' }}
          >
            <div className="integration-icon">
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ffffff' }}>{sem.short}</span>
            </div>
            <div className="integration-name">{sem.label.toUpperCase()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}