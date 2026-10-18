"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { Product } from '../../types';

const CATEGORIES = ['Skin Care', 'Hair Care', 'Body Care', 'Perfumes & Deodorants'];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'title';
  const order = searchParams.get('order') || 'asc';
  const inStock = searchParams.get('in_stock') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (brand) params.set('brand', brand);
    if (search) params.set('search', search);
    if (sortBy) params.set('sortBy', sortBy);
    if (order) params.set('order', order);
    if (inStock === 'true') params.set('in_stock', 'true');
    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }, [category, brand, search, sortBy, order, inStock]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="font-bold text-3xl">All Products</h1>
        <span style={{ color: 'var(--text-secondary)' }}>
          {loading ? '...' : products.length} products
        </span>
      </div>

      {/* Filters Row */}
      <div className="flex gap-4" style={{ marginBottom: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={category}
          onChange={e => updateFilter('category', e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={inStock}
          onChange={e => updateFilter('in_stock', e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
        >
          <option value="">All Stock</option>
          <option value="true">In Stock Only</option>
        </select>

        <select
          value={`${sortBy}:${order}`}
          onChange={e => {
            const [s, o] = e.target.value.split(':');
            const params = new URLSearchParams(searchParams.toString());
            params.set('sortBy', s);
            params.set('order', o);
            router.push(`/products?${params.toString()}`);
          }}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
        >
          <option value="title:asc">Name (A-Z)</option>
          <option value="title:desc">Name (Z-A)</option>
          <option value="mrp:asc">Price (Low to High)</option>
          <option value="mrp:desc">Price (High to Low)</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          defaultValue={search}
          onKeyDown={e => { if (e.key === 'Enter') updateFilter('search', (e.target as HTMLInputElement).value); }}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', minWidth: '200px' }}
        />

        {(category || brand || search || inStock) && (
          <button
            onClick={() => router.push('/products')}
            style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: 'var(--text-sm)' }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-secondary)' }}>
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-secondary)' }}>
          No products found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
