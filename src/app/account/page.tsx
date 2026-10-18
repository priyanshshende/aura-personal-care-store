'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Package,
  HelpCircle,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export default function AccountPage() {
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <main
      className="container animate-fadeIn"
      style={{
        padding: 'var(--space-8) var(--space-4) var(--space-16) var(--space-4)',
        maxWidth: '900px',
      }}
    >
      {/* Account Header */}
      <div style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
        <h1 className="font-bold" style={{ fontSize: '1.85rem', color: 'var(--text-primary)', margin: 0 }}>
          My Account
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Manage your personal care shopping, saved wishlist, and active cart.
        </p>
      </div>

      {/* Guest Profile Summary Card */}
      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--secondary-color, #5c6b61)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '2px solid var(--border-color)',
          }}
        >
          <User size={32} />
        </div>

        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 className="font-bold" style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>
              Welcome to Your Account
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--secondary-color)',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Guest Shopper
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Enjoy instant 1-tap GPS checkout with zero password hassles.
          </p>
        </div>

        <Link href="/products">
          <button
            className="btn-interactive"
            style={{
              padding: '10px 18px',
              backgroundColor: 'var(--text-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </button>
        </Link>
      </section>

      {/* Quick Shortcuts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {/* Wishlist Shortcut */}
        <Link href="/wishlist" style={{ textDecoration: 'none' }}>
          <div
            className="card-hover"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffe4e6',
                color: 'var(--accent-color, #e11d48)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Heart size={22} fill="var(--accent-color, #e11d48)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="font-bold" style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>
                My Wishlist
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                {wishlistItems.length} saved item{wishlistItems.length === 1 ? '' : 's'}
              </p>
            </div>
            <ArrowRight size={16} color="var(--text-light)" />
          </div>
        </Link>

        {/* Cart Shortcut */}
        <Link href="/checkout" style={{ textDecoration: 'none' }}>
          <div
            className="card-hover"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--secondary-color, #5c6b61)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShoppingBag size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="font-bold" style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>
                Active Cart
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                {cartCount} item{cartCount === 1 ? '' : 's'} in cart
              </p>
            </div>
            <ArrowRight size={16} color="var(--text-light)" />
          </div>
        </Link>
      </div>

      {/* How Orders & Delivery Work */}
      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
          <Package size={20} color="var(--secondary-color)" />
          <h2 className="font-bold" style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
            How Orders & Delivery Work
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-color)',
                  color: '#ffffff',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                1
              </span>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Seamless Checkout</h4>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Add personal care products and enter your name and phone number at checkout.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-color)',
                  color: '#ffffff',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                2
              </span>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>1-Tap GPS Location</h4>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Capture your exact GPS coordinates with a single tap for precision doorstep drop.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-color)',
                  color: '#ffffff',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                3
              </span>
              <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Instant Dispatch</h4>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Your order is verified and dispatched directly with instant Google Maps routing.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4) var(--space-6)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <Truck size={16} color="var(--secondary-color)" />
          <span>Free Delivery Above ₹499</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <ShieldCheck size={16} color="var(--secondary-color)" />
          <span>100% Authentic Products</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <MapPin size={16} color="var(--secondary-color)" />
          <span>GPS Pinpoint Accuracy</span>
        </div>
      </div>
    </main>
  );
}
