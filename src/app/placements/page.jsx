import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getPlacements() {
  const query = `*[_type == "placement"] | order(batch desc, studentName asc) {
    _id,
    studentName,
    company,
    role,
    batch,
    image
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function PlacementsPage() {
  const placements = await getPlacements();

  return (
    <main className="main" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '80vh' }}>
      <section className="section section-center">
        
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="section-tag">Career Success</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px', margin: '10px 0', color: '#3d424a' }}>
            PLACEMENTS
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#f39c12', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div 
          className="scheme-panels" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '25px' 
          }}
        >
          {placements.length === 0 ? (
            <p className="text-center" style={{ gridColumn: '1 / -1', color: '#888' }}>
              No placements added yet. Check back later!
            </p>
          ) : (
            placements.map((item) => (
              <div key={item._id} className="scheme-detail-card" style={{ textAlign: 'center', padding: '25px 20px' }}>
                {item.image ? (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', border: '2px solid #2d3748' }}>
                    <img 
                      src={urlFor(item.image).url()} 
                      alt={item.studentName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#1a202c', margin: '0 auto 15px auto', border: '2px solid #2d3748' }}></div>
                )}
                
                <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{item.studentName}</h3>
                <p style={{ color: '#f39c12', fontWeight: 'bold', marginBottom: '6px', fontSize: '1.05rem' }}>
                  {item.company}
                </p>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>
                  {item.role}
                </p>
                <span className="pricing-badge" style={{ fontSize: '0.8rem' }}>
                  Batch: {item.batch}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
} 