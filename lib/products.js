// lib/products.js
// All product data comes from Supabase — no products.json needed.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Maps a Supabase DB row back to the camelCase shape the app expects
function toProduct(row) {
  return {
    slug:             row.slug,
    name:             row.name,
    category:         row.category,
    categoryLabel:    row.category_label    ?? null,
    bestSeller:       row.best_seller       ?? false,
    grades:           row.grades            ?? [],
    readyStock:       row.ready_stock       ?? false,
    cas:              row.cas               ?? null,
    appearance:       row.appearance        ?? null,
    packaging:        row.packaging         ?? null,
    metaTitle:        row.meta_title        ?? null,
    metaDescription:  row.meta_description  ?? null,
    h1:               row.h1               ?? null,
    overview:         row.overview          ?? null,
    specs:            row.specs             ?? {},
    applications:     row.applications      ?? [],
    relatedSlugs:     row.related_slugs     ?? [],
  };
}

// All products, sorted by name
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) throw new Error(`getAllProducts: ${error.message}`);
  return Array.isArray(data) ? data.map(toProduct) : [];
}

// Unique categories with their labels — exported as both names for compatibility
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('products')
    .select('category, category_label');

  if (error) throw new Error(`getAllCategories: ${error.message}`);
  if (!Array.isArray(data)) return [];

  const seen = new Map();
  for (const row of data) {
    if (!seen.has(row.category)) {
      seen.set(row.category, { label: row.category_label ?? row.category, count: 0 });
    }
    seen.get(row.category).count += 1;
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
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('name');

  if (error) throw new Error(`getProductsByCategory: ${error.message}`);
  return Array.isArray(data) ? data.map(toProduct) : [];
}

// Single product by slug — returns null if not found (let page show 404)
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return toProduct(data);
}

// All { category, slug } pairs for generateStaticParams on /products/[category]/[slug]
export async function getAllProductPaths() {
  const { data, error } = await supabase
    .from('products')
    .select('category, slug');

  if (error) throw new Error(`getAllProductPaths: ${error.message}`);
  return Array.isArray(data)
    ? data.map(({ category, slug }) => ({ category, slug }))
    : [];
}

// All unique category slugs for generateStaticParams on /products/[category]
export async function getAllCategorySlugs() {
  const { data, error } = await supabase
    .from('products')
    .select('category');

  if (error) throw new Error(`getAllCategorySlugs: ${error.message}`);
  return Array.isArray(data)
    ? [...new Set(data.map(r => r.category))]
    : [];
}

// Related products by an array of slugs
export async function getRelatedProducts(slugs = []) {
  if (!slugs.length) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('slug', slugs);

  if (error) throw new Error(`getRelatedProducts: ${error.message}`);
  return Array.isArray(data) ? data.map(toProduct) : [];
}