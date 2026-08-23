import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSiteSettings } from "@/data/site-settings";
import { getAllTours } from "@/data/tours";
import { answerSupportQuestion } from "@/lib/supportChatbot";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});
const requestSchema = z.object({
  message: z.string().min(1, "Message is required").max(2000),
  history: z.array(messageSchema).max(20).optional().default([]),
});

export interface SupportChatResponse {
  reply: string;
}

// Answers come entirely from our own site content (FAQs + tour listings) via
// answerSupportQuestion — no external AI API, so no per-message cost and no
// dependency on a third-party provider being up or funded. `history` is
// still accepted for client compatibility but isn't needed by a rule-based
// matcher, which has no multi-turn state to track.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const [settings, tours] = await Promise.all([getSiteSettings(), getAllTours()]);
    const reply = answerSupportQuestion(parsed.data.message, { settings, tours });
    return NextResponse.json({ reply } satisfies SupportChatResponse);
  } catch {
    return NextResponse.json(
      { error: "The support assistant is temporarily unavailable. Please try again shortly or contact us directly." },
      { status: 502 },
    );
  }
}
