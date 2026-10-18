import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'discount' | 'new' | 'bestseller' | 'neutral';
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  let variantStyle: React.CSSProperties = {};
  if (variant === 'discount') {
    variantStyle = { backgroundColor: 'var(--accent-color)', color: '#fff' };
  } else if (variant === 'new') {
    variantStyle = { backgroundColor: 'var(--secondary-color)', color: '#fff' };
  } else if (variant === 'bestseller') {
    variantStyle = { backgroundColor: 'var(--primary-color)', color: 'var(--text-primary)' };
  } else {
    variantStyle = { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' };
  }

  return (
    <span style={{ ...baseStyle, ...variantStyle }}>
      {children}
    </span>
  );
}
