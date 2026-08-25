import type { Product, ResolvedCartLine } from "@/lib/types";
import { productById, getVariant } from "@/data/products";

/** Minimum share of the order that must be paid in advance at checkout. */
export const MIN_ADVANCE_RATE = 0.2; // 20%

/** Prices are treated as GST-inclusive, so this is informational only. */
export const GST_RATE = 0.18;

/** Format a number as Indian Rupees, e.g. 23990 -> "₹23,990". */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Discount percentage from MRP to selling price (rounded), or 0 when no discount. */
export function discountPercent(product: Pick<Product, "mrp" | "price">): number {
  if (product.mrp <= 0 || product.price >= product.mrp) return 0;
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  /** Minimum advance payable now (20% of subtotal, rounded to whole rupees). */
  minAdvance: number;
  /** Balance remaining after the minimum advance. */
  balanceDue: number;
}

/** Resolve minimal {productId, variantId, qty} lines into products + variants + line totals. */
export function resolveLines(
  lines: { productId: string; variantId: string; qty: number }[],
): ResolvedCartLine[] {
  const resolved: ResolvedCartLine[] = [];
  for (const line of lines) {
    const product = productById.get(line.productId);
    if (!product || line.qty <= 0) continue;
    const variant = getVariant(product, line.variantId);
    resolved.push({ product, variant, qty: line.qty, lineTotal: variant.price * line.qty });
  }
  return resolved;
}

export function computeTotals(lines: ResolvedCartLine[]): CartTotals {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const minAdvance = Math.round(subtotal * MIN_ADVANCE_RATE);
  return {
    itemCount,
    subtotal,
    minAdvance,
    balanceDue: subtotal - minAdvance,
  };
}

// ---- Server-side order computation for Razorpay ----

const PLAN_MULTIPLIER: Record<string, number> = {
  twentyPercent: 0.20,
  fiftyPercent: 0.50,
  fullPrice: 1.0,
};

export const PLAN_LABELS: Record<string, string> = {
  twentyPercent: "20% Advance",
  fiftyPercent: "50% Advance",
  fullPrice: "Full Payment",
};

export type CartItemInput = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type OrderLineItem = {
  name: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
};

/**
 * Recompute order totals server-side from the canonical product catalog.
 * Never trusts frontend-supplied prices — only product IDs and quantities.
 */
export function computeOrderTotals(items: CartItemInput[], plan: string) {
  const multiplier = PLAN_MULTIPLIER[plan];
  if (!multiplier) throw new Error("Invalid plan");

  let subtotal = 0;
  const lineItems: OrderLineItem[] = items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) throw new Error(`Invalid product: ${item.productId}`);

    const variant = getVariant(product, item.variantId);
    const unitPrice = variant.price;

    subtotal += unitPrice * item.quantity;

    return {
      name: product.name,
      variantLabel: variant.label,
      unitPrice,
      quantity: item.quantity,
    };
  });

  const amountDueNow = Math.round(subtotal * multiplier * 100); // paise
  const totalOrderValuePaise = subtotal * 100;
  const remainingPaise = totalOrderValuePaise - amountDueNow;

  return { lineItems, subtotal, amountDueNow, totalOrderValuePaise, remainingPaise, plan };
}
