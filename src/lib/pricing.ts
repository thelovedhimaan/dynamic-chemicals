import { promises as fs } from "fs";
import path from "path";
import { products } from "./products";

export type ProductPrice = { productId: string; amount: number | null; unit: string; updatedAt: string };
const localFile = path.join(process.cwd(), ".data", "prices.json");
const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

function defaults(): ProductPrice[] { return products.map((product) => ({ productId: product.id, amount: null, unit: "per pack", updatedAt: new Date(0).toISOString() })); }
function headers() { return { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || "", Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ""}`, "Content-Type": "application/json" }; }
function endpoint(query = "") { return `${process.env.SUPABASE_URL}/rest/v1/product_prices${query}`; }

export async function getPrices(): Promise<ProductPrice[]> {
  if (!hasSupabase) { try { const saved = JSON.parse(await fs.readFile(localFile, "utf8")) as ProductPrice[]; return defaults().map((item) => saved.find((price) => price.productId === item.productId) || item); } catch { return defaults(); } }
  const response = await fetch(endpoint("?select=product_id,amount,unit,updated_at"), { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load pricing.");
  const rows = await response.json() as { product_id: string; amount: number | null; unit: string; updated_at: string }[];
  return defaults().map((item) => { const row = rows.find((entry) => entry.product_id === item.productId); return row ? { productId: row.product_id, amount: row.amount, unit: row.unit, updatedAt: row.updated_at } : item; });
}

export async function setPrice(productId: string, amount: number | null, unit: string): Promise<ProductPrice> {
  if (!products.some((product) => product.id === productId)) throw new Error("Unknown product.");
  const price = { productId, amount: amount === null ? null : Math.max(0, Math.round(amount * 100) / 100), unit: unit.trim().slice(0, 40) || "per pack", updatedAt: new Date().toISOString() };
  if (!hasSupabase) { const prices = await getPrices(); await fs.mkdir(path.dirname(localFile), { recursive: true }); await fs.writeFile(localFile, JSON.stringify(prices.map((item) => item.productId === productId ? price : item), null, 2)); return price; }
  const response = await fetch(endpoint("?on_conflict=product_id"), { method: "POST", headers: { ...headers(), Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ product_id: productId, amount: price.amount, unit: price.unit, updated_at: price.updatedAt }) });
  if (!response.ok) throw new Error("Unable to save pricing.");
  return price;
}
