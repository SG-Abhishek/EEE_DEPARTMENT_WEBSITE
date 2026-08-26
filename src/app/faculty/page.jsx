import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getFaculty() {
  const query = `*[_type == "faculty"] {
    _id,
    name,
    role,
    isHod,
    email,
    image
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function FacultyPage() {
  const facultyList = await getFaculty();

  const hod = facultyList.find((member) => member.isHod);
  const otherFaculty = facultyList.filter((member) => !member.isHod);

  return (
    <main className="main" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '80vh' }}>
      <section className="section section-center">
        
        {/* NEW PROMINENT HEADING */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          {/* Removed 'reveal' class here */}
          <p className="section-tag">Mentors & Leadership</p>
          
          {/* Removed 'reveal reveal-d1' classes here */}
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px', margin: '10px 0', color: '#ffffff' }}>
            FACULTY MEMBERS
          </h1>
          
          <div style={{ width: '60px', height: '4px', backgroundColor: '#f39c12', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* HOD SECTION */}
        {hod && (
          <div style={{ maxWidth: '400px', margin: '0 auto 60px auto' }}>
            <div className="scheme-detail-card" style={{ textAlign: 'center' }}>
              <p className="pricing-badge" style={{ display: 'inline-block', position: 'relative', top: 0, right: 0, marginBottom: '15px' }}>
                Head of Department
              </p>
              {hod.image ? (
                <div style={{ width: '120px', height: '140px', borderRadius: '8px', overflow: 'hidden', margin: '0 auto 15px auto' }}>
                  <img 
                    src={urlFor(hod.image).url()} 
                    alt={hod.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#1a202c', margin: '0 auto 15px auto' }}></div>
              )}
              <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{hod.name}</h3>
              <p style={{ color: '#888', marginBottom: '15px' }}>{hod.role}</p>
              {hod.email && (
                <a 
                  href={`mailto:${hod.email}`} 
                  className="btn-secondary" 
                  style={{ display: 'inline-block', fontSize: '0.85rem', padding: '6px 14px', textTransform: 'lowercase' }}
                >
                  {hod.email}
                </a>
              )}
            </div>
          </div>
        )}

        {/* REGULAR FACULTY GRID */}
        <div 
          className="scheme-panels" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px', 
          }}
        >
          {facultyList.length === 0 ? (
            <p className="text-center" style={{ gridColumn: '1 / -1', color: '#888' }}>
              No faculty members added yet. Check later!
            </p>
          ) : (
            otherFaculty.map((member) => (
              <div key={member._id} className="scheme-detail-card" style={{ textAlign: 'center' }}>
                {member.image ? (
                  <div style={{ width: '120px', height: '140px', borderRadius: '8px', overflow: 'hidden', margin: '0 auto 15px auto' }}>
                    <img 
                      src={urlFor(member.image).url()} 
                      alt={member.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#1a202c', margin: '0 auto 15px auto' }}></div>
                )}
                <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{member.name}</h3>
                <p style={{ color: '#888', marginBottom: '15px', fontSize: '0.9rem' }}>{member.role}</p>
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`} 
                    className="btn-secondary" 
                    style={{ display: 'inline-block', fontSize: '0.8rem', padding: '6px 12px', textTransform: 'lowercase' }}
                  >
                    {member.email}
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