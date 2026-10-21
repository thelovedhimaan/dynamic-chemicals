import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [{ url: base, changeFrequency: "weekly", priority: 1 }, { url: `${base}/order`, changeFrequency: "monthly", priority: .8 }, { url: `${base}/track`, changeFrequency: "monthly", priority: .6 }, ...products.map((product) => ({ url: `${base}/products/${product.slug}`, changeFrequency: "monthly" as const, priority: .7 }))];
}
