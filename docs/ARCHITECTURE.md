# Dynamic Chemicals architecture

## Application boundaries

- Next.js renders the catalogue, product pages, order builder, tracking experience, and private admin workspace.
- A dedicated Node.js and Express service owns validation, authentication, orders, prices, notifications, and AI support.
- Next.js rewrites same-origin `/api/*` requests to the Express service, so database and provider credentials never reach the browser.
- Supabase REST stores order documents and product prices in production.
- Local JSON files under `.data/` provide a zero-configuration development fallback and are ignored by Git.
- Meta WhatsApp Cloud API sends approved order-status templates.
- Resend sends matching email updates.
- OpenAI Responses provides grounded support replies when configured; deterministic support remains available without a key.

## Authentication

Express compares the configured admin password using a timing-safe check. A successful login creates an HS256 JSON Web Token containing issuer, role, issued-at, and eight-hour expiry claims. The token is stored in an HTTP-only, secure, same-site cookie and verified by Express middleware on every admin API request.

## Order lifecycle

1. The customer builds a multi-product request and previews item-level changes and reference images.
2. The server validates contact details, item limits, text lengths, image formats, and image sizes.
3. The order is stored with a non-sequential tracking ID and a `received` timeline event.
4. Staff update status, add a customer-facing note, and optionally attach final-product images.
5. The update is persisted before WhatsApp and email delivery is attempted.
6. The tracking page exposes masked contact details, milestones, and final-product images only.

## Production recovery

- Database recovery uses Supabase backups and point-in-time recovery according to the selected plan.
- Deployment rollback uses the hosting provider's previous immutable deployment.
- Notification delivery results are recorded on the order; failed deliveries remain visible to staff for manual follow-up.
- Rotating `SESSION_SECRET` invalidates every active admin token immediately.
