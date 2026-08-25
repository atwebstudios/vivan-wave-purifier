import { NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { computeOrderTotals, PLAN_LABELS, type CartItemInput } from "@/lib/pricing";
import { sendCustomerReceipt, sendVendorNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      plan,
      customer,
    } = body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      items: CartItemInput[];
      plan: string;
      customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string };
    };

    // 1. Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    // 2. Verify signature (proves the callback is from Razorpay)
    const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("[verify-payment] Signature mismatch");
      return NextResponse.json({ status: "failed", reason: "invalid signature" }, { status: 400 });
    }

    // 3. Recompute expected amount from products.ts (never trust the frontend)
    const totals = computeOrderTotals(items, plan);

    // 4. Cross-check with Razorpay's actual payment record
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (Number(payment.amount) !== totals.amountDueNow || payment.order_id !== razorpay_order_id) {
      console.error("[verify-payment] Amount mismatch:", {
        razorpayAmount: payment.amount,
        expectedAmount: totals.amountDueNow,
      });
      return NextResponse.json({ status: "failed", reason: "amount mismatch" }, { status: 400 });
    }

    // 5. Payment verified — send emails to customer + vendor
    const emailData = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      customer,
      lineItems: totals.lineItems,
      amountDueNow: totals.amountDueNow,
      remainingPaise: totals.remainingPaise,
      totalOrderValuePaise: totals.totalOrderValuePaise,
      plan,
      planLabel: PLAN_LABELS[plan] ?? plan,
    };

    // Send emails in parallel; don't let email failure break the payment confirmation
    try {
      await Promise.all([
        sendCustomerReceipt(emailData),
        sendVendorNotification(emailData),
      ]);
    } catch (emailErr) {
      // Log but don't fail — payment is already confirmed by Razorpay
      console.error("[verify-payment] Email sending failed:", emailErr);
    }

    return NextResponse.json({
      status: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    console.error("[verify-payment] Error:", message);
    return NextResponse.json({ error: message, status: "failed" }, { status: 500 });
  }
}
