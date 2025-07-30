import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/vitest.setup.ts"],
    env: {
      ALPHA_VANTAGE_API_KEY: "TEST_ALPHA_VANTAGE_KEY",
    },
  },
});
