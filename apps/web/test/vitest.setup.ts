import "@testing-library/jest-dom";
import { noop } from "lodash/fp";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({
    className: () => "",
  }),
  Roboto_Mono: () => ({
    className: () => "",
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: noop,
    events: {
      on: noop,
      off: noop,
      emit: noop,
    },
    isFallback: false,
    refresh: noop,
  }),
  usePathname: () => "http://localhost:3000/en/properties",
}));
