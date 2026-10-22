import type { Order } from "./types";

export type DeliveryResult = { whatsapp: "sent" | "preview" | "failed"; email: "sent" | "preview" | "failed" };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function itemSummary(order: Order) {
  return order.items.map((item) => `${item.quantity} × ${item.productName}${item.packSize ? ` (${item.packSize})` : ""}`).join(", ");
}

export function messageFor(order: Order) {
  const event = order.timeline.at(-1);
  const items = order.items.map((item) => {
    const details = [item.packSize, item.customization].filter(Boolean).join(" · ");
    return `- ${item.quantity} × ${item.productName}${details ? ` — ${details}` : ""}`;
  }).join("\n");
  const introduction = order.timeline.length === 1
    ? `Hello ${order.customer.name}, we received your Dynamic Chemicals order request.`
    : `Hello ${order.customer.name}, your Dynamic Chemicals order has been updated.`;
  return `${introduction}\n\nOrder ID: ${order.id}\nStatus: ${order.status.replaceAll("-", " ")}\n\nProducts:\n${items}\n\n${event?.note || ""}\n\nTrack your order: ${siteUrl}/track/${order.id}`;
}

async function sendWhatsApp(order: Order) {
  if (!process.env.WHATSAPP_PHONE_NUMBER_ID || !process.env.WHATSAPP_ACCESS_TOKEN) return "preview" as const;
  const isConfirmation = order.timeline.length === 1;
  const parameters = isConfirmation
    ? [order.customer.name, order.id, itemSummary(order), order.status.replaceAll("-", " "), `${siteUrl}/track/${order.id}`]
    : [order.customer.name, order.id, order.status.replaceAll("-", " "), `${siteUrl}/track/${order.id}`];
  const response = await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST", headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: order.customer.phone.replace(/\D/g, ""), type: "template", template: { name: isConfirmation ? process.env.WHATSAPP_ORDER_TEMPLATE || "order_confirmation" : process.env.WHATSAPP_STATUS_TEMPLATE || "order_status_update", language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" }, components: [{ type: "body", parameters: parameters.map((text) => ({ type: "text", text })) }] } }),
  });
  return response.ok ? "sent" as const : "failed" as const;
}

async function sendEmail(order: Order) {
  if (!process.env.RESEND_API_KEY || !process.env.ORDER_FROM_EMAIL) return "preview" as const;
  const isConfirmation = order.timeline.length === 1;
  const subject = isConfirmation ? `We received your order request ${order.id}` : `Order ${order.id}: ${order.status.replaceAll("-", " ")}`;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.ORDER_FROM_EMAIL, to: [order.customer.email], subject, text: messageFor(order), reply_to: process.env.ORDER_REPLY_TO || process.env.ORDER_ADMIN_EMAIL }) });
  return response.ok ? "sent" as const : "failed" as const;
}

export async function notifyCustomer(order: Order): Promise<DeliveryResult> {
  const [whatsapp, email] = await Promise.all([sendWhatsApp(order).catch(() => "failed" as const), sendEmail(order).catch(() => "failed" as const)]);
  return { whatsapp, email };
}
