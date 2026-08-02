"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function CurrencySelector({
  inverted = false,
  hidden = false,
}: {
  inverted?: boolean;
  hidden?: boolean;
}) {
  const { currency, setCurrency } = useCurrency();

  return (
    <label
      className={cn("flex items-center gap-1 text-xs font-medium", inverted ? "text-paper/80" : "text-ink-soft")}
      aria-hidden={hidden}
    >
      <span className="sr-only">Display currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as (typeof SUPPORTED_CURRENCIES)[number])}
        className={cn(
          "cursor-pointer rounded-md border-none bg-transparent py-0.5 pl-1 pr-5 text-xs font-medium outline-none",
          inverted ? "text-paper/80 hover:text-paper" : "text-ink-soft hover:text-ink"
        )}
        tabIndex={hidden ? -1 : undefined}
        aria-label="Display currency"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
  );
}
