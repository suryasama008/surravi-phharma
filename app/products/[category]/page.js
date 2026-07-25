import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductsByCategory, getAllCategoryPaths } from '@/lib/products';
import { CATEGORIES, SITE } from '@/lib/config';
import { getCategoryContent } from '@/lib/categoryContent';
import PageTracker from '@/components/PageTracker';
import CategoryProductSearch from '@/components/CategoryProductSearch';

export async function generateStaticParams() {
  return getAllCategoryPaths();
}

// Safe helper — works even if category slug is not yet in CATEGORIES config
function getCategoryMeta(category) {
  const cfg = CATEGORIES[category];
  return {
    label: cfg?.label ?? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    icon:  cfg?.icon  ?? '🔬',
  };
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const { label } = getCategoryMeta(category);
  const cc = await getCategoryContent(category);
  const title = cc?.metaTitle || `${label} Supplier Hyderabad | Surravi Phharma`;
  const description =
    cc?.metaDescription ||
    `Buy pharma-grade ${label} in Hyderabad. IP/BP/EP/USP grades. Ready stock. COA & MSDS. Pan India supply. Call ${SITE.phone}.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${SITE.url}/products/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/products/${category}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const { label, icon } = getCategoryMeta(category);

  const products = await getProductsByCategory(category);
  if (!products.length) notFound();

  const cc = await getCategoryContent(category);
  const featuredProducts = products
    .filter((p) => p.bestseller || p.readyStock)
    .slice(0, 6);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
      { '@type': 'ListItem', position: 3, name: label, item: `${SITE.url}/products/${category}` },
    ],
  };

  const faqSchema = cc?.faq?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cc.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  } : null;

  return (
    <div className="page-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PageTracker page={`/products/${category}`} />
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> ›{' '}
          <Link href="/products">Products</Link> ›{' '}
          <span>{label}</span>
        </nav>

        <h1 className="page-title">
          <span style={{ marginRight: '10px' }}>{icon}</span>
          {cc?.h1 || label}
        </h1>
        <p className="page-sub">
          {products.length} products listed · IP/BP/EP/USP · Ready Stock · Pan India Supply
        </p>
        <CategoryProductSearch products={products} categoryLabel={label} />

        {cc && (
          <div className="seo-foldouts">
            <details className="seo-foldout">
              <summary>Category Details</summary>
              <div className="cat-intro">
                <p className="cat-intro-lead">{cc.intro}</p>
                {cc.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {featuredProducts.length > 0 && (
                  <div className="internal-links">
                    <h3>Popular {label} Products</h3>
                    <div>
                      {featuredProducts.map((p) => (
                        <Link key={p.slug} href={`/products/${p.category}/${p.slug}`}>
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>

            {cc.closing && (
              <details className="seo-foldout">
                <summary>More Information</summary>
                <div className="cat-closing">
                  <p>{cc.closing}</p>
                </div>
              </details>
            )}
            {cc.faq?.length > 0 && (
              <details className="seo-foldout">
                <summary>Category FAQs</summary>
                <div className="faq-list">
                  {cc.faq.map((item, i) => (
                    <details key={i} className="faq-item">
                      <summary className="faq-q">{item.q}</summary>
                      <p className="faq-a">{item.a}</p>
                    </details>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
