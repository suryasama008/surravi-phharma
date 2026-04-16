import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductsByCategory, getAllCategoryPaths } from '@/lib/products';
import { CATEGORIES, SITE } from '@/lib/config';
import categoryContent from '@/data/categoryContent.json';
import PageTracker from '@/components/PageTracker';

export async function generateStaticParams() {
  return getAllCategoryPaths();
}

// Safe helper — works even if category slug is not yet in CATEGORIES config
function getCategoryMeta(category) {
  const cfg = CATEGORIES[category];
  return {
    label: cfg?.label ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    icon:  cfg?.icon  ?? '🔬',
  };
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const { label } = getCategoryMeta(category);
  const cc = categoryContent[category];
  return {
    title: cc?.metaTitle || `${label} Supplier Hyderabad | Surravi Phharma`,
    description:
      cc?.metaDescription ||
      `Buy pharma-grade ${label} in Hyderabad. IP/BP/EP/USP grades. Ready stock. COA & MSDS. Pan India supply. Call ${SITE.phone}.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const { label, icon } = getCategoryMeta(category);

  const products = await getProductsByCategory(category);
  if (!products.length) notFound();

  const cc = categoryContent[category] || null;

  return (
    <div className="page-wrap">
      <PageTracker page={`/products/${category}`} />
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> ›{' '}
          <Link href="/products">Products</Link> ›{' '}
          <span>{label}</span>
        </nav>

        <h1 className="page-title">
          <span style={{ marginRight: '10px' }}>{icon}</span>
          {cc?.h1 || label}
        </h1>
        <p className="page-sub">
          {products.length} products listed · IP/BP/EP/USP · Ready Stock · Pan India Supply
        </p>

        {cc && (
          <div className="cat-intro">
            <p className="cat-intro-lead">{cc.intro}</p>
            {cc.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className="product-grid">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.category}/${p.slug}`}
              className="product-card"
            >
              <h3>{p.name}</h3>
              {p.grades?.length > 0 && (
                <div className="grade-pills">
                  {p.grades.map((g) => (
                    <span key={g} className="grade-pill">{g}</span>
                  ))}
                </div>
              )}
              {p.cas && <p className="cas">CAS: {p.cas}</p>}
              {p.appearance && <p className="appearance">{p.appearance}</p>}
              <div className="card-bottom">
                <span className="enquire-link">View &amp; Enquire →</span>
                {p.readyStock && <span className="badge-ready">Ready Stock</span>}
              </div>
            </Link>
          ))}
        </div>

        {cc?.closing && (
          <div className="cat-closing">
            <p>{cc.closing}</p>
          </div>
        )}
      </div>
    </div>
  );
}
