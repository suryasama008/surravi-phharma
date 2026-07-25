import Link from 'next/link';
import { SITE, CATEGORIES } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-pill">SP</span>
            <span>{SITE.name}</span>
          </div>
          <p>{SITE.tagline}</p>
          <p className="footer-addr">{SITE.address.full}</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#enquiry">Enquiry</Link></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            {Object.entries(CATEGORIES).map(([slug, cfg]) => (
              <li key={slug}>
                <Link href={`/products/${slug}`}>{cfg.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© {year} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
