// Safe GA4 event tracker — works only on client, never throws
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// Detect traffic source from UTM params or referrer
// Priority: utm_source param > referrer domain > 'direct'
export function detectSource() {
  if (typeof window === 'undefined') return 'direct';
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');

    // Explicit UTM — e.g. ?utm_source=whatsapp
    if (utmSource) {
      return utmMedium ? `${utmSource}/${utmMedium}` : utmSource;
    }

    // Referrer-based detection
    const ref = document.referrer;
    if (!ref) return 'direct';

    const refHost = new URL(ref).hostname.toLowerCase();

    if (refHost.includes('google'))    return 'google';
    if (refHost.includes('bing'))      return 'bing';
    if (refHost.includes('yahoo'))     return 'yahoo';
    if (refHost.includes('facebook') || refHost.includes('fb.com')) return 'facebook';
    if (refHost.includes('instagram')) return 'instagram';
    if (refHost.includes('whatsapp')) return 'whatsapp';
    if (refHost.includes('linkedin')) return 'linkedin';
    if (refHost.includes('twitter') || refHost.includes('t.co')) return 'twitter';
    if (refHost.includes('indiamart')) return 'indiamart';
    if (refHost.includes('tradeindia')) return 'tradeindia';

    // Same site = internal navigation, not a source
    if (refHost.includes(window.location.hostname)) return null;

    return 'referral:' + refHost;
  } catch {
    return 'direct';
  }
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
        source: detectSource(),
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