import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sequndang POS — Kasir Digital Lengkap untuk Toko Anda',
  description:
    'Sistem kasir digital untuk toko ritel Indonesia. Multi-kasir, manajemen stok, laporan harian, dan struk thermal. Coba gratis 14 hari, tanpa kartu kredit.',
  keywords: 'kasir digital, POS, point of sale, toko, ritel, Indonesia, kasir online',
  openGraph: {
    title: 'Sequndang POS — Kasir Digital Lengkap',
    description: 'Sistem kasir digital untuk toko ritel Indonesia. Coba gratis 14 hari.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
