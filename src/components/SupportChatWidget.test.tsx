import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SupportChatWidget } from "./SupportChatWidget";

const SUPPORT_EMAIL = "hello@illyriatrails.example";

function openPanel() {
  fireEvent.click(screen.getByRole("button", { name: /open support chat/i }));
}

describe("SupportChatWidget", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("opens the panel on trigger click and closes it on Escape", () => {
    render(<SupportChatWidget supportEmail={SUPPORT_EMAIL} />);

    expect(screen.queryByRole("dialog", { name: "Support chat" })).not.toBeInTheDocument();

    openPanel();
    expect(screen.getByRole("dialog", { name: "Support chat" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Support chat" })).not.toBeInTheDocument();
  });

  it("submits a typed message to /api/support-chat with the correct body and shows it optimistically", async () => {
    let resolveFetch!: (value: unknown) => void;
    (global.fetch as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    render(<SupportChatWidget supportEmail={SUPPORT_EMAIL} />);
    openPanel();

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "How do I book a tour?" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("How do I book a tour?")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/support-chat",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body).toEqual({ message: "How do I book a tour?", history: [] });

    resolveFetch({ ok: true, json: async () => ({ reply: "Pick a tour and check availability." }) });
    await waitFor(() => {
      expect(screen.getByText("Pick a tour and check availability.")).toBeInTheDocument();
    });
    expect(screen.queryByLabelText("Assistant is typing")).not.toBeInTheDocument();
  });

  it("shows an inline error mentioning supportEmail when the request fails", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("network down"));

    render(<SupportChatWidget supportEmail={SUPPORT_EMAIL} />);
    openPanel();

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(SUPPORT_EMAIL))).toBeInTheDocument();
    });
  });

  it("shows an inline error mentioning supportEmail on a non-2xx response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({ error: "unavailable" }),
    });

    render(<SupportChatWidget supportEmail={SUPPORT_EMAIL} />);
    openPanel();

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(SUPPORT_EMAIL))).toBeInTheDocument();
    });
  });

  it("keeps Tab cycling within the panel's focusable elements while open", () => {
    render(<SupportChatWidget supportEmail={SUPPORT_EMAIL} />);
    openPanel();

    // Enable the send button so it participates as the last focusable element.
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hi" } });

    const closeButton = screen.getByRole("button", { name: /close support chat/i });
    const sendButton = screen.getByRole("button", { name: /send message/i });

    sendButton.focus();
    expect(document.activeElement).toBe(sendButton);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);

    closeButton.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(sendButton);
  });
});
