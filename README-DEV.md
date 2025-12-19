# Dev: testing Stripe webhooks 🔁

You can test the flow that records an order after a successful Stripe checkout in two ways:

1. Using the Stripe CLI (recommended)
   - Run `stripe login`
   - Run `stripe listen --forward-to http://localhost:3000/api/webhooks/stripe`
   - Copy the webhook signing secret output by the CLI into your `.env` as `STRIPE_WEBHOOK_SECRET`
   - Create a checkout session via the app (click *Acheter* on a product) and finish the checkout in Stripe's hosted test page; the forwarded `checkout.session.completed` will be delivered and recorded.

2. Quick dev-only simulation (no Stripe CLI required)
   - Use the dev helper endpoints (only allowed in non-production):
     - `GET /api/dev/create-order` — creates an order for the first product (handy for quick checks)
     - `POST /api/webhooks/stripe/simulate` — send a session-like JSON body, e.g.:
       {
         "metadata": { "productId": "<PRODUCT_ID>", "quantity": "1" },
         "amount_total": 299900
       }
   - The webhook handler will create the order and decrement product stock; check the dashboard at `/dashboard/orders` to see results.

Note: The dev simulation endpoints are guarded and will return 403 in production.
