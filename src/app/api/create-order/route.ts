import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { computeOrderTotals, type CartItemInput } from "@/lib/pricing";

export async function POST(req: Request) {
  try {
    const { items, plan, customer } = (await req.json()) as {
      items: CartItemInput[];
      plan: string;
      customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string };
    };

    // Validate required fields
    if (!items?.length || !plan || !customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const totals = computeOrderTotals(items, plan);

    if (totals.amountDueNow < 100) {
      return NextResponse.json({ error: "Amount too low (minimum ₹1)" }, { status: 400 });
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
      keyId: (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim(),
    });
  } catch (err: unknown) {
    const errorObj = err as Record<string, unknown> | undefined;
    const razorpayError = errorObj?.error as Record<string, unknown> | undefined;
    const message =
      (typeof razorpayError?.description === "string" ? razorpayError.description : null) ||
      (err instanceof Error ? err.message : null) ||
      (typeof errorObj?.message === "string" ? errorObj.message : null) ||
      "Order creation failed";

    console.error("[create-order] Error details:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
