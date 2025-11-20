import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as React from "react";
import type { act as LegacyAct } from "react-dom/test-utils";

const reactActDescriptor = Object.getOwnPropertyDescriptor(React, "act");
const reactDomTestUtils = await import("react-dom/test-utils");
const polyfill = reactDomTestUtils.act as typeof LegacyAct | undefined;

const canDefineAct =
  !reactActDescriptor ||
  (reactActDescriptor.configurable && !reactActDescriptor.value);

if (canDefineAct && polyfill) {
  Object.defineProperty(React, "act", {
    configurable: true,
    writable: true,
    value: polyfill,
  });
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

beforeEach(() => {
  if (!("matchMedia" in window)) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }

  Object.defineProperty(window, "prompt", {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });

  if (!navigator.clipboard) {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn(),
      },
    });
  }
});
