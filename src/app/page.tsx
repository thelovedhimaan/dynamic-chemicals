import Link from "next/link";
import { IndustrialSolutions } from "@/components/IndustrialSolutions";
import { ProductCatalog } from "@/components/ProductCatalog";
import { BrandLogo, Icon } from "@/components/Icon";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dynamic Chemicals",
  slogan: "Dynamic by Nature",
  telephone: ["+91 99967 77453", "+91 89507 77453"],
  email: "thedynamicchemicals@gmail.com",
  taxID: "06BVHPA4504N1ZO",
  address: { "@type": "PostalAddress", streetAddress: "105 Green Park", addressLocality: "Ambala", postalCode: "133001", addressCountry: "IN" }
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-brand"><span className="hero-brand-mark"><BrandLogo /></span><span><strong>Dynamic Chemicals</strong><small>Dynamic by Nature</small></span></div>
        <span className="eyebrow">Industrial, water-treatment and housekeeping solutions</span>
        <h1>Clear chemistry.<br /><em>Complete systems.</em></h1>
        <p>Products, treatment programs, descaling, RO and ETP plants, water softeners and boiler equipment - reviewed around your site and tracked from request to delivery.</p>
        <div className="hero-actions">
          <Link className="button primary" href="#products"><Icon name="products" />Explore products</Link>
          <a className="button secondary" href="/catalog.pdf" target="_blank" rel="noreferrer"><Icon name="download" />View brochure</a>
        </div>
        <div className="hero-proof"><span><strong>18+</strong> product options</span><span><strong>5-500 KLD</strong> ETP systems</span><span><strong>100 LPH+</strong> RO setups</span></div>
      </div>
      <div className="hero-industry" aria-label="Industrial chemistry laboratory">
        <img src="/brochure/laboratory.webp" alt="Industrial chemical testing in a laboratory" />
        <div className="hero-industry-card"><span className="status-dot"></span><small>Products and services</small><strong>Chemistry to complete plant systems</strong><p>Boiler · RO · Cooling tower · ETP</p></div>
      </div>
    </section>
    <section className="trust-strip"><span>Boiler water treatment</span><span>RO and cooling towers</span><span>Plant and machinery</span><span>Tracked order requests</span></section>
    <ProductCatalog />
    <IndustrialSolutions />
    <section className="boiler-note section">
      <div><span className="eyebrow">Why water treatment matters</span><h2>Scale reduces heat transfer and raises operating risk.</h2></div>
      <div className="boiler-points"><p><strong>Fuel efficiency</strong>Scale restricts heat transfer and can increase fuel consumption.</p><p><strong>Equipment protection</strong>Reviewed treatment helps manage scale, sludge, dissolved oxygen and corrosion.</p><p><strong>Safer operation</strong>Water chemistry, cleaning and maintenance should follow site-specific technical review.</p></div>
    </section>
    <section className="cta-panel"><div><span className="eyebrow">Have a complex requirement?</span><h2>Share the system, capacity and result you need.</h2><p>We can review water conditions, operating duty, plant capacity, product quantities, packaging and customization before confirming the quote.</p></div><Link className="button light" href="/order">Start an order request</Link></section>
  </>;
}
