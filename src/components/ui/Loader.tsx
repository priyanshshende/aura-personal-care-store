import React from 'react';

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center" style={{ padding: 'var(--space-8)' }}>
      <div 
        style={{
          width: size,
          height: size,
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}
