import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const product = getProduct((await params).slug); return product ? { title: product.name, description: product.summary } : {}; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug); if (!product) notFound();
  return <div className="detail-page"><Link className="back-link" href="/#products">← Back to products</Link><div className="detail-grid"><div className="detail-image" style={{ "--accent": product.accent } as React.CSSProperties}><img src={product.image} alt={`${product.name} packaging`} /><span>{product.shortName}</span></div><div><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="lead">{product.summary}</p><h2>Common applications</h2><ul className="application-list">{product.applications.map((item) => <li key={item}>{item}</li>)}</ul><div className="safety-note"><strong>Confirm before use</strong><p>Final suitability, dilution, handling instructions, safety documentation, pack size and commercial terms are confirmed during order review.</p></div><Link className="button primary" href="/order">Add to an order request</Link></div></div></div>;
}
