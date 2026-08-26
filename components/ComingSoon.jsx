"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function ComingSoon({ tag, title, description }) {
  // Re-initialize the scroll reveal animation for these pages
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
  }, []);

  return (
    <main className="main" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <section className="section section-center">
        <p className="section-tag reveal">{tag}</p>
        <h2 className="section-title reveal reveal-d1 text-center"><strong>{title}</strong></h2>
        <p className="section-body reveal reveal-d2">{description}</p>
        
        <div className="pricing-card reveal reveal-d3" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', alignItems: 'center' }}>
          <div className="pricing-badge" style={{ display: 'inline-block', position: 'relative', top: '0', right: '0', marginBottom: '20px' }}>Work in Progress</div>
          <div className="pricing-tier" style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Coming Soon</div>
          <p className="pricing-desc" style={{ maxWidth: '100%' }}>
            We are currently organizing and uploading the materials. The resources will be available here shortly. Please check back later!
          </p>
          
          <Link href="/" className="btn-primary" style={{ marginTop: '10px', width: 'auto', minWidth: '200px' }}>
            Return to Home
          </Link>
        </div>
      </section>
    </main>
  );
}