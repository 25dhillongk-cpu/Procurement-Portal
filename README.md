KisanSetu — Procurement Slot Booking (Frontend)

Frontend built for SIH 2026 Problem Statement 26032 (Ministry of Consumer Affairs, Food & Public
Distribution): farmer registration, slot booking, real-time queue status, and payment history.

This is a **frontend-only** demo — all data lives in `lib/mock-data.ts`. Wire the functions in
that file (and the `onClick`/`onSubmit` handlers in each page) to your real backend/API.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/page.tsx` — overview / landing page
- `app/book-slot/page.tsx` — farmer details → slot picker → confirmation (3-step flow)
- `app/queue/page.tsx` — live token status, queue position, estimated wait, stage tracker
- `app/payment-history/page.tsx` — procurement + payment ledger with status filters
- `components/` — `Navbar`, `TokenTicket` (the token/ticket card), `StatusBadge`
- `lib/types.ts` — shared TypeScript types for slots, bookings, payments
- `lib/mock-data.ts` — sample centres, slots, bookings, and payment records

## Wiring to a real backend

- Replace `centres`/`slots` in `mock-data.ts` with a fetch to your centres/slots API.
- In `book-slot/page.tsx`, `handleConfirmBooking` currently generates a token client-side —
  replace it with a POST to your booking endpoint and use the token it returns.
- In `queue/page.tsx`, the `setInterval` simulates a live feed — replace it with a WebSocket
  subscription or a polling fetch to your queue-status endpoint.
- SMS/app notifications: trigger these server-side when a booking is confirmed and when queue
  position changes materially (e.g. every 5th place, or under 15 minutes' wait).
