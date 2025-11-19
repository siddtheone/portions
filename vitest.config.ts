import { defineConfig } from "vitest/config";
import path from "path";

const srcPath = path.resolve(__dirname, "src");
const testPath = path.resolve(__dirname, "test");

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": srcPath,
      "@test": testPath,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/app/**/*", "src/types.ts", "**/*.d.ts"],
    },
  },
});

