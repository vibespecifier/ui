/// <reference types="vitest/config" />

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import react from "@vitejs/plugin-react-swc"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { defineProject } from "vitest/config"

const root =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

const storybookTestProject = defineProject({
  plugins: [storybookTest({ configDir: join(root, ".storybook") })],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
    setupFiles: [".storybook/vitest.setup.ts"],
  },
})

export default defineConfig({
  plugins: [react()],
  test: { projects: [{ extends: true, ...storybookTestProject }] },
  css: { modules: { generateScopedName: "[hash:8]" } },
  resolve: {
    alias: { "@components": join(root, "components") },
  },
  build: {
    outDir: join(root, "out"),
    emptyOutDir: true,
    lib: {
      name: "VibeSpecifierUI",
      entry: join(root, "index.tsx"),
      formats: ["es", "umd"],
    },
  },
})
