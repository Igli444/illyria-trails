import type { SiteSettings, Tour } from "@/types/content";

/**
 * Rule-based support assistant: answers are drawn only from this site's own
 * content (FAQ entries + tour listings + contact facts from Sanity). No
 * external API call, so there's no per-message cost and no dependency on a
 * third-party service being up or funded.
 *
 * This intentionally cannot "make things up" the way an LLM could — if
 * nothing in our own content matches well enough, it says so and points to
 * a human contact instead of guessing.
 */

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "i", "you", "he", "she", "it", "we", "they", "me", "my", "your", "our",
  "do", "does", "did", "doing", "have", "has", "had",
  "to", "of", "in", "on", "at", "for", "with", "about", "and", "or", "but",
  "if", "so", "as", "than", "that", "this", "these", "those",
  "what", "which", "who", "whom", "when", "where", "why", "how",
  "can", "could", "will", "would", "should", "may", "might", "must",
  "not", "no", "yes", "please", "just", "up", "out",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

/** Loose stem match so "cancel"/"cancellation" or "book"/"booking" count as the same idea. */
function sameStem(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  const prefixLen = Math.min(5, a.length, b.length);
  return a.slice(0, prefixLen) === b.slice(0, prefixLen);
}

function dedupeStems(tokens: string[]): string[] {
  const out: string[] = [];
  for (const t of tokens) {
    if (!out.some((existing) => sameStem(existing, t))) out.push(t);
  }
  return out;
}

interface IndexedFaqItem {
  answer: string;
  questionTokens: string[];
  answerOnlyTokens: string[];
}

/**
 * Two-channel match, question text weighted well above answer text:
 *
 *  - Question channel: FAQ questions are short, curated statements of
 *    intent, so even one matched word can be trusted — "cancel" hitting
 *    "What is your cancellation policy?" is real signal.
 *  - Answer channel: answers are long and share plenty of incidental
 *    domain vocabulary ("sell", "tour", "book") that doesn't mean the
 *    message is actually about that FAQ, so it requires at least two
 *    distinct matched words before it can win on its own.
 *
 * Within a channel, a word's weight is 1/(how many FAQ items contain it) —
 * "cancel" (rare) outweighs "book"/"tour" (used almost everywhere), so a
 * tie in match *count* between two topics still resolves toward whichever
 * one the message's more distinctive word actually belongs to.
 */
function scoreFaqItems(
  messageTokens: string[],
  items: IndexedFaqItem[],
): { item: IndexedFaqItem; questionHits: number; questionScore: number } | null {
  if (items.length === 0 || messageTokens.length === 0) return null;

  const idf = new Map<string, number>();
  for (const token of messageTokens) {
    if (idf.has(token)) continue;
    const df = items.filter(
      (item) =>
        item.questionTokens.some((t) => sameStem(token, t)) ||
        item.answerOnlyTokens.some((t) => sameStem(token, t)),
    ).length;
    idf.set(token, df > 0 ? 1 / df : 0);
  }

  const MIN_QUESTION_SCORE = 0.3;
  const MIN_ANSWER_HITS = 2;
  const MIN_ANSWER_SCORE = 0.6;

  let best: {
    item: IndexedFaqItem;
    questionHits: number;
    questionScore: number;
    totalScore: number;
    accepted: boolean;
  } | null = null;

  for (const item of items) {
    let questionHits = 0;
    let questionScore = 0;
    let answerHits = 0;
    let answerScore = 0;

    for (const token of messageTokens) {
      const weight = idf.get(token) ?? 0;
      if (item.questionTokens.some((t) => sameStem(token, t))) {
        questionHits += 1;
        questionScore += weight * 2; // question matches count double
      } else if (item.answerOnlyTokens.some((t) => sameStem(token, t))) {
        answerHits += 1;
        answerScore += weight;
      }
    }

    const accepted =
      (questionHits >= 1 && questionScore >= MIN_QUESTION_SCORE) ||
      (answerHits >= MIN_ANSWER_HITS && answerScore >= MIN_ANSWER_SCORE);
    const totalScore = questionScore + answerScore;

    if (
      accepted &&
      (!best ||
        totalScore > best.totalScore ||
        (totalScore === best.totalScore && item.questionTokens.length < best.item.questionTokens.length))
    ) {
      best = { item, questionHits, questionScore, totalScore, accepted };
    }
  }

  return best;
}

export interface ChatbotContext {
  settings: SiteSettings;
  tours: Tour[];
}

const GREETING_RE = /^\s*(hi|hello|hey|good\s?(morning|afternoon|evening)|yo)\b/i;
const CONTACT_RE = /\b(email|e-?mail|contact|reach|address)\b/i;
const PHONE_RE = /\b(phone|call|number)\b/i;
const HOURS_RE = /\b(hours?|open|closed|available)\b/i;
const TOUR_LIST_RE = /\btours?\b/i;
const TOUR_LIST_INTENT_RE = /\b(what|which|list|offer|options|available|see|show)\b/i;

function contactLine(settings: SiteSettings): string {
  return `Email us at ${settings.supportEmail}${
    settings.supportPhone ? ` or call ${settings.supportPhone}` : ""
  }.`;
}

export function answerSupportQuestion(message: string, context: ChatbotContext): string {
  const { settings, tours } = context;
  const trimmed = message.trim();

  if (GREETING_RE.test(trimmed)) {
    return `Hello! Ask me about our tours, bookings, or policies, or reach us directly — ${contactLine(settings)}`;
  }

  if (CONTACT_RE.test(trimmed)) {
    return contactLine(settings);
  }

  if (PHONE_RE.test(trimmed)) {
    return `You can call us at ${settings.supportPhone}. Support hours: ${settings.supportHours}.`;
  }

  if (HOURS_RE.test(trimmed)) {
    return `Our support hours are ${settings.supportHours}.`;
  }

  if (TOUR_LIST_RE.test(trimmed) && TOUR_LIST_INTENT_RE.test(trimmed) && tours.length > 0) {
    const names = tours.slice(0, 6).map((t) => `• ${t.title} (${t.duration})`).join("\n");
    return `Here are some of our tours:\n${names}\n\nSee the full list on our Tours page, or ask about a specific one.`;
  }

  const messageTokens = dedupeStems(tokenize(trimmed));
  const items: IndexedFaqItem[] = settings.faqCategories.flatMap((category) =>
    category.items.map((item) => {
      const questionTokens = tokenize(item.question);
      const answerOnlyTokens = tokenize(item.answer).filter(
        (t) => !questionTokens.some((qt) => sameStem(qt, t)),
      );
      return { answer: item.answer, questionTokens, answerOnlyTokens };
    }),
  );
  const best = scoreFaqItems(messageTokens, items);

  if (best) {
    return best.item.answer;
  }

  return `I don't have a confident answer for that from our site content yet. ${contactLine(
    settings,
  )} You can also check our FAQ page for more detail.`;
}
