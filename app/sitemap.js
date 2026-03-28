import { getAllProducts, getAllCategories } from '@/lib/products';
import { getAllBlogs } from '@/lib/blogs';
import { SITE } from '@/lib/config';

export default function sitemap() {
  const products = getAllProducts();
  const categories = getAllCategories();

  const staticPages = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE.url}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${SITE.url}/products/${cat.category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${SITE.url}/products/${p.category}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogs = getAllBlogs();
  const blogPages = blogs.map((b) => ({
    url: `${SITE.url}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogIndexPage = {
    url: `${SITE.url}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  };

  return [...staticPages, blogIndexPage, ...categoryPages, ...productPages, ...blogPages];
}
