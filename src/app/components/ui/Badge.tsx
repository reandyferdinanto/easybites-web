import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({ children, icon, className = '', ...props }: BadgeProps) {
  return (
    <span 
      className={`d-inline-flex align-items-center gap-2 ${className}`} 
      style={{
        background: 'var(--theme-beige)',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        boxShadow: '4px 4px 8px #d0d0bb, -4px -4px 8px #ffffff',
        color: 'var(--theme-dark-green)',
        fontWeight: 600,
        fontSize: '0.85rem'
      }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
}
