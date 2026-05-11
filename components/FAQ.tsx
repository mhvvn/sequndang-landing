'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Apakah Sequndang POS bisa digunakan di handphone?',
    a: 'Ya! Sequndang POS dirancang responsif dan dapat diakses dari browser handphone, tablet, maupun komputer. Tidak perlu menginstal aplikasi apapun.',
  },
  {
    q: 'Berapa lama masa trial gratis?',
    a: 'Masa trial gratis adalah 14 hari penuh dengan akses ke semua fitur paket Pro. Setelah trial berakhir, Anda dapat memilih paket yang sesuai kebutuhan toko.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Semua data disimpan di server aman dengan enkripsi. Kami melakukan backup data secara rutin dan memiliki uptime 99.9%. Data Anda tidak pernah dibagikan ke pihak ketiga.',
  },
  {
    q: 'Bisakah saya punya lebih dari satu toko?',
    a: 'Saat ini setiap akun mengelola satu toko. Untuk kebutuhan multi-toko, silakan hubungi tim kami untuk mendapatkan solusi yang sesuai.',
  },
  {
    q: 'Apakah tersedia fitur cetak struk thermal?',
    a: 'Ya! Sequndang POS mendukung printer thermal standar via browser. Anda juga dapat mengkustomisasi tampilan struk dengan logo dan informasi toko.',
  },
  {
    q: 'Apa yang terjadi setelah masa trial habis?',
    a: 'Setelah 14 hari, Anda akan diminta memilih paket berbayar untuk melanjutkan. Data Anda tetap aman dan tidak akan dihapus. Kami akan mengingatkan Anda 3 hari sebelum trial berakhir.',
  },
  {
    q: 'Apakah ada biaya setup atau instalasi?',
    a: 'Tidak ada! Sequndang POS berbasis web, tidak perlu instalasi software apapun. Biaya setup pun gratis. Anda hanya membayar biaya langganan bulanan.',
  },
  {
    q: 'Bagaimana cara menambah kasir?',
    a: 'Melalui halaman pengaturan, pemilik toko dapat menambahkan akun kasir baru dalam hitungan detik. Setiap kasir memiliki akses terbatas sesuai hak yang diberikan.',
  },
  {
    q: 'Apakah bisa import data produk dari Excel?',
    a: 'Fitur import produk dari Excel tersedia pada paket Pro. Anda cukup mengisi template yang kami sediakan, lalu upload — produk langsung masuk ke sistem.',
  },
  {
    q: 'Bagaimana cara menghubungi support?',
    a: 'Tim support tersedia via email support@sequndang.com dan WhatsApp pada jam operasional Senin–Sabtu, 08.00–17.00 WIB. Pengguna paket Pro mendapatkan prioritas respons.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-center">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="section-desc">
            Tidak menemukan jawaban yang Anda cari?{' '}
            <a href="#kontak" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Hubungi tim kami langsung.
            </a>
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              {openIndex === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
