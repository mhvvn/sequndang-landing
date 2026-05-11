'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#fitur', label: 'Fitur' },
    { href: '#harga', label: 'Harga' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontak', label: 'Kontak' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'hero-visible'}`}>
      <div className="container">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="nav-logo-icon">
              <ShoppingCart size={18} />
            </div>
            <span className="nav-logo-text">Sequndang</span>
          </a>

          {/* Desktop nav links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta">
            <a
              href="#daftar"
              className={`btn ${scrolled ? 'btn-primary' : 'btn-white'}`}
              style={{ padding: '10px 22px', fontSize: '14px' }}
            >
              Daftar Trial Gratis
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileOpen ? (
              <X size={24} color={scrolled ? '#191b24' : 'white'} />
            ) : (
              <Menu size={24} color={scrolled ? '#191b24' : 'white'} />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="#daftar"
              className="mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              Daftar Trial Gratis
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
