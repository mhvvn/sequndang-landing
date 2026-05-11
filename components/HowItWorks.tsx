import { ClipboardList, Settings, ShoppingBag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: '1',
    icon: ClipboardList,
    title: 'Daftar Trial',
    desc: 'Isi form pendaftaran dengan data toko Anda. Tim kami akan memproses dan menghubungi Anda dalam 1×24 jam kerja.',
  },
  {
    number: '2',
    icon: Settings,
    title: 'Setup Toko',
    desc: 'Input produk, tambahkan akun kasir, konfigurasi pajak, dan atur struk thermal sesuai identitas toko Anda.',
  },
  {
    number: '3',
    icon: ShoppingBag,
    title: 'Mulai Berjualan',
    desc: 'Langsung gunakan Sequndang POS dari browser tanpa perlu instalasi apapun. Berjualan lebih mudah dari sebelumnya.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-center">
          <div className="section-label">Cara Kerja</div>
          <h2 className="section-title">Mulai dalam 3 Langkah Mudah</h2>
          <p className="section-desc">
            Dari pendaftaran hingga siap berjualan, prosesnya cepat dan tidak rumit.
          </p>
        </div>

        <div className="steps-grid">
          <div className="steps-connector" aria-hidden="true" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="step">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <Icon size={24} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
