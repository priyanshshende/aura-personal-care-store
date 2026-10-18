import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const navItems = [
    { label: 'SHOP', href: '/products' },
    { label: 'BODY CARE', href: '/category/body-care' },
    { label: 'HAIR CARE', href: '/category/hair-care' },
    { label: 'SKIN CARE', href: '/category/skin-care' },
    { label: 'PERFUMES & DEODORANTS', href: '/category/perfumes-deodorants' },
    { label: 'NEW ARRIVALS', href: '/products?filter=new' },
    { label: 'BESTSELLERS', href: '/products?filter=bestseller' },
    { label: 'OFFERS', href: '/products?filter=offers' },
  ];

  return (
    <nav style={{ borderBottom: '1px solid var(--border-color)' }} className="hidden-mobile">
      <div className="container">
        <ul className="flex items-center justify-center gap-6" style={{ padding: 'var(--space-3) 0' }}>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 600, 
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
              }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{'\
        @media (max-width: 768px) { \
          .hidden-mobile { display: none; } \
        } \
      '}</style>
    </nav>
  );
}
