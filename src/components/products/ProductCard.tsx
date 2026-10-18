"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import Badge from '../ui/Badge';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.product_id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.in_stock) return;
    addItem({ product, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
  const mrp = Number(product.mrp) || 0;
  const sellingPrice =
    product.selling_price !== undefined && product.selling_price !== null
      ? Number(product.selling_price)
      : mrp;
  const hasDiscount = mrp > sellingPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : product.discount_percentage || 0;

  return (
    <div
      className="card-hover"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Link href={`/product/${product.product_id}`} style={{ display: 'block', textDecoration: 'none' }}>
        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {!product.in_stock ? (
            <Badge variant="neutral">Out of Stock</Badge>
          ) : hasDiscount ? (
            <span
              style={{
                backgroundColor: '#15803d',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {discountPercentage}% OFF
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Wishlist"
          className="btn-interactive"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            padding: '7px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart
            size={18}
            fill={wishlisted ? 'var(--accent-color, #e11d48)' : 'none'}
            color={wishlisted ? 'var(--accent-color, #e11d48)' : 'var(--text-light)'}
          />
        </button>

        {/* Image Container */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            paddingTop: '100%',
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
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
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-light)',
                fontSize: '12px',
              }}
            >
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: 'var(--space-3) 0 0 0' }}>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--secondary-color)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {product.brand}
          </p>
          <h3
            className="font-semibold truncate"
            style={{
              fontSize: 'var(--text-sm)',
              margin: '2px 0 6px 0',
              color: 'var(--text-primary)',
            }}
          >
            {product.title}
          </h3>

          <div className="flex items-center gap-2" style={{ marginTop: '4px' }}>
            <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              ₹{sellingPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span style={{ color: 'var(--text-light)', fontSize: '12px', textDecoration: 'line-through' }}>
                ₹{mrp.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add To Cart CTA */}
      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock}
        className="btn-interactive"
        style={{
          width: '100%',
          marginTop: 'var(--space-3)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          border: added ? '1px solid #15803d' : '1px solid var(--border-dark)',
          backgroundColor: added ? '#15803d' : product.in_stock ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
          color: added ? '#ffffff' : 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          cursor: product.in_stock ? 'pointer' : 'not-allowed',
        }}
      >
        {added ? (
          <>
            <Check size={15} className="animate-pop" /> Added ✓
          </>
        ) : (
          <>
            <ShoppingBag size={15} /> {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </>
        )}
      </button>
    </div>
  );
}

