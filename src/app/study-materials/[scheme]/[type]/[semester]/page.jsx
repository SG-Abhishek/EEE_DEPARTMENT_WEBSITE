import { client } from '../../../../../../sanity/lib/client';
import Link from 'next/link';

export default async function MaterialListPage({ params }) {
  const { scheme, type, semester } = await params;

  // GROQ query fetches custom fileTitle OR the actual uploaded asset filename
  const query = `*[_type == "studyMaterial" && scheme == $scheme && materialType == $type && semester == $semester] | order(_createdAt desc) {
    _id,
    title,
    files[] {
      _key,
      fileTitle,
      "fileUrl": asset->url,
      "originalFilename": asset->originalFilename,
      externalLink
    }
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
    <div style={{ paddingTop: '130px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '80px', maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Link href="/study-materials" style={{ color: '#94a3b8', textDecoration: 'none' }}>Study Materials</Link>
        <span>/</span>
        <Link href={`/study-materials/${scheme}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>{scheme} Scheme</Link>
        <span>/</span>
        <Link href={`/study-materials/${scheme}/${type}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>{typeTitle}</Link>
        <span>/</span>
        <span style={{ color: '#60a5fa', fontWeight: '600' }}>{semesterMap[semester] || semester.toUpperCase()}</span>
      </div>

      {/* Header Banner */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '20px', marginBottom: '36px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>
            {scheme} SCHEME
          </span>
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
            {semesterMap[semester] || semester.toUpperCase()}
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '0.5px', color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
          {typeTitle}
        </h1>
      </div>

      {/* Material List */}
      {materials.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
            No materials uploaded yet for {scheme} Scheme {semesterMap[semester] || semester.toUpperCase()} {typeTitle}.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {materials.map((subject) => (
            <div key={subject._id} style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              
              {/* Subject Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
                  {subject.title}
                </h2>
              </div>

              {/* Files Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {subject.files && subject.files.map((item, index) => {
                  const displayName = item.fileTitle || item.originalFilename || `Document ${index + 1}`;
                  const fileTarget = item.fileUrl || item.externalLink;

                  return (
                    <div 
                      key={item._key || index} 
                      className="integration-item" 
                      style={{ 
                        display: 'flex', 
                        justify: 'space-between', 
                        alignItems: 'center', 
                        padding: '14px 18px', 
                        borderRadius: '12px',
                        background: 'rgba(30, 41, 59, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        gap: '16px'
                      }}
                    >
                      {/* Left Side: Icon & Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
                        <div style={{ 
                          minWidth: '40px', 
                          height: '40px', 
                          borderRadius: '10px', 
                          backgroundColor: 'rgba(239, 68, 68, 0.15)', 
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justify: 'center',
                          color: '#f87171'
                        }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                          </svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                          <span style={{ 
                            color: '#f1f5f9', 
                            fontWeight: '600', 
                            fontSize: '0.98rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {displayName}
                          </span>
                          {item.originalFilename && item.fileTitle && (
                            <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.originalFilename}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Side: View Button */}
                      {fileTarget ? (
                        <a 
                          href={fileTarget} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#2563eb', 
                            color: '#ffffff', 
                            padding: '8px 18px', 
                            borderRadius: '8px', 
                            textDecoration: 'none', 
                            fontSize: '0.85rem', 
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                          }}
                        >
                          <span>View Document</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>No file attached</span>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}