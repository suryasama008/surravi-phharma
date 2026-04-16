import blogs from '@/data/blogs.json';

export function getAllBlogs() {
  return [...blogs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug) || null;
}

export function getAllBlogSlugs() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export function getRelatedBlogProducts(blog) {
  if (!blog.relatedSlugs?.length) return [];
  // Import inline to avoid circular deps
  const products = require('@/data/products.json');
  return blog.relatedSlugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 5);
}
