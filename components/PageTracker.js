'use client';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export default function PageTracker({ page, product }) {
  useEffect(() => {
    trackPageView(page, product);
  }, [page, product]);
  return null;
}
