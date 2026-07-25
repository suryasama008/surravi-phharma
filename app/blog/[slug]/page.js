import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogBySlug } from '@/lib/blogs';
import { SITE } from '@/lib/config';
import products from '@/data/products.json';

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: { canonical: `${SITE.url}/blog/${blog.slug}` },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      type: 'article',
      publishedTime: blog.publishedAt,
      url: `${SITE.url}/blog/${blog.slug}`,
    },
  };
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'p':
      return <p key={i}>{block.text}</p>;
    case 'cta':
      return (
        <div key={i} className="blog-cta">
          <p>{block.text}</p>
          <a href={`tel:${SITE.phone}`} className="btn btn-primary">📞 {SITE.phone}</a>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            💬 WhatsApp
          </a>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const relatedProducts = (blog.relatedSlugs || [])
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 5);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDescription,
    datePublished: blog.publishedAt,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/blog/${blog.slug}`,
    keywords: blog.tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="page-wrap">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link> ›{' '}
            <Link href="/blog">Blog</Link> ›{' '}
            <span>{blog.title}</span>
          </nav>

          <div className="blog-layout">
            {/* ── Main article ── */}
            <article className="blog-article">
              <span className="blog-cat">{blog.category}</span>
              <h1>{blog.title}</h1>
              <div className="blog-meta">
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>{blog.readingTime} read</span>
              </div>

              <p className="blog-lead">{blog.excerpt}</p>
              <hr className="blog-divider" />

              <div className="blog-body">
                {blog.content.map((block, i) => renderBlock(block, i))}
              </div>

              {blog.tags?.length > 0 && (
                <div className="blog-tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="blog-sidebar">
              {relatedProducts.length > 0 && (
                <div className="sidebar-card">
                  <h3>Products Mentioned</h3>
                  <div className="blog-related-products">
                    {relatedProducts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.category}/${p.slug}`}
                        className="blog-product-link"
                      >
                        <span>{p.name}</span>
                        <span className="blog-product-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="sidebar-card sidebar-contact">
                <h3>Need These Materials?</h3>
                <p>Ready stock in Hyderabad. COA & MSDS provided.</p>
                <a href={`tel:${SITE.phone}`} className="sidebar-cta sidebar-call">
                  📞 {SITE.phone}
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-cta sidebar-wa"
                >
                  💬 WhatsApp Enquiry
                </a>
              </div>

              <div className="sidebar-card">
                <h3>More Articles</h3>
                <Link href="/blog" className="view-all">View all articles →</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
