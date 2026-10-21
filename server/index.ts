import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { ADMIN_COOKIE, createAdminToken, requireAdmin, validPassword } from "./auth";
import { answerSupport } from "./support";
import { createOrder, getOrder, listOrders, saveNotificationState, updateOrder } from "../src/lib/orders";
import { notifyCustomer } from "../src/lib/notifications";
import { getPrices, setPrice } from "../src/lib/pricing";
import type { OrderImage } from "../src/lib/types";
import { isOrderStatus, validateOrderInput } from "../src/lib/validation";

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((value) => value.trim());

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); callback(new Error("Origin not allowed.")); }, credentials: true }));
app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());

const attempts = new Map<string, { count: number; resetAt: number }>();
function rateLimit(limit: number, windowMs: number) {
  return (request: Request, response: Response, next: NextFunction) => {
    const key = `${request.ip}:${request.path}`; const now = Date.now(); const current = attempts.get(key);
    if (!current || current.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + windowMs }); return next(); }
    if (current.count >= limit) return response.status(429).json({ error: "Too many requests. Please wait and try again." });
    current.count += 1; next();
  };
}

app.get("/api/health", (_request, response) => response.json({ ok: true, service: "dynamic-chemicals-api" }));
app.get("/api/prices", async (_request, response, next) => { try { response.json({ prices: await getPrices() }); } catch (error) { next(error); } });

app.post("/api/orders", rateLimit(8, 60_000), async (request, response, next) => {
  try {
    const result = validateOrderInput(request.body);
    if (!result.data || result.errors.length) return response.status(400).json({ errors: result.errors });
    const order = await createOrder(result.data);
    order.notifications = await notifyCustomer(order);
    await saveNotificationState(order);
    response.status(201).json({ order });
  } catch (error) { next(error); }
});

app.get("/api/orders/:id", rateLimit(30, 60_000), async (request, response, next) => {
  try {
    const order = await getOrder(String(request.params.id).toUpperCase());
    if (!order) return response.status(404).json({ error: "Order not found." });
    response.json({ order: { ...order, images: order.images.filter((image) => image.kind === "final"), notes: "", customer: { name: order.customer.name, company: order.customer.company, email: maskEmail(order.customer.email), phone: maskPhone(order.customer.phone), address: "" } } });
  } catch (error) { next(error); }
});

app.post("/api/support", rateLimit(20, 60_000), async (request, response) => {
  try { response.json(await answerSupport(request.body?.message, request.body?.orderId)); }
  catch (error) { response.status(400).json({ error: error instanceof Error ? error.message : "Support is unavailable." }); }
});

app.post("/api/admin/login", rateLimit(5, 15 * 60_000), (request, response) => {
  if (!validPassword(String(request.body?.password || ""))) return response.status(401).json({ error: "Invalid password." });
  response.cookie(ADMIN_COOKIE, createAdminToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000, path: "/" });
  response.json({ ok: true });
});

app.post("/api/admin/logout", requireAdmin, (_request, response) => { response.clearCookie(ADMIN_COOKIE, { path: "/" }); response.json({ ok: true }); });
app.get("/api/admin/orders", requireAdmin, async (_request, response, next) => { try { response.json({ orders: await listOrders() }); } catch (error) { next(error); } });
app.patch("/api/admin/orders/:id", requireAdmin, async (request, response, next) => {
  try {
    if (!isOrderStatus(request.body?.status)) return response.status(400).json({ error: "Choose a valid status." });
    const images: OrderImage[] = Array.isArray(request.body.images) ? request.body.images.slice(0, 6).filter((image: OrderImage) => image?.kind === "final" && /^data:image\/(png|jpeg|webp);base64,/.test(image.dataUrl)) : [];
    const order = await updateOrder(String(request.params.id), request.body.status, String(request.body.note || "").slice(0, 600), images);
    if (!order) return response.status(404).json({ error: "Order not found." });
    order.notifications = await notifyCustomer(order); await saveNotificationState(order); response.json({ order });
  } catch (error) { next(error); }
});
app.get("/api/admin/prices", requireAdmin, async (_request, response, next) => { try { response.json({ prices: await getPrices() }); } catch (error) { next(error); } });
app.patch("/api/admin/prices", requireAdmin, async (request, response) => {
  const amount = request.body?.amount === "" || request.body?.amount === null ? null : Number(request.body?.amount);
  if (amount !== null && (!Number.isFinite(amount) || amount < 0)) return response.status(400).json({ error: "Enter a valid price." });
  try { response.json({ price: await setPrice(String(request.body?.productId), amount, String(request.body?.unit || "per pack")) }); }
  catch (error) { response.status(400).json({ error: error instanceof Error ? error.message : "Unable to save pricing." }); }
});

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ error: "The service could not complete that request." });
});

app.listen(port, () => console.log(`Dynamic Chemicals API listening on http://localhost:${port}`));

function maskEmail(email: string) { const [name, domain = ""] = email.split("@"); return `${name.slice(0, 2)}***@${domain}`; }
function maskPhone(phone: string) { return `${phone.slice(0, 3)}*****${phone.slice(-3)}`; }
