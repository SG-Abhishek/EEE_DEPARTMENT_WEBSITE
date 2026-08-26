import { client } from '../../../sanity/lib/client';

async function getAnnouncements() {
  const query = `*[_type == "announcement"] | order(date desc) {
    _id,
    title,
    date,
    category,
    content,
    "fileUrl": file.asset->url
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <main className="main" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '80vh' }}>
      <section className="section section-center">
        
        {/* UPDATED HEADING (Removed 'reveal' classes and matched global styling) */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="section-tag">Notice Board</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px', margin: '10px 0', color: '#ffffff' }}>
            ANNOUNCEMENTS
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#f39c12', margin: '0 auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#aaa', marginTop: '15px' }}>
            Official updates, exam schedules, and circulars from the department.
          </p>
        </div>

        <div 
          className="scheme-panels" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}
        >
          {/* UPDATED STUDENT-FACING EMPTY STATE */}
          {announcements.length === 0 ? (
            <p className="text-center" style={{ gridColumn: '1 / -1', color: '#888' }}>
              No new announcements at this time. Please check back later.
            </p>
          ) : (
            announcements.map((item) => (
              <div key={item._id} className="scheme-detail-card" style={{ textAlign: 'left' }}>
                <p className="section-tag" style={{ fontSize: '0.8rem', marginBottom: '10px' }}>
                  {item.category || 'General'}
                </p>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{item.title}</h3>
                {item.date && (
                  <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px' }}>
                    {item.date}
                  </p>
                )}
                <p className="pricing-desc" style={{ marginBottom: '16px' }}>
                  {item.content}
                </p>
                {item.fileUrl && (
                  <a 
                    href={item.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary" 
                    style={{ display: 'inline-block', width: 'auto', padding: '8px 16px' }}
                  >
                    Download Attachment
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}