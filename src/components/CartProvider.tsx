"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { cartTotalEur, EMPTY_CART, readCart, writeCart, type CartItem } from "@/lib/cart";

interface CartContextValue {
  items: CartItem[];
  totalEur: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, readCart, getServerSnapshot);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.type}-${item.slug}-${item.date}-${Date.now()}`;
    writeCart([...readCart(), { ...item, id }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    writeCart(readCart().filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => {
    writeCart([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({ items, totalEur: cartTotalEur(items), addItem, removeItem, clear }),
    [items, addItem, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
