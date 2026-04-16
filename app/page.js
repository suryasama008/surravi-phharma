import Link from 'next/link';
import { getAllCategories, getAllProducts } from '@/lib/products';
import { SITE, CATEGORIES } from '@/lib/config';
import EnquiryForm from '@/components/EnquiryForm';
import PageTracker from '@/components/PageTracker';

export const metadata = {
  title: 'Surravi Phharma | Pharma, Nutra & Food Raw Materials Hyderabad',
  description:
    'Importers & distributors of pharmaceutical excipients, vitamins, amino acids, oils and food raw materials in Hyderabad. IP/BP/EP/USP grades. Ready stock. Pan India supply.',
};

export default async function HomePage() {
  const categories = await getAllCategories();
  const allProducts = await getAllProducts();
  const bestsellers = allProducts.filter(p => p.bestseller);

  return (
    <>
      <PageTracker page="/" />

      {/* ── HERO (white, no gradient bg) ── */}
      <section className="hero-clean">
        <div className="container">
          <span className="hero-badge-clean">Importers &amp; Distributors · Hyderabad</span>
          <h1 className="hero-h1">Pharma, Nutra &amp; Food<br />Raw Materials</h1>
          <p className="hero-sub-clean">
            500+ pharmaceutical-grade excipients, vitamins, amino acids, colours,
            phosphates, oils and more — supplied pan India from Hyderabad.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-primary">Browse Products</Link>
            <a href={`tel:${SITE.phone}`} className="btn btn-outline">📞 Call Now</a>
          </div>
          <div className="hero-trust-row">
            <span className="trust-chip">✔ IP / BP / EP / USP Grades</span>
            <span className="trust-chip">✔ Ready Stock</span>
            <span className="trust-chip">✔ COA &amp; Regulatory Docs</span>
            <span className="trust-chip">✔ Pan India Delivery</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section" id="products">
        <div className="container">
          <h2 className="section-title">Our Product Range</h2>
          <p className="section-sub">
            500+ products across {categories.length} categories — ready for immediate dispatch
          </p>
          <div className="cat-grid-v2">
            {categories.map((cat) => {
              const cfg = CATEGORIES[cat.category];
              const icon = cfg?.icon ?? '🔬';
              const label = cfg?.label ?? cat.label ?? cat.category;
              const isOilsOrApi = cat.category === 'api' || cat.category === 'oils-butters';
              return (
                <Link
                  key={cat.category}
                  href={`/products/${cat.category}`}
                  className={`cat-card-v2${isOilsOrApi ? ' cat-featured' : ''}`}
                >
                  {/* Image placeholder — replace src with actual category image */}
                  {/* Image format: /images/categories/{category}.png  e.g. /images/categories/api.png */}
                  <div className="cat-img-wrap">
                    <div className="cat-img-placeholder">
                      <span className="cat-img-icon">{icon}</span>
                      {/* To add real image: <img src={`/images/categories/${cat.category}.png`} alt={label} /> */}
                      {/* Recommended size: 300×200px, PNG with transparent or white background */}
                    </div>
                    {isOilsOrApi && <span className="cat-featured-badge">⭐ Featured</span>}
                  </div>
                  <div className="cat-card-body">
                    {/* Category name goes here — format: Title Case, e.g. "Active Pharmaceutical Ingredients" */}
                    <h3 className="cat-card-name">{label}</h3>
                    <span className="cat-count">{cat.count} products</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      {bestsellers.length > 0 && (
        <section className="section section-alt" id="bestsellers">
          <div className="container">
            <h2 className="section-title">🏆 Bestselling Products</h2>
            <p className="section-sub">Our most popular pharmaceutical raw materials</p>
            <div className="product-grid">
              {bestsellers.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.category}/${p.slug}`}
                  className={`product-card bestseller-card${p.category === 'api' ? ' api-highlight' : ''}`}
                >
                  <span className="bestseller-badge">🏆 Best Seller</span>
                  <h3>{p.name}</h3>
                  {p.grades?.length > 0 && (
                    <div className="grade-pills">
                      {p.grades.map((g) => (
                        <span key={g} className="grade-pill">{g}</span>
                      ))}
                    </div>
                  )}
                  {p.cas && <p className="cas">CAS: {p.cas}</p>}
                  <div className="card-bottom">
                    <span className="enquire-link">Enquire →</span>
                    {p.readyStock && <span className="badge-ready">Ready Stock</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY US ── */}
      <section className="section" id="why-us">
        <div className="container">
          <h2 className="section-title">Why Choose Surravi Phharma?</h2>
          <div className="why-grid">
            {[
              { icon: '❄️', title: 'Centralised AC Storage', desc: 'Empty capsules stored in a centralised, air-conditioned facility ensuring quality and integrity.' },
              { icon: '✅', title: 'Ready Stock', desc: 'Immediate availability — no long lead times for standard product grades.' },
              { icon: '📄', title: 'Full Documentation', desc: 'COA, MSDS, and regulatory compliance documents provided with every order.' },
              { icon: '🌏', title: 'Pan India Supply', desc: 'Reliable logistics network covering all major pharmaceutical hubs in India.' },
              { icon: '🔬', title: 'Multi-Pharmacopoeial', desc: 'All grades available: IP, BP, EP, USP — choose what your formulation requires.' },
              { icon: '🤝', title: 'Custom Quantities', desc: 'From lab-scale to bulk commercial orders — flexible packaging and quantities.' },
            ].map((item) => (
              <div key={item.title} className="why-card">
                <span className="why-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section section-alt" id="about">
        <div className="container about-layout">
          <div className="about-text">
            <h2>About Surravi Phharma</h2>
            <p>
              Surravi Phharma is a Hyderabad-based importer and distributor of pharmaceutical,
              nutraceutical, and food raw materials. We supply excipients, vitamins, amino acids,
              colours, phosphates, oils, proteins, and flavours to manufacturers across India.
            </p>
            <p>
              We work with leading global manufacturers to supply IP, BP, EP, and USP grade
              materials with complete documentation — COA, MSDS, and regulatory certificates
              provided with every order.
            </p>
            <div className="about-stats">
              <div><strong>500+</strong><span>Products</span></div>
              <div><strong>{categories.length}</strong><span>Categories</span></div>
              <div><strong>Pan India</strong><span>Supply Network</span></div>
            </div>
          </div>
          <div className="about-contact-card">
            <h3>Get in Touch</h3>
            <div className="contact-items">
              <a href={`tel:${SITE.phone}`} className="contact-item">
                <span>📞</span><span>{SITE.phone}</span>
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="contact-item">
                <span>💬</span><span>WhatsApp Us</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="contact-item">
                <span>✉️</span><span>{SITE.email}</span>
              </a>
              <div className="contact-item">
                <span>📍</span><span>{SITE.address.full}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY ── */}
      <section className="section" id="enquiry">
        <div className="container enquiry-layout">
          <div>
            <h2>Send an Enquiry</h2>
            <p>Tell us what you need and we&apos;ll get back to you promptly.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
