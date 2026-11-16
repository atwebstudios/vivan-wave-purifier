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
}

export function ProductGallery({ product, priority = true }: ProductGalleryProps) {
  const variantCtx = useProductVariant();
  const [localIndex, setLocalIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeIndex = variantCtx ? variantCtx.activeImageIndex : localIndex;
  const setActiveIndex = variantCtx ? variantCtx.setActiveImageIndex : setLocalIndex;

  const images = product.images.length > 0 ? product.images : [];
  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      {/* Main Image Frame */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Availability Badge */}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Always Available
        </span>

        {/* Click to zoom indicator button */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-sm transition-all hover:bg-brand-600 hover:text-white group-hover:scale-105 active:scale-95"
          aria-label="Click to zoom image"
        >
          <ZoomIn className="h-3.5 w-3.5 text-brand-600 group-hover:text-white" />
          <span>Click to zoom</span>
        </button>

        {/* Main Image Container */}
        <div
          onClick={() => setIsZoomOpen(true)}
          className="relative aspect-square w-full cursor-zoom-in overflow-hidden bg-gradient-to-br from-slate-50 to-brand-50/50 p-4 transition-transform duration-300"
          title="Click to zoom in"
        >
          {currentImage ? (
            <Image
              src={assetSrc(currentImage)}
              alt={product.name}
              fill
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
                "relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-all",
                activeIndex === idx
                  ? "border-brand-600 ring-2 ring-brand-600/30 shadow-sm scale-[1.02]"
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
