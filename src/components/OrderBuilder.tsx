"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";
import { Icon } from "@/components/Icon";
import type { ProductPrice } from "@/lib/pricing";
import type { Order, OrderImage, OrderItem } from "@/lib/types";

type CartItem = { productId: string; quantity: number };
const blankCustomer = { name: "", phone: "+91 ", email: "", company: "", address: "" };

function deliveryLabel(status: Order["notifications"]["email"]) {
  if (status === "sent") return "Sent";
  if (status === "failed") return "Delivery failed";
  return "Not configured";
}

function fileToImage(file: File): Promise<OrderImage> {
  return new Promise((resolve, reject) => { if (file.size > 1_000_000) return reject(new Error(`${file.name} is larger than 1 MB.`)); const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, dataUrl: String(reader.result), kind: "reference" }); reader.onerror = () => reject(new Error(`Could not read ${file.name}.`)); reader.readAsDataURL(file); });
}

export function OrderBuilder() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const [customer, setCustomer] = useState(blankCustomer);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<OrderImage[]>([]);
  const [selected, setSelected] = useState(products[0].id);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<Order | null>(null);

  useEffect(() => {
    let cart: CartItem[] = []; try { cart = JSON.parse(localStorage.getItem("dc-cart") || "[]"); } catch { /* use empty cart */ }
    setItems(cart.flatMap((cartItem) => { const product = products.find((entry) => entry.id === cartItem.productId); return product ? [{ productId: product.id, productName: product.name, quantity: Math.max(1, cartItem.quantity), packSize: "", customization: "" }] : []; }));
    fetch("/api/prices").then((response) => response.json()).then((data) => setPrices(data.prices || [])).catch(() => undefined);
  }, []);

  const estimated = useMemo(() => items.reduce((total, item) => { const amount = prices.find((price) => price.productId === item.productId)?.amount; return total + (amount || 0) * item.quantity; }, 0), [items, prices]);
  const hasUnpriced = items.some((item) => prices.find((price) => price.productId === item.productId)?.amount == null);

  function addItem() { const product = products.find((entry) => entry.id === selected); if (!product) return; setItems((current) => current.some((item) => item.productId === product.id) ? current : [...current, { productId: product.id, productName: product.name, quantity: 1, packSize: "", customization: "" }]); }
  function updateItem(index: number, patch: Partial<OrderItem>) { setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item)); }
  async function addImages(event: ChangeEvent<HTMLInputElement>) { const files = Array.from(event.target.files || []).slice(0, 4 - images.length); try { const next = await Promise.all(files.map(fileToImage)); setImages((current) => [...current, ...next].slice(0, 4)); setErrors([]); } catch (error) { setErrors([error instanceof Error ? error.message : "Could not add the image."]); } event.target.value = ""; }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setErrors([]);
    try { const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer, items, notes, images }) }); const data = await response.json(); if (!response.ok) throw new Error((data.errors || ["Could not create the order."]).join(" ")); setCreated(data.order); localStorage.removeItem("dc-cart"); window.dispatchEvent(new Event("dc-cart")); }
    catch (error) { setErrors([error instanceof Error ? error.message : "Could not create the order."]); }
    finally { setBusy(false); }
  }

  if (created) {
    const whatsapp = `https://wa.me/919996777453?text=${encodeURIComponent(`Hello Dynamic Chemicals, I submitted order ${created.id}. Tracking: ${location.origin}/track/${created.id}`)}`;
    return <div className="order-success"><span className="success-mark">✓</span><span className="eyebrow">Request received</span><h1>Your tracking ID is<br /><strong>{created.id}</strong></h1><p>Save this ID. Your request is saved and the team will review pricing, suitability, customization and delivery. Notification delivery is shown below.</p><div className="success-actions"><Link className="button primary" href={`/track/${created.id}`}>Open tracking page</Link><a className="button whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" />Continue on WhatsApp</a></div><div className="delivery-state"><span>WhatsApp: {deliveryLabel(created.notifications.whatsapp)}</span><span>Email: {deliveryLabel(created.notifications.email)}</span></div></div>;
  }

  return <form className="order-layout" onSubmit={submit}><div className="order-form"><div className="page-heading"><span className="eyebrow">Multi-item order request</span><h1>Tell us what you need.</h1><p>Add product-level changes and references. The team confirms the final quote before production.</p></div>{errors.length > 0 && <div className="form-errors" role="alert">{errors.map((error) => <p key={error}>{error}</p>)}</div>}<section className="form-section"><div className="form-section-heading"><span>01</span><div><h2>Products</h2><p>Adjust quantity, pack preference, and customization for each item.</p></div></div><div className="add-product-row"><select value={selected} onChange={(event) => setSelected(event.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.id} · {product.name}</option>)}</select><button className="button secondary" type="button" onClick={addItem}>Add product</button></div><div className="order-items">{items.map((item, index) => <article className="order-item" key={item.productId}><div className="item-title"><span>{item.productId}</span><div><strong>{item.productName}</strong><small>{prices.find((price) => price.productId === item.productId)?.amount != null ? `₹${prices.find((price) => price.productId === item.productId)?.amount} ${prices.find((price) => price.productId === item.productId)?.unit}` : "Price confirmed after review"}</small></div><button type="button" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${item.productName}`}>×</button></div><div className="item-fields"><label>Quantity<input type="number" min="1" max="999" value={item.quantity} onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} /></label><label>Preferred pack size<input value={item.packSize} onChange={(event) => updateItem(index, { packSize: event.target.value })} placeholder="e.g. 5 L" /></label></div><label>Changes or personalization<textarea value={item.customization} onChange={(event) => updateItem(index, { customization: event.target.value })} placeholder="Label text, packaging, fragrance, application, or other requirement" /></label></article>)}{!items.length && <div className="empty-state"><strong>No products selected</strong><p>Add a product above or return to the catalogue.</p></div>}</div></section><section className="form-section"><div className="form-section-heading"><span>02</span><div><h2>References</h2><p>Add up to four PNG, JPEG, or WebP images. Each image must be under 1 MB.</p></div></div><label className="upload-zone"><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={addImages} /><span>+</span><strong>Add reference images</strong><small>Labels, packaging, colors, or examples</small></label>{images.length > 0 && <div className="image-preview-grid">{images.map((image, index) => <figure key={`${image.name}-${index}`}><img src={image.dataUrl} alt={`Reference ${index + 1}`} /><button type="button" onClick={() => setImages((current) => current.filter((_, imageIndex) => imageIndex !== index))}>Remove</button></figure>)}</div>}</section><section className="form-section"><div className="form-section-heading"><span>03</span><div><h2>Contact and delivery</h2><p>WhatsApp and email are used for order updates.</p></div></div><div className="field-grid"><label>Full name<input name="name" required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} /></label><label>WhatsApp number<input name="phone" required value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} /></label><label>Email<input name="email" type="email" required value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} /></label><label>Company <small>Optional</small><input name="company" value={customer.company} onChange={(event) => setCustomer({ ...customer, company: event.target.value })} /></label><label className="wide">Delivery address<textarea name="address" required value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} /></label><label className="wide">Order notes <small>Optional</small><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Site conditions, deadline, or questions for the team" /></label></div></section></div><aside className="order-summary"><span className="eyebrow">Live preview</span><h2>Your request</h2><div className="summary-items">{items.map((item) => <div key={item.productId}><span>{item.quantity} × {item.productName}</span><strong>{item.packSize || "Pack size to confirm"}</strong>{item.customization && <small>{item.customization}</small>}</div>)}</div><div className="summary-row"><span>Reference images</span><strong>{images.length}</strong></div><div className="summary-total"><span>Current estimate</span><strong>{estimated ? `₹${estimated.toLocaleString("en-IN")}` : "Quote required"}</strong>{hasUnpriced && <small>Some items require review, so this is not the final quote.</small>}</div><button className="button primary full" type="submit" disabled={busy || !items.length}>{busy ? "Creating secure order..." : "Submit order request"}</button><p className="consent">By submitting, you agree to receive service updates about this order on WhatsApp and email.</p></aside></form>;
}
