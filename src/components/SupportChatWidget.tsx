"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { cn } from "@/lib/utils";
import type { SupportChatResponse } from "@/app/api/support-chat/route";
import type { ChatMessage } from "@/types/content";

const MAX_HISTORY = 10;
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SupportChatWidget({ supportEmail }: { supportEmail: string }) {
  const mounted = useHasMounted();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Outside-click + Escape close the panel, mirroring SiteHeader's exact
  // technique: a ref for the trigger element, a data attribute for the
  // portaled panel, both checked in one mousedown listener. Tab is trapped
  // within the panel's focusable elements while open, and focus moves into
  // the panel on open / back to the trigger button on close.
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      buttonRef.current?.focus();
    }

    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      const insideButton = buttonRef.current?.contains(target);
      const insidePanel = target instanceof Element && target.closest("[data-support-chat]");
      if (!insideButton && !insidePanel) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
          (el) => !el.hasAttribute("disabled")
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages, loading, error]);

  if (!mounted) return null;

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const history = messages.slice(-MAX_HISTORY);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/support-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      if (!res.ok) {
        setError(true);
        return;
      }
      const data: SupportChatResponse = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open support chat"}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-fjord-500 text-white shadow-lg transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-fjord-600"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4.5 4v-4H6a2 2 0 0 1-2-2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div
        ref={panelRef}
        data-support-chat
        role="dialog"
        aria-modal="true"
        aria-label="Support chat"
        aria-hidden={!open}
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
        className={cn(
          "fixed bottom-24 right-6 z-[70] flex max-h-[70vh] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-fjord-900/40",
          "transition-[clip-path] duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          !open && "pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between bg-fjord-900 px-4 py-3">
          <h2 className="font-display text-base font-semibold text-paper">Chat with us</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close support chat"
            tabIndex={open ? undefined : -1}
            className="rounded-full p-1 text-paper/80 transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-paper/10 hover:text-paper"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-paper-dim/40 px-4 py-4">
          {messages.length === 0 && (
            <p className="text-sm text-ink-soft">
              Ask us anything about tours, bookings, or logistics &mdash; we&apos;re here to help.
            </p>
          )}
          {messages.map((message, i) => (
            <div key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                  message.role === "user" ? "bg-fjord-500 text-white" : "bg-fjord-50 text-ink"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start" aria-live="polite" aria-label="Assistant is typing">
              <div className="flex items-center gap-1 rounded-2xl bg-fjord-50 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fjord-600 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fjord-600 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fjord-600" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-red-50 px-3.5 py-2 text-sm text-red-700">
                Trouble connecting &mdash; email us at {supportEmail} instead.
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 border-t border-line px-3 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            aria-label="Message"
            tabIndex={open ? undefined : -1}
            className="flex-1 rounded-full border border-line px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-fjord-500 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            tabIndex={open ? undefined : -1}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fjord-500 text-white transition-colors duration-[220ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-fjord-600 disabled:opacity-60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 11l18-8-8 18-2-8-8-2z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>
    </>,
    document.body
  );
}
