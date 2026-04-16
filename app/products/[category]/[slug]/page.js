import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProductPaths,
} from '@/lib/products';
import { SITE } from '@/lib/config';
import EnquiryForm from '@/components/EnquiryForm';
import PageTracker from '@/components/PageTracker';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllProductPaths();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  // Guard: product may not exist (404 case)
  if (!product) return { title: 'Product Not Found | Surravi Phharma' };
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: `${SITE.url}/products/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `${SITE.url}/products/${product.category}/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.relatedSlugs ?? []);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.overview,
    url: `${SITE.url}/products/${product.category}/${product.slug}`,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE.name },
      areaServed: 'IN',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Contact for pricing',
      },
    },
  };

  const faqSchema =
    product.faq?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: product.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PageTracker page={`/products/${product.category}/${product.slug}`} product={product.name} />

      <div className="page-wrap">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link> ›{' '}
            <Link href="/products">Products</Link> ›{' '}
            <Link href={`/products/${product.category}`}>{product.categoryLabel}</Link> ›{' '}
            <span>{product.name}</span>
          </nav>

          <div className="product-layout">
            {/* ── LEFT: Main content ── */}
            <div className="product-main">
              <div className="product-header">
                {product.readyStock && (
                  <span className="badge-ready badge-lg">✔ Ready Stock</span>
                )}
                <h1>{product.h1 || product.name}</h1>
                {product.grades?.length > 0 && (
                  <div className="grade-pills">
                    {product.grades.map((g) => (
                      <span key={g} className="grade-pill">{g}</span>
                    ))}
                  </div>
                )}
              </div>

              {product.overview && (
                <section className="product-section">
                  <h2>Product Overview</h2>
                  <p>{product.overview}</p>
                </section>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <section className="product-section">
                  <h2>Specifications</h2>
                  <table className="spec-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {product.applications?.length > 0 && (
                <section className="product-section">
                  <h2>Applications</h2>
                  <ul className="app-list">
                    {product.applications.map((app) => (
                      <li key={app}>{app}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="product-section why-box">
                <h2>Why Source from Surravi Phharma?</h2>
                <ul>
                  <li>Ready stock maintained in our centralised AC warehouse, Hyderabad</li>
                  <li>IP / BP / EP / USP grades available</li>
                  <li>COA, Technical &amp; Regulatory docs available for all materials</li>
                  <li>Flexible quantities — lab scale to bulk commercial</li>
                  <li>Prompt delivery with pan India logistics support</li>
                </ul>
              </section>

              {product.faq?.length > 0 && (
                <section className="product-section">
                  <h2>Frequently Asked Questions</h2>
                  <div className="faq-list">
                    {product.faq.map((item, i) => (
                      <details key={i} className="faq-item">
                        <summary className="faq-q">{item.q}</summary>
                        <p className="faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {related.length > 0 && (
                <section className="product-section">
                  <h2>Related Products</h2>
                  <div className="related-grid">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/products/${r.category}/${r.slug}`}
                        className="related-card"
                      >
                        <span>{r.name}</span>
                        {r.readyStock && <span className="badge-ready badge-sm">In Stock</span>}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <aside className="product-sidebar">
              <div className="sidebar-card">
                <h3>Request a Quote</h3>
                <p>Get pricing, COA, and MSDS for <strong>{product.name}</strong>.</p>
                <EnquiryForm productName={product.name} compact />
              </div>

              <div className="sidebar-card sidebar-contact">
                <h3>Quick Contact</h3>
                <a href={`tel:${SITE.phone}`} className="sidebar-cta sidebar-call">
                  📞 {SITE.phone}
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20send%20details.`}
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-cta sidebar-wa"
                >
                  💬 WhatsApp Enquiry
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
