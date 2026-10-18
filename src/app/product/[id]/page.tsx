export const dynamic = 'force-dynamic';

import { getProductById } from '../../../lib/productData';
import ProductDetailClient from '../../../components/products/ProductDetailClient';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
        <h1 className="font-bold text-2xl">Product not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
