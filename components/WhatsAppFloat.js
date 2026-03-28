'use client';
import { SITE } from '@/lib/config';
import { trackEvent, trackSupabase, GA_EVENTS } from '@/lib/analytics';

export default function WhatsAppFloat() {
  function handleClick() {
    trackEvent(GA_EVENTS.WHATSAPP_CLICK, { location: 'float_button' });
    trackSupabase('whatsapp_click');
  }
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20products.`}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      onClick={handleClick}
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.74L2 30l7.46-1.76A13.93 13.93 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm7.26 19.26c-.3.84-1.76 1.6-2.42 1.7-.62.1-1.4.14-2.26-.14-.52-.18-1.18-.4-2.04-.8-3.58-1.54-5.92-5.16-6.1-5.4-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.62 1.24-2.98a1.32 1.32 0 0 1 .96-.44c.24 0 .48 0 .68.02.22 0 .52-.08.82.62.3.72 1.02 2.48 1.1 2.66.1.18.16.4.04.64-.12.24-.18.38-.36.6-.18.2-.38.46-.54.62-.18.18-.36.38-.16.74.2.36.9 1.48 1.92 2.4 1.32 1.18 2.44 1.54 2.78 1.72.36.18.56.16.76-.1.2-.24.88-1.02 1.12-1.38.22-.34.46-.28.76-.16.3.12 1.9.9 2.22 1.06.34.16.56.24.64.38.08.12.08.72-.22 1.56z"/>
      </svg>
    </a>
  );
}
