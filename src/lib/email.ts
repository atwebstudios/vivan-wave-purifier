import { Resend } from "resend";
import type { OrderLineItem } from "./pricing";

const resend = new Resend(process.env.RESEND_API_KEY);

export type OrderEmailData = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  lineItems: OrderLineItem[];
  amountDueNow: number; // paise
  remainingPaise: number;
  totalOrderValuePaise: number;
  plan: string;
  planLabel: string;
};

function formatCurrency(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

function formatCurrencyRupees(rupees: number): string {
  return `₹${rupees.toLocaleString("en-IN")}`;
}

function itemsTableHtml(items: OrderLineItem[]): string {
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;">
          ${i.name}<br/>
          <span style="color:#64748b;font-size:12px;">${i.variantLabel}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;font-size:14px;">${i.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:14px;">${formatCurrencyRupees(i.unitPrice)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:14px;font-weight:600;">${formatCurrencyRupees(i.unitPrice * i.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;">Product</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;">Qty</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;">Unit Price</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function customerReceiptHtml(data: OrderEmailData): string {
  return `
  <div style="font-family:'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f766e,#115e59);padding:32px 24px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Vivaan Wave</h1>
      <p style="margin:8px 0 0;color:#99f6e4;font-size:14px;">Order Confirmation</p>
    </div>

    <div style="padding:24px;">
      <!-- Greeting -->
      <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px;">Thank you, ${data.customer.name}!</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px;line-height:1.6;">
        Your order has been placed successfully. We'll contact you within 24 hours to schedule expert installation.
      </p>

      <!-- Order ID Box -->
      <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:16px;margin-bottom:20px;">
        <p style="margin:0 0 4px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Order ID</p>
        <p style="margin:0;color:#0f766e;font-size:20px;font-weight:700;font-family:monospace;">${data.razorpayOrderId}</p>
      </div>

      <!-- Items Table -->
      <h3 style="margin:0 0 4px;color:#0f172a;font-size:16px;">Order Details</h3>
      ${itemsTableHtml(data.lineItems)}

      <!-- Payment Summary -->
      <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:16px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:14px;">Order Total</td>
            <td style="padding:6px 0;text-align:right;font-size:14px;font-weight:600;color:#0f172a;">${formatCurrency(data.totalOrderValuePaise)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:14px;">Payment Plan</td>
            <td style="padding:6px 0;text-align:right;font-size:14px;color:#0f172a;">${data.planLabel}</td>
          </tr>
          <tr style="border-top:2px solid #e2e8f0;">
            <td style="padding:10px 0 4px;color:#0f766e;font-size:15px;font-weight:700;">Paid Now</td>
            <td style="padding:10px 0 4px;text-align:right;font-size:18px;font-weight:700;color:#0f766e;">${formatCurrency(data.amountDueNow)}</td>
          </tr>
          ${
            data.remainingPaise > 0
              ? `<tr>
              <td style="padding:4px 0;color:#64748b;font-size:14px;">Balance (on delivery)</td>
              <td style="padding:4px 0;text-align:right;font-size:14px;font-weight:600;color:#dc2626;">${formatCurrency(data.remainingPaise)}</td>
            </tr>`
              : ""
          }
        </table>
      </div>

      <!-- Delivery Address -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Delivery Address</p>
        <p style="margin:0;color:#0f172a;font-size:14px;line-height:1.6;">
          ${data.customer.name}<br/>
          ${data.customer.address}<br/>
          ${data.customer.city} — ${data.customer.pincode}<br/>
          📞 ${data.customer.phone}<br/>
          ✉️ ${data.customer.email}
        </p>
      </div>

      <!-- Contact Info -->
      <div style="text-align:center;padding:20px 0;border-top:1px solid #e2e8f0;margin-top:24px;">
        <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Need help? Contact us:</p>
        <p style="margin:0;color:#0f766e;font-size:14px;font-weight:600;">WhatsApp / Call: +91 XXXXX XXXXX</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Email: support@vivanwave.com</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:16px 24px;text-align:center;border-radius:0 0 8px 8px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:12px;">© ${new Date().getFullYear()} Vivaan Wave. Soft Water. Pure Flow.</p>
      <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Razorpay Payment ID: ${data.razorpayPaymentId}</p>
    </div>
  </div>`;
}

function vendorNotificationHtml(data: OrderEmailData): string {
  return `
  <div style="font-family:'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">🔔 New Order Received!</h1>
    </div>

    <div style="padding:24px;">
      <!-- Order + Payment Summary -->
      <div style="display:flex;gap:12px;margin-bottom:20px;">
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px;flex:1;">
          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;">Order ID</p>
          <p style="margin:0;color:#dc2626;font-size:16px;font-weight:700;font-family:monospace;">${data.razorpayOrderId}</p>
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;">
          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;">Amount Collected</p>
          <p style="margin:0;color:#16a34a;font-size:22px;font-weight:700;">${formatCurrency(data.amountDueNow)}</p>
          <p style="margin:4px 0 0;color:#64748b;font-size:12px;">${data.planLabel} • Total order: ${formatCurrency(data.totalOrderValuePaise)} • Remaining: ${formatCurrency(data.remainingPaise)}</p>
        </div>
      </div>

      <!-- Customer Details -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:20px;">
        <p style="margin:0 0 12px;color:#0f172a;font-size:15px;font-weight:700;">👤 Customer Details</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;width:100px;">Name</td>
            <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${data.customer.name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;">Phone</td>
            <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${data.customer.phone}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;">Email</td>
            <td style="padding:6px 0;color:#0f172a;font-size:14px;">${data.customer.email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;vertical-align:top;">Address</td>
            <td style="padding:6px 0;color:#0f172a;font-size:14px;line-height:1.5;">${data.customer.address}, ${data.customer.city} — ${data.customer.pincode}</td>
          </tr>
        </table>
      </div>

      <!-- Order Items -->
      <h3 style="margin:0 0 4px;color:#0f172a;font-size:15px;font-weight:700;">📦 Ordered Items</h3>
      ${itemsTableHtml(data.lineItems)}

      <!-- Razorpay Reference -->
      <div style="background:#f8fafc;border-radius:8px;padding:12px;margin-top:16px;text-align:center;">
        <p style="margin:0;color:#64748b;font-size:12px;">Razorpay Payment ID: <strong style="color:#0f172a;">${data.razorpayPaymentId}</strong></p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:12px 24px;text-align:center;border-radius:0 0 8px 8px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:11px;">Vivaan Wave — Automated Order Notification</p>
    </div>
  </div>`;
}

export async function sendCustomerReceipt(data: OrderEmailData) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: data.customer.email,
    subject: `Order Confirmed — ${data.razorpayOrderId} | Vivaan Wave`,
    html: customerReceiptHtml(data),
  });
}

export async function sendVendorNotification(data: OrderEmailData) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.VENDOR_EMAIL!,
    subject: `🔔 New Order — ${data.razorpayOrderId} | ${data.customer.name} | ${formatCurrency(data.amountDueNow)}`,
    html: vendorNotificationHtml(data),
  });
}
