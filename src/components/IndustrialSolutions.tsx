import Link from "next/link";
import { Icon } from "@/components/Icon";
import { plantServices, treatmentPrograms } from "@/lib/solutions";

export function IndustrialSolutions() {
  return (
    <section className="section industrial-solutions" id="solutions">
      <div className="section-heading solutions-heading">
        <div>
          <span className="eyebrow">Water, heat and process systems</span>
          <h2>Industrial treatment and plant solutions.</h2>
        </div>
        <p>From chemistry selection to plant installation and boiler equipment, each requirement is reviewed against the actual system and operating conditions.</p>
      </div>

      <div className="treatment-grid">
        {treatmentPrograms.map((program, index) => (
          <article className="treatment-card" key={program.title}>
            <img src={program.image} alt="" />
            <div><span>0{index + 1}</span><h3>{program.title}</h3><p>{program.text}</p></div>
          </article>
        ))}
      </div>

      <div className="plant-heading">
        <div><span className="eyebrow">Plant and machinery</span><h2>Specified for the site, built for the duty.</h2></div>
        <p>Capacity, material, controls, water quality and operating conditions are confirmed before quotation.</p>
      </div>
      <div className="plant-grid">
        {plantServices.map((service) => (
          <article className="plant-card" key={service.title}>
            <img src={service.image} alt={service.title} />
            <div><h3>{service.title}</h3><p>{service.detail}</p></div>
          </article>
        ))}
      </div>

      <div className="brochure-panel">
        <div><span className="eyebrow">Company brochure</span><h2>View the complete industrial range.</h2><p>Includes boiler treatment, RO and cooling-tower programs, descaling, plant installations and boiler machinery.</p></div>
        <div className="brochure-actions">
          <a className="button light" href="/catalog.pdf" target="_blank" rel="noreferrer"><Icon name="download" />View brochure</a>
          <Link className="button brochure-order" href="/order">Request a quote</Link>
        </div>
      </div>
    </section>
  );
}
