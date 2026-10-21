# Dynamic Chemicals

A modern product catalogue, multi-item ordering, customer tracking, and operations platform for Dynamic Chemicals.

## What is included

### Customer experience

- Searchable, responsive product catalogue with application filters
- Product detail pages with clear review and safety boundaries
- Admin-managed catalogue pricing with quote-based fallback
- Multi-item order requests with quantity, pack size, and per-item personalization
- Reference-image upload and complete on-screen order preview
- Private tracking IDs and dedicated tracking URLs
- Status timeline and final-product image delivery
- WhatsApp continuation and automated WhatsApp/email status updates
- AI-assisted support for basic product, pricing-process, and order-status questions

### Private operations

- Staff-only `/admin` workspace
- Timing-safe password verification
- Signed HS256 JSON Web Tokens in HTTP-only, same-site cookies
- Product price and unit management
- Full customer order review
- Controlled order-status transitions and customer-facing notes
- Reference and final-product image review
- WhatsApp and email delivery-state feedback

### Platform quality

- Accessible, mobile-first UI with reduced-motion support
- Structured business data, metadata, robots rules, and sitemap
- Strict TypeScript across frontend and backend
- Input limits, image validation, masked public contact data, CORS, security headers, and rate limits
- Automated validation tests and zero known npm vulnerabilities

## Architecture

| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js 16, React 19, TypeScript, native CSS |
| Backend | Node.js, Express 5, TypeScript |
| Authentication | HS256 JWT in secure HTTP-only cookies |
| Production data | Supabase REST and PostgreSQL |
| Local data | JSON development fallback under `.data/` |
| WhatsApp | Meta WhatsApp Cloud API templates |
| Email | Resend API |
| AI support | OpenAI Responses API with grounded catalogue/order context |
| Testing | Node test runner and TypeScript |

The frontend proxies `/api/*` to the Express backend, keeping every database and provider credential on the server. See [the architecture document](./docs/ARCHITECTURE.md) for the full lifecycle.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
copy .env.example .env.local
npm run dev
```

- Customer site: [http://localhost:3000](http://localhost:3000)
- Express health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Without external provider credentials, orders and prices use the local `.data/` store and notification delivery is reported as `preview`. The default development-only admin password is `local-admin`; set `ADMIN_PASSWORD` and `SESSION_SECRET` before any shared deployment.

## Production configuration

1. Run [supabase/schema.sql](./supabase/schema.sql) in the Supabase SQL editor.
2. Create a private Supabase project and add its URL and service-role key to the Express environment.
3. Create and approve the Meta WhatsApp template named by `WHATSAPP_STATUS_TEMPLATE` with customer name, order ID, status, and tracking URL parameters.
4. Verify the sending domain in Resend and set `ORDER_FROM_EMAIL`.
5. Add an OpenAI API key to enable generative support replies. Without it, the safe guided support flow remains active.
6. Deploy Next.js and Express separately, then set `API_URL`, `NEXT_PUBLIC_SITE_URL`, and `CORS_ORIGIN` to their production URLs.

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_ACCESS_TOKEN`, `RESEND_API_KEY`, `OPENAI_API_KEY`, `ADMIN_PASSWORD`, or `SESSION_SECRET` to the browser.

## Verification

```bash
npm run check
npm run build
npm audit
```

The current baseline passes frontend and backend TypeScript checks, four automated validation tests, both production builds, and an end-to-end Express API exercise covering login, pricing, ordering, tracking, and status updates.

## Business contact

- Phone and WhatsApp: +91 99967 77453
- Email: thedynamicchemicals@gmail.com
- Address: 105 Green Park, Mahesh Nagar, Ambala Cantt., Haryana 133001

Product suitability, directions, safety documentation, availability, pricing, and delivery terms must be confirmed by Dynamic Chemicals during order review.
