"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import type { CheckoutResponse } from "@/app/api/checkout/route";

const schema = z.object({
  name: z.string().min(1, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Enter a phone number"),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { items, totalEur, clear } = useCart();
  const { display } = useCurrency();
  const [confirmation, setConfirmation] = useState<CheckoutResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, items }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const data: CheckoutResponse = await res.json();
      setConfirmation(data);
      clear();
    } catch {
      setSubmitError("Something went wrong confirming your booking — please try again.");
    }
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-fjord-500">Booking Confirmed</p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
            Reference {confirmation.bookingNumber}
          </h1>
          <p className="mt-3 text-ink-soft">
            Total: <span className="font-semibold text-ink">{display(confirmation.totalPrice)}</span>
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Save this reference number — you can look up your booking anytime from{" "}
            <Link href="/my-booking" className="underline hover:no-underline">
              My Booking
            </Link>
            .
          </p>
          <Link
            href="/tours"
            className="mt-6 inline-block rounded-full bg-fjord-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fjord-600"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-ink-soft">Your cart is empty — add a tour before checking out.</p>
        <Link
          href="/tours"
          className="mt-4 inline-block rounded-full bg-fjord-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fjord-600"
        >
          Browse Tours
        </Link>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ name: "Cart", url: "/cart" }, { name: "Checkout", url: "/checkout" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Checkout</h1>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line bg-white p-6" noValidate>
            <h2 className="font-display text-lg font-semibold text-ink">Traveler Details</h2>

            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-semibold text-ink">
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
                {...register("name")}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-ink">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
                {...register("phone")}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
            </div>

            <p className="mt-4 text-xs text-ink-soft">
              This is a demo checkout — no payment is charged. A confirmation reference is generated instantly.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-fjord-500 px-5 py-3 text-sm font-semibold text-white hover:bg-fjord-600 disabled:opacity-60"
            >
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </button>

            {submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
          </form>

          <div className="h-fit rounded-2xl border border-line bg-paper-dim p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink-soft">
                    {item.title} &times; {item.travelers}
                  </span>
                  <span className="shrink-0 font-medium text-ink">{display(item.unitPriceEur * item.travelers)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-4 font-semibold text-ink">
              <span>Total</span>
              <span>{display(totalEur)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
