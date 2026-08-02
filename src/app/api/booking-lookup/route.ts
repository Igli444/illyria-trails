import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findBooking } from "@/data/bookings";
import { getTourBySlug } from "@/data/tours";

const requestSchema = z.object({
  bookingNumber: z.string().min(1),
  surname: z.string().min(1),
});

export interface BookingLookupResponse {
  bookingNumber: string;
  status: "Confirmed" | "Cancelled";
  date: string;
  travelers: number;
  totalPrice: number;
  currency: string;
  tourTitle: string;
  tourSlug: string;
  meetingPoint: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { bookingNumber, surname } = parsed.data;
  const booking = findBooking(bookingNumber, surname);

  if (!booking) {
    return NextResponse.json(
      { error: "No booking found matching that reference number and surname." },
      { status: 404 },
    );
  }

  const tour = await getTourBySlug(booking.tourSlug);

  if (!tour) {
    return NextResponse.json({ error: "This booking's tour could not be found." }, { status: 404 });
  }

  const response: BookingLookupResponse = {
    bookingNumber: booking.bookingNumber,
    status: booking.status,
    date: booking.date,
    travelers: booking.travelers,
    totalPrice: booking.totalPrice,
    currency: booking.currency,
    tourTitle: tour.title,
    tourSlug: tour.slug,
    meetingPoint: tour.meetingPoint,
  };

  return NextResponse.json(response);
}
