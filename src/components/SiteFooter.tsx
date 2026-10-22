import Link from "next/link";
import { Icon } from "@/components/Icon";

export function SiteFooter() {
  return <footer className="site-footer">
    <div><span className="eyebrow">Dynamic Chemicals</span><h2>Let&apos;s solve the application, then select the chemistry.</h2><p className="footer-partner">Industrial water treatment and boiler solutions in partnership with J.S. Fabricators.</p></div>
    <div className="footer-links">
      <a href="tel:+919996777453"><Icon name="phone" />+91 99967 77453</a>
      <a href="tel:+918950777453"><Icon name="phone" />+91 89507 77453</a>
      <a href="https://wa.me/919996777453" target="_blank" rel="noreferrer"><Icon name="whatsapp" />WhatsApp</a>
      <a href="mailto:thedynamicchemicals@gmail.com"><Icon name="mail" />thedynamicchemicals@gmail.com</a>
      <a href="/catalog.pdf" target="_blank" rel="noreferrer"><Icon name="download" />View company brochure</a>
      <Link href="/track"><Icon name="track" />Track an order</Link>
    </div>
    <p className="footer-address">#105, Green Park, Ambala, Haryana 133001 · GSTIN 06BVHPA4504N1ZO</p>
    <p className="legal">Product suitability, dosing, directions, safety information, plant specifications and commercial terms are confirmed during technical review.</p>
  </footer>;
}
