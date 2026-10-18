"use client";
import React from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUIStore } from '../../store/useUIStore';

export default function Header() {
  const cartItems = useCartStore(state => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useWishlistStore(state => state.items);
  const toggleMobileMenu = useUIStore(state => state.toggleMobileMenu);
  const openCart = useCartStore(state => state.openCart);

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="container flex justify-between items-center" style={{ height: 'var(--header-height)' }}>
        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu} style={{ display: 'none' }} id="mobile-menu-btn">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="font-bold text-2xl" style={{ color: 'var(--primary-color)' }}>
          AURA
        </Link>

        {/* Search Bar (Desktop) */}
        <div style={{ flex: 1, maxWidth: '500px', margin: '0 var(--space-8)' }} className="hidden-mobile">
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search for products, categories..." 
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-4)',
                paddingRight: '40px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                outline: 'none'
              }}
            />
            <Search size={20} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/account" aria-label="Account">
            <User size={24} />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" style={{ position: 'relative' }}>
            <Heart size={24} />
            {wishlistItems.length > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                backgroundColor: 'var(--accent-color)', color: '#fff',
                fontSize: '10px', width: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', fontWeight: 'bold'
              }}>
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button onClick={openCart} aria-label="Cart" style={{ position: 'relative' }}>
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-bounce-badge"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--secondary-color, #5c6b61)',
                  color: '#ffffff',
                  fontSize: '10px',
                  minWidth: '19px',
                  height: '19px',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <style>{'\
        @media (max-width: 768px) { \
          .hidden-mobile { display: none; } \
          #mobile-menu-btn { display: block; } \
        } \
      '}</style>
    </header>
  );
}
