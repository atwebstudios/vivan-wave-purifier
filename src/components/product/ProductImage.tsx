import Image from "next/image";
import { Droplet } from "lucide-react";
import { getCategory } from "@/data/categories";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Renders a real product image when available, otherwise a branded CSS placeholder
 * (category gradient + water-drop mark + product name). Swap in photos later by
 * populating `product.images` — no other code needs to change.
 */
export function ProductImage({
  product,
  className,
  priority,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const category = getCategory(product.category);
  const src = product.images[0];

  if (src) {
    return (
      <div className={cn("relative aspect-square overflow-hidden", className)}>
        <Image
          src={src}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center gap-3 bg-gradient-to-br p-4 text-white",
        category?.gradient ?? "from-brand-500 to-brand-700",
        className,
      )}
      role="img"
      aria-label={product.name}
    >
      <Droplet className="h-14 w-14 fill-current opacity-90" strokeWidth={1} />
      <span className="line-clamp-2 text-center text-sm font-semibold drop-shadow-sm">
        {product.name}
      </span>
    </div>
  );
}
