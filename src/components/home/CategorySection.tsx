import React from 'react';
import Link from 'next/link';
import { mockCategories } from '../../data/mockData';

export default function CategorySection() {
  return (
    <section className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <h2 className="font-bold text-3xl text-center" style={{ marginBottom: 'var(--space-8)' }}>Shop By Category</h2>
      <div className="grid grid-cols-4" style={{ gap: 'var(--space-6)' }}>
        {mockCategories.map(category => (
          <Link key={category.id} href={`/category/${category.slug}`} className="category-item-card" style={{ display: 'block', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '50%', paddingBottom: '100%', position: 'relative', marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
               <img 
                 src={category.image} 
                 alt={category.title} 
                 className="category-circle-img"
                 style={{ 
                   position: 'absolute', 
                   top: 0, 
                   left: 0, 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   borderRadius: '50%',
                   transition: 'transform 0.3s ease'
                 }} 
               />
            </div>
            <h3 className="font-semibold" style={{ fontSize: 'var(--text-lg)' }}>{category.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

