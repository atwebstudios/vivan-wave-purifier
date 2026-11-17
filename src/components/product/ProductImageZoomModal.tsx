"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, assetSrc } from "@/lib/utils";

interface ProductImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  productName: string;
}

export function ProductImageZoomModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productName,
}: ProductImageZoomModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsZoomed(false);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    },
    [images.length],
  );

  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsZoomed(false);
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    },
    [images.length],
  );

  // Keyboard navigation: Escape to close, arrows to cycle
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        showPrev();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        showNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose, showPrev, showNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setOrigin({ x, y });
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isZoomed && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setOrigin({ x, y });
    }
    setIsZoomed((prev) => !prev);
  };

  if (!isOpen || images.length === 0 || typeof document === "undefined") return null;

  const currentImage = images[currentIndex] || images[0];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Zoom view of ${productName}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 sm:px-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 truncate pr-4">
          <p className="truncate text-sm font-semibold tracking-wide sm:text-base">{productName}</p>
          {images.length > 1 ? (
            <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-slate-300">
              {currentIndex + 1} / {images.length}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom toggle button */}
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 active:scale-95"
            title={isZoomed ? "Zoom Out (Click image or button)" : "Zoom In (2.5x)"}
          >
            {isZoomed ? (
              <>
                <ZoomOut className="h-4 w-4 text-brand-300" />
                <span className="hidden sm:inline">Zoom Out (1x)</span>
              </>
            ) : (
              <>
                <ZoomIn className="h-4 w-4 text-brand-300" />
                <span className="hidden sm:inline">Zoom In (2.5x)</span>
              </>
            )}
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white active:scale-95"
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        {/* Previous Image Arrow */}
        {images.length > 1 ? (
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-3 sm:left-6 z-20 rounded-full bg-black/50 p-2.5 sm:p-3 text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : null}

        {/* Zoomable Image Container */}
        <div
          ref={containerRef}
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          className={cn(
            "relative flex max-h-[75vh] w-full max-w-4xl select-none items-center justify-center overflow-hidden rounded-2xl transition-all duration-150",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
          )}
          style={{ height: "70vh" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: isZoomed ? "scale(2.5)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
            }}
          >
            <Image
              src={assetSrc(currentImage)}
              alt={`${productName} zoomed image`}
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Floating hint pill */}
          {!isZoomed ? (
            <div className="pointer-events-none absolute bottom-4 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm shadow-lg">
              Click anywhere to zoom in 2.5×
            </div>
          ) : (
            <div className="pointer-events-none absolute bottom-4 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm shadow-lg">
              Move cursor to inspect details • Click to zoom out
            </div>
          )}
        </div>

        {/* Next Image Arrow */}
        {images.length > 1 ? (
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 sm:right-6 z-20 rounded-full bg-black/50 p-2.5 sm:p-3 text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        ) : null}
      </div>

      {/* Bottom Thumbnail Strip (if multiple images) */}
      {images.length > 1 ? (
        <div
          className="flex items-center justify-center gap-3 border-t border-white/10 bg-black/40 px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setIsZoomed(false);
              }}
              className={cn(
                "relative h-14 w-14 overflow-hidden rounded-xl border-2 bg-white/5 transition-all hover:opacity-100",
                currentIndex === idx
                  ? "border-brand-400 ring-2 ring-brand-400/50 scale-105 opacity-100"
                  : "border-white/20 opacity-60 hover:border-white/50",
              )}
            >
              <Image
                src={assetSrc(src)}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="py-2" />
      )}
    </div>,
    document.body,
  );
}
