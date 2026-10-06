import { client } from '../../../../../../sanity/lib/client';

export default async function MaterialListPage({ params }) {
  const { scheme, type, semester } = await params;

  const query = `*[_type == "studyMaterial" && scheme == $scheme && materialType == $type && semester == $semester] | order(_createdAt desc) {
    _id,
    title,
    "fileUrl": file.asset->url,
    externalLink
  }`;

  let materials = [];
  try {
    materials = await client.fetch(query, { scheme, type, semester });
  } catch (error) {
    console.error("Error fetching study materials from Sanity:", error);
  }

  const semesterMap = {
    s1: 'Semester 1 (S1)',
    s2: 'Semester 2 (S2)',
    s3: 'Semester 3 (S3)',
    s4: 'Semester 4 (S4)',
    s5: 'Semester 5 (S5)',
    s6: 'Semester 6 (S6)',
    s7: 'Semester 7 (S7)',
    s8: 'Semester 8 (S8)',
  };

  const typeTitle = type === 'pyq' ? 'PREVIOUS YEAR QUESTIONS' : 'NOTES';

  return (
    <div style={{ paddingTop: '140px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '700', letterSpacing: '1px', color: '#ffffff', textTransform: 'uppercase' }}>
          {scheme} SCHEME — {typeTitle} ({semesterMap[semester] || semester.toUpperCase()})
        </h1>
      </div>

      {materials.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ color: '#888888', fontSize: '1rem' }}>
            No materials uploaded yet for {scheme} Scheme {semesterMap[semester] || semester.toUpperCase()} {typeTitle}.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {materials.map((item) => (
            <div 
              key={item._id} 
              className="integration-item" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="integration-icon" style={{ minWidth: '36px', height: '36px', marginBottom: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '1rem' }}>{item.title}</span>
              </div>

              <a 
                href={item.fileUrl || item.externalLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}