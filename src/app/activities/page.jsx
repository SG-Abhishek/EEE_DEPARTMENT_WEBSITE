import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getActivities() {
  // Added the { ... } block at the end to fetch specific fields
  const query = `*[_type == "event" && category == "Activity"] | order(date desc) {
    _id,
    title,
    date,
    description,
    image
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="main" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '80vh' }}>
      <section className="section section-center">
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="section-tag">Innovation</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px', margin: '10px 0', color: '#ffffff' }}>
            STUDENT PROJECTS
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#f39c12', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {activities.length === 0 ? (
            <p className="text-center" style={{ gridColumn: '1 / -1', color: '#888' }}>
              No activities added yet.
            </p>
          ) : (
            activities.map((item) => (
              // ... the rest of your card code
              <div key={item._id} className="scheme-detail-card" style={{ padding: '0', overflow: 'hidden' }}>
                {item.image && (
                  <img 
                    src={urlFor(item.image).url()} 
                    alt={item.title} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#f39c12', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold' }}>Team: {item.team}</p>
                  <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}