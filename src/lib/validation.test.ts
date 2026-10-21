import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isOrderStatus, validateOrderInput } from "./validation";

const valid = { customer: { name: "A Customer", phone: "+91 99967 77453", email: "buyer@example.com", company: "Example", address: "Ambala" }, items: [{ productId: "D1", productName: "Bathroom Cleaner", quantity: 2, packSize: "5 L", customization: "Custom label" }], notes: "Call before dispatch", images: [] };

describe("order validation", () => {
  it("accepts and normalizes a complete multi-item request", () => { const result = validateOrderInput(valid); assert.deepEqual(result.errors, []); assert.equal(result.data?.items[0].quantity, 2); });
  it("rejects missing contact and product information", () => { const result = validateOrderInput({ customer: {}, items: [] }); assert.ok(result.errors.length >= 3); });
  it("caps unsafe quantities", () => { const result = validateOrderInput({ ...valid, items: [{ ...valid.items[0], quantity: 5000 }] }); assert.equal(result.data?.items[0].quantity, 999); });
  it("recognizes only supported workflow statuses", () => { assert.equal(isOrderStatus("in-production"), true); assert.equal(isOrderStatus("lost"), false); });
});
