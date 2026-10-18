import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container flex items-center" style={{ minHeight: '500px' }}>
        <div style={{ flex: 1, zIndex: 10, padding: 'var(--space-8) 0' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--secondary-color)' }}>New Arrival</span>
          <h1 className="font-bold" style={{ fontSize: 'var(--text-4xl)', lineHeight: 1.2, margin: 'var(--space-4) 0' }}>
            Discover Your<br/>Natural Radiance
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', maxWidth: '400px' }}>
            Elevate your skincare routine with our dermatologist-approved, cruelty-free formulas.
          </p>
          <Link href="/products">
            <button style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-primary)', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-full)', fontWeight: 'bold', fontSize: 'var(--text-lg)' }}>
              Shop Now
            </button>
          </Link>
        </div>
        <div className="hidden-mobile" style={{ flex: 1, position: 'relative', height: '500px' }}>
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', backgroundColor: 'var(--primary-color)', borderRadius: '50%', opacity: 0.2 }}></div>
        </div>
      </div>
    </section>
  );
}
