"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrency } from "@/components/CurrencyProvider";
import type { BookingLookupResponse } from "@/app/api/booking-lookup/route";

const schema = z.object({
  bookingNumber: z.string().min(1, "Enter your booking reference number"),
  surname: z.string().min(1, "Enter the booking owner's surname"),
});

type FormValues = z.infer<typeof schema>;

export function MyBookingLookup() {
  const { display } = useCurrency();
  const [result, setResult] = useState<BookingLookupResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setNotFound(false);
    setResult(null);
    try {
      const res = await fetch("/api/booking-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error("Lookup failed");
      const data: BookingLookupResponse = await res.json();
      setResult(data);
    } catch {
      setNotFound(true);
    }
  }

  if (result) {
    const date = new Date(result.date);
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-ink-soft">Booking {result.bookingNumber}</p>
          <span className="rounded-full bg-fjord-100 px-3 py-1 text-xs font-semibold text-fjord-900">
            {result.status}
          </span>
        </div>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          <Link href={`/tours/${result.tourSlug}`} className="hover:text-fjord-600">
            {result.tourTitle}
          </Link>
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-soft">Date</dt>
            <dd className="font-medium text-ink">
              {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Travelers</dt>
            <dd className="font-medium text-ink">{result.travelers}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Meeting point</dt>
            <dd className="font-medium text-ink">{result.meetingPoint}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Total paid</dt>
            <dd className="font-medium text-ink">{display(result.totalPrice)}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 text-sm font-semibold text-fjord-600 hover:text-fjord-900"
        >
          &larr; Look up a different booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line bg-white p-6" noValidate>
      <div>
        <label htmlFor="bookingNumber" className="block text-sm font-semibold text-ink">
          Booking number
        </label>
        <input
          id="bookingNumber"
          type="text"
          placeholder="e.g. IT-48213"
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          {...register("bookingNumber")}
        />
        {errors.bookingNumber && <p className="mt-1 text-xs text-red-600">{errors.bookingNumber.message}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="surname" className="block text-sm font-semibold text-ink">
          Surname
        </label>
        <input
          id="surname"
          type="text"
          placeholder="Booking owner's surname"
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          {...register("surname")}
        />
        {errors.surname && <p className="mt-1 text-xs text-red-600">{errors.surname.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-fjord-500 px-5 py-3 text-sm font-semibold text-white hover:bg-fjord-600 disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Searching..." : "Find Booking"}
      </button>

      {notFound && (
        <p className="mt-4 text-sm text-red-600">
          No booking found matching that reference number and surname. Double-check the confirmation email and try
          again, or contact{" "}
          <Link href="/customer-support-and-faq" className="underline">
            Customer Support
          </Link>
          .
        </p>
      )}
    </form>
  );
}
