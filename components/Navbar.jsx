"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const pathname = usePathname();

  // Close the mobile menu automatically when clicking a link
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Load saved theme on initial render
    const stored = localStorage.getItem('eee-theme');
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = stored ? stored === 'dark' : preferDark;
    
    setIsDark(useDark);
    document.body.classList.toggle('light', !useDark);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 100% React-Safe Theme Toggle
  const toggleTheme = () => {
    const nextDark = !isDark;
    
    setIsDark(nextDark);
    localStorage.setItem('eee-theme', nextDark ? 'dark' : 'light');
    document.body.classList.toggle('light', !nextDark);
    
    // --- THIS IS THE ORIGINAL SCRIPT LOGIC ---
    const downBtn = document.querySelector('.down-btn');
    if (downBtn) {
       downBtn.src = nextDark ? 'images/Wdown-btn.png' : 'images/down-btn.png';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Hide the navbar completely if we are inside the Sanity Studio
  if (pathname?.startsWith('/studio')) return null;

  return (
    <>
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`} id="topNav" style={{ zIndex: 9999 }}>
        <Link href="/" className="nav-brand">EEE<span>DEPARTMENT</span></Link>
        <ul className="nav-links">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/#about_us">ABOUT US</Link></li>
          <li><Link href="/#programs">PROGRAMS</Link></li>
          <li><Link href="/#more">MORE</Link></li>
        </ul>
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Open mobile menu" 
          aria-expanded={isMenuOpen}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
        <button 
          id="themeToggle" 
          className={`theme-toggle ${!isDark ? 'flipped' : ''}`} 
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
        >
          <span className="theme-icon theme-icon-moon">🌙</span>
          <span className="theme-icon theme-icon-sun">☀️</span>
        </button>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobileMenu" style={{ zIndex: 9998 }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-links">
            <Link href="/" className="mobile-menu-link" onClick={closeMenu}>HOME</Link>
            <Link href="/#about_us" className="mobile-menu-link" onClick={closeMenu}>ABOUT US</Link>
            <Link href="/#programs" className="mobile-menu-link" onClick={closeMenu}>PROGRAMS</Link>
            <Link href="/#more" className="mobile-menu-link" onClick={closeMenu}>MORE</Link>
          </div>
          <div className="mobile-menu-footer">
            <a href="#" className="mobile-menu-link">Privacy</a>
            <a href="#" className="mobile-menu-link">Terms</a>
            <a href="#" className="mobile-menu-link">Contact</a>
          </div>
        </div>
      </div>
    </>
  );
}