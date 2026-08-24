"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, ResolvedCartLine } from "@/lib/types";
import { computeTotals, resolveLines, type CartTotals } from "@/lib/pricing";

const STORAGE_KEY = "purifier_cart_v2"; // v2: lines now carry a variantId

interface CartContextValue {
  lines: ResolvedCartLine[];
  totals: CartTotals;
  /** True once the cart has hydrated from localStorage (avoids SSR/client badge mismatch). */
  ready: boolean;
  add: (productId: string, variantId: string, qty?: number) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  // Drawer UI state
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (l: CartLine, productId: string, variantId: string) =>
  l.productId === productId && l.variantId === variantId;

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (l) =>
          l &&
          typeof l.productId === "string" &&
          typeof l.variantId === "string" &&
          typeof l.qty === "number",
      )
      .map((l) => ({
        productId: l.productId,
        variantId: l.variantId,
        qty: Math.max(1, Math.floor(l.qty)),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage after mount.
  useEffect(() => {
    setRawLines(readStorage());
    setReady(true);
  }, []);

  // Persist on every change (once hydrated).
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [rawLines, ready]);

  const add = useCallback((productId: string, variantId: string, qty = 1) => {
    setRawLines((prev) => {
      const existing = prev.find((l) => sameLine(l, productId, variantId));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, productId, variantId) ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { productId, variantId, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((productId: string, variantId: string, qty: number) => {
    setRawLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !sameLine(l, productId, variantId))
        : prev.map((l) => (sameLine(l, productId, variantId) ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((productId: string, variantId: string) => {
    setRawLines((prev) => prev.filter((l) => !sameLine(l, productId, variantId)));
  }, []);

  const clear = useCallback(() => setRawLines([]), []);

  const lines = useMemo(() => resolveLines(rawLines), [rawLines]);
  const totals = useMemo(() => computeTotals(lines), [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals,
      ready,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [lines, totals, ready, add, setQty, remove, clear, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
