# Product Specification Document
# Sequndang Landing Page

> **Version:** 1.0.0  
> **Date:** May 11, 2026  
> **Status:** Active Development  
> **Project:** `sequndang-landing` (Next.js 15, Port 3002)  
> **Target URL:** https://sequndang.com

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [System Architecture](#4-system-architecture)
5. [Page Structure](#5-page-structure)
6. [Component Specifications](#6-component-specifications)
7. [Trial Registration Form](#7-trial-registration-form)
8. [API Contracts](#8-api-contracts)
9. [Data Model](#9-data-model)
10. [Security Requirements](#10-security-requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Tech Stack](#12-tech-stack)
13. [Environment Variables](#13-environment-variables)
14. [Deployment](#14-deployment)
15. [Glossary](#15-glossary)

---

## 1. Product Overview

### 1.1 Background

**Sequndang POS** is a multi-tenant SaaS cashier application for Indonesian retail stores. New store onboarding is currently handled manually by a superadmin via the Sequndang Dashboard — a process that does not scale since prospective users must contact the team directly without a formal channel.

**Sequndang Landing Page** is the public face of the platform: a marketing page that presents the product to potential users, answers common questions, and provides a **self-serve trial registration form** whose submissions flow into the Sequndang Dashboard's Messages queue for superadmin follow-up.

### 1.2 Ecosystem Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                       Sequndang Ecosystem                        │
│                                                                  │
│  ┌──────────────────┐        ┌──────────────────┐               │
│  │  Landing Page    │─POST──▶│  Dashboard API   │               │
│  │  Port 3002       │        │  /api/trial-req  │               │
│  │  Public          │        │  Port 3001       │               │
│  └──────────────────┘        └────────┬─────────┘               │
│                                       │ Save to DB              │
│                                       ▼                         │
│                              ┌────────────────┐                 │
│  ┌──────────────────┐        │  PostgreSQL DB  │                │
│  │  Sequndang POS   │        │  Table:         │                │
│  │  Port 3000       │        │  trial_requests │                │
│  └──────────────────┘        └────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Goals & Success Metrics

| Goal | Success Metric |
|------|----------------|
| Increase trial registrations | ≥ 20 sign-ups/month within first 3 months |
| Clarify value proposition | Bounce rate < 55% on main page |
| Reduce manual onboarding burden | 80% of leads come through form (not WhatsApp/DM) |
| Build trust with prospective users | Average time on page > 2 minutes |

---

## 3. User Personas

| Persona | Needs |
|---------|-------|
| **Small shop / warung owner** | Wants to know if the product fits; easy-to-understand content |
| **Mid-scale store manager** | Needs multi-cashier, reporting, stock control features |
| **Reseller / agent** | Wants to register their clients onto the platform |

---

## 4. System Architecture

### 4.1 Project Structure

```
sequndang-landing/
├── app/
│   ├── page.tsx              ← Main landing page (assembles all sections)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── trial-request/
│           └── route.ts      ← Optional proxy to Dashboard API
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── TrialForm.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── submitTrial.ts        ← POST function to Dashboard API
│   └── validations.ts        ← Zod schemas
├── public/
├── package.json
├── next.config.ts
└── tsconfig.json
```

### 4.2 Rendering Strategy

- **SSR (Server-Side Rendering)** via Next.js App Router for SEO
- Static sections pre-rendered at build time
- Form submission handled client-side with server action / API route proxy

---

## 5. Page Structure

The landing page is **single-page** with anchor-scroll navigation. Section order:

```
┌─────────────────────────────────────────────────────┐
│  [NAVBAR]  Logo  Fitur  FAQ  Kontak  [Daftar Trial] │  ← sticky
├─────────────────────────────────────────────────────┤
│  [HERO]                                             │
│  Headline + Subheadline + CTA buttons               │
│  App screenshot / mockup illustration               │
├─────────────────────────────────────────────────────┤
│  [SOCIAL PROOF]                                     │
│  Animated counters: stores, transactions, uptime    │
├─────────────────────────────────────────────────────┤
│  [FEATURES]                     ← anchor: #fitur    │
│  6-feature grid with icons + descriptions           │
├─────────────────────────────────────────────────────┤
│  [HOW IT WORKS]                                     │
│  3 numbered steps with arrows                       │
├─────────────────────────────────────────────────────┤
│  [PRICING]                                          │
│  Plan cards with "Try Free 14 Days" CTA             │
├─────────────────────────────────────────────────────┤
│  [FAQ]                          ← anchor: #faq      │
│  Accordion: 8–10 common questions                   │
├─────────────────────────────────────────────────────┤
│  [TRIAL FORM]                   ← anchor: #daftar   │
│  Full registration form for new stores              │
├─────────────────────────────────────────────────────┤
│  [CONTACT]                      ← anchor: #kontak   │
│  Email, WhatsApp, operating hours                   │
├─────────────────────────────────────────────────────┤
│  [FOOTER]                                           │
│  Links + copyright                                  │
└─────────────────────────────────────────────────────┘
```

---

## 6. Component Specifications

### 6.1 `Navbar`

| Property | Spec |
|----------|------|
| Logo | Left-aligned, Sequndang brand mark |
| Nav links | Anchor scroll: Fitur (`#fitur`), FAQ (`#faq`), Kontak (`#kontak`), Daftar Trial (`#daftar`) |
| CTA button | "Daftar Trial Gratis" — right side, primary color, scrolls to `#daftar` |
| Behavior | Sticky on scroll |
| Mobile | Hamburger menu with collapsible drawer |

### 6.2 `Hero`

| Property | Spec |
|----------|------|
| Headline | "Kasir Digital Lengkap untuk Toko Anda" |
| Subheadline | 1–2 sentence value proposition |
| Primary CTA | "Coba Gratis 14 Hari" → scroll to `#daftar` |
| Secondary CTA | "Lihat Fitur" → scroll to `#fitur` |
| Visual | Dashboard/POS screenshot or device mockup illustration |

### 6.3 `SocialProof`

Animated number counters:

| Stat | Value |
|------|-------|
| Toko Aktif | 120+ |
| Transaksi Diproses | 50.000+ |
| Kasir Terdaftar | 300+ |
| Uptime | 99.9% |

### 6.4 `Features`

2–3 column grid. Each card: icon + title + short description.

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Transaksi Cepat** | Responsive cashier UI, barcode scan, multi payment (Cash, QRIS, Transfer, Card) |
| 2 | **Manajemen Stok** | Real-time stock monitoring, low-stock alerts, stock adjustment with audit trail |
| 3 | **Laporan & Analitik** | Sales charts, period reports, Excel/CSV export |
| 4 | **Multi-Kasir** | Multiple cashiers per store with controlled access rights |
| 5 | **Daily Closing** | Daily cash reconciliation, shift management, sales summary |
| 6 | **Kelola Pelanggan** | Customer directory, purchase history, promos and vouchers |

### 6.5 `HowItWorks`

Numbered steps with icons and connecting arrows:

1. **Daftar Trial** — Fill the registration form; team processes within 1×24 hours
2. **Setup Toko** — Add products, cashiers, configure tax and receipts
3. **Mulai Berjualan** — Use POS directly from the browser — no installation required

### 6.6 `Pricing`

Two plan cards:

| Plan | Price | Highlights |
|------|-------|------------|
| **Starter** | Rp 99.000/month | Up to 2 cashiers, 500 products |
| **Pro** | Rp 199.000/month | Unlimited cashiers, all features, priority support |

- "Paling Populer" badge on Pro plan
- Each card has a "Coba Gratis 14 Hari" button → scroll to `#daftar`
- Footer note: "Harga belum termasuk PPN 11%"

### 6.7 `FAQ`

Accordion component — minimum 10 questions:

| # | Question |
|---|---------|
| 1 | Apakah Sequndang POS bisa digunakan di handphone? |
| 2 | Berapa lama masa trial gratis? |
| 3 | Apakah data saya aman? |
| 4 | Bisakah saya punya lebih dari satu toko? |
| 5 | Apakah tersedia fitur cetak struk thermal? |
| 6 | Apa yang terjadi setelah masa trial habis? |
| 7 | Apakah ada biaya setup atau instalasi? |
| 8 | Bagaimana cara menambah kasir? |
| 9 | Apakah bisa import data produk dari Excel? |
| 10 | Bagaimana cara menghubungi support? |

### 6.8 `Contact`

| Field | Value |
|-------|-------|
| Email | support@sequndang.com |
| WhatsApp | +62-xxx-xxxx-xxxx (direct link to wa.me) |
| Operating hours | Monday–Saturday, 08:00–17:00 WIB |
| Social media | Instagram, Facebook icons with links |

### 6.9 `Footer`

- Navigation links
- Social media icons
- Copyright notice

---

## 7. Trial Registration Form

### 7.1 Location & Appearance

Section with `id="daftar"`, distinct background (primary color light variant).  
Title: **"Daftar Trial Gratis"**  
Subtitle: *"Tim kami akan menghubungi Anda dalam 1×24 jam kerja."*

### 7.2 Form Fields

| Field | Label | Type | Required | Validation |
|-------|-------|------|----------|------------|
| `storeName` | Nama Toko | text | ✅ | Min 2 chars, max 100 |
| `ownerName` | Nama Pemilik | text | ✅ | Min 2 chars, max 100 |
| `email` | Alamat Email | email | ✅ | Valid email format, lowercase |
| `phone` | Nomor WhatsApp | tel | ✅ | 10–15 digits, starts with `08` or `+62` |
| `businessType` | Jenis Usaha | select | ✅ | See allowed values below |
| `city` | Kota / Kabupaten | text | ✅ | Max 100 chars |
| `employeeCount` | Jumlah Kasir yang Dibutuhkan | select | ✅ | `1` / `2-5` / `6-10` / `>10` |
| `planInterest` | Paket yang Diminati | select | ❌ | `Starter` / `Pro` / `Belum Tahu` |
| `referral` | Dari mana tahu Sequndang? | select | ❌ | `Google` / `Media Sosial` / `Teman` / `Lainnya` |
| `message` | Pesan / Keterangan Tambahan | textarea | ❌ | Max 500 chars |
| `website` | *(hidden honeypot)* | text | — | Must be empty; if filled, silently discard |

**`businessType` options:**
- Warung / Toko Kelontong
- Toko Pakaian / Fashion
- Restoran / Kafe / F&B
- Apotek / Toko Kesehatan
- Toko Elektronik
- Minimarket / Swalayan
- Toko Bangunan / Material
- Lainnya

### 7.3 UX & Behavior

| State | Behavior |
|-------|----------|
| **Default** | All fields visible and editable |
| **Validation** | Real-time onBlur validation; error messages displayed below each field |
| **Loading** | Submit button disabled, shows spinner + "Mengirim..." text |
| **Success** | Form replaced with success message (see below) |
| **Error** | Red toast notification: *"Gagal mengirim. Coba lagi beberapa saat."* |

**Success message:**
```
✅ Pendaftaran berhasil dikirim!
Tim Sequndang akan menghubungi Anda di {email} atau WhatsApp {phone}
dalam 1×24 jam kerja.
```

### 7.4 Anti-Spam

- **Honeypot:** Hidden `website` field — if non-empty, silently discard request
- **Rate limiting:** Max 3 submissions per IP per hour (enforced server-side)
- **reCAPTCHA v3:** Optional; enable if spam volume is high

---

## 8. API Contracts

### 8.1 Submit Trial Registration

**Endpoint (Dashboard):**
```
POST https://dashboard.sequndang.com/api/trial-requests
```

**Authentication:** Public endpoint, authenticated via shared secret header:
```
X-Landing-Key: <LANDING_API_KEY>
```

**Request payload:**
```json
{
  "storeName":     "Toko Maju Jaya",
  "ownerName":     "Budi Santoso",
  "email":         "budi@tokomaju.com",
  "phone":         "081234567890",
  "businessType":  "Warung / Toko Kelontong",
  "city":          "Bandung",
  "employeeCount": "2-5",
  "planInterest":  "Pro",
  "referral":      "Google",
  "message":       "Saya butuh fitur multi kasir dan laporan harian.",
  "submittedAt":   "2026-05-11T09:30:00.000Z",
  "honeypot":      ""
}
```

**Responses:**

| Status | Body |
|--------|------|
| `201 Created` | `{ "success": true, "id": "tr_abc123" }` |
| `400 Bad Request` | `{ "success": false, "error": "Validation failed", "fields": ["email"] }` |
| `401 Unauthorized` | `{ "success": false, "error": "Invalid API key" }` |
| `429 Too Many Requests` | `{ "success": false, "error": "Too many requests. Try again later." }` |

**Server-side validation rules:**

| Field | Rule |
|-------|------|
| `storeName` | required, string, 2–100 chars |
| `ownerName` | required, string, 2–100 chars |
| `email` | required, valid RFC 5322 email |
| `phone` | required, string, 10–15 digits |
| `businessType` | required, must be one of the predefined values |
| `city` | required, string, 2–100 chars |
| `employeeCount` | required, one of: `"1"`, `"2-5"`, `"6-10"`, `">10"` |
| `planInterest` | optional |
| `referral` | optional |
| `message` | optional, max 500 chars |
| `honeypot` | must be empty string |

---

### 8.2 List Trial Requests (Dashboard — superadmin)

```
GET /api/trial-requests?status=new&search=toko&page=1&limit=20
```

**Response:**
```json
{
  "requests": [ ...trial_request objects... ],
  "total": 42,
  "page": 1,
  "pageSize": 20
}
```

### 8.3 Update Trial Request Status (Dashboard — superadmin)

```
PATCH /api/trial-requests/:id
Body: { "status": "processing", "adminNotes": "Called owner, pending setup." }
```

---

## 9. Data Model

### 9.1 `trial_requests` Table (PostgreSQL — Dashboard DB)

```sql
CREATE TABLE trial_requests (
  id              TEXT PRIMARY KEY DEFAULT concat('tr_', nanoid(8)),
  store_name      TEXT NOT NULL,
  owner_name      TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  business_type   TEXT NOT NULL,
  city            TEXT NOT NULL,
  employee_count  TEXT NOT NULL,
  plan_interest   TEXT,
  referral        TEXT,
  message         TEXT,
  status          TEXT NOT NULL DEFAULT 'new',
    -- 'new' | 'processing' | 'done' | 'rejected'
  admin_notes     TEXT,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by      TEXT
);

CREATE INDEX idx_trial_requests_status       ON trial_requests(status);
CREATE INDEX idx_trial_requests_submitted_at ON trial_requests(submitted_at DESC);
```

### 9.2 Status Lifecycle

```
new ──▶ processing ──▶ done
         └──────────▶ rejected
```

---

## 10. Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| HTTPS only | Redirect HTTP → HTTPS; HSTS header |
| API authentication | `X-Landing-Key` shared secret in env var; never committed to source control |
| Input sanitization | Strip HTML tags server-side before DB insert |
| Server-side validation | All fields re-validated on server regardless of client state |
| Honeypot | Hidden `website` field; non-empty = silently discard |
| Rate limiting | 3 submissions per IP per hour |
| CSP header | Content-Security-Policy header configured at edge/server level |
| CSRF protection | `SameSite=Strict` cookie or equivalent on API endpoint |
| Sensitive data | No API keys, secrets, or internal URLs in client-side JS bundle |

---

## 11. Non-Functional Requirements

### 11.1 Performance

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | ≥ 90 |
| First Contentful Paint (FCP) | < 1.5 s |
| Largest Contentful Paint (LCP) | < 2.5 s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total bundle size (gzip) | < 200 KB |

### 11.2 SEO

- `<title>` and `<meta name="description">` per page
- Open Graph tags: `og:title`, `og:description`, `og:image`
- Canonical URL header
- Auto-generated `sitemap.xml`
- `robots.txt`
- Structured data (JSON-LD): `Organization`, `Product`

### 11.3 Accessibility (WCAG 2.1 AA)

- All images have descriptive `alt` text
- Form `<label>` elements linked to inputs via `htmlFor`
- Full keyboard navigation support
- Color contrast ratio ≥ 4.5:1 for all text

### 11.4 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 640px) | Single column; hamburger nav |
| Tablet (640–1024px) | 2-column features grid |
| Desktop (> 1024px) | 3-column features grid; inline nav |

---

## 12. Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | **Next.js 15** (App Router) | Consistent with ecosystem; SSR for SEO |
| Language | **TypeScript** | Type safety across components and API |
| Styling | **Tailwind CSS** | Utility-first; rapid consistent design |
| Animation | **Framer Motion** | Smooth scroll-reveal, counter animations |
| Form | **React Hook Form + Zod** | Robust validation, high performance |
| Icons | **Lucide React** | Consistent with POS & Dashboard |
| Font | **Inter / Plus Jakarta Sans** | Professional, highly readable |
| Deploy | **Vercel / Netlify** | Zero-config, global CDN |
| Port (dev) | **3002** | Avoids conflict with POS (3000) and Dashboard (3001) |

---

## 13. Environment Variables

### Landing Page (`.env.local`)

```env
# Dashboard API base URL
NEXT_PUBLIC_DASHBOARD_API_URL=https://dashboard.sequndang.com

# Shared secret sent in X-Landing-Key header
LANDING_API_KEY=<secret-key-shared-with-dashboard>

# Contact info (used in Contact section and form success message)
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_EMAIL=support@sequndang.com
```

### Dashboard (`.env` — additions)

```env
# Must match LANDING_API_KEY above
LANDING_API_KEY=<secret-key-same-as-landing>
```

> **Security:** Never commit `LANDING_API_KEY` to source control. Use Vercel/Netlify environment variable configuration or a secrets manager.

---

## 14. Deployment

### 14.1 Landing Page

- Deploy to **Vercel** (recommended) or **Netlify**
- Configure `LANDING_API_KEY` and `NEXT_PUBLIC_*` vars in platform dashboard
- Enable automatic HTTPS
- Set up domain: `sequndang.com` (or marketing subdomain)

### 14.2 Dashboard — Required Additions

The following changes must be made to `sequndang-dashboard` as part of this feature:

1. **New page:** `/messages` — list and manage trial requests
2. **New API routes:**
   - `POST /api/trial-requests` (public, protected by `X-Landing-Key`)
   - `GET /api/trial-requests` (authenticated superadmin)
   - `PATCH /api/trial-requests/:id` (authenticated superadmin)
3. **Database migration:** `prisma/migrations/20260511_add_trial_requests/`
4. **Sidebar entry:** "Pesan" with `MessageSquare` icon and unread badge count (number of `status = 'new'` requests)

### 14.3 `/messages` Dashboard Page Features

| Feature | Description |
|---------|-------------|
| Request table | All registrations, newest first |
| Status badges | Color-coded: `Baru` / `Diproses` / `Selesai` / `Ditolak` |
| Filter & search | Filter by status; search by store name, email, or city |
| Detail panel | Click row → full-field detail + additional message |
| Status update | Dropdown to change request status |
| Admin notes | Internal notes field (not visible to registrant) |
| Quick action | "Buat Toko" button → pre-fills store creation form with request data |
| CSV export | Download all requests as CSV |
| Badge count | Sidebar shows count of `Baru` requests |

---

## 15. Glossary

| Term | Definition |
|------|-----------|
| **Trial Request** | Store registration data submitted by a prospective user via the landing page |
| **Honeypot** | Hidden form field used to detect automated bot submissions |
| **Landing API Key** | Secret key authenticating requests from the landing page to the Dashboard API |
| **Plan** | Subscription tier (Starter / Pro) offered on the landing page |
| **Social Proof** | Statistics/numbers demonstrating trust from existing users |
| **CTA** | Call to Action — button or link prompting user action |
| **SSR** | Server-Side Rendering — page rendered on the server for SEO |
| **Superadmin** | The Sequndang platform admin who manages all tenants and reviews the Messages page |
| **Tenant** | An individual store registered on the Sequndang platform |
