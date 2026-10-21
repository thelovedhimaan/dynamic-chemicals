import { promises as fs } from "fs";
import path from "path";
import type { CreateOrderInput, Order, OrderImage, OrderStatus } from "./types";

const localFile = process.env.VERCEL ? path.join("/tmp", "dynamic-chemicals", "orders.json") : path.join(process.cwd(), ".data", "orders.json");
const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

function headers(extra: HeadersInit = {}) {
  return { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "", Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ""}`, "Content-Type": "application/json", ...extra };
}

function endpoint(query = "") {
  const table = process.env.SUPABASE_ORDERS_TABLE || "orders";
  return `${process.env.SUPABASE_URL}/rest/v1/${table}${query}`;
}

async function readLocal(): Promise<Order[]> {
  try { return JSON.parse(await fs.readFile(localFile, "utf8")) as Order[]; }
  catch { return []; }
}

async function writeLocal(orders: Order[]) {
  await fs.mkdir(path.dirname(localFile), { recursive: true });
  await fs.writeFile(localFile, JSON.stringify(orders, null, 2));
}

export async function listOrders(): Promise<Order[]> {
  if (!hasSupabase) return (await readLocal()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const response = await fetch(endpoint("?select=data&order=created_at.desc"), { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load orders.");
  return ((await response.json()) as { data: Order }[]).map((row) => row.data);
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!hasSupabase) return (await readLocal()).find((order) => order.id === id) || null;
  const response = await fetch(endpoint(`?id=eq.${encodeURIComponent(id)}&select=data&limit=1`), { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load order.");
  return ((await response.json()) as { data: Order }[])[0]?.data || null;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const now = new Date().toISOString();
  const id = `DC-${now.slice(2, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
  const order: Order = { ...input, id, createdAt: now, updatedAt: now, status: "received", timeline: [{ status: "received", note: "Order request received. Our team will review the details.", createdAt: now }], notifications: { whatsapp: "preview", email: "preview" } };
  if (!hasSupabase) { const orders = await readLocal(); orders.push(order); await writeLocal(orders); return order; }
  const response = await fetch(endpoint(), { method: "POST", headers: headers({ Prefer: "return=minimal" }), body: JSON.stringify({ id, created_at: now, updated_at: now, status: order.status, customer_email: order.customer.email, customer_phone: order.customer.phone, data: order }) });
  if (!response.ok) throw new Error("Unable to save order.");
  return order;
}

export async function updateOrder(id: string, status: OrderStatus, note: string, finalImages: OrderImage[]): Promise<Order | null> {
  const existing = await getOrder(id); if (!existing) return null;
  const now = new Date().toISOString();
  const order: Order = { ...existing, status, updatedAt: now, images: [...existing.images.filter((image) => image.kind !== "final"), ...finalImages], timeline: [...existing.timeline, { status, note: note || `Order moved to ${status}.`, createdAt: now }] };
  if (!hasSupabase) { const orders = await readLocal(); await writeLocal(orders.map((item) => item.id === id ? order : item)); return order; }
  const response = await fetch(endpoint(`?id=eq.${encodeURIComponent(id)}`), { method: "PATCH", headers: headers({ Prefer: "return=minimal" }), body: JSON.stringify({ updated_at: now, status, data: order }) });
  if (!response.ok) throw new Error("Unable to update order.");
  return order;
}

export async function saveNotificationState(order: Order) {
  if (!hasSupabase) { const orders = await readLocal(); await writeLocal(orders.map((item) => item.id === order.id ? order : item)); return; }
  await fetch(endpoint(`?id=eq.${encodeURIComponent(order.id)}`), { method: "PATCH", headers: headers(), body: JSON.stringify({ data: order }) });
}
