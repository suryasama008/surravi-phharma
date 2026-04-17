'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ProductSearch({ products, categories, categoryConfig }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        p.name?.toLowerCase().includes(q) ||
        p.cas?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.categoryLabel?.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, products]);

  // Group filtered by category for display
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(p => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, [filtered]);

  const categoryOrder = categories.map(c => c.category);

  return (
    <>
      {/* Search bar */}
      <div className="prod-search-box">
        <div className="prod-search-input-wrap">
          <svg className="prod-search-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="prod-search-input"
            placeholder="Search by product name, CAS number, or keyword..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="prod-search-clear" onClick={() => setQuery('')} aria-label="Clear">✕</button>
          )}
        </div>

        {/* Category filter buttons */}
        <div className="prod-filter-row">
          <button
            className={`prod-filter-btn${activeCategory === 'all' ? ' active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Categories
          </button>
          {categories.map(cat => {
            const cfg = categoryConfig[cat.category];
            const label = cfg?.label ?? cat.label ?? cat.category;
            const icon = cfg?.icon ?? '🔬';
            const isHighlight = cat.category === 'api' || cat.category === 'oils-butters';
            return (
              <button
                key={cat.category}
                className={`prod-filter-btn${activeCategory === cat.category ? ' active' : ''}${isHighlight ? ' highlight' : ''}`}
                onClick={() => setActiveCategory(cat.category)}
              >
                {icon} {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="prod-results-meta">
        {query || activeCategory !== 'all' ? (
          <span>Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && ` in ${categoryConfig[activeCategory]?.label ?? activeCategory}`}
            {query && ` for "${query}"`}
          </span>
        ) : (
          <span>{products.length} products across {categories.length} categories</span>
        )}
      </div>

      {/* Product listing */}
      {filtered.length === 0 ? (
        <div className="prod-empty">
          <p>No products found for <strong>&ldquo;{query}&rdquo;</strong>. Try a different search term or browse a category.</p>
        </div>
      ) : (
        categoryOrder
          .filter(cat => grouped[cat]?.length)
          .map(cat => {
            const cfg = categoryConfig[cat];
            const icon = cfg?.icon ?? '🔬';
            const label = cfg?.label ?? cat;
            const prods = grouped[cat];
            const isOilsOrApi = cat === 'api' || cat === 'oils-butters';
            return (
              <section key={cat} className={`cat-section${isOilsOrApi ? ' cat-section-featured' : ''}`}>
                <div className="cat-section-header">
                  <h2>
                    {isOilsOrApi && <span className="cat-featured-dot" />}
                    <span>{icon}</span>{' '}
                    <Link href={`/products/${cat}`}>{label}</Link>
                    {isOilsOrApi && <span className="cat-featured-tag">⭐ Featured</span>}
                  </h2>
                  <Link href={`/products/${cat}`} className="view-all">View all →</Link>
                </div>
                <div className="product-grid">
                  {prods.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.category}/${p.slug}`}
                      className={`product-card${p.bestseller ? ' bestseller-card' : ''}${p.category === 'api' ? ' api-highlight' : ''}`}
                    >
                      {p.bestseller && <span className="bestseller-badge">🏆 Best Seller</span>}
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
          })
      )}
    </>
  );
}
