import { Check, Sparkles } from 'lucide-react';

interface Plan {
  key: string;
  name: string;
  price: string | null; // null = gratis
  durationDays: number;
  tagline: string;
  desc: string;
  features: string[];
  popular: boolean;
  badge?: string;
  badgeColor?: string;
}

const plans: Plan[] = [
  {
    key: 'trial',
    name: 'Trial',
    price: null,
    durationDays: 14,
    tagline: 'Coba Dulu, Gratis',
    desc: 'Akses semua fitur selama 14 hari tanpa perlu kartu kredit.',
    features: [
      'Semua fitur lengkap selama 14 hari',
      'Manajemen produk & stok',
      'Transaksi & laporan harian',
      'Cetak struk thermal',
      'Support via email',
    ],
    popular: false,
    badge: '14 hari',
    badgeColor: '#F59E0B',
  },
  {
    key: 'basic',
    name: 'Basic',
    price: '150.000',
    durationDays: 30,
    tagline: 'Untuk UMKM Kecil',
    desc: 'Solusi kasir digital untuk toko kecil dengan 1 kasir aktif.',
    features: [
      '1 akun kasir aktif',
      'Hingga 500 produk',
      'Transaksi tidak terbatas',
      'Laporan harian & bulanan',
      'Manajemen stok & notifikasi kritis',
      'Cetak struk thermal',
      'Support via email',
    ],
    popular: false,
    badge: '/bulan',
    badgeColor: '#3B82F6',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '350.000',
    durationDays: 30,
    tagline: 'Fitur Lengkap',
    desc: 'Multi-kasir, analitik lanjutan, dan prioritas layanan untuk toko berkembang.',
    features: [
      'Kasir tidak terbatas',
      'Produk tidak terbatas',
      'Semua fitur Basic',
      'Manajemen pelanggan & promo',
      'Analitik lanjutan & ekspor Excel',
      'Daily Closing & manajemen shift',
      'Import produk via Excel',
      'Prioritas support (WA & email)',
    ],
    popular: true,
    badge: '/bulan',
    badgeColor: '#4F46E5',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: '1.000.000',
    durationDays: 30,
    tagline: 'Skala Besar',
    desc: 'Tanpa batas kasir, prioritas support, dan fitur khusus untuk bisnis besar.',
    features: [
      'Semua fitur Pro',
      'Kasir & toko tidak terbatas',
      'SLA prioritas tinggi',
      'Onboarding & pelatihan langsung',
      'Integrasi & konfigurasi khusus',
      'Account manager dedicated',
    ],
    popular: false,
    badge: '/bulan',
    badgeColor: '#10B981',
  },
];

export default function Pricing() {
  return (
    <section id="harga" className="pricing">
      <div className="container">
        <div className="section-center">
          <div className="section-label">Paket &amp; Harga</div>
          <h2 className="section-title">
            Pilih Paket yang
            <br />
            Sesuai Kebutuhanmu
          </h2>
          <p className="section-desc">
            Mulai gratis 14 hari — tidak perlu kartu kredit. Upgrade kapan saja.
          </p>
        </div>

        <div className="pricing-grid pricing-grid-4">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`pricing-card pricing-card--${plan.key}${plan.popular ? ' popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={11} style={{ display: 'inline', marginRight: 4 }} />
                  Paling Populer
                </div>
              )}

              {/* Plan badge (atas kanan) */}
              <div
                className="pricing-plan-badge"
                style={{ background: plan.badgeColor + '18', color: plan.badgeColor, borderColor: plan.badgeColor + '40' }}
              >
                {plan.name}
              </div>

              {/* Tagline */}
              <div className="pricing-tagline">{plan.tagline}</div>

              {/* Harga */}
              {plan.price === null ? (
                <div className="pricing-price-row pricing-price-row--free">
                  <span className="pricing-amount-free">Gratis</span>
                  <span className="pricing-period">{plan.durationDays} hari</span>
                </div>
              ) : (
                <div className="pricing-price-row">
                  <span className="pricing-currency">Rp</span>
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-period">/bln</span>
                </div>
              )}

              <p className="pricing-desc">{plan.desc}</p>

              <div className="pricing-divider" />

              <ul className="pricing-features-list">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature-item">
                    <Check size={14} className="check-icon" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#daftar"
                className={`btn pricing-cta${plan.popular ? ' btn-primary' : plan.key === 'trial' ? ' btn-outline pricing-cta--trial' : ' btn-outline'}`}
              >
                {plan.price === null ? 'Mulai Gratis' : 'Pilih Paket Ini'}
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Butuh fitur khusus atau integrasi lanjutan?{' '}
          <a href="#kontak">Hubungi kami</a>
        </p>
      </div>
    </section>
  );
}

