import Link from 'next/link';
import { getProducts } from '../../lib/productData';
import ProductCard from '../products/ProductCard';

export default async function FeaturedProducts({ title = "Featured Products" }: { title?: string }) {
  const products = await getProducts({ sortBy: 'mrp', order: 'desc' });
  const featured = products.slice(0, 4);

  return (
    <section style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-12) 0' }}>
      <div className="container" style={{ padding: '0 var(--space-4)' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="font-bold text-3xl">{title}</h2>
          <Link href="/products" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-4">
          {featured.map((product: Parameters<typeof ProductCard>[0]['product']) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
