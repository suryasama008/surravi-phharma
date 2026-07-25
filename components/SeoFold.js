'use client';
import { useState } from 'react';

export default function SeoFold({ icon, title, subtitle, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`seo-fold${open ? ' open' : ''}`}>
      <button
        className="seo-fold-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="seo-fold-toggle-label">
          <span className="seo-fold-icon">{icon}</span>
          <span>
            <span className="seo-fold-title">{title}</span>
            {subtitle && <span className="seo-fold-subtitle">{subtitle}</span>}
          </span>
        </span>
        <span className="seo-fold-chevron">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div className="seo-fold-body">
        <div className="seo-fold-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
