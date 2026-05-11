'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  target: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  { target: 120, suffix: '+', label: 'Toko Aktif' },
  { target: 50000, suffix: '+', label: 'Transaksi Diproses' },
  { target: 300, suffix: '+', label: 'Kasir Terdaftar' },
  { target: 99.9, suffix: '%', label: 'Uptime Layanan', decimals: 1 },
];

function CountUp({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps = 60;
          const stepVal = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += stepVal;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString('id-ID');

  return (
    <div ref={ref} className="stat-number">
      {display}
      {suffix}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="social-proof">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <CountUp target={s.target} suffix={s.suffix} decimals={s.decimals} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
