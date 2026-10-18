export const dynamic = 'force-dynamic';

import { getProducts } from '../../../lib/productData';
import ProductCard from '../../../components/products/ProductCard';
import { Product } from '../../../types';

const SLUG_TO_CATEGORY: Record<string, string> = {
  'skin-care': 'Skin Care',
  'hair-care': 'Hair Care',
  'body-care': 'Body Care',
  'perfumes-deodorants': 'Perfumes & Deodorants',
};

export function generateStaticParams() {
  return Object.keys(SLUG_TO_CATEGORY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = SLUG_TO_CATEGORY[slug] || 'Category';
  return { title: `${title} | Personal Care Store` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryTitle = SLUG_TO_CATEGORY[slug];

  if (!categoryTitle) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
        <h1>Category not found</h1>
      </div>
    );
  }

  const products = await getProducts({ category: categoryTitle });

  return (
    <main>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h1 className="font-bold text-4xl" style={{ marginBottom: 'var(--space-4)' }}>{categoryTitle}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Explore our range of {categoryTitle.toLowerCase()} products.
        </p>
      </div>
      <div className="container" style={{ padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ marginBottom: 'var(--space-6)', color: 'var(--text-secondary)' }}>
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </div>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-12) 0' }}>
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
