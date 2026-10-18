import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div 
        style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)'
        }} 
        onClick={onClose}
      />
      <div style={{
        position: 'relative',
        backgroundColor: 'var(--bg-color)',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-md)',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-4)' }}>
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
