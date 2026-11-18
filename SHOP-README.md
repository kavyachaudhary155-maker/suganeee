# Suganee Makeup Artist — Dedicated Beauty Store Preview

The original portfolio remains the main experience. The **Shop** navbar item and homepage shopping banner open a separate, full-screen dark beauty storefront.

## Storefront features
- Separate dark / futuristic shop experience with its own store navigation
- Homepage shopping banner and dark Shop navbar entry point
- Product search, category filters, product detail modal and sample catalogue
- Persistent shopping bag, quantity controls, remove item and totals
- Checkout page with customer and delivery address form
- Shipping estimate, illustrative tax calculation and payment-method selection
- Demo order confirmation with generated order reference
- Order lookup by order reference + email and a delivery timeline preview

## Important: demo checkout, not live commerce
This project is a **front-end prototype**. It does not collect card data or charge a payment method. The card option simulates a successful checkout; Cash on Delivery is also a demonstration choice. Demo orders and tracking records are saved in the visitor's browser local storage only. They are not sent to the business, cannot be viewed on another device, and do not represent real shipments.

Before accepting real orders, the business must choose and configure a commerce/payment provider (for example Shopify or Stripe Checkout) with server-side order creation, webhook verification, secure payment handling, inventory and tax/shipping rules. Real tracking requires a shipping provider account/API and backend event updates. Never put secret API keys in frontend code or commit them to GitHub.

## Sample content
Product names, images, descriptions and prices are placeholders for the client presentation. Replace them with approved product information, correct tax/shipping rules and actual inventory before launch.

## Run locally

```bash
npm install
npm run dev
```

## Build for Vercel

```bash
npm run build
```

Vercel configuration is included in `vercel.json`; production output is `dist`.
