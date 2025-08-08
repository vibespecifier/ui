import react from "@vitejs/plugin-react"
import { join } from "node:path"
import { defineConfig } from "vite"

const root = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  resolve: {
    external: ["react", "react-dom"],
  },
  build: {
    outDir: join(root, "out"),
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      name: "VibeSpecifierUI",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
})
