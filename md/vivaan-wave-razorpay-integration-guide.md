# Vivaan Wave — Razorpay Payment Integration Guide (No Database, Email-Based Records)

This replaces the earlier DB-based plan. **No database, no order-number system.** Orders are recorded by sending confirmation emails to the customer and vendor — Razorpay's own dashboard + those emails together are your record.

---

## 1. What We're Going to Do

**Current state (already built by you):**
- Static product catalog in `src/data/products.ts` (source of truth for prices — stays exactly as-is)
- Guest cart (no login/signup) via `CartProvider`
- Checkout page with three payment-plan buttons: **10% / 50% / 100% upfront**

**What's missing, and what this guide adds:**

| Add | Purpose |
|---|---|
| One backend route to create a Razorpay order | Recomputes the real amount server-side from `products.ts` — frontend never dictates the price |
| Razorpay Checkout modal on the frontend | Actually collects the payment |
| One backend route to verify the payment | Confirms the payment is real and for the correct amount before you treat it as paid |
| Email sending (customer + vendor) | Acts as your order record, since there's no database |

**Explicitly NOT doing:** no database, no Prisma, no order-ID generator, no admin dashboard, no order-status page. Razorpay's own `order_id` / `payment_id` (visible in your Razorpay Dashboard) double as your reference numbers — you don't need to invent your own.

**High-level flow:**

```
Customer fills checkout form (name, mobile, email, address)
      → reviews cart
      → clicks one of the 3 payment plan buttons
            ↓
   POST /api/create-order
      - backend recalculates cart total from src/data/products.ts
      - applies the chosen % (10/50/100)
      - creates a Razorpay Order for that exact amount
            ↓
   Razorpay Checkout modal opens → customer pays
            ↓
   POST /api/verify-payment
      - verifies the payment signature (proves it's real, from Razorpay)
      - re-fetches the payment from Razorpay's API and re-checks the amount
      - if valid: emails a receipt to the customer AND a new-order notification to you (the vendor)
```

No step here writes to a database — everything after payment is confirmed lives in the two emails.

---

## 2. How We're Going to Do It

### 2.1 Install dependencies

```bash
npm install razorpay resend
```

- `razorpay` — official Node SDK, used server-side only
- `resend` — for sending the two emails (simple API, generous free tier, works well with Next.js). If you'd rather use Gmail/SMTP instead of adding a new service, say so and I'll swap this part for Nodemailer.

### 2.2 Create `.env.local` (project root)

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
VENDOR_EMAIL=you@yourdomain.com
EMAIL_FROM="Vivaan Wave <orders@yourdomain.com>"

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

Get the real `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` from your Razorpay Dashboard (Test Mode → Settings → API Keys) — don't reuse whatever was pasted into this chat.

Confirm `.env.local` is already in `.gitignore` (Next.js adds this by default — just double check it's actually there).

### 2.3 New file: `src/lib/razorpay.ts`

```ts
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
```

### 2.4 New file: `src/lib/pricing.ts`

Shared logic so both API routes compute totals identically — avoids the two routes drifting out of sync.

```ts
import { products } from "@/data/products"; // adjust import to your actual export

const PLAN_MULTIPLIER: Record<string, number> = {
  tenPercent: 0.10,
  fiftyPercent: 0.50,
  fullPrice: 1.0,
};

export type CartItemInput = { productId: string; variantId?: string; quantity: number };

export function computeOrderTotals(items: CartItemInput[], plan: string) {
  const multiplier = PLAN_MULTIPLIER[plan];
  if (!multiplier) throw new Error("Invalid plan");

  let subtotal = 0;
  const lineItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Invalid product: ${item.productId}`);

    // Adjust to however products.ts models variants (FRP vs SS 304 etc.)
    const variant = item.variantId
      ? product.variants?.find((v) => v.id === item.variantId)
      : null;
    const unitPrice = variant ? variant.price : product.price;

    subtotal += unitPrice * item.quantity;

    return { name: product.name, unitPrice, quantity: item.quantity };
  });

  const amountDueNow = Math.round(subtotal * multiplier * 100); // paise
  const totalOrderValuePaise = subtotal * 100;
  const remainingPaise = totalOrderValuePaise - amountDueNow;

  return { lineItems, subtotal, amountDueNow, totalOrderValuePaise, remainingPaise, plan };
}
```

### 2.5 New file: `src/app/api/create-order/route.ts`

```ts
import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { computeOrderTotals } from "@/lib/pricing";

export async function POST(req: Request) {
  try {
    const { items, plan, customer } = await req.json();
    const totals = computeOrderTotals(items, plan);

    if (totals.amountDueNow < 100) {
      return NextResponse.json({ error: "Amount too low" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: totals.amountDueNow,
      currency: "INR",
      notes: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        plan,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: totals.amountDueNow,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Order creation failed" }, { status: 500 });
  }
}
```

Note: customer/order details are also attached to the Razorpay Order via `notes` — so even without your own database, you can always look up who an order/payment belongs to directly inside the Razorpay Dashboard.

### 2.6 New file: `src/lib/email.ts`

```ts
import { Resend } from "resend";
import type { CartItemInput } from "./pricing";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderEmailData = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  customer: { name: string; email: string; phone: string; address: string };
  lineItems: { name: string; unitPrice: number; quantity: number }[];
  amountDueNow: number;    // paise
  remainingPaise: number;
  plan: string;
};

function itemsHtml(items: OrderEmailData["lineItems"]) {
  return items
    .map((i) => `<li>${i.name} × ${i.quantity} — ₹${((i.unitPrice * i.quantity) / 1).toLocaleString("en-IN")}</li>`)
    .join("");
}

export async function sendCustomerReceipt(data: OrderEmailData) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.customer.email,
    subject: `Your Vivaan Wave order is confirmed (${data.razorpayOrderId})`,
    html: `
      <h2>Thanks, ${data.customer.name}!</h2>
      <p>Reference: <strong>${data.razorpayOrderId}</strong></p>
      <ul>${itemsHtml(data.lineItems)}</ul>
      <p>Paid now: ₹${(data.amountDueNow / 100).toLocaleString("en-IN")}</p>
      ${data.remainingPaise > 0 ? `<p>Remaining balance (to be collected separately): ₹${(data.remainingPaise / 100).toLocaleString("en-IN")}</p>` : ""}
      <p>Delivery address: ${data.customer.address}</p>
    `,
  });
}

export async function sendVendorNotification(data: OrderEmailData) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.VENDOR_EMAIL!,
    subject: `New order received (${data.razorpayOrderId})`,
    html: `
      <h2>New order — ${data.plan}</h2>
      <p>Customer: ${data.customer.name} | ${data.customer.phone} | ${data.customer.email}</p>
      <p>Address: ${data.customer.address}</p>
      <ul>${itemsHtml(data.lineItems)}</ul>
      <p>Amount paid now: ₹${(data.amountDueNow / 100).toLocaleString("en-IN")}</p>
      <p>Remaining: ₹${(data.remainingPaise / 100).toLocaleString("en-IN")}</p>
      <p>Razorpay Payment ID: ${data.razorpayPaymentId}</p>
    `,
  });
}
```

### 2.7 New file: `src/app/api/verify-payment/route.ts`

This re-does the price calculation independently (never trusts the frontend's numbers) and only emails/confirms if everything checks out.

```ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { computeOrderTotals } from "@/lib/pricing";
import { sendCustomerReceipt, sendVendorNotification } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    plan,
    customer,
  } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ status: "failed", reason: "invalid signature" }, { status: 400 });
  }

  // Recompute the expected amount independently — never trust items/plan blindly either,
  // but cross-check against what Razorpay actually captured.
  const totals = computeOrderTotals(items, plan);
  const payment = await razorpay.payments.fetch(razorpay_payment_id);

  if (payment.amount !== totals.amountDueNow || payment.order_id !== razorpay_order_id) {
    return NextResponse.json({ status: "failed", reason: "amount mismatch" }, { status: 400 });
  }

  const emailData = {
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    customer,
    lineItems: totals.lineItems,
    amountDueNow: totals.amountDueNow,
    remainingPaise: totals.remainingPaise,
    plan,
  };

  await Promise.all([sendCustomerReceipt(emailData), sendVendorNotification(emailData)]);

  return NextResponse.json({ status: "success" });
}
```

**Why items/customer are sent again here:** since there's no database to look them up from, the frontend (which already has this data from the checkout form + cart) resends it at verification time. The backend doesn't blindly trust it though — it recomputes the price from `products.ts` itself and cross-checks against what Razorpay's API says was actually captured, so tampering this payload doesn't help an attacker.

### 2.8 Edit: `src/app/layout.tsx`

Add the Razorpay script once, site-wide:

```tsx
<script src="https://checkout.razorpay.com/v1/checkout.js" async />
```

### 2.9 Edit: your checkout page (wherever the 10/50/100% buttons currently live)

Wire each button to this handler — adjust variable names (`cart`, `customerForm`, etc.) to match what you already have:

```tsx
"use client";

async function handlePayment(plan: "tenPercent" | "fiftyPercent" | "fullPrice") {
  const items = cart.items.map((i) => ({
    productId: i.productId,
    variantId: i.variantId,
    quantity: i.quantity,
  }));
  const customer = {
    name: customerForm.name,
    email: customerForm.email,
    phone: customerForm.phone,
    address: customerForm.address,
  };

  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, plan, customer }),
  });
  const data = await res.json();

  if (!res.ok) {
    alert(data.error ?? "Something went wrong, please try again.");
    return;
  }

  const options = {
    key: data.keyId,
    amount: data.amount,
    currency: "INR",
    name: "Vivaan Wave",
    order_id: data.orderId,
    prefill: { name: customer.name, email: customer.email, contact: customer.phone },
    handler: async (response: any) => {
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...response, items, plan, customer }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.status === "success") {
        // show a success screen / redirect to a thank-you page
      } else {
        alert("Payment could not be verified. Please contact us with your payment ID.");
      }
    },
    modal: {
      ondismiss: () => {
        // user closed the modal without paying — no action needed
      },
    },
    theme: { color: "#0f766e" },
  };

  // @ts-ignore — Razorpay is loaded globally via the <script> tag
  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (resp: any) => {
    alert(`Payment failed: ${resp.error.description}`);
  });
  rzp.open();
}
```

### 2.10 Nothing to delete

Your existing `src/data/`, `src/components/`, `CartProvider`, and checkout UI all stay exactly as they are. This only adds 4 new files and edits 2 existing ones.

---

## 3. Manual Steps You Still Need To Do

1. **Get real Razorpay Test keys** — Dashboard → Settings → API Keys → Generate Test Key. Put them in `.env.local`, not in chat/code.
2. **Sign up for Resend** (or tell me to switch to Nodemailer/SMTP instead) and get an API key.
3. **Decide your `VENDOR_EMAIL`** — where new-order notifications should land (could be your own inbox).
4. **Domain verification in Resend** — needed before you can send to *arbitrary* customer addresses in production; in test mode you can only send to your own signup email until that's done.
5. Confirm your actual `products.ts` export shape matches the `products.find(...)` / `product.variants?.find(...)` lines in `src/lib/pricing.ts` — adjust field names if yours differ.

---

## 4. Testing Checklist

- [ ] Test card: `4111 1111 1111 1111`, any future expiry, any CVV
- [ ] Test UPI: `success@razorpay` (succeeds) / `failure@razorpay` (fails)
- [ ] Click each of the 3 plan buttons and confirm the amount charged matches 10% / 50% / 100% of the real cart total
- [ ] Open dev tools, tamper the `plan` or `items` sent to `/api/verify-payment` → confirm it's rejected (amount mismatch)
- [ ] Confirm both emails (customer + vendor) arrive with correct items, amount, and remaining balance
- [ ] Click "Pay" and close the Razorpay modal without paying → confirm nothing breaks and no email is sent
- [ ] Check the Razorpay Dashboard (Test Mode) → the order's `notes` field shows the customer's name/email/phone

---

## 5. Known Trade-off of Going No-DB

Without persistent storage, there's no way to guarantee an email won't be sent twice if `/api/verify-payment` gets called more than once for the same payment (e.g., a flaky network causing a retry). For a small-scale operation this is a minor, low-frequency risk — the Razorpay Dashboard remains the actual source of truth for whether a payment happened, regardless of how many times an email fired. If this becomes a real problem later, the fix is exactly the "add a database" path from before — but it's not needed to get this working correctly today.
