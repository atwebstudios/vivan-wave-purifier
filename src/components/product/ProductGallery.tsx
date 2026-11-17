"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductImageZoomModal } from "@/components/product/ProductImageZoomModal";
import { useProductVariant } from "@/components/product/ProductVariantContext";
import { cn, assetSrc } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
  priority?: boolean;
  theme?: "light" | "dark";
  isSticky?: boolean;
}

  export function ProductGallery({
    product,
    priority = true,
    theme = "light",
    isSticky = true,
  }: ProductGalleryProps) {
    const variantCtx = useProductVariant();
    const [localIndex, setLocalIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const activeIndex = variantCtx ? variantCtx.activeImageIndex : localIndex;
    const setActiveIndex = variantCtx ? variantCtx.setActiveImageIndex : setLocalIndex;

    const images = product.images.length > 0 ? product.images : [];
    const currentImage = images[activeIndex] || images[0];

    const isDark = theme === "dark";

    return (
        <div className={cn("space-y-4", isSticky && "lg:sticky lg:top-24 lg:self-start")}>
          {/* Main Image Frame */}
          <div
            className={cn(
              "group relative overflow-hidden rounded-3xl border shadow-sm transition-all duration-300",
              isDark
                ? "border-slate-800/80 bg-slate-900/90 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/10"
                : "border-slate-200 bg-white",
            )}
          >
            {/* Availability Badge */}
            <span
              className={cn(
                "absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm",
                isDark
                  ? "border border-slate-700/80 bg-slate-950/90 text-emerald-400"
                  : "bg-white/95 text-emerald-700",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Always Available
            </span>

            {/* Click to zoom indicator button */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className={cn(
                "absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-md backdrop-blur-sm transition-all group-hover:scale-105 active:scale-95",
                isDark
                  ? "border border-slate-700/80 bg-slate-900/90 text-slate-200 hover:bg-cyan-500 hover:text-white"
                  : "bg-white/95 text-slate-800 hover:bg-brand-600 hover:text-white",
              )}
              aria-label="Click to zoom image"
            >
              <ZoomIn className={cn("h-3.5 w-3.5 group-hover:text-white", isDark ? "text-cyan-400" : "text-brand-600")} />
              <span>Click to zoom</span>
            </button>

            {/* Main Image Container */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className={cn(
                "relative aspect-square w-full cursor-zoom-in overflow-hidden p-4 transition-transform duration-300",
                isDark
                  ? "bg-gradient-to-br from-[#0d1527] via-[#090e1a] to-[#040710]"
                  : "bg-gradient-to-br from-slate-50 to-brand-50/50",
              )}
              title="Click to zoom in"
            >
              {currentImage ? (
                <Image
                  src={assetSrc(currentImage)}
                  alt={product.name}
                  fill
                  unoptimized
                  priority={priority}
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Thumbnails row if multiple images exist */}
          {images.length > 1 ? (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                    isDark ? "bg-slate-900" : "bg-white",
                    activeIndex === idx
                      ? isDark
                        ? "border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20 scale-[1.03]"
                        : "border-brand-600 ring-2 ring-brand-600/30 shadow-sm scale-[1.02]"
                      : isDark
                        ? "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700"
                        : "border-slate-200 opacity-70 hover:opacity-100 hover:border-brand-300",
                  )}
                  aria-label={`View image ${idx + 1}`}
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={assetSrc(src)}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          {/* Zoom Lightbox Modal */}
          {isZoomOpen ? (
            <ProductImageZoomModal
              isOpen={isZoomOpen}
              onClose={() => setIsZoomOpen(false)}
              images={images}
              initialIndex={activeIndex}
              productName={product.name}
            />
          ) : null}
        </div>
        );
}
