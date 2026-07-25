import { NextResponse } from 'next/server';

// ========== MIDDLEWARE SECURITY CHECKS ==========
export function middleware(request) {
  const response = NextResponse.next();

  // ===== 1. CORS HEADERS =====
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://surraviphharma.com',
    'https://www.surraviphharma.com',
  ];

  // Dev environment
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000', 'http://localhost:3001');
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // ===== 2. SECURITY HEADERS (redundant but important) =====
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');

  // HSTS: Only on HTTPS production
  if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // ===== 3. CONTENT SECURITY POLICY =====
  // Adjust script-src based on your needs; unsafe-inline is needed for Next.js inline scripts
  response.headers.set(
    'Content-Security-Policy',
    process.env.NODE_ENV === 'production'
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com http://localhost:*"
  );

  // ===== 4. REQUEST LOGGING (optional, for analytics/security) =====
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const path = request.nextUrl.pathname;
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`[${timestamp}] ${method} ${path} from ${ip}`);
  }

  // ===== 5. BLOCK SUSPICIOUS REQUESTS =====
  const pathname = request.nextUrl.pathname;
  
  // Block common attack paths
  const blockedPaths = [
    '/wp-admin',
    '/admin',
    '/phpmyadmin',
    '/.env',
    '/.git',
    '/config.php',
    '/web.config',
  ];

  if (blockedPaths.some(p => pathname.startsWith(p))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return response;
}

// Apply middleware to API routes and sensitive paths
export const config = {
  matcher: [
    // API routes
    '/api/:path*',
    // Sensitive pages
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
