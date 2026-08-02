"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { formatPrice } from "@/lib/utils";
import {
  convertFromEur,
  CURRENCY_STORAGE_KEY,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
} from "@/lib/currency";

function isCurrencyCode(value: string | null): value is CurrencyCode {
  return !!value && (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): CurrencyCode {
  const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
  return isCurrencyCode(stored) ? stored : "EUR";
}

function getServerSnapshot(): CurrencyCode {
  return "EUR";
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  /** Converts and formats an amount that's stored in EUR into the selected display currency. */
  display: (amountEur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCurrency = useCallback((next: CurrencyCode) => {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
    // The native "storage" event only fires in other tabs, so notify this
    // tab's own subscriber manually to pick up the change immediately.
    window.dispatchEvent(new StorageEvent("storage"));
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      display: (amountEur: number) => formatPrice(convertFromEur(amountEur, currency), currency),
    }),
    [currency, setCurrency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
