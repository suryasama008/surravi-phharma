import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogs';

export const metadata = {
  title: 'Pharma & Nutra Insights | Blog | Surravi Phharma',
  description: 'Practical guides on pharmaceutical excipients, formulation, pharmacopoeia grades, nutraceutical raw materials, and more — from Surravi Phharma, Hyderabad.',
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="page-wrap">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> › <span>Blog</span>
        </nav>

        <h1 className="page-title">Pharma & Nutra Insights</h1>
        <p className="page-sub">
          Practical guides on excipients, formulation, grades, and raw materials
        </p>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="blog-card">
              <span className="blog-cat">{blog.category}</span>
              <h2>{blog.title}</h2>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-meta">
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>{blog.readingTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
