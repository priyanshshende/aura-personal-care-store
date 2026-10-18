'use client';

import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

export default function OrderSummary() {
  const { items, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalDiscount = items.reduce((acc, item) => {
    const sp = item.product.selling_price ?? item.product.mrp;
    const savings = (item.product.mrp - sp) * item.quantity;
    return acc + (savings > 0 ? savings : 0);
  }, 0);

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const orderTotal = subtotal - totalDiscount + deliveryCharge;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        height: 'fit-content',
        position: 'sticky',
        top: 'calc(var(--header-height) + 20px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <h2
          className="font-bold"
          style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}
        >
          Order Summary
        </h2>
        <span
          style={{
            fontSize: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--secondary-color)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
          }}
        >
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textAlign: 'center', padding: 'var(--space-4) 0' }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          {/* Free Delivery Goal Bar */}
          <div
            style={{
              backgroundColor: deliveryCharge === 0 ? '#f0fdf4' : 'var(--bg-secondary)',
              border: deliveryCharge === 0 ? '1px solid #bbf7d0' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Truck size={15} color={deliveryCharge === 0 ? '#15803d' : 'var(--text-secondary)'} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: deliveryCharge === 0 ? '#15803d' : 'var(--text-primary)' }}>
                {deliveryCharge === 0
                  ? '🎉 You unlocked FREE Delivery!'
                  : `Add ₹${amountNeededForFreeDelivery.toFixed(2)} more for FREE Delivery`}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '5px',
                backgroundColor: 'var(--border-color)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${freeDeliveryProgress}%`,
                  height: '100%',
                  backgroundColor: deliveryCharge === 0 ? '#15803d' : 'var(--secondary-color, #5c6b61)',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          {/* Item list */}
          <div
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: 'var(--space-3)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {items.map((item) => {
              const sp = item.product.selling_price ?? item.product.mrp;
              const lineTotal = sp * item.quantity;
              const imageUrl = item.product.images && item.product.images.length > 0 ? item.product.images[0] : null;

              return (
                <div
                  key={item.product.product_id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '6px 0',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-tertiary)',
                      position: 'relative',
                      flexShrink: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>🌿</span>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 4px',
                        borderTopLeftRadius: '4px',
                      }}
                    >
                      ×{item.quantity}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className="truncate"
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {item.product.title}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                      ₹{sp.toFixed(2)} each
                    </p>
                  </div>

                  <span className="font-semibold" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    ₹{lineTotal.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Price breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-sm)' }}>
            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>Subtotal ({totalItems} items)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>₹{subtotal.toFixed(2)}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex justify-between" style={{ color: '#15803d' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={13} />
                  <span>Savings & Discount</span>
                </span>
                <span style={{ fontWeight: 700 }}>− ₹{totalDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span>Delivery Fee</span>
              {deliveryCharge === 0 ? (
                <span style={{ color: '#15803d', fontWeight: 700 }}>FREE</span>
              ) : (
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>₹{deliveryCharge.toFixed(2)}</span>
              )}
            </div>

            {/* Total Highlight */}
            <div
              className="flex justify-between font-bold"
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: 'var(--space-3)',
                marginTop: 'var(--space-1)',
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
              }}
            >
              <span>Total Payable</span>
              <span style={{ color: 'var(--secondary-color, #5c6b61)' }}>₹{orderTotal.toFixed(2)}</span>
            </div>

            {/* Savings Banner */}
            {totalDiscount > 0 && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 10px',
                  fontSize: '11px',
                  color: '#15803d',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                🎉 You are saving ₹{totalDiscount.toFixed(2)} on this order!
              </div>
            )}

            {/* Trust Assurances */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: 'var(--space-3)',
                marginTop: 'var(--space-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              <ShieldCheck size={14} color="#15803d" />
              <span>100% Verified Safe & Encrypted Checkout</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

