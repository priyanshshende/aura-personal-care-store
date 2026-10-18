"use client";
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';

export default function CartPage() {
  const { items, getSubtotal, removeItem, updateQuantity } = useCartStore();

  return (
    <main className="container" style={{ padding: 'var(--space-12) var(--space-4)', minHeight: '60vh' }}>
      <h1 className="font-bold text-4xl" style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>Your Cart</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: 'var(--space-4)' }}>Your cart is empty.</p>
          <Link href="/products">
            <button style={{ padding: 'var(--space-3) var(--space-8)', backgroundColor: 'var(--primary-color)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-8">
          <div style={{ flex: 2 }}>
            {items.map(item => {
              const imageUrl = item.product.images && item.product.images.length > 0 ? item.product.images[0] : null;
              return (
                <div key={item.product.product_id} className="flex gap-4" style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imageUrl
                      ? <img src={imageUrl} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      : <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>No Img</span>
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{item.product.brand}</p>
                    <h3 className="font-bold">{item.product.title}</h3>
                    <div className="flex justify-between items-center" style={{ marginTop: 'var(--space-2)' }}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.product_id, Math.max(1, item.quantity - 1))} style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)} style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>+</button>
                      </div>
                      <p className="font-bold">₹{(item.product.mrp * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.product_id)} style={{ color: 'var(--error, #dc2626)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
            <h3 className="font-bold text-xl" style={{ marginBottom: 'var(--space-4)' }}>Order Summary</h3>
            <div className="flex justify-between" style={{ marginBottom: 'var(--space-2)' }}>
              <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
              <span>₹{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)' }}>
              <span>Total</span>
              <span>₹{getSubtotal().toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button style={{ width: '100%', marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--text-primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', cursor: 'pointer' }}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
