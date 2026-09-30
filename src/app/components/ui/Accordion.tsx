'use client';
import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items.length > 0 ? items[0].id : null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className="neumorphic-accordion-item">
          <div 
            className="neumorphic-accordion-header"
            onClick={() => toggle(item.id)}
          >
            <span>{item.title}</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              {openId === item.id ? '−' : '+'}
            </span>
          </div>
          {openId === item.id && (
            <div className="neumorphic-accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
