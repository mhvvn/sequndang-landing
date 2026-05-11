import { ShoppingCart } from 'lucide-react';

const productLinks = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#harga', label: 'Harga' },
  { href: '#daftar', label: 'Daftar Trial Gratis' },
];

const helpLinks = [
  { href: '#faq', label: 'FAQ' },
  { href: '#kontak', label: 'Kontak' },
  { href: 'mailto:support@sequndang.com', label: 'Email Support' },
];

const legalLinks = [
  { href: '#', label: 'Syarat & Ketentuan' },
  { href: '#', label: 'Kebijakan Privasi' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <ShoppingCart size={16} />
              </div>
              <span className="footer-logo-name">Sequndang</span>
            </div>
            <p className="footer-brand-desc">
              Sistem kasir digital terpercaya untuk toko ritel Indonesia. Mudah, cepat, dan
              andal — langsung dari browser Anda.
            </p>
            <div className="footer-social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                FB
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="footer-col-title">Produk</div>
            <ul className="footer-links">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <div className="footer-col-title">Bantuan</div>
            <ul className="footer-links">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sequndang. Hak cipta dilindungi.</span>
          <div className="footer-legal">
            {legalLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
