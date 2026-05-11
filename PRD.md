# Product Requirements Document (PRD)
# Sequndang Landing Page — Public Marketing & Trial Registration

> **Versi:** 1.0.0
> **Tanggal:** 11 Mei 2026
> **Status:** Draft
> **Tim:** Engineering & Product
> **Project:** sequndang-landing (Next.js, standalone)
> **URL Target:** https://sequndang.com (atau subdomain marketing)

---

## Daftar Isi

1. [Overview](#1-overview)
2. [Tujuan & Sasaran](#2-tujuan--sasaran)
3. [Struktur Halaman](#3-struktur-halaman)
4. [Fitur Detail](#4-fitur-detail)
5. [Form Pendaftaran Trial](#5-form-pendaftaran-trial)
6. [Alur Data ke Dashboard](#6-alur-data-ke-dashboard)
7. [Halaman Pesan di Dashboard](#7-halaman-pesan-di-dashboard)
8. [API Specification](#8-api-specification)
9. [Tech Stack](#9-tech-stack)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Deployment](#11-deployment)
12. [Glossary](#12-glossary)

---

## 1. Overview

### 1.1 Latar Belakang

**Sequndang POS** adalah aplikasi kasir SaaS multi-tenant untuk toko ritel Indonesia. Saat ini onboarding toko baru dilakukan secara manual oleh superadmin melalui Sequndang Dashboard. Proses ini tidak skalabel karena calon pengguna harus menghubungi tim secara langsung tanpa saluran formal.

**Sequndang Landing Page** hadir sebagai wajah publik platform — halaman marketing yang mempresentasikan produk kepada calon pengguna, menjawab pertanyaan umum, dan menyediakan **form pendaftaran trial mandiri** yang hasilnya masuk ke antrian pesan di Sequndang Dashboard untuk ditindaklanjuti superadmin.

### 1.2 Hubungan dengan Ekosistem

```
┌─────────────────────────────────────────────────────────────────┐
│                      Ekosistem Sequndang                         │
│                                                                  │
│  ┌──────────────────┐        ┌──────────────────┐               │
│  │  Landing Page    │─POST──▶│  Dashboard API   │               │
│  │  (Port / CDN)    │        │  /api/trial-req  │               │
│  │  Publik          │        │  (Port 3001)     │               │
│  └──────────────────┘        └────────┬─────────┘               │
│                                       │ Simpan ke DB            │
│                                       ▼                         │
│                              ┌────────────────┐                 │
│  ┌──────────────────┐        │  PostgreSQL DB  │                │
│  │  Sequndang POS   │        │  Tabel:         │                │
│  │  (Port 3000)     │        │  trial_requests │                │
│  └──────────────────┘        └────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Tujuan & Sasaran

### 2.1 Tujuan Bisnis

| Tujuan | Metrik Sukses |
|--------|---------------|
| Meningkatkan jumlah pendaftar trial | ≥ 20 pendaftaran/bulan dalam 3 bulan pertama |
| Memperjelas value proposition produk | Bounce rate halaman utama < 55% |
| Mengurangi beban onboarding manual | 80% lead masuk melalui form, bukan WhatsApp/DM |
| Membangun kepercayaan calon pengguna | Waktu rata-rata di halaman > 2 menit |

### 2.2 Target Pengguna Landing Page

| Persona | Kebutuhan |
|---------|-----------|
| **Pemilik warung / toko kecil** | Ingin tahu apakah produk cocok, mudah dipahami |
| **Manajer toko skala menengah** | Butuh fitur multi-kasir, laporan, kontrol stok |
| **Reseller / agen** | Ingin mendaftarkan klien mereka ke platform |

---

## 3. Struktur Halaman

Halaman landing bersifat **single-page** dengan navigasi anchor scroll. Urutan section:

```
┌─────────────────────────────────────────────────────┐
│  [NAVBAR]  Logo  Fitur  FAQ  Kontak  [Daftar Trial] │
├─────────────────────────────────────────────────────┤
│  [HERO]                                             │
│  Headline + Subheadline + CTA button                │
│  Screenshot / mockup aplikasi POS                   │
├─────────────────────────────────────────────────────┤
│  [SOCIAL PROOF]                                     │
│  Jumlah toko terdaftar, transaksi diproses, dll.    │
├─────────────────────────────────────────────────────┤
│  [FITUR UTAMA]                  ← anchor: #fitur    │
│  Grid 6 fitur unggulan dengan ikon + deskripsi      │
├─────────────────────────────────────────────────────┤
│  [CARA KERJA]                                       │
│  3 langkah: Daftar → Setup → Mulai Berjualan        │
├─────────────────────────────────────────────────────┤
│  [PAKET & HARGA]                                    │
│  Kartu plan dengan highlight "Coba Gratis 14 Hari"  │
├─────────────────────────────────────────────────────┤
│  [FAQ]                          ← anchor: #faq      │
│  Accordion 8–10 pertanyaan umum                     │
├─────────────────────────────────────────────────────┤
│  [FORM DAFTAR TRIAL]            ← anchor: #daftar   │
│  Form lengkap pendaftaran toko baru                 │
├─────────────────────────────────────────────────────┤
│  [KONTAK]                       ← anchor: #kontak   │
│  Email, WhatsApp, alamat                            │
├─────────────────────────────────────────────────────┤
│  [FOOTER]                                           │
│  Links + copyright                                  │
└─────────────────────────────────────────────────────┘
```

---

## 4. Fitur Detail

### 4.1 Navbar

- Logo Sequndang (kiri)
- Menu navigasi anchor: Fitur, FAQ, Kontak, Daftar Trial
- Tombol CTA "Daftar Trial Gratis" (kanan, primary color)
- Sticky saat scroll
- Mobile: hamburger menu collapsible

### 4.2 Hero Section

- **Headline:** "Kasir Digital Lengkap untuk Toko Anda"
- **Subheadline:** Penjelasan singkat 1–2 kalimat tentang value proposition
- **CTA Utama:** Tombol "Coba Gratis 14 Hari" → scroll ke #daftar
- **CTA Sekunder:** "Lihat Fitur" → scroll ke #fitur
- **Visual:** Screenshot dashboard/POS atau ilustrasi mockup perangkat

### 4.3 Social Proof Bar

Ditampilkan sebagai angka animasi counter:

| Stat | Contoh Nilai |
|------|-------------|
| Toko Aktif | 120+ |
| Transaksi Diproses | 50.000+ |
| Kasir Terdaftar | 300+ |
| Uptime | 99.9% |

### 4.4 Fitur Utama

Grid 2–3 kolom, masing-masing item berisi ikon, judul, dan deskripsi singkat:

| # | Fitur | Deskripsi |
|---|-------|-----------|
| 1 | **Transaksi Cepat** | Interface kasir responsif, scan barcode, multi metode bayar (Cash, QRIS, Transfer, Kartu) |
| 2 | **Manajemen Stok** | Pantau stok real-time, alert stok kritis, stock adjustment dengan audit trail |
| 3 | **Laporan & Analitik** | Grafik penjualan, laporan per periode, export Excel/CSV |
| 4 | **Multi-Kasir** | Beberapa kasir dalam satu toko dengan hak akses terkontrol |
| 5 | **Daily Closing** | Rekonsiliasi kas harian, manajemen shift, ringkasan penjualan |
| 6 | **Kelola Pelanggan** | Direktori pelanggan, riwayat belanja, promo dan voucher |

### 4.5 Cara Kerja

Tampilkan 3 langkah dengan ikon bernomor dan panah:

1. **Daftar Trial** — Isi form pendaftaran, tim kami memproses dalam 1×24 jam
2. **Setup Toko** — Input produk, tambahkan kasir, konfigurasi pajak dan struk
3. **Mulai Berjualan** — Langsung gunakan POS dari browser, tanpa install apapun

### 4.6 Paket & Harga

Tampilkan minimal 2 kartu paket (data aktual dari `platform_config` di Dashboard):

| Plan | Harga | Highlight |
|------|-------|-----------|
| **Starter** | Rp 99.000/bulan | Hingga 2 kasir, 500 produk |
| **Pro** | Rp 199.000/bulan | Kasir tidak terbatas, semua fitur, prioritas support |

- Badge "Paling Populer" pada plan Pro
- Tombol "Coba Gratis 14 Hari" pada setiap kartu → scroll ke #daftar
- Catatan: "Harga belum termasuk PPN 11%"

### 4.7 FAQ

Komponen accordion, minimal 8 pertanyaan:

| # | Pertanyaan |
|---|-----------|
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

### 4.8 Informasi Kontak

- **Email:** support@sequndang.com
- **WhatsApp:** +62-xxx-xxxx-xxxx (tombol langsung ke wa.me)
- **Jam Operasional:** Senin–Sabtu, 08.00–17.00 WIB
- **Alamat:** (opsional, jika ada kantor fisik)
- Ikon sosial media: Instagram, Facebook

---

## 5. Form Pendaftaran Trial

### 5.1 Lokasi & Tampilan

Section dengan ID `#daftar`, latar berbeda (warna primer light), judul "Daftar Trial Gratis", subjudul "Tim kami akan menghubungi Anda dalam 1×24 jam kerja."

### 5.2 Field Form

| Field | Label | Tipe | Wajib | Validasi |
|-------|-------|------|-------|----------|
| `storeName` | Nama Toko | text | ✅ | Min 2 karakter, max 100 |
| `ownerName` | Nama Pemilik | text | ✅ | Min 2 karakter, max 100 |
| `email` | Alamat Email | email | ✅ | Format email valid, lowercase |
| `phone` | Nomor WhatsApp | tel | ✅ | 10–15 digit, diawali 08 atau +62 |
| `businessType` | Jenis Usaha | select | ✅ | Pilihan dropdown (lihat di bawah) |
| `city` | Kota / Kabupaten | text | ✅ | Max 100 karakter |
| `employeeCount` | Jumlah Kasir yang Dibutuhkan | select | ✅ | 1 / 2–5 / 6–10 / > 10 |
| `planInterest` | Paket yang Diminati | select | ❌ | Starter / Pro / Belum Tahu |
| `referral` | Dari mana tahu Sequndang? | select | ❌ | Google / Media Sosial / Teman / Lainnya |
| `message` | Pesan / Keterangan Tambahan | textarea | ❌ | Max 500 karakter, placeholder: "Ceritakan kebutuhan toko Anda..." |

**Opsi `businessType`:**
- Warung / Toko Kelontong
- Toko Pakaian / Fashion
- Restoran / Kafe / F&B
- Apotek / Toko Kesehatan
- Toko Elektronik
- Minimarket / Swalayan
- Toko Bangunan / Material
- Lainnya

### 5.3 UX & Behavior Form

- Validasi real-time (onBlur) dengan pesan error di bawah field
- Tombol submit: "Kirim Pendaftaran" — disabled saat loading
- Loading state: spinner + teks "Mengirim..."
- **Success state:** Ganti form dengan pesan sukses:
  > ✅ **Pendaftaran berhasil dikirim!**
  > Tim Sequndang akan menghubungi Anda di **{email}** atau WhatsApp **{phone}** dalam 1×24 jam kerja.
- **Error state:** Toast notifikasi merah — "Gagal mengirim. Coba lagi beberapa saat."
- Honeypot field tersembunyi untuk anti-spam bot
- Rate limiting: maks 3 submission dari IP yang sama per jam

### 5.4 Keamanan Form

- CSRF token (atau `samesite=strict` cookie pada endpoint)
- Sanitasi input server-side (strip HTML tags)
- Validasi ulang semua field di sisi server (tidak hanya client)
- Honeypot field: field tersembunyi `website` yang harus kosong — jika terisi, request dibuang tanpa error
- reCAPTCHA v3 (opsional, pertimbangkan jika spam tinggi)

---

## 6. Alur Data ke Dashboard

### 6.1 Flow Diagram

```
User isi form           Landing Page           Dashboard API          Database
     │                       │                      │                    │
     │──Submit form──────────▶│                      │                    │
     │                       │──POST /api/trial-req─▶│                    │
     │                       │   (JSON payload)      │──INSERT─────────── ▶│
     │                       │                      │   trial_requests    │
     │                       │◀─────────────────────│   {id, status,      │
     │                       │   201 Created         │    createdAt}       │
     │◀──Success message──────│                      │                    │
     │                       │                      │                    │
                                                  Superadmin buka
                                                  halaman Pesan di
                                                  Dashboard → lihat
                                                  request baru
```

### 6.2 Endpoint Target

**Dashboard API:**
```
POST https://dashboard.sequndang.com/api/trial-requests
```

Request tidak memerlukan autentikasi (public endpoint), namun dilindungi:
- API key rahasia di header `X-Landing-Key` (dikonfigurasi sebagai env var di landing page)
- Rate limiting per IP
- Honeypot validation

### 6.3 Request Payload

```json
{
  "storeName":      "Toko Maju Jaya",
  "ownerName":      "Budi Santoso",
  "email":          "budi@tokomaju.com",
  "phone":          "081234567890",
  "businessType":   "Warung / Toko Kelontong",
  "city":           "Bandung",
  "employeeCount":  "2-5",
  "planInterest":   "Pro",
  "referral":       "Google",
  "message":        "Saya butuh fitur multi kasir dan laporan harian.",
  "submittedAt":    "2026-05-11T09:30:00.000Z",
  "honeypot":       ""
}
```

### 6.4 Response

```json
// 201 Created
{ "success": true, "id": "tr_abc123" }

// 400 Bad Request (validasi gagal)
{ "success": false, "error": "Validation failed", "fields": ["email", "phone"] }

// 429 Too Many Requests
{ "success": false, "error": "Too many requests. Try again later." }
```

---

## 7. Halaman Pesan di Dashboard

### 7.1 Lokasi

Halaman baru di Sequndang Dashboard (`sequndang-dashboard`):
```
/messages
```
Ditambahkan ke sidebar Dashboard dengan ikon MessageSquare (lucide-react).

### 7.2 Fitur Halaman Pesan

| Fitur | Deskripsi |
|-------|-----------|
| **Daftar request** | Tabel semua pendaftaran trial, terbaru di atas |
| **Status tracking** | Badge status: `Baru` / `Diproses` / `Selesai` / `Ditolak` |
| **Filter & Search** | Filter by status, search by nama toko / email / kota |
| **Detail view** | Klik baris → panel detail semua field + pesan tambahan |
| **Ubah status** | Dropdown untuk update status request |
| **Catatan internal** | Field catatan admin (tidak terlihat pendaftar) |
| **Aksi cepat** | Tombol "Buat Toko" → pre-fill form store creation dengan data request |
| **Export** | Download CSV semua request |
| **Badge count** | Sidebar menampilkan jumlah request berstatus `Baru` |

### 7.3 Kolom Tabel

| Kolom | Isi |
|-------|-----|
| Tanggal | Waktu submit (format: 11 Mei 2026, 09:30) |
| Nama Toko | `storeName` |
| Pemilik | `ownerName` |
| Kontak | Email + WhatsApp (dengan link) |
| Kota | `city` |
| Jenis Usaha | `businessType` |
| Paket | `planInterest` |
| Status | Badge berwarna |
| Aksi | Tombol "Detail" |

### 7.4 Database Schema — Tabel Baru

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
    -- values: 'new' | 'processing' | 'done' | 'rejected'
  admin_notes     TEXT,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by      TEXT
);

CREATE INDEX idx_trial_requests_status ON trial_requests(status);
CREATE INDEX idx_trial_requests_submitted_at ON trial_requests(submitted_at DESC);
```

---

## 8. API Specification

### 8.1 Landing → Dashboard

#### `POST /api/trial-requests` (Dashboard)

**Headers:**
```
Content-Type: application/json
X-Landing-Key: <LANDING_API_KEY>   ← env var di landing page
```

**Validasi server-side:**
- `storeName`: required, 2–100 char, string
- `ownerName`: required, 2–100 char, string
- `email`: required, valid email format
- `phone`: required, 10–15 digit, string
- `businessType`: required, must be one of allowed values
- `city`: required, 2–100 char
- `employeeCount`: required, must be one of: "1", "2-5", "6-10", ">10"
- `planInterest`: optional
- `referral`: optional
- `message`: optional, max 500 char
- `honeypot`: must be empty string

#### `GET /api/trial-requests` (Dashboard — authenticated superadmin)

Query params: `status`, `search`, `page`, `limit`

Response:
```json
{
  "requests": [...],
  "total": 42,
  "page": 1,
  "pageSize": 20
}
```

#### `PATCH /api/trial-requests/:id` (Dashboard — authenticated superadmin)

Body: `{ "status": "processing", "adminNotes": "..." }`

---

## 9. Tech Stack

### 9.1 Landing Page (`sequndang-landing`)

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Framework | **Next.js 16** (App Router) | Konsisten dengan ekosistem, SSR untuk SEO |
| Styling | **Tailwind CSS** | Utility-first, konsistensi desain cepat |
| Animasi | **Framer Motion** | Smooth scroll reveal, counter animation |
| Form | **React Hook Form + Zod** | Validasi robust, performa tinggi |
| Icons | **Lucide React** | Konsisten dengan POS & Dashboard |
| Font | **Inter / Plus Jakarta Sans** | Profesional, readable |
| Deploy | **Vercel / Netlify** | Zero-config, CDN global |

### 9.2 Tambahan di Dashboard (`sequndang-dashboard`)

- Halaman `/messages` (baru)
- API route `POST /api/trial-requests` (public)
- API route `GET /api/trial-requests` (authenticated)
- API route `PATCH /api/trial-requests/:id` (authenticated)
- Tabel `trial_requests` di PostgreSQL (migration baru)
- Sidebar entry "Pesan" dengan badge count

---

## 10. Non-Functional Requirements

### 10.1 Performa

| Metrik | Target |
|--------|--------|
| Lighthouse Performance Score | ≥ 90 |
| First Contentful Paint (FCP) | < 1.5 detik |
| Largest Contentful Paint (LCP) | < 2.5 detik |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total bundle size | < 200 KB (gzip) |

### 10.2 SEO

- Meta title & description per halaman
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- Sitemap.xml otomatis
- robots.txt
- Structured data (JSON-LD: Organization, Product)

### 10.3 Aksesibilitas

- WCAG 2.1 Level AA
- Semua gambar punya `alt` text
- Form labels terhubung ke input (`htmlFor`)
- Keyboard navigation penuh
- Contrast ratio minimal 4.5:1

### 10.4 Responsivitas

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 640px) | Single column, hamburger nav |
| Tablet (640–1024px) | 2 kolom grid fitur |
| Desktop (> 1024px) | 3 kolom grid fitur, sidebar nav |

### 10.5 Keamanan

- HTTPS wajib (redirect HTTP → HTTPS)
- CSP header (Content Security Policy)
- Rate limiting pada form submission (3 req/jam per IP)
- API key `X-Landing-Key` disimpan sebagai env var, tidak di-commit
- Input sanitization server-side
- No sensitive data di client bundle

---

## 11. Deployment

### 11.1 Struktur Repository

```
sequndang-landing/          ← project baru (Next.js)
  app/
    page.tsx                ← landing page utama
    layout.tsx
    globals.css
    api/
      trial-request/
        route.ts            ← proxy ke Dashboard API (opsional)
  components/
    Navbar.tsx
    Hero.tsx
    Features.tsx
    HowItWorks.tsx
    Pricing.tsx
    FAQ.tsx
    TrialForm.tsx
    Contact.tsx
    Footer.tsx
  lib/
    submitTrial.ts          ← fungsi POST ke Dashboard
    validations.ts          ← Zod schemas
```

### 11.2 Environment Variables (Landing Page)

```env
NEXT_PUBLIC_DASHBOARD_API_URL=https://dashboard.sequndang.com
LANDING_API_KEY=<secret-key-shared-with-dashboard>
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_EMAIL=support@sequndang.com
```

### 11.3 Environment Variables (Dashboard — tambahan)

```env
LANDING_API_KEY=<secret-key-same-as-landing>
```

### 11.4 Prisma Migration (Dashboard)

```
prisma/migrations/
  20260511_add_trial_requests/
    migration.sql
```

---

## 12. Glossary

| Istilah | Definisi |
|---------|----------|
| **Trial Request** | Data pendaftaran toko baru dari calon pengguna melalui landing page |
| **Honeypot** | Field form tersembunyi untuk mendeteksi bot otomatis |
| **Landing API Key** | Secret key untuk mengautentikasi request dari landing page ke Dashboard API |
| **Plan** | Paket langganan (Starter / Pro) yang ditawarkan di landing page |
| **Social Proof** | Statistik/angka yang menunjukkan kepercayaan pengguna existing |
| **CTA** | Call to Action — tombol atau link yang mendorong tindakan pengguna |
| **SSR** | Server-Side Rendering — halaman di-render di server untuk SEO |
| **Superadmin** | Admin platform Sequndang yang mengelola semua tenant dan melihat halaman Pesan |
