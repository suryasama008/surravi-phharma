'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SITE } from '@/lib/config';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/products/api', label: 'API', highlight: true },
    { href: '/products/excipients', label: 'Excipients' },
    { href: '/products/oils-butters', label: 'Oils & Butters', highlight: true },
    { href: '/products/vitamins', label: 'Vitamins' },
    { href: '/products/amino-acids', label: 'Amino Acids' },
    { href: '/blog', label: 'Blog' },
    { href: '/#about', label: 'About' },
    { href: '/#enquiry', label: 'Enquiry' },
  ];

  return (
    <header className="sp-header">
      {/* ── TOP BAR ── */}
      <div className="sp-topbar">
        <div className="sp-topbar-inner container">
          <Link href="/" className="sp-logo">
            <span className="sp-logo-icon">SP</span>
            <span className="sp-logo-text">{SITE.name}</span>
          </Link>

          <form className="sp-search-wrap" onSubmit={handleSearch}>
            <button type="submit" className="sp-search-icon-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <input
              ref={searchRef}
              type="text"
              className="sp-search-input"
              placeholder="Search Product Name, CAS Number, or Keyword"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>

          <div className="sp-topbar-right">
            <div className="sp-location-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>India</span>
            </div>
            <Link href="/#enquiry" className="sp-enquiry-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m2 3 10 8 10-8"/></svg>
              Enquiry
            </Link>
            <a href={`tel:${SITE.phone}`} className="sp-phone-link">{SITE.phone}</a>
          </div>

          <button className={`sp-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── NAV BAR ── */}
      <nav className={`sp-navbar ${menuOpen ? 'open' : ''}`}>
        <div className="sp-navbar-inner container">
          {navLinks.map(({ href, label, highlight }) => {
            const isActive = pathname === href || (href !== '/' && href !== '/#about' && href !== '/#enquiry' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`sp-nav-link${isActive ? ' active' : ''}${highlight ? ' highlight' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
