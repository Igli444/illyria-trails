"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { SupportRequestResponse } from "@/app/api/support-request/route";

const requestTypeOptions: { value: string; label: string }[] = [
  { value: "pickup_request", label: "Pickup Request" },
  { value: "modify_booking", label: "Modify a Tour Booking" },
  { value: "cancel_booking", label: "Cancel a Booking" },
  { value: "refund_request", label: "Apply for a Refund" },
  { value: "invoice_billing", label: "Invoice & Billing Questions" },
  { value: "feedback", label: "Feedback" },
  { value: "lost_item", label: "Lost Item" },
  { value: "collaboration", label: "Collaboration Request" },
  { value: "other", label: "Other / General Inquiries" },
];

const schema = z.object({
  requestType: z.enum([
    "pickup_request",
    "modify_booking",
    "cancel_booking",
    "refund_request",
    "invoice_billing",
    "feedback",
    "lost_item",
    "collaboration",
    "other",
  ]),
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  bookingReference: z.string().optional(),
  message: z.string().min(1, "Tell us how we can help"),
});

type FormValues = z.infer<typeof schema>;

export function SupportRequestForm() {
  const [confirmation, setConfirmation] = useState<SupportRequestResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { requestType: "other" },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/support-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        setSubmitError("We couldn't submit your request. Please double-check the form and try again.");
        return;
      }
      const data: SupportRequestResponse = await res.json();
      setConfirmation(data);
    } catch {
      setSubmitError("We couldn't submit your request. Please check your connection and try again.");
    }
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <h3 className="font-display text-xl font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks — your reference number is{" "}
          <span className="font-semibold text-fjord-600">{confirmation.referenceNumber}</span>, we&apos;ll be in
          touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => setConfirmation(null)}
          className="mt-6 text-sm font-semibold text-fjord-600 hover:text-fjord-900"
        >
          &larr; Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line bg-white p-6" noValidate>
      <div>
        <label htmlFor="requestType" className="block text-sm font-semibold text-ink">
          What can we help with?
        </label>
        <select
          id="requestType"
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          {...register("requestType")}
        >
          {requestTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.requestType && <p className="mt-1 text-xs text-red-600">{errors.requestType.message}</p>}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div>
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
      </div>

      <div className="mt-4">
        <label htmlFor="bookingReference" className="block text-sm font-semibold text-ink">
          Booking reference <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <input
          id="bookingReference"
          type="text"
          placeholder="e.g. IT-48213"
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          {...register("bookingReference")}
        />
        {errors.bookingReference && <p className="mt-1 text-xs text-red-600">{errors.bookingReference.message}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-fjord-500 px-5 py-3 text-sm font-semibold text-white hover:bg-fjord-600 disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Request"}
      </button>

      {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
    </form>
  );
}
