import { client } from '../../../../../../sanity/lib/client';
import Link from 'next/link';

export default async function MaterialListPage({ params }) {
  const { scheme, type, semester } = await params;

  // GROQ query fetches title, custom fileTitle / originalFilename, and thumbnail URL
  const query = `*[_type == "studyMaterial" && scheme == $scheme && materialType == $type && semester == $semester] | order(_createdAt desc) {
    _id,
    title,
    files[] {
      _key,
      fileTitle,
      "fileUrl": asset->url,
      "originalFilename": asset->originalFilename,
      "thumbnailUrl": thumbnail.asset->url,
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
    <div style={{ paddingTop: '130px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '80px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      
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
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '20px', marginBottom: '32px' }}>
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

      {/* Subject Sections */}
      {materials.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
            No materials uploaded yet for {scheme} Scheme {semesterMap[semester] || semester.toUpperCase()} {typeTitle}.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {materials.map((subject) => (
            <div key={subject._id} style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              
              {/* Subject Heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '10px' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#3b82f6', borderRadius: '2px', flexShrink: 0 }}></div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', margin: 0, wordBreak: 'break-word' }}>
                  {subject.title}
                </h2>
              </div>

              {/* Compact Files Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '14px' }}>
                {subject.files && subject.files.map((item, index) => {
                  const displayName = item.fileTitle || item.originalFilename || `Document ${index + 1}`;
                  const fileTarget = item.fileUrl || item.externalLink;

                  return (
                    <div 
                      key={item._key || index} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'space-between', 
                        padding: '14px', 
                        borderRadius: '12px',
                        background: 'rgba(30, 41, 59, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        gap: '12px',
                        minHeight: '110px'
                      }}
                    >
                      {/* Thumbnail/Icon + File Name Container */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        
                        {/* Thumbnail Container (44px x 58px) */}
                        <div style={{ 
                          minWidth: '44px', 
                          width: '44px',
                          height: '58px', 
                          borderRadius: '6px', 
                          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justify: 'center',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          {item.thumbnailUrl ? (
                            <img 
                              src={item.thumbnailUrl} 
                              alt={displayName} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#f87171' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                              </svg>
                              <span style={{ fontSize: '0.55rem', fontWeight: '800', marginTop: '2px', letterSpacing: '0.5px' }}>PDF</span>
                            </div>
                          )}
                        </div>

                        {/* Text Wrap Container */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '1' }}>
                          <span style={{ 
                            color: '#f1f5f9', 
                            fontWeight: '600', 
                            fontSize: '0.88rem',
                            lineHeight: '1.35',
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {displayName}
                          </span>
                        </div>
                      </div>

                      {/* View Document Action */}
                      {fileTarget ? (
                        <a 
                          href={fileTarget} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            backgroundColor: '#2563eb', 
                            color: '#ffffff', 
                            padding: '7px 12px', 
                            borderRadius: '6px', 
                            textDecoration: 'none', 
                            fontSize: '0.8rem', 
                            fontWeight: '600',
                            marginTop: 'auto',
                            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                          }}
                        >
                          <span>View Document</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>No file attached</span>
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