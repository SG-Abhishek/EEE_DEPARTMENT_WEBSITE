"use client";

import { useState, useEffect } from 'react';
import syllabusData from '../../../data/syllabus.json';

export default function SyllabusPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // 1. Scroll Reveal Animation
  useEffect(() => {
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
    return () => io.disconnect();
  }, [selectedProgram, selectedScheme]);

  // 2. Hero Grid Spotlight Animation 
  useEffect(() => {
    const heroGrid = document.querySelector('.hero-grid');
    const heroEl = document.getElementById('hero');
    if (!heroGrid || !heroEl) return;

    let gx = 0, gy = 0, tx = 0, ty = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const gridRect = heroGrid.getBoundingClientRect();
      tx = e.clientX - gridRect.left;
      ty = e.clientY - gridRect.top;
    };

    const lerpGrid = () => {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      heroGrid.style.setProperty('--mx', `${gx}px`);
      heroGrid.style.setProperty('--my', `${gy}px`);
      animationFrameId = requestAnimationFrame(lerpGrid);
    };

    document.addEventListener('mousemove', handleMouseMove);
    lerpGrid(); // Start the animation loop

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleProgramClick = (programId) => {
    setSelectedProgram(programId);
    setSelectedScheme(null); 
  };

  return (
    <main className="main syllabus-shell">
      <section className="hero syllabus-hero" id="hero">
        <div className="hero-grid"></div>
        <h1 className="h1-large">ELECTRICAL AND ELECTRONICS ENGINEERING<br/></h1>
        <h1 className="h1-small">ELECTRICAL <br/>AND <br/>ELECTRONICS <br/>ENGINEERING<br/></h1>
        <h2>SYLLABUS</h2>
        <p className="hero-sub">
          Browse the curriculum by programme, select the scheme, and choose the appropriate year group for the syllabus section you need.
        </p>

        {/* PROGRAM SELECTION */}
        <div className="selector-stack">
          {!selectedProgram && (
            <div className="hero-ctas program-switcher">
              {syllabusData.programs.map(program => (
                <button 
                  key={program.id}
                  className="btn-secondary program-switch" 
                  onClick={() => handleProgramClick(program.id)}
                >
                  {program.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SCHEME SELECTION */}
        {selectedProgram && (
          <section className="section section-center reveal visible">
            <p className="section-tag">Curriculum Navigation</p>
            <h2 className="section-title">Choose your <strong>scheme</strong></h2>
            <div className="selector-stack">
              <div className="hero-ctas syllabus-switcher">
                {syllabusData.schemes.map(scheme => (
                  <button 
                    key={scheme.id}
                    className={selectedScheme === scheme.id ? "btn-primary scheme-switch active" : "btn-secondary scheme-switch"} 
                    onClick={() => setSelectedScheme(scheme.id)}
                  >
                    {scheme.label}
                  </button>
                ))}
              </div>
              <button 
                className="btn-secondary back-button" 
                onClick={() => handleProgramClick(null)}
                style={{ marginTop: '20px' }}
              >
                Back 
              </button>
            </div>
          </section>
        )}

        {/* CURRICULUM CARDS */}
        {selectedScheme && (
          <div className="scheme-panels" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {syllabusData.curriculums
              .filter(curr => curr.schemeId === selectedScheme)
              .map(curr => (
                <section key={curr.id} className="section reveal visible">
                  <div className="scheme-detail-card">
                    <p className="section-tag">{curr.tag}</p>
                    <h2 className="section-title">{curr.title} <br/><strong>{curr.highlight}</strong></h2>
                    <div className="detail-actions">
                      <a href={curr.fileUrl}  rel="noopener noreferrer" download className="btn-primary syllabus-download">
                        DOWNLOAD PDF
                      </a>
                    </div>
                  </div>
                </section>
              ))}
          </div>
        )}

      </section>
    </main>
  );
}