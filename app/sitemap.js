import { getAllProducts, getAllCategories } from '@/lib/products';
import { getAllBlogs } from '@/lib/blogs';
import { SITE } from '@/lib/config';

export default async function sitemap() {
  const [products, categories, blogs] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    Promise.resolve(getAllBlogs()),
  ]);

  const staticPages = [
    { url: SITE.url,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE.url}/products`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
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

  const blogPages = blogs.map((b) => ({
    url: `${SITE.url}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
