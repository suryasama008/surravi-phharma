// Safe GA4 event tracker — works only on client, never throws
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// Also track to our Supabase analytics_events table
export function trackSupabase(type, extra = {}) {
  if (typeof window === 'undefined') return;
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        page: window.location.pathname,
        referrer: document.referrer || null,
        ...extra,
      }),
    }).catch(() => {}); // fire-and-forget, never block UI
  } catch {}
}

// Track page views (call this in a useEffect in layout or pages)
export function trackPageView(page, product) {
  trackSupabase('page_view', { page, product });
}

// Pre-defined events used across the site
export const GA_EVENTS = {
  ENQUIRY_SUBMIT:  'enquiry_submit',
  WHATSAPP_CLICK:  'whatsapp_click',
  CALL_CLICK:      'call_click',
  CATALOGUE_DOWNLOAD: 'catalogue_download',
};
