// lib/products.js
// Single source of truth: data/products.json.
// This is a fully static export (see next.config.js `output: 'export'`), so every
// product page is generated once at build time. Reading from a local file means
// the pages that get built always match the data you can see and edit — no risk
// of a page existing in the file but missing from the live site (or vice versa).

import products from '@/data/products.json';

const CATEGORY_PRODUCT_PRIORITY = {
  excipients: ['glycerin'],
};

function getCategoryPriority(product) {
  const priority = CATEGORY_PRODUCT_PRIORITY[product.category] ?? [];
  const index = priority.indexOf(product.slug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortProducts(list) {
  return [...list].sort((a, b) => {
    const priorityDiff = getCategoryPriority(a) - getCategoryPriority(b);
    if (priorityDiff !== 0) return priorityDiff;
    return a.name.localeCompare(b.name);
  });
}

// Normalise every record so the app always sees the same shape,
// regardless of which optional fields a given products.json entry has.
function toProduct(row) {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryLabel: row.categoryLabel ?? null,
    bestseller: row.bestseller ?? row.bestSeller ?? false,
    bestSeller: row.bestseller ?? row.bestSeller ?? false,
    grades: row.grades ?? [],
    readyStock: row.readyStock ?? false,
    cas: row.cas ?? null,
    appearance: row.appearance ?? null,
    packaging: row.packaging ?? null,
    metaTitle: row.metaTitle ?? null,
    metaDescription: row.metaDescription ?? null,
    h1: row.h1 ?? null,
    overview: row.overview ?? null,
    specs: row.specs ?? {},
    applications: row.applications ?? [],
    relatedSlugs: row.relatedSlugs ?? [],
    faq: row.faq ?? [],
    createdAt: row.createdAt ?? null,
    updatedAt: row.updatedAt ?? null,
  };
}

const ALL_PRODUCTS = sortProducts(products.map(toProduct));

// All products, sorted by name
export async function getAllProducts() {
  return ALL_PRODUCTS;
}

// Unique categories with their labels — exported as both names for compatibility
export async function getAllCategories() {
  const seen = new Map();
  for (const product of ALL_PRODUCTS) {
    if (!seen.has(product.category)) {
      seen.set(product.category, { label: product.categoryLabel ?? product.category, count: 0 });
    }
    seen.get(product.category).count += 1;
  }
  return Array.from(seen.entries()).map(([category, { label, count }]) => ({
    category,
    categoryLabel: label,
    label,   // alias so templates using cat.label work
    count,   // product count per category
  }));
}

// Aliases so both import names work
export const getCategories = getAllCategories;

// For generateStaticParams on /products/[category] — must return [{category: string}]
export async function getAllCategoryPaths() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

// Products filtered by category slug
export async function getProductsByCategory(category) {
  return sortProducts(ALL_PRODUCTS.filter((product) => product.category === category));
}

// Single product by slug — returns null if not found (let page show 404)
export async function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((product) => product.slug === slug) ?? null;
}

// All { category, slug } pairs for generateStaticParams on /products/[category]/[slug]
export async function getAllProductPaths() {
  return ALL_PRODUCTS.map(({ category, slug }) => ({ category, slug }));
}

// All unique category slugs for generateStaticParams on /products/[category]
export async function getAllCategorySlugs() {
  return [...new Set(ALL_PRODUCTS.map((product) => product.category))];
}

// Related products by an array of slugs
export async function getRelatedProducts(slugs = []) {
  if (!slugs.length) return [];
  return ALL_PRODUCTS.filter((product) => slugs.includes(product.slug));
}
