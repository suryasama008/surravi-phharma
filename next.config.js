const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracingRoot: path.join(__dirname),

  // Static image files are pre-compressed and served directly by the CDN/host.
  images: {
    unoptimized: true,
  },

  // IMPORTANT: Security headers must be set via middleware or web server
  // This config applies to development; production should use Nginx/Apache/Vercel headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Clickjacking protection
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // XSS Protection (legacy, but good for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer policy: don't leak query params to external sites
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Feature policy: disable unused features
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=()',
          },
          // HSTS: Force HTTPS (adjust max-age carefully)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy: strict XSS & injection protection
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      // Disable caching for API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },

  // Security: Disable powered-by header
  poweredByHeader: false,

  // Security: React strict mode catches bugs
  reactStrictMode: true,
};

module.exports = nextConfig;
