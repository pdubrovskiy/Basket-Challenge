import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/__tests__/**/*.test.ts"],
    setupFiles: ["./src/features/cart/utils/__tests__/setup.ts"],
  },
});
