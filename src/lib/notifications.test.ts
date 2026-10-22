import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { messageFor } from "./notifications";
import type { Order } from "./types";

const order: Order = {
  id: "DC-261022-ABC123",
  createdAt: "2026-10-22T10:00:00.000Z",
  updatedAt: "2026-10-22T10:00:00.000Z",
  status: "received",
  customer: { name: "A Customer", phone: "+91 99967 77453", email: "buyer@example.com", company: "Example", address: "Ambala" },
  items: [{ productId: "D1", productName: "Bathroom Cleaner", quantity: 2, packSize: "5 L", customization: "Custom label" }],
  notes: "Call before dispatch",
  images: [],
  timeline: [{ status: "received", note: "Order request received.", createdAt: "2026-10-22T10:00:00.000Z" }],
  notifications: { whatsapp: "preview", email: "preview" },
};

describe("customer notification content", () => {
  it("includes the customer, order, item details, and private tracking link", () => {
    const message = messageFor(order);
    assert.match(message, /Hello A Customer/);
    assert.match(message, /DC-261022-ABC123/);
    assert.match(message, /2 × Bathroom Cleaner — 5 L · Custom label/);
    assert.match(message, /\/track\/DC-261022-ABC123/);
  });
});
