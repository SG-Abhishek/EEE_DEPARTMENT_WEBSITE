"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '../../sanity/lib/client'; // Sanity client
import { urlFor } from '../../sanity/lib/image'; // Sanity image builder

export default function Home() {
  // 1. States for our dynamic features
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ── NEW: Swipe Gesture States ──
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // ── Manual Slideshow Controls ──
  const nextSlide = () => {
    if (gallery.length > 0) setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    if (gallery.length > 0) setCurrentSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  // ── NEW: Swipe Logic Handlers ──
  const minSwipeDistance = 50; // Minimum distance (in px) to register as a swipe

  const handleTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end to prevent false positives
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Slideshow Timer (Changes image every 4 seconds)
  useEffect(() => {
    if (gallery.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [gallery, currentSlide]);

  useEffect(() => {
    // 2. Fetch both Announcements and Gallery images from Sanity
    const fetchHomeData = async () => {
      try {
        const annData = await client.fetch(`*[_type == "announcement"] | order(date desc)[0...5] { _id, title, category, "fileUrl": file.asset->url }`);
        const galData = await client.fetch(`*[_type == "gallery"] | order(date desc)[0...6] { _id, title, image }`);
        
        setAnnouncements(annData || []);
        setGallery(galData || []);
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
      }
    };
    fetchHomeData();

    // ── 1. Reveal Animation ──
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    
    reveals.forEach((el) => io.observe(el));

    // ── 2. Hero Grid Spotlight ──
    const heroGrid = document.querySelector('.hero-grid');
    const heroEl = document.getElementById('hero');
    let animationFrameId;

    if (heroGrid && heroEl) {
      let gx = 0, gy = 0, tx = 0, ty = 0;
      
      const handleMouseMove = (e) => {
        const heroRect = heroEl.getBoundingClientRect();
        const gridRect = heroGrid.getBoundingClientRect();
        const activeTop = heroRect.top + heroRect.height * 0.3;
        
        if (e.clientY >= activeTop && e.clientY <= heroRect.bottom) {
          tx = e.clientX - gridRect.left;
          ty = e.clientY - gridRect.top;
        } else {
          tx = gridRect.width / 2;
          ty = gridRect.height * 0.3;
        }
      };

      const lerpGrid = () => {
        gx += (tx - gx) * 0.08;
        gy += (ty - gy) * 0.08;
        heroGrid.style.setProperty('--mx', `${gx}px`);
        heroGrid.style.setProperty('--my', `${gy}px`);
        animationFrameId = requestAnimationFrame(lerpGrid);
      };

      document.addEventListener('mousemove', handleMouseMove);
      lerpGrid();

      // ── 3. Active Nav & Side Panels ──
      const sectionEls = document.querySelectorAll('section[id]');
      const leftDots = document.querySelectorAll('.side-panel.left .side-dot');
      const rightDots = document.querySelectorAll('.side-panel.right .side-dot');
      const leftTrack = document.getElementById('leftTrack');
      const rightTrack = document.getElementById('rightTrack');
      const scrollPctEl = document.getElementById('scrollPct');

      const updateNavAndPanels = () => {
        const y = window.scrollY + window.innerHeight * 0.4;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pct = Math.min(window.scrollY / maxScroll, 1) || 0;

        let activeIndex = 0;
        sectionEls.forEach((s, i) => { 
          if (y >= s.offsetTop) { activeIndex = i; } 
        });

        const trackPct = (pct * 100).toFixed(0);
        if (leftTrack) leftTrack.style.height = trackPct + '%';
        if (rightTrack) rightTrack.style.height = trackPct + '%';
        if (scrollPctEl) scrollPctEl.textContent = String(trackPct).padStart(2, '0');

        const leftIdx = Math.min(activeIndex, leftDots.length - 1);
        const rightIdx = Math.min(activeIndex, rightDots.length - 1);
        leftDots.forEach((d, i) => d.classList.toggle('active', i === leftIdx));
        rightDots.forEach((d, i) => d.classList.toggle('active', i === rightIdx));
      };

      window.addEventListener('scroll', updateNavAndPanels, { passive: true });
      updateNavAndPanels();

      return () => {
        io.disconnect();
        document.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', updateNavAndPanels);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <>
      {/* ── Global Background Effects ── */}
      <svg className="grain" width="100%" height="100%">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="5" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
      <div className="atmosphere"></div>

      {/* ── Side Panels ── */}
      <nav className="side-panel left" aria-label="Scroll indicators">
        <span className="side-label">Scroll</span>
        <div className="side-track"><div className="side-track-fill" id="leftTrack"></div></div>
        <div className="side-dot active"></div>
        <div className="side-dot"></div>
        <div className="side-dot"></div>
        <div className="side-dot"></div>
        <div className="side-dot"></div>
        <div className="side-readout" id="scrollPct">00</div>
      </nav>

      <nav className="side-panel right" aria-label="Status indicators">
        <span className="side-label">Status</span>
        <div className="side-track"><div className="side-track-fill" id="rightTrack"></div></div>
        <div className="side-dot"></div>
        <div className="side-dot"></div>
        <div className="side-dot active"></div>
        <div className="side-dot"></div>
        <div className="side-dot"></div>
        <div className="side-readout">END</div>
      </nav>

      <main className="main">
        {/* ═══ HERO ═══ */}
        <section className="hero" id="hero">
          <div className="hero-grid"></div>
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            <span>Welcome to the Department of</span>
          </div>
          <h1 className="h1-large">ELECTRICAL AND ELECTRONICS ENGINEERING<br/><em></em></h1>
          <h1 className="h1-small">ELECTRICAL<br/> AND <br/>ELECTRONICS <br/>ENGINEERING<br/><em></em></h1>
          <span className="pkd-card">GEC PALAKKAD</span>
          <p className="hero-sub"></p>

          <div className="down-btn-div">
            <a href="#updates">
              <img src="images/Wdown-btn.png" alt="Scroll to Updates" id="downBtnImg" className="down-btn" />
            </a>
          </div>
          <div className="hero-ctas"></div>
        </section>

        {/* ═══ LOGO TICKER ═══ */}
        <div className="logo-ticker reveal">
          <div className="logo-ticker-label">ELECTRICAL AND ELECTRONICS ENGINEERING, GEC PALAKKAD</div>
        </div>

        <div id="updates"></div>

        {/* ═══ ANNOUNCEMENTS MARQUEE ═══ */}
        {announcements.length > 0 && (
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-label">📢 LATEST UPDATES:</span>
              {announcements.map((item) => (
                <span key={item._id} className="marquee-item">
                  <span className="marquee-category">[{item.category || 'General'}]</span>
                  <a 
                    href={item.fileUrl ? item.fileUrl : "/announcements"} 
                    target={item.fileUrl ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                  <span className="marquee-separator">✦</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TV SLIDESHOW (GALLERY) ═══ */}
        {gallery.length > 0 && (
          <section className="section section-center" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
            <p className="section-tag">Department Highlights</p>
            <h2 className="section-title" style={{ marginBottom: '40px' }}><strong>CAMPUS GLIMPSES</strong></h2>
            
            {/* FIXED: Bound the touch events directly to this container */}
            <div 
              className="slideshow-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {gallery.map((img, index) => (
                <div key={img._id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                  {img.image && (
                    <img src={urlFor(img.image).url()} alt={img.title || "Gallery Image"} />
                  )}
                  {img.title && <div className="slide-caption">{img.title}</div>}
                </div>
              ))}

              {gallery.length > 1 && (
                <>
                  <button 
                    className="slider-arrow left"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                  >
                    &#10094;
                  </button>
                  <button 
                    className="slider-arrow right"
                    onClick={nextSlide}
                    aria-label="Next slide"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {/* ═══ About Us ═══ */}
        <section className="section" id="about_us">
          <div className="feature reveal">
            <div className="feature-visual">
              <img id="aboutImage1" src="images/Electrical-block.jpg" alt="Electrical Department Block" />
            </div>
            <div className="feature-content">
              <div className="feature-number"></div>
              <p className="section-tag"></p>
              <h2 className="section-title"><strong>ABOUT US</strong></h2>
              <p className="section-body">
                Established in 2016, the Department offers an undergraduate program in Electrical & Electronics Engineering and a post-graduate program in Electrical Drives and Control since 2022.Our dedicated faculty and staff strive to impart high-quality education and personal mentorship to the students. The Department has well-equipped state-of-the-art laboratories to engage in practical and hands-on experience. Our faculty and students actively engage in research and development activities, driving advancements in technology and expanding the frontiers of knowledge. The department also undertakes initiatives to involve students in social outreach activities, fostering community engagement. The Department provides opportunities for faculty and students to explore new horizons through sessions beyond the curriculum, including FDPs, technical talks, workshops, industry interactions, and more.
              </p>
            </div>
          </div>

          <div className="feature reverse reveal">
            <div className="feature-visual">
              <img id="aboutImage2" src="images/Electric1.jpg" alt="Electrical Mission and Vision" />
            </div>
            <div className="feature-content">
              <div className="feature-number"></div>
              <p className="section-tag"></p>
              <h2 className="section-title"><strong>MISSION and VISION</strong></h2>
              <div className="section-body">
                <ul>
                  <li>To impart high quality education to meet the challenges in the field of Electrical and Electronics Engineering.</li>
                  <li>To nurture creativity and transform the young minds to become competent electrical engineers.</li>
                  <li>To inculcate a sense of commitment to ethical values and a passion to serve the society.</li>
                  <li>To foster research, innovation and entrepreneurship skills.</li>
                  <li>To become a Centre of Excellence in Electrical Engineering and allied disciplines for the service of the society.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="silk-divider reveal"></div>

        {/* ═══ PROGRAMS ═══ */}
        <section className="section section-center" id="programs">
          <p className="section-tag reveal"></p>
          <h2 className="section-title reveal reveal-d1"><strong>PROGRAMS</strong></h2>
          <p className="section-body reveal reveal-d2"></p>

          <div className="pricing-grid">
            <div className="pricing-card reveal reveal-d1">
              <div className="pricing-badge">Popular</div>
              <div className="pricing-tier">B.Tech</div>
              <p className="pricing-desc">The Bachelor's of Technology in Electrical and Electronics Engineering (B.Tech in EEE) is a four-year undergraduate program that delves into the design, analysis, and application of electrical and electronic systems. Students gain expertise in power generation and distribution, circuit design, electronics, and control systems.</p>
            </div>

          
          </div>
        </section>

        <div className="silk-divider reveal"></div>

        <div className="feature reveal">
          <div className="feature-visual">
            <img id="opportunitiesImage" src="images/Electric2.png" alt="Opportunities in Electrical Engineering" />
          </div>
          <div className="feature-content">
            <div className="feature-number"></div>
            <p className="section-tag"></p>
            <h2 className="section-title"><strong>OPPORTUNITIES</strong></h2>
            <p className="section-body">
              The EEE department offers extensive career opportunities in research, power electronics, industrial automation, electric vehicles, and the energy sector. Graduates can pursue advanced studies or roles in industries like IT, electronic circuit design, and power systems. With hands-on experience from state-of-the-art labs in control systems, robotics, and power systems, students are well-prepared for real-world challenges. The department's IEEE Student Branch, along with workshops and expert talks, further enriches their practical skills and industry readiness, fostering well-rounded professionals.
            </p>
          </div>
        </div>

        {/* ═══ MORE ═══ */}
        <div className="more">
          <h2 className="section-title-links reveal reveal-d1">______________________________________</h2>
          <section className="section-more section-center" id="more">
            <div className="left">
              <div className="integration-item-faculty">
                <p>HEAD OF THE DEPARTMENT</p>
                <img id="hodImage" src="images/hod.jpg" alt="Head of Department" />
                <p>Dr. MINI V</p>
                <a href="mailto:hodeee@gecskp.ac.in">Email : hodeee@gecskp.ac.in</a>
                <Link href="/faculty" className="testimonial-card-details reveal reveal-d1">
                  <div className="testimonial-author">
                    <p>FACULTIES</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="right">
              <div className="integrations-grid reveal reveal-d3">
                <Link id="linkSyllabus" className="integration-item" href="/syllabus">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>
                  </div>
                  <div className="integration-name">SYLLABUS</div>
                </Link>

                <Link id="linkNotes" className="integration-item" href="/pyqs">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M9 7h6M9 11h6M9 15h4"/><path d="M8 3v2"/></svg>
                  </div>
                  <div className="integration-name">PREVIOUS YEAR QUESTIONS</div>
                </Link>

                <Link id="linkEvents" className="integration-item" href="/events">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4"/><path d="M4 10h16"/><circle cx="8.5" cy="14.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>
                  </div>
                  <div className="integration-name">EVENTS</div>
                </Link>

                <Link id="linkProjects" className="integration-item" href="/projects">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16v12H4z"/><path d="M8 6v12"/><path d="M12 6v12"/></svg>
                  </div>
                  <div className="integration-name">PROJECTS</div>
                </Link>

                <a id="linkEtlab" className="integration-item" href="https://gecskp.etlab.in/user/login" target="_blank" rel="noopener noreferrer">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3h8l-2 7h-4L8 3Z"/><path d="M9 10h6v9H9z"/><path d="M7 19h10"/></svg>
                  </div>
                  <div className="integration-name">ETLAB</div>
                </a>

                <Link id="linkGallery" className="integration-item" href="/gallery">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v14H4z"/><path d="M8 9h.01M14 7l-3 4-2-2-4 6"/></svg>
                  </div>
                  <div className="integration-name">GALLERY</div>
                </Link>

                <Link id="linkActivities" className="integration-item" href="/activities">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h5l2-4 2 8 3-6 4 4"/><path d="M4 20h16"/></svg>
                  </div>
                  <div className="integration-name">RECENT ACTIVITIES</div>
                </Link>

                <Link id="linkAnnouncements" className="integration-item" href="/announcements">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 9h3l6-4v14l-6-4H5z"/><path d="M14 6l5-2v16l-5-2"/><path d="M3 15v1a3 3 0 0 0 3 3h1"/></svg>
                  </div>
                  <div className="integration-name">ANNOUNCEMENTS</div>
                </Link>

                <Link id="linkPlacements" className="integration-item" href="/placements">
                  <div className="integration-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="8" width="14" height="10" rx="2"/><path d="M8 8V6h8v2"/><path d="M9 12h6"/></svg>
                  </div>
                  <div className="integration-name">PLACEMENTS</div>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div className="silk-divider reveal"></div>

        {/* ═══ Footer ═══ */}
        <section className="section-footer section-center" id="footer">
          <h2 className="section-title reveal reveal-d1">______________________________________</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card-footer reveal reveal-d1">
              <div className="head"><h3 className="testimonial-head">College Reg. IDs</h3></div>
              <div className="foot">
                <a href="https://portal.aicte-india.org/partnerportal_enu/start.swe?SWECmd=Start&SWEHo=portal.aicte-india.org">AICTE Permanent ID: 1-5142601</a>
                <a href="https://www.gecskp.ac.in/admission.php">AISHE ID : C-43298</a>
                <a href="https://www.gecskp.ac.in/hostel.php">National Scholarship Portal ID : KL-C01234</a>
                <a href="http://www.dtekerala.gov.in/index.php/en/">Swayam Local Chapter ID : 1430</a>
                <a href="https://www.youtube.com/channel/UCGQY1QTz7zxd8hHndRxDUaA">YOUTUBE</a>
                <a href="https://www.facebook.com/profile.php?id=61554011459893">FACEBOOK</a>
                <a href="https://www.instagram.com/gecpkd">INSTAGRAM</a>
              </div>
            </div>

            <div className="testimonial-card-footer reveal reveal-d1">
              <div className="head"><h3 className="testimonial-head">Useful Links</h3></div>
              <div className="foot">
                <a href="https://ddfs.dtekerala.gov.in/ddfs/login.do">DDFS</a>
                <a href="https://www.gecskp.ac.in/admission.php">Admission</a>
                <a href="https://www.gecskp.ac.in/hostel.php">Hostel</a>
                <a href="http://www.dtekerala.gov.in/index.php/en/">DTE Website</a>
                <a href="https://ktu.edu.in/o">KTU Website</a>
                <a href="https://www.google.co.in/maps/place/Govt.+Engineering+College+Palakkad/@10.903552,76.4325503,17z/data=!3m1!4b1!4m5!3m4!1s0x3ba7d635151d9b73:0xecf06761ecf4f56c!8m2!3d10.903552!4d76.434739">Site Map</a>
                <a href="https://www.gecskp.ac.in/newsletter.php">News letter</a>
                <a href="https://www.gecskp.ac.in/contact.php">How to Reach GEC Palakkad</a>
              </div>
            </div>

            <div className="testimonial-card-footer reveal reveal-d1">
              <div className="head"><h3 className="testimonial-head">Get In Touch</h3></div>
              <div className="foot">
                <a href="mailto:placement@gecskp.ac.in">placement@gecskp.ac.in</a>
                <p>+91 466 2260 565</p>
                <a href="mailto:principal@gecskp.ac.in">principal@gecskp.ac.in</a>
                <a href="http://gecskp.ac.in">http://gecskp.ac.in</a>
                <p>Mannampatta PO Palakkad, Kerala, India - 678633</p>
              </div>
            </div>
          </div>
        </section>

        <div className="silk-divider reveal"></div>
      </main>
    </>
  );
}