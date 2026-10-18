import React from 'react';

export default function AnnouncementBar() {
  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--text-inverse)',
      textAlign: 'center',
      padding: 'var(--space-2)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
    }}>
      Free shipping on orders above ₹499 | Shop Now
    </div>
  );
}
