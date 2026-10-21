export const ORDER_STATUSES = ["received", "reviewing", "confirmed", "in-production", "ready", "dispatched", "delivered", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type OrderItem = { productId: string; productName: string; quantity: number; packSize: string; customization: string };
export type OrderEvent = { status: OrderStatus; note: string; createdAt: string };
export type OrderImage = { name: string; dataUrl: string; kind: "reference" | "final" };

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  customer: { name: string; phone: string; email: string; company: string; address: string };
  items: OrderItem[];
  notes: string;
  images: OrderImage[];
  timeline: OrderEvent[];
  notifications: { whatsapp: "sent" | "preview" | "failed"; email: "sent" | "preview" | "failed" };
};

export type CreateOrderInput = Omit<Order, "id" | "createdAt" | "updatedAt" | "status" | "timeline" | "notifications">;
