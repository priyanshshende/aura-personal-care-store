"use client";
import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999,
        }} 
        onClick={closeCart}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
        backgroundColor: 'var(--bg-color)', zIndex: 1000, display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)', animation: 'slideRight var(--transition-normal)'
      }}>
        <div className="flex justify-between items-center" style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="font-bold text-lg">Your Cart ({items.length})</h2>
          <button onClick={closeCart}><X size={24} /></button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: 'var(--space-4)' }}>Your cart is empty</p>
              <button className="btn-primary" style={{ padding: 'var(--space-2) var(--space-4)', backgroundColor: 'var(--primary-color)' }} onClick={closeCart}>Continue Shopping</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const imageUrl = item.product.images && item.product.images.length > 0 ? item.product.images[0] : null;
                return (
                  <div key={item.product.product_id} className="flex gap-4" style={{ paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Img</div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="flex justify-between">
                        <h4 className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{item.product.title}</h4>
                        <button onClick={() => removeItem(item.product.product_id)}><Trash2 size={16} color="var(--text-light)" /></button>
                      </div>
                      <div className="flex justify-between items-center" style={{ marginTop: 'var(--space-2)' }}>
                        <div className="flex items-center" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                          <button onClick={() => updateQuantity(item.product.product_id, Math.max(1, item.quantity - 1))} style={{ padding: '4px 8px' }}><Minus size={14} /></button>
                          <span style={{ fontSize: 'var(--text-sm)', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)} style={{ padding: '4px 8px' }}><Plus size={14} /></button>
                        </div>
                        <span className="font-bold">₹{item.product.mrp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex justify-between font-bold" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>
              <span>Subtotal</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <button className="btn-primary" style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--text-primary)', color: '#fff', fontWeight: 'bold' }}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
