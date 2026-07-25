// lib/categoryContent.js
// Single source of truth: data/categoryContent.json (same reasoning as lib/products.js).

import categoryContent from '@/data/categoryContent.json';

export async function getCategoryContent(category) {
  return categoryContent[category] ?? null;
}

export async function getAllCategoryContent() {
  return categoryContent;
}
