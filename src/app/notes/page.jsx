import { client } from '../../../sanity/lib/client';

async function getNotes() {
  // FILTERING MAGIC: Only pull documents where the category is "Notes"
  const query = `*[_type == "academicDoc" && category == "Notes"] | order(semester asc) {
    _id,
    title,
    semester,
    "fileUrl": file.asset->url
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main className="main" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '80vh' }}>
      <section className="section section-center">
        
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="section-tag">Study Materials</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px', margin: '10px 0', color: '#ffffff' }}>
            NOTES
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#f39c12', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div className="scheme-panels" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {notes.length === 0 ? (
            <p className="text-center" style={{ gridColumn: '1 / -1', color: '#888' }}>
              Notes will be uploaded soon. Please check back later!
            </p>
          ) : (
            notes.map((item) => (
              <div key={item._id} className="scheme-detail-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div>
                  <span className="pricing-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{item.semester}</span>
                  <h3 style={{ fontSize: '1.2rem', margin: '0' }}>{item.title}</h3>
                </div>
                {item.fileUrl && (
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px' }}>
                    Download
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