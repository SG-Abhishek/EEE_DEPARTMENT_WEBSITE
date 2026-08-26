"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 1. Function to check scroll position
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 2. Check position immediately on load
    handleScroll();

    // 3. Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide everything if we are in the Sanity Studio
  if (pathname?.startsWith('/studio')) return null;

  return (
    <>
      {/* Background Effects */}
      <svg className="grain" width="100%" height="100%">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="5" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#n)"/>
      </svg>
      <div className="atmosphere"></div>

      {/* Dynamic Nav Class: adds 'scrolled' class when page is scrolled */}
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`} id="topNav">
        <Link href="/" className="nav-brand">EEE<span>DEPARTMENT</span></Link>
        <ul className="nav-links">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/#about_us">ABOUT US</Link></li>
          <li><Link href="/#programs">PROGRAMS</Link></li>
          <li><Link href="/#more">MORE</Link></li>
        </ul>
        <button className="nav-toggle" id="navToggle" aria-label="Open mobile menu" aria-expanded="false" type="button">
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
        <button id="themeToggle" className="theme-toggle" aria-label="Toggle dark/light mode" type="button">
          <span className="theme-icon theme-icon-moon">🌙</span>
          <span className="theme-icon theme-icon-sun">☀️</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobileMenu">
        <div className="mobile-menu-inner">
          <div className="mobile-menu-links">
            <Link href="/" className="mobile-menu-link">HOME</Link>
            <Link href="/#about_us" className="mobile-menu-link">ABOUT US</Link>
            <Link href="/#programs" className="mobile-menu-link">PROGRAMS</Link>
            <Link href="/#more" className="mobile-menu-link">MORE</Link>
          </div>
        </div>
      </div>
    </>
  );
}