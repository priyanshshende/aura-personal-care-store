"use client";
import Link from 'next/link';
import { useWishlistStore } from '../../store/useWishlistStore';
import ProductCard from '../../components/products/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore(state => state.items);

  return (
    <main className="container" style={{ padding: 'var(--space-12) var(--space-4)', minHeight: '60vh' }}>
      <h1 className="font-bold text-4xl" style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>My Wishlist</h1>
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: 'var(--space-4)' }}>Your wishlist is empty.</p>
          <Link href="/products">
            <button style={{ padding: 'var(--space-3) var(--space-8)', backgroundColor: 'var(--primary-color)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {items.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
