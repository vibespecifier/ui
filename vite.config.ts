import react from "@vitejs/plugin-react-swc"
import { join } from "node:path"
import { defineConfig } from "vite"

const root = import.meta.dirname

export default defineConfig({
  plugins: [react()],
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
