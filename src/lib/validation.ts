import { ORDER_STATUSES, type CreateOrderInput, type OrderStatus } from "./types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s-]{7,16}$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateOrderInput(value: unknown): { data?: CreateOrderInput; errors: string[] } {
  if (!value || typeof value !== "object") return { errors: ["Order details are required."] };
  const input = value as Record<string, unknown>;
  const rawCustomer = input.customer && typeof input.customer === "object" ? input.customer as Record<string, unknown> : {};
  const customer = {
    name: text(rawCustomer.name, 80), phone: text(rawCustomer.phone, 20), email: text(rawCustomer.email, 120),
    company: text(rawCustomer.company, 120), address: text(rawCustomer.address, 400),
  };
  const errors: string[] = [];
  if (customer.name.length < 2) errors.push("Enter the customer name.");
  if (!phonePattern.test(customer.phone)) errors.push("Enter a valid WhatsApp number with country code.");
  if (!emailPattern.test(customer.email)) errors.push("Enter a valid email address.");
  const items = Array.isArray(input.items) ? input.items.slice(0, 20).map((entry) => {
    const item = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    return {
      productId: text(item.productId, 30), productName: text(item.productName, 120),
      quantity: Math.max(1, Math.min(999, Number(item.quantity) || 1)), packSize: text(item.packSize, 40),
      customization: text(item.customization, 600),
    };
  }).filter((item) => item.productId && item.productName) : [];
  if (!items.length) errors.push("Add at least one product.");
  const images = Array.isArray(input.images) ? input.images.slice(0, 6).flatMap((entry) => {
    const image = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    const dataUrl = text(image.dataUrl, 1_500_000);
    if (!/^data:image\/(png|jpeg|webp);base64,/.test(dataUrl)) return [];
    return [{ name: text(image.name, 100) || "reference-image", dataUrl, kind: image.kind === "final" ? "final" as const : "reference" as const }];
  }) : [];
  if (images.some((image) => image.dataUrl.length > 1_500_000)) errors.push("Each image must be smaller than 1 MB.");
  return { data: { customer, items, notes: text(input.notes, 1200), images }, errors };
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && ORDER_STATUSES.includes(value as OrderStatus);
}
