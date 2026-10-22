"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import type { ProductPrice } from "@/lib/pricing";

type CartItem = { productId: string; quantity: number };

function readCart(): CartItem[] { try { return JSON.parse(localStorage.getItem("dc-cart") || "[]") as CartItem[]; } catch { return []; } }

export function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [added, setAdded] = useState<string[]>([]);
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const filtered = useMemo(() => products.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.summary} ${product.applications.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  useEffect(() => { fetch("/api/prices").then((response) => response.json()).then((data) => setPrices(data.prices || [])).catch(() => undefined); }, []);

  function add(productId: string) {
    const cart = readCart();
    const current = cart.find((item) => item.productId === productId);
    if (current) current.quantity += 1; else cart.push({ productId, quantity: 1 });
    localStorage.setItem("dc-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("dc-cart")); setAdded((items) => [...items, productId]);
    window.setTimeout(() => setAdded((items) => items.filter((id) => id !== productId)), 1400);
  }

  return <section className="section catalog" id="products"><div className="section-heading"><div><span className="eyebrow">Product catalogue</span><h2>Choose products by the job they need to do.</h2></div><p>Build a multi-item request. We confirm pack sizes, suitability, price and delivery before production.</p></div><div className="catalog-tools"><label className="search-field"><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product or application" /></label><div className="filter-list" aria-label="Product categories">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="product-grid">{filtered.map((product) => { const price = prices.find((item) => item.productId === product.id); return <article className="product-card" key={product.id} style={{ "--accent": product.accent } as React.CSSProperties}><div className="product-image"><img src={product.image} alt={`${product.name} application`} /><span>{product.shortName}</span></div><div className="product-content"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.summary}</p><ul>{product.applications.map((item) => <li key={item}>{item}</li>)}</ul><div className="price-line">{price?.amount !== null && price?.amount !== undefined ? <><strong>₹{price.amount.toLocaleString("en-IN")}</strong><small>{price.unit}</small></> : <strong>Price on review</strong>}</div><div className="card-actions"><Link href={`/products/${product.slug}`}>Details</Link><button className={`button small ${added.includes(product.id) ? "added" : ""}`} onClick={() => add(product.id)}>{added.includes(product.id) ? "✓ Added" : "+ Add to order"}</button></div></div></article>; })}</div>{!filtered.length && <div className="empty-state"><h3>No matching products</h3><p>Try a broader search or contact us for an application-led recommendation.</p></div>}</section>;
}
