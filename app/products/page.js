import Link from 'next/link';
import { getAllProducts, getAllCategories } from '@/lib/products';
import { CATEGORIES } from '@/lib/config';
import ProductSearch from '@/components/ProductSearch';

export const metadata = {
  title: 'All Products | Pharma & Nutra Raw Materials | Surravi Phharma',
  description:
    'Browse 500+ pharmaceutical, nutraceutical and food raw materials supplied by Surravi Phharma in Hyderabad. IP/BP/EP/USP grades. Ready stock.',
};

export default async function ProductsPage() {
  const categories = await getAllCategories();
  const all = await getAllProducts();

  return (
    <div className="page-wrap">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> › <span>Products</span>
        </nav>

        <h1 className="page-title">All Products</h1>
        <p className="page-sub">500+ products across {categories.length} categories</p>

        {/* Client-side search + filter */}
        <ProductSearch products={all} categories={categories} categoryConfig={CATEGORIES} />
      </div>
    </div>
  );
}
