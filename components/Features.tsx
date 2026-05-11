import { Zap, Package, BarChart3, Users, Clock, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Transaksi Cepat',
    desc: 'Interface kasir responsif dan intuitif. Dukung scan barcode, Cash, QRIS, Transfer Bank, dan Kartu kredit/debit dalam satu tampilan.',
  },
  {
    icon: Package,
    title: 'Manajemen Stok',
    desc: 'Pantau stok real-time, terima notifikasi stok kritis otomatis, dan catat stock adjustment dengan audit trail yang lengkap.',
  },
  {
    icon: BarChart3,
    title: 'Laporan & Analitik',
    desc: 'Grafik penjualan harian dan bulanan, laporan per periode, serta ekspor data ke Excel atau CSV dengan mudah.',
  },
  {
    icon: Users,
    title: 'Multi-Kasir',
    desc: 'Kelola beberapa akun kasir dalam satu toko dengan kontrol akses berbasis peran — kasir, manajer, dan pemilik.',
  },
  {
    icon: Clock,
    title: 'Daily Closing',
    desc: 'Rekonsiliasi kas harian yang mudah, manajemen shift kasir, dan ringkasan penjualan otomatis setiap akhir hari.',
  },
  {
    icon: Heart,
    title: 'Kelola Pelanggan',
    desc: 'Simpan direktori pelanggan, lacak riwayat belanja, dan tawarkan promo serta voucher eksklusif untuk pelanggan setia.',
  },
];

export default function Features() {
  return (
    <section id="fitur" className="features">
      <div className="container">
        <div className="section-center">
          <div className="section-label">Fitur Unggulan</div>
          <h2 className="section-title">
            Semua yang Anda Butuhkan
            <br />
            dalam Satu Platform
          </h2>
          <p className="section-desc">
            Dari kasir hingga laporan keuangan — Sequndang POS mengelola semua aspek bisnis
            toko Anda secara efisien dan terpadu.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
