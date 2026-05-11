import { ArrowRight, CheckCircle } from 'lucide-react';

const checks = [
  'Gratis setup & instalasi',
  'Data aman & terenkripsi',
  'Support Senin – Sabtu',
];

const barHeights = [38, 62, 45, 80, 55, 92, 68];
const barDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

const transactions = [
  { name: 'Budi Santoso', sub: '3 produk', amount: 'Rp 87.000' },
  { name: 'Siti Rahayu', sub: '5 produk', amount: 'Rp 142.500' },
  { name: 'Ahmad Fauzi', sub: '2 produk', amount: 'Rp 45.000' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-text">
            <div className="hero-badge">
              <span>✦</span>
              Sistem Kasir Digital Terpercaya
            </div>

            <h1 className="hero-title">
              Kasir Digital{' '}
              <span className="hero-title-accent">Lengkap</span>
              <br />
              untuk Toko Anda
            </h1>

            <p className="hero-desc">
              Kelola transaksi, stok, kasir, dan laporan dalam satu platform.
              Dirancang khusus untuk toko ritel Indonesia — sederhana, cepat, dan andal.
            </p>

            <div className="hero-checks">
              {checks.map((c) => (
                <div key={c} className="hero-check-item">
                  <CheckCircle size={16} style={{ color: '#93c5fd', flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <a href="#daftar" className="btn btn-white btn-lg">
                Coba Gratis 14 Hari
                <ArrowRight size={18} />
              </a>
              <a href="#fitur" className="btn btn-ghost btn-lg">
                Lihat Fitur
              </a>
            </div>

            <p className="hero-note">Tidak perlu kartu kredit · Langsung aktif</p>
          </div>

          {/* Right: Browser mockup */}
          <div className="hero-visual">
            <div className="browser-mockup">
              <div className="browser-bar">
                <div className="browser-dot browser-dot-red" />
                <div className="browser-dot browser-dot-yellow" />
                <div className="browser-dot browser-dot-green" />
                <div className="browser-url">app.sequndang.com/dashboard</div>
              </div>
              <div className="browser-content">
                <div className="dash-preview">
                  {/* Stats */}
                  <div className="dash-stats-row">
                    {[
                      { label: 'Penjualan Hari Ini', value: 'Rp 2,4 jt', color: '#0046de' },
                      { label: 'Transaksi', value: '28', color: '#2B8A3E' },
                      { label: 'Item Terjual', value: '114', color: '#c54500' },
                    ].map((s) => (
                      <div key={s.label} className="dash-stat">
                        <div className="dash-stat-label">{s.label}</div>
                        <div className="dash-stat-value" style={{ color: s.color }}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="dash-chart">
                    <div className="dash-chart-title">Grafik Penjualan Minggu Ini</div>
                    <div className="dash-bars">
                      {barHeights.map((h, i) => (
                        <div
                          key={i}
                          className={`dash-bar${i === 5 ? ' active' : ''}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="dash-bar-labels">
                      {barDays.map((d) => (
                        <div key={d} className="dash-bar-label">{d}</div>
                      ))}
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="dash-txns">
                    <div className="dash-txns-title">Transaksi Terbaru</div>
                    {transactions.map((t, i) => (
                      <div key={i} className="dash-txn-row">
                        <div>
                          <div className="dash-txn-name">{t.name}</div>
                          <div className="dash-txn-sub">{t.sub}</div>
                        </div>
                        <div className="dash-txn-amount">{t.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
