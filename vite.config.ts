import react from "@vitejs/plugin-react"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { defineConfig, Plugin } from "vite"

/**
 * Compile package.json from a development environment to an output package.
 *
 * 1. Remove fields for dev like `devDependencies`, `scripts`.
 * 2. Override specified files into the manifest configurations.
 * 3. Compress the package.json file, avoid unnecessary indent.
 *
 * @param options how to compile package.json.
 * @returns a vite plugin.
 */
function manifest(options?: {
  root?: string
  outDir?: string
  overrides?: Record<string, unknown>
}): Plugin {
  return {
    name: "manifest",
    closeBundle(error) {
      if (error) throw error
      const root = options?.root || import.meta.dirname
      const outDir = options?.outDir || join(root, "out")
      const filename = "package.json"
      const manifest = JSON.parse(readFileSync(join(root, filename)).toString())
      manifest.engines = undefined
      manifest.packageManager = undefined
      manifest.scripts = undefined
      manifest.devDependencies = undefined
      for (const key of Object.keys(options?.overrides ?? {})) {
        manifest[key] = options?.overrides?.[key]
      }
      writeFileSync(join(outDir, filename), JSON.stringify(manifest))
    },
  }
}

// Global data.
const root = import.meta.dirname
const outDir = join(root, "out")
const filename = "index"
const exports = {
  ".": { import: `./${filename}.js`, require: `./${filename}.umd.cjs` },
  [`./${filename}.css`]: `./${filename}.css`,
}

export default defineConfig({
  plugins: [react(), manifest({ root, outDir, overrides: { exports } })],
  resolve: {
    external: ["react", "react-dom"],
  },
  build: {
    outDir,
    emptyOutDir: true,
    lib: { entry: "src/index.ts", name: "VibeSpecifierUI", fileName: filename },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
})
