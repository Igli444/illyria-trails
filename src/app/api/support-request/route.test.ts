import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/support-request", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

const validSubmission = {
  requestType: "modify_booking",
  name: "Jane Doe",
  email: "jane@example.com",
  bookingReference: "IT-12345",
  message: "Please move my booking to next Friday.",
};

function omit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const copy = { ...obj };
  delete copy[key];
  return copy;
}

describe("POST /api/support-request", () => {
  it("returns 200 with a referenceNumber matching SR-##### for a full submission", async () => {
    const res = await POST(makeRequest(validSubmission));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.referenceNumber).toMatch(/^SR-\d{5}$/);
  });

  it("returns 200 without the optional bookingReference", async () => {
    const res = await POST(makeRequest(omit(validSubmission, "bookingReference")));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.referenceNumber).toMatch(/^SR-\d{5}$/);
  });

  it("returns 400 for an invalid email format", async () => {
    const res = await POST(makeRequest({ ...validSubmission, email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it("returns 400 for a requestType not in the enum", async () => {
    const res = await POST(makeRequest({ ...validSubmission, requestType: "not_a_real_type" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest(omit(validSubmission, "name")));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeRequest(omit(validSubmission, "message")));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });
});
