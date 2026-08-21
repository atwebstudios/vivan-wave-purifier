"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";

/** Client island: adds a product to the cart and opens the cart drawer. */
export function AddToCartButton({
  productId,
  qty = 1,
  label = "Add to Cart",
  variant = "primary",
  size = "md",
  className,
}: {
  productId: string;
  qty?: number;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { add } = useCart();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => add(productId, qty)}
    >
      <ShoppingCart className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  );
}
