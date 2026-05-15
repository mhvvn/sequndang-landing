import { Mail, MessageCircle, Clock, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="kontak" className="contact-section">
      <div className="container">
        <div className="section-center">
          <div className="section-label">Kontak</div>
          <h2 className="section-title">Kami Siap Membantu Anda</h2>
          <p className="section-desc">
            Punya pertanyaan sebelum mendaftar? Tim kami siap menjawab.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">
              <Mail size={24} />
            </div>
            <div className="contact-card-label">Email</div>
            <div className="contact-card-value">
              <a href="mailto:support@sequndang.com">support@sequndang.com</a>
            </div>
            <div className="contact-card-sub">Balasan dalam 1–2 hari kerja</div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <MessageCircle size={24} />
            </div>
            <div className="contact-card-label">WhatsApp</div>
            <div className="contact-card-value">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                +62 812-3456-7890
              </a>
            </div>
            <div className="contact-card-sub">Respons lebih cepat via WhatsApp</div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <Clock size={24} />
            </div>
            <div className="contact-card-label">Jam Operasional</div>
            <div className="contact-card-value">Senin – Sabtu</div>
            <div className="contact-card-sub">08.00 – 17.00 WIB</div>
          </div>
        </div>

        {/* Social media links */}
        <div className="contact-social">
          <p className="contact-social-label">Ikuti kami di media sosial</p>
          <div className="contact-social-links">
            <a
              href="https://instagram.com/sequndang"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="Instagram Sequndang"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/sequndang"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="Facebook Sequndang"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
