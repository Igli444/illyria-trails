import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
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
  name: z.string().min(1),
  email: z.string().email(),
  bookingReference: z.string().optional(),
  message: z.string().min(1),
});

export interface SupportRequestResponse {
  referenceNumber: string;
}

function generateReferenceNumber(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `SR-${digits}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const referenceNumber = generateReferenceNumber();

  // TODO: replace with real email/CRM delivery — no email service exists in this codebase yet
  console.log("Support request submission", {
    referenceNumber,
    ...parsed.data,
  });

  const response: SupportRequestResponse = { referenceNumber };
  return NextResponse.json(response);
}
