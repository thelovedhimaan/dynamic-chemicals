import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div><span className="eyebrow">Dynamic Chemicals</span><h2>Let&apos;s solve the application, then select the chemistry.</h2></div><div className="footer-links"><a href="tel:+919996777453">+91 99967 77453</a><a href="https://wa.me/919996777453" target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:thedynamicchemicals@gmail.com">thedynamicchemicals@gmail.com</a><a href="/catalog.pdf" target="_blank" rel="noreferrer">Download product catalogue</a><Link href="/track">Track an order</Link></div><p className="footer-address">105 Green Park, Mahesh Nagar, Ambala Cantt., Haryana 133001</p><p className="legal">Product suitability, directions, safety information and commercial terms are confirmed during order review.</p></footer>;
}
