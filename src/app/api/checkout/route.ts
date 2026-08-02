import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const cartItemSchema = z.object({
  type: z.enum(["tour", "transfer"]),
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  travelers: z.number().int().positive(),
  unitPriceEur: z.number().positive(),
});

const requestSchema = z.object({
  name: z.string().min(1, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Enter a phone number"),
  items: z.array(cartItemSchema).min(1, "Your cart is empty"),
});

export interface CheckoutResponse {
  bookingNumber: string;
  totalPrice: number;
  currency: string;
}

function generateBookingNumber(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `IT-${digits}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { items } = parsed.data;
  const totalPrice = items.reduce((sum, item) => sum + item.unitPriceEur * item.travelers, 0);

  // No real payment is processed — this is a mock confirmation, same as the
  // rest of the site's booking flow (availability check, My Booking lookup).
  const response: CheckoutResponse = {
    bookingNumber: generateBookingNumber(),
    totalPrice,
    currency: "EUR",
  };

  return NextResponse.json(response);
}
