/**
 * Mock reservation records. In production this would be replaced by a call
 * to the booking engine (Bokun/Rezdy/custom) rather than a local array,
 * keeping the lookup API's contract identical either way.
 */
export interface Booking {
  bookingNumber: string;
  surname: string;
  tourSlug: string;
  date: string;
  travelers: number;
  totalPrice: number;
  currency: string;
  status: "Confirmed" | "Cancelled";
}

export const bookings: Booking[] = [
  {
    bookingNumber: "IT-48213",
    surname: "Krasniqi",
    tourSlug: "theth-to-valbona-two-day-trek",
    date: "2026-09-10",
    travelers: 2,
    totalPrice: 330,
    currency: "EUR",
    status: "Confirmed",
  },
  {
    bookingNumber: "IT-59027",
    surname: "Marku",
    tourSlug: "albanian-riviera-boat-day-trip",
    date: "2026-08-22",
    travelers: 4,
    totalPrice: 260,
    currency: "EUR",
    status: "Confirmed",
  },
];

export function findBooking(bookingNumber: string, surname: string): Booking | undefined {
  const normalizedNumber = bookingNumber.trim().toLowerCase();
  const normalizedSurname = surname.trim().toLowerCase();
  return bookings.find(
    (b) => b.bookingNumber.toLowerCase() === normalizedNumber && b.surname.toLowerCase() === normalizedSurname,
  );
}
