import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Component tests in this project import test globals explicitly (no
// `globals: true` in vitest.config.ts), so @testing-library/react's
// auto-cleanup-after-each never detects a global `afterEach` to hook into.
// Register it here once so DOM trees from one test don't leak into the next.
afterEach(() => {
  cleanup();
});
