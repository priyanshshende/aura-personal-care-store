import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-fast)',
    width: fullWidth ? '100%' : 'auto',
    cursor: 'pointer',
    border: '1px solid transparent',
  };

  let variantStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    variantStyle = {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--text-primary)',
      borderColor: 'var(--primary-color)',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--secondary-color)',
    };
  } else if (variant === 'outline') {
    variantStyle = {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-dark)',
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
    };
  }

  let sizeStyle: React.CSSProperties = {};
  if (size === 'sm') {
    sizeStyle = { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' };
  } else if (size === 'md') {
    sizeStyle = { padding: 'var(--space-3) var(--space-6)', fontSize: 'var(--text-base)' };
  } else if (size === 'lg') {
    sizeStyle = { padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--text-lg)' };
  }

  return (
    <button
      style={{ ...baseStyle, ...variantStyle, ...sizeStyle, ...style }}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
