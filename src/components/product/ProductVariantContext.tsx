"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import type { Product, Variant, VariantAxis } from "@/lib/types";

export function findImageIndexForAttrs(
  images: string[],
  sel: Record<string, string | undefined>,
): number {
  if (!images || images.length <= 1) return 0;

  const mat = sel.material?.toLowerCase();
  const op = sel.operation?.toLowerCase();

  // If SS304, match image containing ss304 or ss
  if (mat === "ss304") {
    const idx = images.findIndex((img) => {
      const lower = img.toLowerCase();
      return lower.includes("ss304") || lower.includes("-ss.");
    });
    if (idx !== -1) return idx;
  }

  // If FRP: check if there's an image explicitly containing frp
  if (mat === "frp") {
    const frpIdx = images.findIndex((img) => img.toLowerCase().includes("frp"));
    if (frpIdx !== -1) return frpIdx;
  }

  // If operation is automatic or manual (e.g. softeners / aqua-clean / pro-iron when FRP)
  if (op === "automatic") {
    const autoIdx = images.findIndex((img) => {
      const lower = img.toLowerCase();
      return lower.includes("automatic") && !lower.includes("ss");
    });
    if (autoIdx !== -1) return autoIdx;
  }

  if (op === "manual") {
    const manualIdx = images.findIndex((img) => {
      const lower = img.toLowerCase();
      return lower.includes("manual") && !lower.includes("ss");
    });
    if (manualIdx !== -1) return manualIdx;
  }

  return 0;
}

export function attrsForImage(imageSrc: string): Partial<Record<string, string>> {
  const lower = imageSrc.toLowerCase();
  const attrs: Partial<Record<string, string>> = {};

  if (lower.includes("ss304") || lower.includes("-ss.")) {
    attrs.material = "SS304";
  } else if (lower.includes("frp")) {
    attrs.material = "FRP";
  }

  if (lower.includes("automatic")) {
    attrs.operation = "Automatic";
    if (!lower.includes("ss")) {
      attrs.material = "FRP";
    }
  } else if (lower.includes("manual")) {
    attrs.operation = "Manual";
    if (!lower.includes("ss")) {
      attrs.material = "FRP";
    }
  }

  return attrs;
}

export interface ProductVariantContextValue {
  product: Product;
  axes: VariantAxis[];
  sel: Record<string, string | undefined>;
  variant: Variant;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  setAttr: (axis: string, value: string) => void;
  setDirectSel: (newSel: Record<string, string | undefined>) => void;
  optionsFor: (axis: VariantAxis, currentSel: Record<string, string | undefined>) => string[];
  normalize: (desired: Record<string, string | undefined>) => Record<string, string | undefined>;
}

export const ProductVariantContext = createContext<ProductVariantContextValue | null>(null);

export function useProductVariant() {
  return useContext(ProductVariantContext);
}

export function ProductVariantProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const axes = useMemo(() => product.variantAxes ?? [], [product.variantAxes]);

  // Options for `axis` given the selections made on the axes before it.
  const optionsFor = useCallback(
    (axis: VariantAxis, currentSel: Record<string, string | undefined>): string[] => {
      const prior = axes.slice(0, axes.indexOf(axis));
      const matches = product.variants.filter((v) =>
        prior.every((a) => v.attrs?.[a] === currentSel[a]),
      );
      const seen: string[] = [];
      for (const v of matches) {
        const val = v.attrs?.[axis];
        if (val && !seen.includes(val)) seen.push(val);
      }
      return seen;
    },
    [axes, product.variants],
  );

  const normalize = useCallback(
    (desired: Record<string, string | undefined>): Record<string, string | undefined> => {
      const s: Record<string, string | undefined> = {};
      for (const a of axes) {
        const opts = optionsFor(a, s);
        s[a] = opts.length ? (opts.includes(desired[a] ?? "") ? desired[a] : opts[0]) : undefined;
      }
      return s;
    },
    [axes, optionsFor],
  );

  const initialSel = useMemo(() => {
    return normalize((product.variants[0]?.attrs ?? {}) as Record<string, string | undefined>);
  }, [normalize, product.variants]);

  const [sel, setSel] = useState<Record<string, string | undefined>>(initialSel);

  // Active image index in gallery
  const [activeImageIndex, setActiveImageIndexState] = useState<number>(() => {
    return findImageIndexForAttrs(product.images, initialSel);
  });

  const variant = useMemo(() => {
    return (
      product.variants.find((v) => axes.every((a) => v.attrs?.[a] === sel[a])) ??
      product.variants[0]
    );
  }, [product, axes, sel]);

  // When attribute selection changes (e.g. user clicks FRP or SS304):
  const setAttr = useCallback(
    (axis: string, value: string) => {
      setSel((prev) => {
        const updated = normalize({ ...prev, [axis]: value });
        const newImgIdx = findImageIndexForAttrs(product.images, updated);
        setActiveImageIndexState(newImgIdx);
        return updated;
      });
    },
    [normalize, product.images],
  );

  const setDirectSel = useCallback(
    (newSel: Record<string, string | undefined>) => {
      const updated = normalize(newSel);
      setSel(updated);
      const newImgIdx = findImageIndexForAttrs(product.images, updated);
      setActiveImageIndexState(newImgIdx);
    },
    [normalize, product.images],
  );

  // When user clicks a thumbnail in the gallery:
  const setActiveImageIndex = useCallback(
    (index: number) => {
      setActiveImageIndexState(index);
      const imgSrc = product.images[index];
      if (imgSrc) {
        const inferred = attrsForImage(imgSrc);
        if (Object.keys(inferred).length > 0) {
          setSel((prev) => normalize({ ...prev, ...inferred }));
        }
      }
    },
    [product.images, normalize],
  );

  const value = useMemo(
    () => ({
      product,
      axes,
      sel,
      variant,
      activeImageIndex,
      setActiveImageIndex,
      setAttr,
      setDirectSel,
      optionsFor,
      normalize,
    }),
    [
      product,
      axes,
      sel,
      variant,
      activeImageIndex,
      setActiveImageIndex,
      setAttr,
      setDirectSel,
      optionsFor,
      normalize,
    ],
  );

  return (
    <ProductVariantContext.Provider value={value}>
      {children}
    </ProductVariantContext.Provider>
  );
}
