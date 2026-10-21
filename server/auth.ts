import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "dc-admin-session";
const secret = () => process.env.SESSION_SECRET || "local-development-secret";

export function validPassword(value: string) {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || "local-admin");
  const actual = Buffer.from(value);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createAdminToken() {
  return jwt.sign({ role: "admin" }, secret(), { algorithm: "HS256", issuer: "dynamic-chemicals", subject: "dynamic-chemicals-admin", expiresIn: "8h" });
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const token = request.cookies?.[ADMIN_COOKIE] || request.headers.authorization?.replace(/^Bearer\s+/i, "");
  try { const claims = jwt.verify(token || "", secret(), { algorithms: ["HS256"], issuer: "dynamic-chemicals", subject: "dynamic-chemicals-admin" }) as jwt.JwtPayload; if (claims.role !== "admin") throw new Error("Invalid role"); next(); }
  catch { response.status(401).json({ error: "Unauthorized." }); }
}
