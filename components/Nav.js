'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/config';

export default function Nav() {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('sp-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('sp-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/#about', label: 'About' },
    { href: '/#enquiry', label: 'Enquiry' },
  ];

  return (
    <header className="nav-wrap">
      <div className="nav-inner container">
        <Link href="/" className="nav-logo">
          <span className="logo-pill">SP</span>
          <span className="logo-text">{SITE.name}</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a href={`tel:${SITE.phone}`} className="nav-phone">
            📞 {SITE.phone}
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
