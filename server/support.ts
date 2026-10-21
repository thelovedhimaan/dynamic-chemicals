import { getOrder } from "../src/lib/orders";
import { products } from "../src/lib/products";

const contact = "Call or WhatsApp +91 99967 77453, or email thedynamicchemicals@gmail.com.";

function guided(message: string, orderStatus = "") {
  const value = message.toLowerCase();
  if (orderStatus) return orderStatus;
  if (/hello|hi|hey|namaste/.test(value)) return "Hello! I can help you find a product, explain the order process, or check an order status.";
  if (/price|cost|rate|quote/.test(value)) return "Catalogue prices are controlled by the team. Final pricing depends on quantity, pack size, delivery, and customization.";
  if (/track|status|where.*order/.test(value)) return "Enter your tracking ID here or use the Track order page. Tracking IDs begin with DC-.";
  if (/custom|label|pack|personal/.test(value)) return "You can request pack-size, label, or packaging changes for each item and attach reference images for review.";
  if (/bathroom|toilet|floor|glass|furniture|fresh/.test(value)) return "The housekeeping range covers bathroom, all-purpose, glass, furniture, air, toilet, and floor-care products.";
  if (/boiler|cooling|ro|water treatment|resin/.test(value)) return "For boiler, cooling-tower, RO, or resin needs, include system details and current operating conditions in your request.";
  if (/mix|drink|ingest|medical|poison|burn|eye|emergency|dosage|dilution/.test(value)) return `I cannot provide emergency, medical, mixing, or dilution instructions. Follow the approved label and safety data sheet, and contact a qualified professional. ${contact}`;
  if (/contact|human|person|support/.test(value)) return contact;
  return `I can help with products, custom orders, pricing steps, and tracking. For a technical recommendation, ${contact}`;
}

function extractText(data: { output?: { content?: { text?: string }[] }[] }) { return data.output?.flatMap((item) => item.content || []).map((item) => item.text).find(Boolean); }

export async function answerSupport(messageValue: unknown, orderIdValue: unknown) {
  const message = String(messageValue || "").trim().slice(0, 800);
  if (!message) throw new Error("Enter a question.");
  const requestedId = String(orderIdValue || message.match(/DC-[A-Z0-9-]+/i)?.[0] || "").toUpperCase();
  let orderContext = "";
  if (requestedId) { const order = await getOrder(requestedId); orderContext = order ? `Order ${order.id} is ${order.status.replaceAll("-", " ")}. Latest update: ${order.timeline.at(-1)?.note || "No note"}. Updated ${order.updatedAt}. Tracking URL: ${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")}/track/${order.id}` : `I could not find ${requestedId}. Check the characters and try again.`; }
  if (!process.env.OPENAI_API_KEY) return { reply: guided(message, orderContext), mode: "guided" };
  const catalogue = products.map((product) => `${product.id} ${product.name}: ${product.summary}`).join("\n");
  const apiResponse = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-5-mini", max_output_tokens: 220, input: [{ role: "system", content: `You are Dynamic Chemicals customer support. Answer briefly using only supplied catalogue and order context. Never invent prices, availability, chemical compatibility, dilution, safety, medical, or emergency advice. Direct safety-sensitive questions to the approved label/SDS and a qualified person. Do not reveal private customer data. Contact: ${contact}\nCATALOGUE:\n${catalogue}\nORDER:\n${orderContext || "No verified order supplied."}` }, { role: "user", content: message }] }) });
  if (!apiResponse.ok) return { reply: guided(message, orderContext), mode: "guided" };
  return { reply: extractText(await apiResponse.json()) || guided(message, orderContext), mode: "ai" };
}
