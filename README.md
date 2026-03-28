# Surravi Phharma — Next.js Website

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build (pages render instantly after this)
npm start          # Run production build locally
```

---

## ⚠️ IMPORTANT: Fix Firestore Before Enquiry Form Works

The enquiry form will return a **PERMISSION_DENIED** error until you deploy the security rules.

**Steps (takes 2 minutes):**
1. Go to [Firebase Console](https://console.firebase.google.com) → your project `surravi-phharma-ef57f`
2. Left sidebar → **Firestore Database**
3. Click the **Rules** tab
4. Delete everything in the editor
5. Paste the contents of `firestore.rules` (from this project)
6. Click **Publish**

Done — the enquiry form will work immediately.

---

## Why is the site slow in `npm run dev`?

**This is normal and expected in development mode.**

In `npm run dev`, Next.js compiles each page on-demand the first time you visit it. That's why `/products` takes 6 seconds the first time — it's compiling. Subsequent visits are fast.

**In production (`npm run build && npm start` or Vercel deploy):**
- All 99 product pages are pre-rendered at build time (SSG)
- Every page serves in under 100ms
- No compilation happens at runtime

The site IS SSG + ISR. It's only slow in dev mode.

---

## Project Structure

```
sp-next/
├── app/
│   ├── layout.js                        # Root layout — GA4, Schema.org
│   ├── page.js                          # Home page
│   ├── globals.css                      # All styles (light + dark theme)
│   ├── sitemap.js                       # Auto sitemap.xml
│   ├── robots.js                        # robots.txt
│   ├── api/enquiry/route.js             # POST → Firestore
│   └── products/
│       ├── page.js                      # All 99 products
│       ├── [category]/page.js           # Category listing (SSG)
│       └── [category]/[slug]/page.js    # Product detail (SSG + ISR)
├── components/
│   ├── Nav.js                           # Sticky nav + dark mode toggle
│   ├── Footer.js
│   ├── EnquiryForm.js                   # → /api/enquiry → Firestore
│   └── WhatsAppFloat.js
├── lib/
│   ├── config.js                        # ← Edit contact info & GA4 ID here
│   ├── products.js                      # Data helpers
│   ├── firebase.js                      # Firestore init
│   └── analytics.js                    # GA4 event tracker
├── data/
│   └── products.json                   # All 99 products (add more here)
├── firestore.rules                      # Deploy this in Firebase Console
└── .env.local                           # Your credentials
```

---

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
gh repo create surravi-phharma --private --push --source=.

# 2. Go to vercel.com → New Project → import the repo

# 3. Add Environment Variables from .env.local in Vercel dashboard

# 4. Deploy → done. All pages load instantly.
```

**Custom domain:** Vercel → Domains → Add `surraviphharma.com` → add CNAME `cname.vercel-dns.com` in your DNS.

---

## After Going Live

1. **Firestore rules** — Deploy `firestore.rules` as above (required)
2. **Google Search Console** — Add property, submit `https://surraviphharma.com/sitemap.xml`
3. **GA4** — Verify data flowing at analytics.google.com

---

## Adding More Products

Open `data/products.json`, add a new object:

```json
{
  "slug": "product-slug",
  "name": "Product Name",
  "category": "excipients",
  "categoryLabel": "Excipients",
  "grades": ["IP", "BP", "USP"],
  "readyStock": true,
  "cas": "000-00-0",
  "appearance": "White powder",
  "packaging": "25 kg HDPE bags",
  "metaTitle": "Buy Product Name IP/BP Hyderabad | Surravi Phharma",
  "metaDescription": "Under 160 chars...",
  "h1": "Product Name — Pharma Grade Supplier, Hyderabad",
  "overview": "2-3 sentences...",
  "specs": { "CAS Number": "000-00-0" },
  "applications": ["App 1", "App 2"],
  "relatedSlugs": ["other-slug"]
}
```

Categories: `empty-capsules` `excipients` `vitamins` `colours` `phosphates` `oils-butters` `amino-acids` `food-nutra` `flavours`
