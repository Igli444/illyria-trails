"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  consent: z.literal(true, {
    error: "You must agree to receive emails to subscribe",
  }),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm({
  variant = "light",
  brandName,
}: {
  variant?: "light" | "dark";
  brandName: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const isDark = variant === "dark";

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <p className={cn("text-sm font-medium", isDark ? "text-paper" : "text-fjord-600")}>
        You&apos;re on the list — look out for our next set of guides.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="newsletter-email" className={cn("text-sm font-semibold", isDark ? "text-paper" : "text-ink")}>
        Get trip ideas in your inbox
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          className={cn(
            "min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fjord-500",
            isDark ? "border-paper/20 bg-paper/5 text-paper placeholder:text-paper/40" : "border-line bg-white text-ink placeholder:text-ink-soft/60",
          )}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-dark disabled:opacity-60"
        >
          Subscribe
        </button>
      </div>
      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}

      <label className={cn("mt-3 flex items-start gap-2 text-xs", isDark ? "text-paper/70" : "text-ink-soft")}>
        <input type="checkbox" className="mt-0.5" {...register("consent")} />
        <span>
          I agree to receive marketing emails from {brandName} and understand I can unsubscribe at any time. See our{" "}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent.message}</p>}
    </form>
  );
}
