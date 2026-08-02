export const SUPPORTED_CURRENCIES = ["EUR", "USD", "GBP"] as const;
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

// Static display rates (relative to EUR, the currency all prices are stored
// in). This site doesn't take real payments, so these only affect what's
// shown on screen — not a live FX feed.
const RATES_FROM_EUR: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
};

export function convertFromEur(amountEur: number, target: CurrencyCode): number {
  return amountEur * RATES_FROM_EUR[target];
}

export const CURRENCY_STORAGE_KEY = "illyria-display-currency";
