import type { Order } from "./types";

export type DeliveryResult = { whatsapp: "sent" | "preview" | "failed"; email: "sent" | "preview" | "failed" };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function messageFor(order: Order) {
  const event = order.timeline.at(-1);
  return `Dynamic Chemicals order ${order.id}: ${order.status.replaceAll("-", " ")}. ${event?.note || ""} Track: ${siteUrl}/track/${order.id}`;
}

async function sendWhatsApp(order: Order) {
  if (!process.env.WHATSAPP_PHONE_NUMBER_ID || !process.env.WHATSAPP_ACCESS_TOKEN) return "preview" as const;
  const response = await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST", headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: order.customer.phone.replace(/\D/g, ""), type: "template", template: { name: process.env.WHATSAPP_STATUS_TEMPLATE || "order_status_update", language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" }, components: [{ type: "body", parameters: [{ type: "text", text: order.customer.name }, { type: "text", text: order.id }, { type: "text", text: order.status.replaceAll("-", " ") }, { type: "text", text: `${siteUrl}/track/${order.id}` }] }] } }),
  });
  return response.ok ? "sent" as const : "failed" as const;
}

async function sendEmail(order: Order) {
  if (!process.env.RESEND_API_KEY || !process.env.ORDER_FROM_EMAIL) return "preview" as const;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.ORDER_FROM_EMAIL, to: [order.customer.email], subject: `Order ${order.id}: ${order.status.replaceAll("-", " ")}`, text: messageFor(order) }) });
  return response.ok ? "sent" as const : "failed" as const;
}

export async function notifyCustomer(order: Order): Promise<DeliveryResult> {
  const [whatsapp, email] = await Promise.all([sendWhatsApp(order).catch(() => "failed" as const), sendEmail(order).catch(() => "failed" as const)]);
  return { whatsapp, email };
}
