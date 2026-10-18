"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Zap, Heart, Check, ShieldCheck, Truck, MapPin, Sparkles } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Product } from '../../types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.product_id);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const mrp = Number(product.mrp) || 0;
  const sellingPrice =
    product.selling_price !== undefined && product.selling_price !== null
      ? Number(product.selling_price)
      : mrp;
  const hasDiscount = mrp > sellingPrice;
  const discountAmount = mrp - sellingPrice;
  const discountPercentage = hasDiscount
    ? Math.round((discountAmount / mrp) * 100)
    : product.discount_percentage || 0;

  const handleAddToCart = () => {
    if (!product.in_stock) return;
    addItem({ product, quantity: 1 });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product.in_stock) return;
    setIsBuyingNow(true);
    addItem({ product, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <main className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '1100px' }}>
      <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
        {/* Product Image Gallery Card */}
        <div
          style={{
            position: 'sticky',
            top: 'calc(var(--header-height) + 20px)',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                }}
              />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-light)',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>✨</div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Personal Care Essential</p>
              </div>
            )}

            {/* In-Stock / Discount badge */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {hasDiscount && (
                <span
                  style={{
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button Overlay */}
            <button
              onClick={() => toggleItem(product)}
              aria-label="Add to Wishlist"
              className="btn-interactive"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                cursor: 'pointer',
              }}
            >
              <Heart
                size={20}
                fill={wishlisted ? 'var(--accent-color, #e11d48)' : 'none'}
                color={wishlisted ? 'var(--accent-color, #e11d48)' : 'var(--text-secondary)'}
              />
            </button>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Brand & Category pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                textTransform: 'uppercase',
                color: 'var(--secondary-color)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                fontSize: '11px',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {product.brand}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              • {product.category}
            </span>
          </div>

          <h1
            className="font-bold"
            style={{
              fontSize: '1.75rem',
              lineHeight: 1.25,
              color: 'var(--text-primary)',
            }}
          >
            {product.title}
          </h1>

          {/* Pricing Highlight */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontWeight: 800, fontSize: '2.1rem', color: 'var(--text-primary)' }}>
                ₹{sellingPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span
                  style={{
                    color: 'var(--text-light)',
                    fontSize: '1.1rem',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{mrp.toFixed(2)}
                </span>
              )}
              {hasDiscount && (
                <span
                  style={{
                    color: '#15803d',
                    fontWeight: 700,
                    fontSize: '14px',
                    backgroundColor: '#dcfce7',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  Save ₹{discountAmount.toFixed(2)}
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              Inclusive of all taxes • Instant delivery tracking
            </p>
          </div>

          {/* Stock Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: product.in_stock ? '#16a34a' : '#dc2626',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: product.in_stock ? '#15803d' : '#dc2626',
              }}
            >
              {product.in_stock ? 'In Stock (Ready to dispatch)' : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Action CTAs: Add to Cart + Buy Now */}
          <div style={{ display: 'flex', gap: '12px', marginTop: 'var(--space-2)' }}>
            {/* Add to Cart Button */}
            <button
              id="add-to-cart-btn"
              disabled={!product.in_stock}
              onClick={handleAddToCart}
              className="btn-interactive"
              style={{
                flex: 1,
                padding: '14px 20px',
                backgroundColor: addedAnimation ? '#15803d' : '#ffffff',
                color: addedAnimation ? '#ffffff' : 'var(--text-primary)',
                border: addedAnimation ? '1px solid #15803d' : '2px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {addedAnimation ? (
                <>
                  <Check size={18} className="animate-pop" />
                  <span>Added to Cart ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
                </>
              )}
            </button>

            {/* Buy Now Button */}
            <button
              id="buy-now-btn"
              disabled={!product.in_stock || isBuyingNow}
              onClick={handleBuyNow}
              className="btn-interactive"
              style={{
                flex: 1.2,
                padding: '14px 20px',
                backgroundColor: 'var(--text-primary, #2d2a26)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: product.in_stock ? 'pointer' : 'not-allowed',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Zap size={18} fill="#facc15" color="#facc15" />
              <span>{isBuyingNow ? 'Proceeding to Checkout...' : 'Buy Now'}</span>
            </button>
          </div>

          {/* Value Assurances & Trust Highlights */}
          <div
            style={{
              marginTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-color)',
              paddingTop: 'var(--space-6)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary-color)',
                }}
              >
                <Truck size={18} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>Free Delivery</p>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>On all orders above ₹499</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary-color)',
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>GPS Assisted</p>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Accurate doorstep drop</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary-color)',
                }}
              >
                <ShieldCheck size={18} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>100% Genuine</p>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Authentic personal care</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary-color)',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>Dermatologist Tested</p>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Safe & gentle formulas</p>
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-light)', fontSize: '11px', marginTop: 'var(--space-2)' }}>
            Product Code: {product.product_id}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
        }
      `}</style>
    </main>
  );
}

