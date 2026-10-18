import { Suspense } from 'react';
import ProductsContent from '../../components/products/ProductsContent';

export const metadata = {
  title: 'All Products | Personal Care Store',
  description: 'Browse our full range of personal care products including skincare, haircare, body care, and perfumes.',
};

export default function ProductsPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-8) var(--space-4)' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
