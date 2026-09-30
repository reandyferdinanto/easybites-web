import React from 'react';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description?: string;
  price?: string;
  layout?: 'horizontal' | 'vertical';
}

export function ImageCard({ imageUrl, title, description, price, layout = 'horizontal', className = '', ...props }: ImageCardProps) {
  if (layout === 'vertical') {
    return (
      <div className={`neumorphic-card d-flex flex-column ${className}`} style={{ padding: '1rem', height: '100%' }} {...props}>
        <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', boxShadow: 'inset 4px 4px 8px #d0d0bb, inset -4px -4px 8px #ffffff' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        <h4 className="fw-bold text-dark-green h6 mb-1">{title}</h4>
        {description && <p className="text-secondary small mb-2 flex-grow-1" style={{ fontSize: '0.85rem' }}>{description}</p>}
        {price && <span className="fw-bold text-dark-green mt-auto">{price}</span>}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={`neumorphic-image-card ${className}`} {...props}>
      <div className="neumorphic-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <h4 className="fw-bold text-dark-green h5 mb-1">{title}</h4>
        {description && <p className="text-secondary small mb-2" style={{ fontSize: '0.85rem' }}>{description}</p>}
        {price && <span className="fw-bold text-dark-green mt-auto">{price}</span>}
      </div>
    </div>
  );
}
