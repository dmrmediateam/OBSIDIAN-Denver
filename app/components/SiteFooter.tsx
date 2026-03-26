import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="home-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-brand">Obsidian Denver</h3>
            <p className="footer-address">
              4045 N Pecos St #201
              <br />
              Denver, CO 80211, United States
            </p>
            <p className="footer-phone">
              <a href="tel:+17207066768">+1 720-706-6768</a>
            </p>
          </div>
          <div className="footer-links">
            <Link href="/home-valuation" className="footer-link">Home Valuation</Link>
            <Link href="/moving" className="footer-link">Moving to Denver</Link>
            <Link href="/find-your-local-realtor" className="footer-link">Find Your Realtor</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Obsidian Denver. All rights reserved.
            </p>
            <div className="footer-kw-logo-wrap">
              <Image
                src="/kwlogo.png"
                alt="Keller Williams logo"
                width={180}
                height={101}
                className="footer-kw-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
