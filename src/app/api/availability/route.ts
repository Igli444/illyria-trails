import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTourBySlug } from "@/data/tours";

const requestSchema = z.object({
  tourSlug: z.string().min(1),
  date: z.string().min(1),
  travelers: z.number().int().min(1).max(20),
});

export interface AvailabilityResponse {
  available: boolean;
  pricePerPerson: number;
  totalPrice: number;
  currency: string;
  spotsRemaining: number;
}

/**
 * Mock availability endpoint. In production this route would call the
 * booking engine (Bokun/Rezdy/custom) instead of deriving price/currency
 * from the CMS content, keeping the client-side contract identical either way.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tourSlug, date, travelers } = parsed.data;
  const tour = await getTourBySlug(tourSlug);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const dayOfMonth = new Date(date).getDate() || 1;
  const spotsRemaining = 12 - (dayOfMonth % 12);
  const available = spotsRemaining >= travelers;

  const response: AvailabilityResponse = {
    available,
    pricePerPerson: tour.price,
    totalPrice: tour.price * travelers,
    currency: tour.currency,
    spotsRemaining,
  };

  return NextResponse.json(response);
}
