import products from '@/data/products.json';

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getAllCategories() {
  const cats = {};
  products.forEach((p) => {
    if (!cats[p.category]) {
      cats[p.category] = { category: p.category, label: p.categoryLabel, count: 0 };
    }
    cats[p.category].count++;
  });
  return Object.values(cats);
}

export function getRelatedProducts(slug) {
  const product = getProductBySlug(slug);
  if (!product || !product.relatedSlugs) return [];
  return product.relatedSlugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean)
    .slice(0, 5);
}

// For generateStaticParams
export function getAllProductPaths() {
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export function getAllCategoryPaths() {
  return [...new Set(products.map((p) => p.category))].map((cat) => ({
    category: cat,
  }));
}
