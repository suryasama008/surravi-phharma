'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';

function productMatches(product, query) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  return [
    product.name,
    product.cas,
    product.appearance,
    product.categoryLabel,
    ...(product.grades ?? []),
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(q));
}

export default function CategoryProductSearch({ products, categoryLabel }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => products.filter((product) => productMatches(product, query)),
    [products, query]
  );

  return (
    <>
      <div className="category-search">
        <div className="prod-search-input-wrap">
          <svg className="prod-search-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="prod-search-input"
            placeholder={`Search ${categoryLabel} products...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button className="prod-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              x
            </button>
          )}
        </div>
        <span>{filtered.length} of {products.length} products</span>
      </div>

      {filtered.length === 0 ? (
        <div className="prod-empty">
          <p>No products found for <strong>&ldquo;{query}&rdquo;</strong>.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
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
                <span className="enquire-link">View &amp; Enquire</span>
                {p.readyStock && <span className="badge-ready">Ready Stock</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
