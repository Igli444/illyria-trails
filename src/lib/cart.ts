export type CartItemType = "tour" | "transfer";

export interface CartItem {
  id: string;
  type: CartItemType;
  slug: string;
  title: string;
  date: string;
  travelers: number;
  /** Per-traveler price, stored in EUR (the base currency all prices use). */
  unitPriceEur: number;
  meta?: string;
}

export const CART_STORAGE_KEY = "illyria-cart";

// A stable empty-array reference, and a cache keyed on the raw JSON string —
// useSyncExternalStore requires the snapshot function to return the same
// reference when the underlying data hasn't changed, or it re-renders forever.
export const EMPTY_CART: CartItem[] = [];
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

export function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    if (raw === cachedRaw) return cachedItems;
    const parsed = JSON.parse(raw);
    cachedItems = Array.isArray(parsed) ? parsed : EMPTY_CART;
    cachedRaw = raw;
    return cachedItems;
  } catch {
    return EMPTY_CART;
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  // The native "storage" event only fires in other tabs, so notify this
  // tab's own subscribers manually to pick up the change immediately.
  window.dispatchEvent(new StorageEvent("storage"));
}

export function cartTotalEur(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceEur * item.travelers, 0);
}
