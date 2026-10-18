import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function Rating({ value, count }: { value: number; count?: number }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2" style={{ color: 'var(--warning)', fontSize: 'var(--text-sm)' }}>
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) return <Star key={i} size={16} fill="currentColor" />;
          if (i === fullStars && hasHalfStar) return <StarHalf key={i} size={16} fill="currentColor" />;
          return <Star key={i} size={16} color="var(--border-dark)" />;
        })}
      </div>
      {count !== undefined && (
        <span style={{ color: 'var(--text-light)', marginLeft: 'var(--space-2)' }}>({count})</span>
      )}
    </div>
  );
}
