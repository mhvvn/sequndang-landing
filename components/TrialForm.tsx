'use client';

import { useState, useRef } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

type FormData = {
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  kecamatan: string;
  desa: string;
  alamatLengkap: string;
  employeeCount: string;
  planInterest: string;
  referral: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  storeName: '',
  ownerName: '',
  email: '',
  phone: '',
  businessType: '',
  city: '',
  kecamatan: '',
  desa: '',
  alamatLengkap: '',
  employeeCount: '',
  planInterest: '',
  referral: '',
  message: '',
};

const businessTypes = [
  'Warung / Toko Kelontong',
  'Toko Pakaian / Fashion',
  'Restoran / Kafe / F&B',
  'Apotek / Toko Kesehatan',
  'Toko Elektronik',
  'Minimarket / Swalayan',
  'Toko Bangunan / Material',
  'Lainnya',
];

function FormGroup({
  label,
  required,
  error,
  charCount,
  maxLen,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  charCount?: number;
  maxLen?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="req">*</span>}
        {charCount !== undefined && maxLen !== undefined && (
          <span className="form-char-count">
            ({charCount}/{maxLen})
          </span>
        )}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default function TrialForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.storeName.trim() || formData.storeName.trim().length < 2)
      newErrors.storeName = 'Nama toko minimal 2 karakter';

    if (!formData.ownerName.trim() || formData.ownerName.trim().length < 2)
      newErrors.ownerName = 'Nama pemilik minimal 2 karakter';

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Format email tidak valid';

    const phone = formData.phone.replace(/\s|-/g, '');
    if (!phone || !/^(\+62|08)\d{8,13}$/.test(phone))
      newErrors.phone = 'Nomor WhatsApp tidak valid (contoh: 081234567890)';

    if (!formData.businessType)
      newErrors.businessType = 'Pilih jenis usaha';

    if (!formData.city.trim() || formData.city.trim().length < 2)
      newErrors.city = 'Kota tidak boleh kosong';

    if (!formData.employeeCount)
      newErrors.employeeCount = 'Pilih jumlah kasir';

    if (formData.message.length > 500)
      newErrors.message = 'Pesan maksimal 500 karakter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: if filled, silently discard (bot detected)
    if (honeypotRef.current?.value) return;

    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/trial-requests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Landing-Key': process.env.NEXT_PUBLIC_LANDING_API_KEY ?? '',
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="trial-form-section" id="daftar">
        <div className="container">
          <div className="trial-form-wrapper">
            <div className="form-success">
              <div className="form-success-icon">
                <CheckCircle size={38} />
              </div>
              <h3 className="form-success-title">Pendaftaran Berhasil Dikirim!</h3>
              <p className="form-success-desc">
                Tim Sequndang akan menghubungi Anda di{' '}
                <strong>{formData.email}</strong> atau WhatsApp{' '}
                <strong>{formData.phone}</strong> dalam 1×24 jam kerja.
                <br />
                <br />
                Terima kasih telah mempercayai Sequndang POS untuk toko Anda! 🎉
              </p>
              <a href="#fitur" className="btn btn-outline">
                Lihat Fitur Sequndang
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="trial-form-section" id="daftar">
      <div className="container">
        <div className="section-center">
          <div className="section-label">Daftar Trial</div>
          <h2 className="section-title">Coba Gratis 14 Hari</h2>
          <p className="section-desc">
            Isi form di bawah ini. Tim kami akan menghubungi Anda dalam 1×24 jam kerja.
          </p>
        </div>

        <div className="trial-form-wrapper">
          {status === 'error' && (
            <div className="form-error-banner">
              ⚠️ Gagal mengirim pendaftaran. Silakan coba beberapa saat lagi atau hubungi
              kami langsung.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot — hidden from real users */}
            <input
              ref={honeypotRef}
              name="website"
              type="text"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Row 1: Nama Toko + Nama Pemilik */}
            <div className="form-row">
              <FormGroup label="Nama Toko" required error={errors.storeName}>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  className={`form-input${errors.storeName ? ' error' : ''}`}
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="Toko Maju Jaya"
                  maxLength={100}
                />
              </FormGroup>
              <FormGroup label="Nama Pemilik" required error={errors.ownerName}>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  className={`form-input${errors.ownerName ? ' error' : ''}`}
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Budi Santoso"
                  maxLength={100}
                />
              </FormGroup>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="form-row">
              <FormGroup label="Alamat Email" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="budi@tokomaju.com"
                  maxLength={100}
                />
              </FormGroup>
              <FormGroup label="Nomor WhatsApp" required error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input${errors.phone ? ' error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="081234567890"
                  maxLength={16}
                />
              </FormGroup>
            </div>

            {/* Row 3: Jenis Usaha + Kota */}
            <div className="form-row">
              <FormGroup label="Jenis Usaha" required error={errors.businessType}>
                <select
                  id="businessType"
                  name="businessType"
                  className={`form-select${errors.businessType ? ' error' : ''}`}
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="">Pilih jenis usaha...</option>
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label="Kota / Kabupaten" required error={errors.city}>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className={`form-input${errors.city ? ' error' : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bandung"
                  maxLength={100}
                />
              </FormGroup>
            </div>

            {/* Row 3b: Kecamatan + Desa */}
            <div className="form-row">
              <FormGroup label="Kecamatan" error={errors.kecamatan}>
                <input
                  id="kecamatan"
                  name="kecamatan"
                  type="text"
                  className={`form-input${errors.kecamatan ? ' error' : ''}`}
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Kecamatan Coblong"
                  maxLength={100}
                />
              </FormGroup>
              <FormGroup label="Desa / Kelurahan" error={errors.desa}>
                <input
                  id="desa"
                  name="desa"
                  type="text"
                  className={`form-input${errors.desa ? ' error' : ''}`}
                  value={formData.desa}
                  onChange={handleChange}
                  placeholder="Desa Lebak Siliwangi"
                  maxLength={100}
                />
              </FormGroup>
            </div>

            {/* Alamat Lengkap */}
            <FormGroup label="Alamat Lengkap" error={errors.alamatLengkap}>
              <input
                id="alamatLengkap"
                name="alamatLengkap"
                type="text"
                className={`form-input${errors.alamatLengkap ? ' error' : ''}`}
                value={formData.alamatLengkap}
                onChange={handleChange}
                placeholder="Jl. Contoh No. 12, RT 03/RW 05"
                maxLength={200}
              />
            </FormGroup>

            {/* Row 4: Jumlah Kasir + Paket */}
            <div className="form-row">
              <FormGroup label="Jumlah Kasir yang Dibutuhkan" required error={errors.employeeCount}>
                <select
                  id="employeeCount"
                  name="employeeCount"
                  className={`form-select${errors.employeeCount ? ' error' : ''}`}
                  value={formData.employeeCount}
                  onChange={handleChange}
                >
                  <option value="">Pilih jumlah...</option>
                  <option value="1">1 kasir</option>
                  <option value="2-5">2 – 5 kasir</option>
                  <option value="6-10">6 – 10 kasir</option>
                  <option value=">10">Lebih dari 10 kasir</option>
                </select>
              </FormGroup>
              <FormGroup label="Paket yang Diminati">
                <select
                  id="planInterest"
                  name="planInterest"
                  className="form-select"
                  value={formData.planInterest}
                  onChange={handleChange}
                >
                  <option value="">Belum tahu</option>
                  <option value="Trial">Trial — Gratis 14 hari</option>
                  <option value="Basic">Basic — Rp 150.000/bulan</option>
                  <option value="Pro">Pro — Rp 350.000/bulan</option>
                  <option value="Enterprise">Enterprise — Rp 1.000.000/bulan</option>
                </select>
              </FormGroup>
            </div>

            {/* Referral */}
            <FormGroup label="Dari mana Anda mengetahui Sequndang?">
              <select
                id="referral"
                name="referral"
                className="form-select"
                value={formData.referral}
                onChange={handleChange}
              >
                <option value="">Pilih sumber informasi...</option>
                <option value="Google">Google / Mesin Pencari</option>
                <option value="Media Sosial">Media Sosial (Instagram, Facebook)</option>
                <option value="Teman / Rekan">Rekomendasi Teman / Rekan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </FormGroup>

            {/* Message */}
            <FormGroup
              label="Pesan / Keterangan Tambahan"
              error={errors.message}
              charCount={formData.message.length}
              maxLen={500}
            >
              <textarea
                id="message"
                name="message"
                className={`form-textarea${errors.message ? ' error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ceritakan kebutuhan toko Anda, misalnya: jenis produk yang dijual, fitur yang paling dibutuhkan, dll."
                maxLength={500}
                rows={4}
              />
            </FormGroup>

            <button
              type="submit"
              className="form-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Kirim Pendaftaran
                </>
              )}
            </button>

            <p className="form-footer-note">
              🔒 Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
