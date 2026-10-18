import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', marginTop: 'var(--space-16)', padding: 'var(--space-12) 0' }}>
      <div className="container grid grid-cols-4" style={{ gap: 'var(--space-8)' }}>
        <div>
          <h3 className="font-bold" style={{ marginBottom: 'var(--space-4)' }}>SHOP</h3>
          <ul className="flex-col gap-2">
            <li><Link href="/category/body-care">Body Care</Link></li>
            <li><Link href="/category/hair-care">Hair Care</Link></li>
            <li><Link href="/category/skin-care">Skin Care</Link></li>
            <li><Link href="/category/perfumes-deodorants">Perfumes & Deodorants</Link></li>
            <li><Link href="/products?filter=bestsellers">Bestsellers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold" style={{ marginBottom: 'var(--space-4)' }}>CUSTOMER</h3>
          <ul className="flex-col gap-2">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/track-order">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold" style={{ marginBottom: 'var(--space-4)' }}>ABOUT</h3>
          <ul className="flex-col gap-2">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/story">Our Story</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold" style={{ marginBottom: 'var(--space-4)' }}>NEWSLETTER</h3>
          <p style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email address" style={{ flex: 1, padding: 'var(--space-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }} />
            <button style={{ backgroundColor: 'var(--text-primary)', color: '#fff', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
