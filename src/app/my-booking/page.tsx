import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MyBookingLookup } from "@/components/MyBookingLookup";

export const metadata: Metadata = {
  title: "My Booking",
  description: "Look up your Illyria Trails booking with your reference number and surname.",
  alternates: { canonical: "/my-booking" },
};

export default function MyBookingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "My Booking", url: "/my-booking" }]} />
      <div className="mx-auto max-w-xl px-4 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">My Booking</h1>
        <p className="mt-2 text-ink-soft">
          Enter the booking reference number from your confirmation email along with the booking owner&apos;s
          surname to view your reservation details.
        </p>
        <div className="mt-8">
          <MyBookingLookup />
        </div>
      </div>
    </>
  );
}
