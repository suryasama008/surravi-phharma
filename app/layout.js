import './globals.css';
import { SITE } from '@/lib/config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Pharma, Nutra & Food Raw Materials Hyderabad`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Surravi Phharma - importers and distributors of pharmaceutical, nutraceutical, and food raw materials in Hyderabad. Ready stock. IP/BP/EP/USP grades. Pan India supply.',
  keywords: [
    'pharma raw materials Hyderabad',
    'excipients supplier India',
    'pharmaceutical ingredients Hyderabad',
    'nutraceutical raw materials',
    'API excipients supplier',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Pharma, Nutra & Food Raw Materials Hyderabad`,
    description:
      'Pharmaceutical, nutraceutical, and food raw materials supplier in Hyderabad with ready stock, documentation, and pan India supply.',
    images: [
      {
        url: '/images/banner.webp',
        width: 1600,
        height: 900,
        alt: `${SITE.name} raw materials`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Pharma, Nutra & Food Raw Materials Hyderabad`,
    description:
      'Ready-stock pharma, nutra, and food raw materials from Hyderabad with COA and regulatory documents.',
    images: ['/images/banner.webp'],
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  description: SITE.tagline,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.pin,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '17.3378',
    longitude: '78.5714',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export default function RootLayout({ children }) {
  const hasAnalytics = Boolean(SITE.ga4Id);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: reads localStorage before first paint to prevent theme flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('sp-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
        {/* Schema.org LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />

        {hasAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SITE.ga4Id}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
