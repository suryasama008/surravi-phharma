import Link from 'next/link';
import { getAllProducts, getAllCategories } from '@/lib/products';
import { CATEGORIES } from '@/lib/config';

export const metadata = {
  title: 'All Products | Pharma & Nutra Raw Materials',
  description:
    'Browse 500+ pharmaceutical, nutraceutical and food raw materials supplied by Surravi Phharma in Hyderabad. IP/BP/EP/USP grades. Ready stock.',
};

export default function ProductsPage() {
  const categories = getAllCategories();
  const all = getAllProducts();

  return (
    <div className="page-wrap">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> › <span>Products</span>
        </nav>

        <h1 className="page-title">All Products</h1>
        <p className="page-sub">500+ products across {categories.length} categories</p>

        {categories.map((cat) => {
          const cfg = CATEGORIES[cat.category] || {};
          const products = all.filter((p) => p.category === cat.category);
          return (
            <section key={cat.category} className="cat-section">
              <div className="cat-section-header">
                <h2>
                  <span>{cfg.icon}</span>{' '}
                  <Link href={`/products/${cat.category}`}>{cat.label}</Link>
                </h2>
                <Link href={`/products/${cat.category}`} className="view-all">
                  View all →
                </Link>
              </div>
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
                    <div className="card-bottom">
                      <span className="enquire-link">Enquire →</span>
                      {p.readyStock && <span className="badge-ready">Ready Stock</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
