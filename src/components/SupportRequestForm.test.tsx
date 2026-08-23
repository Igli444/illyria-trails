import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SupportRequestForm } from "./SupportRequestForm";

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "I need help with my booking." } });
}

describe("SupportRequestForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("submits valid data to /api/support-request and shows the confirmation reference number", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ referenceNumber: "SR-12345" }),
    });

    render(<SupportRequestForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    await waitFor(() => {
      expect(screen.getByText(/SR-12345/)).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/support-request",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I need help with my booking.",
    });
  });

  it("shows a client-side validation error for an invalid email and does not call fetch", async () => {
    render(<SupportRequestForm />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "I need help." } });
    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    await waitFor(() => {
      expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("blocks submission client-side when the message field is missing", async () => {
    render(<SupportRequestForm />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    await waitFor(() => {
      expect(screen.getByText("Tell us how we can help")).toBeInTheDocument();
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("surfaces an inline error without crashing on a mocked 400 server response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: "Invalid request" }),
    });

    render(<SupportRequestForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't submit your request/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
  });
});
