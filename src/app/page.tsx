import Link from "next/link";
import { IndustrialSolutions } from "@/components/IndustrialSolutions";
import { ProductCatalog } from "@/components/ProductCatalog";
import { Icon } from "@/components/Icon";

const schema = {
  "@context": "https://schema.org", "@type": "LocalBusiness", name: "Dynamic Chemicals", slogan: "Dynamic by Nature",
  telephone: ["+91 99967 77453", "+91 89507 77453"], email: "thedynamicchemicals@gmail.com", taxID: "06BVHPA4504N1ZO",
  address: { "@type": "PostalAddress", streetAddress: "105 Green Park", addressLocality: "Ambala", postalCode: "133001", addressCountry: "IN" }
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Industrial and water-treatment solutions</span>
        <h1>Clear chemistry.<br /><em>Tracked delivery.</em></h1>
        <p>Products, treatment programs, descaling, RO and ETP plants, water softeners and boiler equipment—reviewed around your site and tracked from request to delivery.</p>
        <div className="hero-actions">
          <Link className="button primary" href="#products"><Icon name="products" />Explore products</Link>
          <Link className="button secondary" href="/track"><Icon name="track" />Track an order</Link>
        </div>
        <div className="hero-proof"><span><strong>10</strong> treatment options</span><span><strong>5–500 KLD</strong> ETP systems</span><span><strong>100 LPH+</strong> RO setups</span></div>
      </div>
      <div className="hero-visual" aria-label="Order workflow preview">
        <div className="visual-orbit"></div>
        <div className="visual-card main"><span className="status-dot"></span><small>Order DC-261022</small><strong>Technical review</strong><div className="progress"><i></i></div></div>
        <div className="visual-card product"><span>770</span><strong>Boiler treatment</strong><small>Application reviewed</small></div>
        <div className="visual-card update"><span><Icon name="whatsapp" /></span><div><strong>Status sent</strong><small>WhatsApp + email</small></div></div>
      </div>
    </section>
    <section className="trust-strip"><span>Boiler water treatment</span><span>RO and cooling towers</span><span>Plant and machinery</span><span>Tracked order requests</span></section>
    <ProductCatalog />
    <IndustrialSolutions />
    <section className="chemist-section section">
      <div className="chemist-photo"><img src="/team/main-chemist.webp" alt="Dynamic Chemicals main chemist working in the laboratory" /><span>Technical leadership</span></div>
      <div className="chemist-copy"><span className="eyebrow">Application-led chemistry</span><h2>Recommendations start with the system, water and operating conditions.</h2><p>Our main chemist reviews treatment goals, site conditions, compatibility and dosing requirements before a product or program is recommended.</p><div className="chemist-points"><span>Water-quality review</span><span>Application suitability</span><span>Treatment guidance</span></div><a className="button secondary" href="/catalog.pdf" target="_blank" rel="noreferrer"><Icon name="download" />View company brochure</a></div>
    </section>
    <section className="cta-panel"><div><span className="eyebrow">Have a complex requirement?</span><h2>Share the system, capacity and result you need.</h2><p>We can review water conditions, operating duty, plant capacity, product quantities, packaging and customization before confirming the quote.</p></div><Link className="button light" href="/order">Start an order request</Link></section>
  </>;
}
